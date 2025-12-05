"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import getFeedback, {
  extractScoreAndReason,
  showAchievementRightInput,
} from "@/app/(safespace)/space/rechte/input/action";
import { questions } from "@/util/rights/rights-data";
import { Score } from "@/app/(safespace)/space/rechte/input/score";
import { useMessages } from "@/services/notification/message-provider";
import { useRouter } from "next/navigation";

export default function RightsInputValidation() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState<
    Array<{ score: number; reason: string }>
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageService = useMessages();
  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowModal(true);
    setLoading(true);

    const fetchedAnswer = await getFeedback(
      currentQuestion.situation,
      userInput,
      currentQuestion.correctAnswer,
    );

    setLoading(false);
    const res = extractScoreAndReason(fetchedAnswer);
    setAnswers((prev) => [res, ...prev]);
    setUserInput("");
  };

  const handleNextQuestion = async () => {
    setUserInput("");
    setShowModal(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevState) => prevState + 1);
    } else {
      await showAchievementRightInput(
        answers,
        questions.length,
        messageService,
      );
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center justify-center space-y-16"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-2xl">
          Ist das eine Verletzung deiner Rechte?
        </h1>
        <span className="text-center w-1/2 font-semibold text-2xl">
          {currentQuestion.situation}
        </span>
        <input
          type="text"
          placeholder="Ja/Nein, weil ..."
          className="w-1/2 rounded-xl border-2 border-blue-background p-4 text-xl"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <div className="flex flex-row gap-x-4">
          <Button type="submit" disabled={userInput.length === 0}>
            {currentQuestionIndex < questions.length - 1
              ? "Nächste Frage"
              : "Auswerten"}
          </Button>
          {currentQuestionIndex === questions.length - 1 && (
            <Button onClick={() => router.push("/space/rechte")}>
              Zurück zur Startseite
            </Button>
          )}
        </div>
      </form>
      {showModal && (
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl max-w-2xl max-h-[50vh] mx-auto my-auto">
            {loading ? (
              <div className="flex flex-col items-center">Loading ...</div>
            ) : (
              <div className="flex items-center justify-center flex-col gap-y-4">
                <h2 className="text-2xl font-bold mb-4">Dein Feedback</h2>
                <p className="mb-4">
                  {answers.length > 0 ? answers[0].reason : "No answer yet"}
                </p>
                <Score score={answers[currentQuestionIndex].score} />
                <Button onClick={handleNextQuestion}>
                  {currentQuestionIndex < questions.length - 1
                    ? "Nächste Frage"
                    : "Ergebnisse anzeigen"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
