"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Image from "next/image";
import { useMessages } from "@/services/notification/message-provider";
import clsx from "clsx";
import {
  passwordData,
  states,
  instruction,
} from "@/util/passwort/password-quiz-data";
import { passwordAnimation } from "@/util/passwort/strength-helper";
import RobotInPasswort from "@/components/robot-in-passwort";
import { AchievementId } from "@/util/achievement-data";
import { HintCard } from "@/components/hint-card";
import StrengthIntro from "@/app/(safespace)/space/passwort/components/strength-introduction";
import { getUserService, UserService } from "@/services/user/UserService";

type ButtonColor = "green" | "red" | "default";

type PasswordStrength = "strong" | "medium" | "weak";
export default function PasswordStrength() {
  const [highscore, setHighscore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const router = useRouter();
  const { addMessage } = useMessages();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayPassword, setDisplayPassword] = useState("");
  const currentQuestion = passwordData[currentQuestionIndex];
  const [animateShake, setAnimateShake] = useState(false);
  const [animatePulse, setAnimatePulse] = useState(false);
  const [continueGame, setContinueGame] = useState(false);
  const [moduleFinished, setModuleFinished] = useState(false);
  const userServiceRef = useRef<UserService | null>(null);
  const messageService = useMessages();

  useEffect(() => {
    const context = getUserService();
    const fetchHighScore = async () => {
      const loadedHighScore = await context.getHighScore("PASSWORD_STRENGTH");
      setHighscore(typeof loadedHighScore === "number" ? loadedHighScore : 0);
    };

    const setAchievement = async () => {
      if (highscore === 15) {
        await userServiceRef.current
          ?.setAchievement(AchievementId.PASSWORD_STRENGTH, true)
          .then((res) => {
            if (res) {
              messageService.showAchievement(AchievementId.PASSWORD_STRENGTH);
            }
          });
      }
    };
    fetchHighScore();
    setAchievement();
  }, [highscore]);

  useEffect(() => {
    userServiceRef.current = getUserService();
    const fetchAchievements = async () => {
      let finished;
      const achievements = await userServiceRef.current?.getAchievement();
      finished = achievements
        ?.map((a) => a.achievementEnum)
        ?.includes(AchievementId.PASSWORT_FINISHED);
      setModuleFinished(finished ?? false);
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    if (gameStarted) {
      passwordAnimation(currentQuestion.password, setDisplayPassword);
    }
  }, [gameStarted, currentQuestionIndex, currentQuestion.password]);

  const handleButtonClick = (strength: ButtonColor) => {
    if (strength === "green") {
      setCurrentScore((prevScore) => prevScore + 1);
      if (currentScore >= highscore) {
        saveHighScore();
      }
      setAnimatePulse(true);
      setTimeout(() => setAnimatePulse(false), 300);
      goToNextQuestion();
    } else {
      addMessage(
        "Das war leider falsch. " + currentQuestion.explanation,
        "error",
      );
      setCurrentScore(0);
      setAnimateShake(true);
      setTimeout(() => setAnimateShake(false), 500);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < passwordData.length - 1) {
      setCurrentQuestionIndex((curr) => curr + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    passwordAnimation(
      passwordData[currentQuestionIndex + 1]?.password ||
        passwordData[0]?.password,
      setDisplayPassword,
    );
  };

  const saveHighScore = async () => {
    setHighscore((prevScore) => prevScore + 1);
    await userServiceRef.current?.setHighScore(
      "PASSWORD_STRENGTH",
      currentScore + 1,
    );
  };

  return (
    <div className="flex flex-col w-full lg:px-6 justify-start">
      <div className="flex justify-between mt-4 gap-8 h-full">
        {!gameStarted ? (
          <>
            <StrengthIntro
              setGameStarted={setGameStarted}
              currentQuestion={currentQuestion}
              setDisplayPassword={setDisplayPassword}
            />
          </>
        ) : (
          <div className="flex flex-col w-full overflow-hidden">
            {highscore == 10 && !continueGame && !moduleFinished ? (
              <div className="flex  flex-col justify-center items-center mt-72">
                <RobotInPasswort
                  states={states}
                  setContinueGame={setContinueGame}
                />
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <PlayGame
                  animatePulse={animatePulse}
                  animateShake={animateShake}
                  currentScore={currentScore}
                  displayPassword={displayPassword}
                  handleButtonClick={handleButtonClick}
                />
                <div className="flex flex-row justify-between mt-12">
                  <Button
                    className="md:mb-2 h-[50px] w-[200px] bg-gray-600 hover:bg-gray-700 text-sm"
                    onClick={() => router.push("/space/passwort/builder")}
                  >
                    Zurück zur Modulübersicht
                  </Button>
                  <HintCard
                    text="Was muss ich machen?"
                    buttonText="Aufgabe anzeigen"
                    hint={instruction}
                    className="max-w-[250px] sm:max-w-[400px] ml-2 flex-end p-2"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="absolute top-[70px] sm:top-[130px] right-6 sm:right-16 flex flex-col min-w-[104px]">
          <Image
            src="/trophy.svg"
            alt="Highscore"
            width={90}
            height={90}
            className="mx-auto"
            priority
          />
          <span className="text-xl text-blue-background">High Score</span>
          <span className="flex relative justify-center w-[50px] h-[36px] text-2xl bottom-[94px] left-[27px]">
            {highscore}
          </span>
        </div>
      </div>
    </div>
  );
}

function PlayGame({
  animatePulse,
  animateShake,
  currentScore,
  displayPassword,
  handleButtonClick,
}: {
  animatePulse: boolean;
  animateShake: boolean;
  currentScore: number;
  displayPassword: string;
  handleButtonClick: (strength: ButtonColor) => void;
}) {
  type PasswordStrength = "strong" | "medium" | "weak";

  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [buttonStates, setButtonStates] = useState<{
    strong: ButtonColor;
    medium: ButtonColor;
    weak: ButtonColor;
  }>({
    strong: "default",
    medium: "default",
    weak: "default",
  });

  function checkStrengthPassword(password: string) {
    if (password.length === 0) {
      setStrength(null);
    } else {
      const isMediumPasswort =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/.test(
          password,
        );
      const isStrongPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{10,})/.test(
          password,
        );
      setStrength(
        isStrongPassword ? "strong" : isMediumPasswort ? "medium" : "weak",
      );
    }
  }
  function submitAnswer(clickStrength: PasswordStrength) {
    if (clickStrength === strength) {
      setButtonStates((prev) => ({ ...prev, [clickStrength]: "green" }));
    } else {
      setButtonStates((prev) => ({ ...prev, [clickStrength]: "red" }));
    }

    setTimeout(() => {
      setButtonStates({
        strong: "default",
        medium: "default",
        weak: "default",
      });
    }, 1000);
  }

  useEffect(() => {
    const currentType = Object.keys(buttonStates).find(
      (key) => buttonStates[key as PasswordStrength] !== "default",
    );
    if (currentType) {
      handleButtonClick(buttonStates[currentType as PasswordStrength]);
      setTimeout(() => {
        setButtonStates({
          strong: "default",
          medium: "default",
          weak: "default",
        });
      }, 2000);
    }
  }, [buttonStates]);

  function translateStrength(type: PasswordStrength) {
    if (type === "weak") {
      return "schwach";
    } else if (type === "medium") {
      return "mittel";
    } else {
      return "stark";
    }
  }
  useEffect(() => {
    checkStrengthPassword(displayPassword);
  }, [displayPassword]);

  return (
    <div className="flex flex-col justify-between align-center w-full mt-24 md:mt-14">
      <div>
        <div className="flex flex-col gap-y-12 mb-12 md:mb-28">
          <span
            className={clsx(
              "text-2xl md:text-3xl text-blue-background text-center",
              animatePulse && "animate-pointIncrease",
            )}
          >
            Punkte: {currentScore}
          </span>

          <div className="flex justify-center w-full">
            <div className="w-full flex justify-center">
              <span
                className={clsx(
                  "bg-blue-contrast p-4 min-w-52 rounded-xl text-2xl md:text-3xl text-white text-start max-w-[400px] w-full",
                  animateShake && "animate-shake",
                )}
              >
                {displayPassword}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row items-center md:justify-center space-y-8 md:space-y-0 md:space-x-8">
          {["weak", "medium", "strong"].map((type) => (
            <Button
              key={type}
              onClick={() => {
                submitAnswer(type as PasswordStrength);
              }}
              style={buttonStates[type as PasswordStrength]}
              className="max-w-[200px] w-full"
            >
              {translateStrength(type as PasswordStrength)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
