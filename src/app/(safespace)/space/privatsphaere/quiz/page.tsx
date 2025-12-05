"use client";
import { HintCard } from "@/components/hint-card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizList from "@/components/quiz/quiz-list";
import { QuizParams } from "@/components/quiz/quiz";
import { AchievementId } from "@/util/achievement-data";

export default function StartGame() {
  const [showHintCard, setShowHintCard] = useState(false);
  function onAnswerClick() {
    setShowHintCard(true);
  }

  const quiz: { quiz: QuizParams; explanation: string }[] = [
    {
      quiz: {
        question:
          'Was bedeutet der Begriff "Privatsphäre" im Zusammenhang mit sozialen Medien?',
        answers: [
          "Die Anzahl der Follower, die du hat",
          "Zusammenstellung aller von dir hochgeladenen Fotos ",
          "Schutz der persönlichen Daten während deiner Online-Aktivitäten",
          "Privater Chat mit einem Freund ",
        ],
        showCorrectAnswer: true,
        correctAnswer: 2,
        onAnswerClick: onAnswerClick,
      },
      explanation:
        "Im Zusammenhang mit den sozialen Medien bedeutet Datenschutz, dass deine persönlichen Daten und Online-Aktivitäten vor unbefugtem Zugriff und Missbrauch geschützt werden. Deshalb ist Antwort B richtig.",
    },
    {
      quiz: {
        question:
          "Welche Informationen solltest du nicht in sozialen Netzwerken teilen, um deine Privatsphäre zu schützen?",
        answers: [
          "Deine Wohnanschrift und Telefonnummer.",
          "Fotos mit deinen Freunden",
          "Deine Schule",
          "Deine Haustiere",
        ],
        showCorrectAnswer: true,
        correctAnswer: 0,
        onAnswerClick: onAnswerClick,
      },
      explanation:
        "Um Ihre Privatsphäre in sozialen Netzwerken zu schützen, solltest du es vermeiden, sensible persönliche Informationen zu teilen. Deshalb ist Antwort A richtig.",
    },
    {
      quiz: {
        question:
          "Warum ist es wichtig, die Datenschutzeinstellungen in den sozialen Medien regelmäßig zu aktualisieren?",
        answers: [
          "Um bekannter zu werden und mehr Follower zu bekommen.",
          "Um neue Funktionen zu haben",
          "Um weniger Werbung zu erhalten",
          "Um deine personenbezogenen Daten zu schützen, wenn Plattformen ihre Datenschutzrichtlinien aktualisieren.",
        ],
        showCorrectAnswer: true,
        correctAnswer: 3,
        onAnswerClick: onAnswerClick,
      },
      explanation:
        "Die regelmäßige Aktualisierung deiner Datenschutzeinstellungen in sozialen Medien ist wichtig, da die Plattformen ihre Datenschutzrichtlinien häufig aktualisieren. Deshalb ist Antwort D richtig",
    },
    {
      quiz: {
        question:
          "Wann sollte man seine persönlichen Daten online weitergeben?",
        answers: [
          "Wenn die Plattform mich fragt",
          "Nur auf vertrauenswürdigen Plattformen und mit Personen, die du kennst.",
          "In einer Gruppe mit Fremden",
          "Wenn dir jemand privat schreibt, weil er sie braucht.",
        ],
        showCorrectAnswer: true,
        correctAnswer: 1,
        onAnswerClick: onAnswerClick,
      },
      explanation:
        "Die Weitergabe persönlicher Daten auf unzuverlässigen Websites oder an Fremde kann Risiken wie Identitätsdiebstahl, Betrug und anderen bösartigen Aktivitäten bergen. Deshalb ist Antwort B richtig.",
    },
    {
      quiz: {
        question:
          "Was ist der Hauptzweck von Datenschutzeinstellungen in sozialen Netzwerken?",
        answers: [
          "Kontrolle darüber, wer deine Daten sehen und nutzen kann.",
          "Um dein Profil zu bearbeiten",
          "Zum Zugang zu den Informationen deiner Posts",
          "Um auf die Daten deiner Follower zuzugreifen",
        ],
        showCorrectAnswer: true,
        correctAnswer: 0,
        onAnswerClick: onAnswerClick,
      },
      explanation:
        "Mit den Datenschutzeinstellungen kannst du deine Online-Präsenz verwalten, indem du festlegen, wer deine Beiträge, persönliche Informationen und Aktivitäten sehen kann. Deshalb ist Antwort A richtig. ",
    },
    {
      quiz: {
        question:
          "Welcher der folgenden Wege ist ein sicherer Weg, um sich an öffentlichen Orten mit dem Internet zu verbinden?",
        answers: [
          "Nutzung von kostenlosem Wi-Fi ohne Passwort.",
          "Verwendung mobiler Daten ",
          "Die Verwendung eines virtuellen privaten Netzwerks (VPN).",
          "Mit dem Hotsport eines Freundes verbinden ",
        ],
        showCorrectAnswer: true,
        correctAnswer: 2,
        onAnswerClick: onAnswerClick,
      },
      explanation:
        "Ein VPN verschlüsselt Ihre Internetverbindung und macht sie sicher und privat, auch wenn Sie öffentliche Wi-Fi-Netzwerke nutzen. Deshalb ist Antwort C richtig.",
    },
  ];

  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestionChange = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setShowHintCard(false);
  };

  return (
    <div className="flex flex-col xl:gap-8 2xl:mt-8 px-2 lg:px-4">
      <QuizList
        className="max-w-[1100px]"
        quizzes={quiz.map((q) => q.quiz)}
        onFinish={() => {
          router.push("/space/privatsphaere/perso/1");
        }}
        onNextQuestion={handleQuestionChange}
        achievement={AchievementId.PRIVATSPHAERE_QUIZ}
      />
      <div className="max-w-[400px]">
        {showHintCard && (
          <HintCard
            text={"Erklärung"}
            buttonText={"Anzeigen"}
            hint={quiz[currentQuestionIndex].explanation}
          />
        )}
      </div>
    </div>
  );
}
