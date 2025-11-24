"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/button";
import { Achievement, AchievementData } from "@/util/achievement-data";
import AchievementCard from "@/components/achievements/achievement-card";
import { PersistUserService } from "@/services/user/PersistUserService";
import Explosion from "react-canvas-confetti/dist/presets/explosion";
import Quiz, { QuizParams } from "@/components/quiz/quiz";
import {
  customDecorateOptions,
  getAchievedScore,
  onSelect,
  QuizListProps,
  quizStateClasses,
  QuizzesStateProps,
} from "@/components/quiz/helper";
import { getUserService } from "@/services/user/UserService";

export default function QuizList({
  quizzes,
  className,
  onFinish,
  onNextQuestion,
  achievement,
}: QuizListProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [quizzesState, setQuizzesState] = useState<QuizzesStateProps>(
    quizzes.map((quiz) => ({
      quiz,
      selection: -1,
      isSolved: false,
      isDone: false,
    })),
  );

  const achievementData = AchievementData.achievements.find(
    (el) => el.id === achievement,
  );

  const achievedScore = getAchievedScore(quizzesState);

  useEffect(() => {
    async function unlockAchievement(achievementId: string) {
      const context = getUserService();
      await context.setAchievement(achievementId, true);
    }

    if (achievement !== undefined && currentQuizIndex === quizzes.length - 1) {
      unlockAchievement(achievement);
    }
  }, [achievement, achievedScore]);

  function nextQuiz() {
    if (currentQuizIndex === quizzes.length - 1) return;
    setCurrentQuizIndex(currentQuizIndex + 1);
    onNextQuestion?.();
  }

  function finishQuiz() {
    if (showSummary) {
      onFinish?.();
    } else {
      setCurrentQuizIndex(quizzes.length);
      setShowSummary(true);
      onNextQuestion?.();
    }
  }

  return (
    <div className={className}>
      <div className="py-4 flex flex-wrap gap-x-6 gap-y-2 justify-center items-center">
        {quizzesState.map((_, index) => (
          <div
            key={index}
            className={quizStateClasses(
              index,
              currentQuizIndex,
              quizzesState,
              quizzes,
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {!showSummary && (
        <div className="md:mb-10 mb-6">
          {quizzesState.map(({ quiz }, index) => (
            <div
              className={clsx("", currentQuizIndex != index && "hidden")}
              key={index}
            >
              <Quiz
                question={quiz.question}
                answers={quiz.answers}
                hint={quiz.hint}
                hintAnswers={quiz.hintAnswers}
                correctAnswer={quiz.correctAnswer}
                showCorrectAnswer={quiz.showCorrectAnswer}
                onSelect={(selection, isDone) => {
                  onSelect(
                    currentQuizIndex,
                    selection,
                    isDone,
                    quizzesState,
                    setQuizzesState,
                  );
                }}
                onAnswerClick={quiz.onAnswerClick}
                className={undefined}
              />
            </div>
          ))}
        </div>
      )}

      {showSummary && (
        <QuizEndScreen
          achievedScore={achievedScore}
          quizzesState={quizzesState}
          achievementData={achievementData}
          quizzes={quizzes}
          onFinish={onFinish}
        />
      )}

      <div className="ml-100 flex justify-end">
        {quizzesState[currentQuizIndex]?.isDone &&
          (currentQuizIndex === quizzes.length - 1 ? (
            <Button onClick={finishQuiz} className="md:mb-10 mb-6">
              Abschließen
            </Button>
          ) : (
            <Button onClick={nextQuiz} className="md:mb-10 mb-6">
              Weiter
            </Button>
          ))}
      </div>
    </div>
  );
}

function QuizEndScreen({
  achievedScore,
  quizzesState,
  achievementData,
  quizzes,
  onFinish,
}: {
  achievedScore: number;
  quizzesState: QuizzesStateProps;
  achievementData: Achievement | undefined;
  quizzes: QuizParams[];
  onFinish?: () => void;
}) {
  return (
    <div className="flex mb-6 justify-center items-center flex-col gap-4 mt-10">
      <h3 className="text-xl font-semibold mb-2">Du hast es geschafft!</h3>
      <p className="pb-6">
        Du hast {achievedScore} von {quizzesState.length} Fragen richtig
        beantwortet.
      </p>
      {achievementData && achievedScore === quizzes.length && (
        <>
          <Explosion
            autorun={{ speed: 10, duration: 2500 }}
            decorateOptions={customDecorateOptions}
          />
          <AchievementCard
            id={achievementData.id}
            title={achievementData.title}
            description={achievementData.description}
            progress={true}
            icon={achievementData.icon}
          />
        </>
      )}
      <Button onClick={() => onFinish?.()}>Weiter</Button>
    </div>
  );
}
