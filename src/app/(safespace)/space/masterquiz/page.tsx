"use client";

import { useRouter } from "next/navigation";
import { QuizParams } from "@/components/quiz/quiz";
import QuizList from "@/components/quiz/quiz-list";
import { AchievementId } from "@/util/achievement-data";

const quizzes: QuizParams[] = [
  {
    question:
      "Wie solltest du dich nicht verhalten, wenn ein Fake-Profil mit dir Kontakt aufnehmen möchte?",
    answers: [
      "Freundschaftsanfrage annehmen und persönliche Daten teilen",
      "Profil blockieren",
      "Profil melden",
      "Freundschaftsanfrage ablehnen",
    ],
    correctAnswer: 0,
    showCorrectAnswer: true,
  },
  {
    question: "Was ist kein Anzeichen für ein echtes Profil?",
    answers: [
      "Verifizierung",
      "Viele Beiträge mit vielen Kommentaren",
      "Privates Profil einer bekannten Persönlichkeit",
      "Sehr viele Follower",
    ],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question:
      "Warum solltest du bei der Weitergabe deiner persönlichen Daten im Internet vorsichtig sein?",
    answers: [
      "Um Spam zu vermeiden",
      "Um Identitätsdiebstahl zu vermeiden",
      "Um die Internetflut zu reduzieren",
      "Um Speicherplatz zu sparen",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Welche der folgenden Methoden ist NICHT geeignet, um deine persönlichen Daten online zu schützen?",
    answers: [
      "Die Verwendung starker, eindeutiger Passwörter für verschiedene Konten",
      "Anklicken unbekannter Links",
      "Aktivieren der Zwei-Faktor-Authentifizierung",
      "Deine Software und Anwendungen auf dem neuesten Stand halten",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Was solltest du tun, wenn du den Verdacht hast, dass deine persönlichen Daten kompromittiert worden sind?",
    answers: [
      "Sofort deine Passwörter ändern",
      "Die Sache ignorieren und auf das Beste hoffen",
      "Alle deine Konten in sozialen Netzwerken löschen",
      "Es in sozialen Netzwerken posten",
    ],
    correctAnswer: 0,
    showCorrectAnswer: true,
  },
  {
    question: "Wie lang sollte dein Passwort mindestens sein?",
    answers: ["6 Zeichen", "7 Zeichen", "8 Zeichen", "9 Zeichen"],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question: "Welches der folgenden Passwörter ist am sichersten?",
    answers: ["Hbs4f6dk", "d0s3!dkq", "Ab!l_skt+", "nj§f6s+A"],
    correctAnswer: 3,
    showCorrectAnswer: true,
  },
  {
    question: "Was versteht man unter Datenverarbeitung?",
    answers: [
      "Die Speicherung deiner Daten auf deinem Gerät",
      "Die Analyse und Nutzung gesammelter Daten zur Erkennung von Mustern und Anpassung von Inhalten",
      "Die Löschung deiner Daten nach einer bestimmten Zeit",
      "Die Übertragung deiner Daten auf ein anderes Gerät",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Was solltest du tun, um deine Daten vor unbefugtem Zugriff zu schützen?",
    answers: [
      "Einfache Passwörter verwenden, die leicht zu merken sind",
      "Regelmäßig Software-Updates durchführen und sensible Daten verschlüsseln",
      "Alle deine Daten in sozialen Medien teilen",
      "Deine Passwörter mit Freunden teilen",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question: "Welche Rechte gibt dir die Datenschutz-Grundverordnung (DSGVO)?",
    answers: [
      "Das Recht, keine persönlichen Daten online zu teilen",
      "Das Recht auf kostenlose Produkte von Social Media-Plattformen",
      "Das Recht auf Auskunft über gespeicherte Daten und deren Löschung",
      "Das Recht, beliebige Daten anderer Nutzer zu sammeln und zu speichern",
    ],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question:
      "Welche Rechte hast du gemäß der DSGVO, wenn ein Unternehmen deine personenbezogenen Daten verarbeitet?",
    answers: [
      "Du hast das Recht, jederzeit eine Entschädigung zu verlangen.",
      "Du hast das Recht, das Unternehmen zu verklagen, wenn du keine Werbung erhältst.",
      "Du hast das Recht, die Verarbeitung deiner Daten ohne Angabe von Gründen zu stoppen.",
      "Du hast das Recht, jederzeit die Löschung deiner personenbezogenen Daten zu verlangen.",
    ],
    correctAnswer: 3,
    showCorrectAnswer: true,
  },
  {
    question:
      "Welche Maßnahmen sollten Social-Media-Plattformen ergreifen, um den Datenschutz ihrer Nutzer zu gewährleisten?",
    answers: [
      "Veröffentlichung aller Nutzerdaten für Transparenz.",
      "Sicherstellung, dass Nutzerdaten nur nach Zustimmung des Nutzers verarbeitet werden.",
      "Verkauf von Nutzerdaten an Drittunternehmen.",
      "Erlaubnis zur unbegrenzten Datenspeicherung ohne Benachrichtigung der Nutzer.",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Welches Recht hast du bezüglich der Verarbeitung deiner personenbezogenen Daten durch Social-Media-Unternehmen?",
    answers: [
      "Das Recht, alle deine Daten auf dem Profil eines anderen Nutzers anzuzeigen.",
      "Das Recht, eine vollständige Kopie aller deiner gespeicherten Daten zu erhalten.",
      "Das Recht, die Datenschutzbestimmungen zu ändern.",
      "Das Recht, das Unternehmen zu verpflichten, Werbung zu senden.",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Was kannst du tun, wenn du der Meinung bist, dass deine Datenschutzrechte verletzt wurden?",
    answers: [
      "Eine negative Bewertung auf der Webseite des Unternehmens hinterlassen.",
      "Eine Beschwerde bei der zuständigen Datenschutzbehörde einreichen.",
      "Die Datenschutzverletzung ignorieren und weitermachen.",
      "Eine Petition starten, um das Unternehmen zu schließen.",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
];

export default function MasterQuiz() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-center @container">
      <div className="w-full @4xl:w-1/2 mb-20">
        <QuizList
          quizzes={quizzes}
          onFinish={() => router.push("/space")}
          achievement={AchievementId.MASTER_QUIZ}
        />
      </div>
    </div>
  );
}
