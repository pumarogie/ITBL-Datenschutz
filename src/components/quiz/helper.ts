import { TCanvasConfettiAnimationOptions } from "react-canvas-confetti/src/types";
import { QuizParams } from "@/components/quiz/quiz";
import { AchievementId } from "@/util/achievement-data";
import React from "react";

export const customDecorateOptions = (
  opts: TCanvasConfettiAnimationOptions,
) => {
  opts.shapes = ["circle", "square"];
  opts.ticks = 500;
  opts.gravity = 1;
  opts.scalar = 0.6;
  return opts;
};

export type QuizListProps = {
  className?: string;
  quizzes: QuizParams[];
  onFinish?: () => void;
  onNextQuestion?: () => void;
  achievement?: keyof typeof AchievementId | undefined;
};

export type QuizzesStateProps = Array<{
  quiz: QuizParams;
  selection: number;
  isSolved: boolean;
  isDone: boolean;
}>;

export function quizStateClasses(
  index: number,
  currentQuizIndex: number,
  quizzesState: QuizzesStateProps,
  quizzes: QuizParams[],
) {
  let classes =
    "rounded-full w-10 h-10 inline-flex justify-center items-center font-bold flex-shrink-0 ";
  if (index === currentQuizIndex) {
    classes += "bg-orange-500 text-white";
  } else if (quizzesState[index].isDone) {
    if (quizzes[index].showCorrectAnswer) {
      if (quizzesState[index].isSolved) {
        classes += "bg-green-200 text-green-800";
      } else {
        classes += "bg-red-200 text-red-800";
      }
    } else {
      classes += "bg-sky-200 text-green-800";
    }
  } else if (
    quizzesState[index].selection != -1 &&
    !quizzesState[index].isSolved
  ) {
    classes += "bg-red-200 text-red-800";
  } else {
    classes += "bg-slate-200 text-sky-800";
  }
  return classes;
}

export function onSelect(
  quizIndex: number,
  selection: number,
  isDone: boolean,
  quizzesState: QuizzesStateProps,
  setQuizzesState: React.Dispatch<React.SetStateAction<QuizzesStateProps>>,
) {
  setQuizzesState(
    quizzesState.map((state, index) => {
      if (quizIndex === index) {
        return {
          quiz: state.quiz,
          selection: selection,
          isSolved: selection === state.quiz.correctAnswer,
          isDone: isDone,
        };
      } else {
        return state;
      }
    }),
  );
}

export function getAchievedScore(quizzesState: QuizzesStateProps) {
  return quizzesState
    .map((state) => state.isSolved)
    .reduce((acc, v) => acc + (v ? 1 : 0), 0);
}
