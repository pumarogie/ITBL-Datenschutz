"use client";

import { useRouter } from "next/navigation";
import QuizList from "@/components/quiz/quiz-list";
import { QuizParams } from "@/components/quiz/quiz";
import { PersistUserService } from "@/services/user/PersistUserService";
import { AchievementId } from "@/util/achievement-data";
import { getUserService } from "@/services/user/UserService";

const quizzes: QuizParams[] = [
  {
    question: "Was bedeutet Cloud-Speicherung?",
    answers: [
      "Deine Daten werden nur lokal auf deinem Gerät gespeichert",
      "Deine Daten werden in der Wolke aufbewahrt",
      "Deine Daten werden auf Servern im Internet gespeichert ",
      "Deine Daten werden auf einem USB-Stick gespeichert",
    ],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question: "Warum werden deine Daten manchmal an Dritte weitergegeben?",
    answers: [
      "Um deine Daten zu löschen",
      "Um dir personalisierte Werbung anzuzeigen",
      "Um deine Passwörter zu ändern",
      "Um dir kostenlose Produkte zu schicken",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Welches Gesetz regelt den Schutz deiner persönlichen Daten in der EU?",
    answers: [
      "Allgemeine Datenschutzregelung (ADR)",
      "Datenschutz-Grundverordnung (DSGVO)",
      "Europäische Datenschutzrichtlinie (EDR)",
      "Persönliche Datenschutzverordnung (PDV)",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question: "Welche Maßnahme trägt nicht zur Sicherheit deiner Daten bei?",
    answers: [
      "Nutzung starker Passwörter",
      "Regelmäßige Software-Updates",
      "Teilen deiner Passwörter mit Freunden",
      "Verschlüsselung sensibler Daten",
    ],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question: "Was bedeutet ein verantwortungsvoller Umgang mit Daten?",
    answers: [
      "Alle Daten öffentlich teilen",
      "Nur die Daten anderer schützen",
      "Keine Daten online nutzen",
      "Vorsichtig und bewusst mit den eigenen und den Daten anderer umgehen",
    ],
    correctAnswer: 3,
    showCorrectAnswer: true,
  },
];

export default function DataProtectionChapter1Quiz() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-center @container">
      <div className="w-full @4xl:w-1/2 mb-20">
        <QuizList
          quizzes={quizzes}
          onFinish={async () => {
            await getUserService().setAchievement(
              AchievementId.DATA_PROCESSING_CHECKPOINT_INTRODUCTION,
              true,
            );
            router.push("/space/daten-verarbeitung/overview");
          }}
        />
      </div>
    </div>
  );
}
