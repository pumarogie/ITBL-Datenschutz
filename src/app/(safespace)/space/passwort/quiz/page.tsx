"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/button";
import {
  quizzes,
  replaceCharacter,
  topTenPasswords,
} from "@/util/passwort/password-quiz-data";
import QuizList from "@/components/quiz/quiz-list";
import { AchievementId } from "@/util/achievement-data";

const hintCards = [
  {
    questionIndex: 0,
    text: "Top Ten deutsche Passwörter 2023",
    buttonText: "Anzeigen",
    hint: (
      <div className="grid sm:grid-cols-1 grid-cols-3 gap-3 font-bold text-sm">
        {topTenPasswords.map((password, index) => {
          return (
            <span key={index}>
              <strong>{index + 1}</strong>. {password}
            </span>
          );
        })}
      </div>
    ),
  },
  {
    questionIndex: 1,
    text: "Welche Buchstaben werden oft ersetzt?",
    buttonText: "Anzeigen",
    hint: (
      <div className="grid sm:grid-cols-1 grid-cols-3 gap-3 font-bold text-xs">
        {replaceCharacter.map((character, index) => {
          return <span key={index}> {character}</span>;
        })}
      </div>
    ),
  },
  {
    questionIndex: 3,
    text: "Kann ein Brute-Force-Angriff immer erfolgreich sein?",
    buttonText: "Mehr erfahren",
    hint: "Theoretisch ja, aber praktisch kann es Jahre dauern, ein sehr starkes Passwort zu knacken, was den Angriff ineffektiv macht.",
  },
  {
    questionIndex: 4,
    text: "Wie kann man Brute-Force-Angriffe abwehren?",
    buttonText: "Mehr erfahren",
    hint: "Verwenden Sie lange und komplexe Passwörter, aktivieren Sie Zwei-Faktor-Authentifizierung und setzen Sie Account-Sperrungen nach mehreren Fehlversuchen ein.",
  },
];

export default function StartGame() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleQuestionChange = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowHint(false);
  };

  const currentHintCard = hintCards.find(
    (card) => card.questionIndex === currentQuestionIndex,
  );

  return (
    <div className="flex items-center flex-col xl:gap-8 2xl:mt-8 px-2 lg:px-4">
      <QuizList
        className="max-w-[1100px]"
        quizzes={quizzes}
        onFinish={() => {
          router.push("/space/passwort/builder");
        }}
        onNextQuestion={handleQuestionChange}
        achievement={AchievementId.PASSWORD_QUIZ}
      />
      <div className="max-w-[400px]">
        {currentHintCard && (
          <div
            className="relative rounded-xl p-4 scale-95 w-full h-full"
            style={{ background: "rgba(251, 109, 58, 0.15)" }}
          >
            <div className="absolute top-[-26px] left-[-26px] w-16 h-16 rounded-full flex items-center justify-center">
              <Image
                src="/question-mark.svg"
                alt="Question Mark"
                width={50}
                height={50}
                priority
              />
            </div>
            <div className="flex flex-col h-full justify-between">
              {showHint ? (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col items-end">
                    <Image
                      src="/cancel.svg"
                      alt="cancel"
                      width={30}
                      height={30}
                      onClick={() => setShowHint(false)}
                      className="cursor-pointer"
                      priority
                    />
                  </div>
                  <div className="px-2 pb-2">{currentHintCard.hint}</div>
                </div>
              ) : (
                <div className="flex justify-between flex-col h-full">
                  <div className="flex flex-col relative justify-start items-start p-6">
                    <span className="font-semibold text-sm pb-4 text-blue-background">
                      {currentHintCard.text}
                    </span>
                    <Button onClick={() => setShowHint(true)}>
                      {currentHintCard.buttonText}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
