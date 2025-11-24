"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Button from "./button";
import { useRouter } from "next/navigation";
import { PrivacyQuizQuestion } from "@/app/(safespace)/space/privatsphaere/swipe/page";
import Robot from "@/components/robot/robot";
import { AchievementId } from "@/util/achievement-data";
import { useMessages } from "@/services/notification/message-provider";
import { getUserService } from "@/services/user/UserService";

export function PrivacyQuiz({
  questions,
}: {
  questions: PrivacyQuizQuestion[];
}) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const messageService = useMessages();
  const currentQuestion = questions[currentQuestionIndex];
  const [firstTry, setFirstTry] = useState(true);

  const handleAnswer = (answer: boolean) => {
    if (currentQuestion.isPersonenbezogen != answer) {
      setFirstTry(false);
    }
    setAnswer(answer);
  };

  const handleNextQuestion = () => {
    setAnswer(null);
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex + 1 === questions.length) {
        const userService = getUserService();
        userService
          .setAchievement(AchievementId.PRIVATSPHAERE_FINISHED, true)
          .then((res) => {
            if (res) {
              messageService.showAchievement(
                AchievementId.PRIVATSPHAERE_FINISHED,
              );
            }
          });
        if (firstTry) {
          userService
            .setAchievement(AchievementId.PRIVATSPHAERE_SWIPE, true)
            .then((res) => {
              if (res) {
                messageService.showAchievement(
                  AchievementId.PRIVATSPHAERE_SWIPE,
                );
              }
            });
        }
      }
      return prevIndex + 1;
    });
  };

  return (
    <>
      {currentQuestionIndex < questions.length ? (
        <div className="relative flex flex-row justify-center w-full max-w-5xl">
          <div className="flex flex-col">
            <h2 className="text-center px-8 lg:px-16 text-xl lg:text-2xl mb-10 text-blue-background font-bold">
              Ist folgendes Datum personenbezogen?
            </h2>
            {answer !== null ? (
              <QuizResult
                userAnswer={answer}
                currentQuestion={currentQuestion}
                handleNextQuestion={handleNextQuestion}
              />
            ) : (
              <QuizQuestion
                currentQuestion={currentQuestion}
                handleAnswer={handleAnswer}
              />
            )}
          </div>
          <div className="w-5/12 hidden lg:flex">
            <h2 className="text-xl text-blue-background font-bold mt-24 ml-3">
              {questions.length !== currentQuestionIndex
                ? currentQuestionIndex + 1
                : currentQuestionIndex}
              /{questions.length}
            </h2>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-8 max-w-2xl min-h-[300px] items-center justify-center py-4">
          {questions.length != 0 ? (
            <>
              <Robot expression="smiling" />
              <h2 className="text-center text-xl text-blue-background font-bold">
                Super! Du hast alle {questions.length} Fragen beantwortet.
              </h2>
              <Button onClick={() => router.push("/space")}>
                Zurück zur Startseite
              </Button>
            </>
          ) : (
            <div>loading...</div>
          )}
        </div>
      )}
    </>
  );
}

function QuizResult({
  userAnswer,
  currentQuestion,
  handleNextQuestion,
}: {
  userAnswer: boolean;
  currentQuestion: PrivacyQuizQuestion;
  handleNextQuestion: () => void;
}) {
  return (
    <div className="flex flex-col w-full max-w-2xl min-h-[500px] items-center justify-center rounded-xl bg-gray-100 pb-4">
      <span
        className={clsx(
          "flex w-11/12 max-w-md p-4 mb-7 mt-4 rounded-xl items-center justify-center font-bold text-white text-xl max-h-14",
          currentQuestion.isPersonenbezogen ? "bg-green-500" : "bg-red-600",
        )}
      >
        {currentQuestion.isPersonenbezogen
          ? "Personenbezogen"
          : "Nicht personenbezogen"}
      </span>
      <ImageSection icon={currentQuestion.icon} />
      <h2 className="text-center font-semibold text-xl mt-[-1rem]">
        {currentQuestion.questionText}
      </h2>
      <span className="flex flex-col w-full max-w-md lg:my-5 scale-95 lg:scale-100 p-2">
        <span className="text-blue-background font-bold pb-2">
          {userAnswer === currentQuestion.isPersonenbezogen
            ? "Richtig! "
            : "Leider Falsch. "}
        </span>
        {currentQuestion.explanation}
      </span>
      <Button onClick={handleNextQuestion}>Weiter</Button>
    </div>
  );
}

function QuizQuestion({
  currentQuestion,
  handleAnswer,
}: {
  currentQuestion: PrivacyQuizQuestion;
  handleAnswer: (isCorrect: boolean) => void;
}) {
  return (
    <div className="flex flex-col bg-gray-100 rounded-xl w-full max-w-5xl">
      <div className="my-12">
        <h2 className="text-center lg:text-3xl font-semibold text-xl">
          {currentQuestion.questionText}
        </h2>
      </div>
      <ImageSection icon={currentQuestion.icon} />
      <div className="flex justify-center space-x-12 my-5">
        <button
          className="bg-lime-600 text-white min-w-28 lg:min-w-36 h-12 p-5 flex rounded-xl justify-center items-center"
          onClick={() => handleAnswer(true)}
        >
          Ja
        </button>
        <button
          className="bg-red-600 text-white min-w-28 lg:min-w-36 h-12 p-5 flex rounded-xl justify-center items-center"
          onClick={() => handleAnswer(false)}
        >
          Nein
        </button>
      </div>
    </div>
  );
}

function ImageSection({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col justify-center items-center">{icon}</div>
  );
}
