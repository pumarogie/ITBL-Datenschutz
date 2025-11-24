import React from "react";
import { QuizParams } from "@/components/quiz/quiz";
import { State } from "@/app/(safespace)/space/daten-verarbeitung/kapitel2/components/recommendation-quiz";
import { generatePassword } from "./strength-helper";

export type PasswordData = {
  password: string;
  explanation: string;
};
export const topTenPasswords = [
  "123456789",
  "12345678",
  "hallo",
  "1234567890",
  "1234567",
  "password",
  "password1",
  "target123",
  "iloveyou",
  "gwerty123",
];

export const replaceCharacter = [
  "0 für O",
  "1 oder ! für I",
  "3 für E",
  "@ oder 4 für A",
  " $ oder 5 für S",
  " 6 oder 9 für G",
  " 7 für T",
  " 8 für B",
];

export const quizzes: QuizParams[] = [
  {
    question:
      "Ein Hacker möchte sich in deinen Social Media Account hacken. Häufig verwendete Passwörter werden zuerst geknackt. Welches der Passwörter ist am sichersten?",
    answers: ["123456789", "hallo", "iloveyou", "asdfgh"],
    hint: (
      <span>
        Liste der Top Ten deutscher Passwörter 2023:{" "}
        <a
          href="https://hpi.de/news/jahrgaenge/2023/123456789-ist-das-beliebteste-passwort-2023-in-deutschland.html"
          className="underline"
        >
          Siehe Link
        </a>{" "}
      </span>
    ),
    showCorrectAnswer: true,
    correctAnswer: 3,
  },
  {
    question:
      "Neben den häufigsten Passwörtern werden auch gängige Wiederholungs- oder Tastaturmuster, wie Zahlenfolgen überprüft. Dazu gehört ebenfalls das Hinzufügen einer Zahl oder eines Sonderzeichens am Anfang oder Ende eines sonst simplen Passwortes, oder das Austauschen eines Buchstabens mit einer Zahl oder einem ähnlichen Sonderzeichen. Welches der Passwörter ist am sichersten?",
    answers: ["Marie!", "asdfgh", "abcd1234", "h@llo"],
    hint: "Vermeide Wiederholungen und einfache Muster. Das Hinzufügen von Sonderzeichen verbessert die Sicherheit.",
    showCorrectAnswer: true,
    correctAnswer: 0,
  },
  {
    question:
      "Ein Freund von dir wurde bereits gehackt. Der Hacker kennt schon deinen Namen und dein Geburtsdatum. Welches der Passwörter ist am sichersten?",
    answers: ["Marie1234", "2008Marie", "SakPze69", "password1"],
    hint: "Verwende keine persönlichen Informationen wie deinen Namen oder Geburtsdatum in deinem Passwort.",
    showCorrectAnswer: true,
    correctAnswer: 2,
  },
  {
    question:
      "Der Hacker probiert es zudem mit einem Brute-Force-Angriff. Je länger das Passwort, desto besser. Achte immer darauf, dass dein Passwort aus mindestens 8 Zeichen besteht. Welches der Passwörter ist am sichersten?",
    answers: ["Saf45", "fT3nPajl98bn3", "se5PmsW", "Sj5Kf23eg"],
    hint: "Brute-Force-Angriff: Es werden systematisch alle möglichen Kombinationen ausprobiert. Je mehr Stellen das Passwort hat, desto mehr Möglichkeiten muss der Angreifer berücksichtigen.",
    showCorrectAnswer: true,
    correctAnswer: 1,
  },
  {
    question:
      "Je mehr unterschiedliche Zeichen du verwendest, desto sicherer ist dein Passwort gegen Brute-Force-Angriffe. Dazu gehören Kleinbuchstaben, Großbuchstaben, Zahlen und Sonderzeichen. Welches der Passwörter ist am sichersten?",
    answers: ["Ab1h3zu66", "a4spf(h2", "S#jfO:hPll", "R_9fh!P5Q+d"],
    hint: "Die Verwendung einer Mischung aus verschiedenen Zeichentypen erhöht die Sicherheit erheblich.",
    showCorrectAnswer: true,
    correctAnswer: 3,
  },
];

export const passwordData: PasswordData[] = generatePassword();
export const states: State[] = [
  {
    expression: "smiling",
    rotation: 0,
    text: "",
    style: {
      marginLeft: "calc(100% + 400px)",
    },
  },

  {
    expression: "smiling",
    rotation: 0,
    text:
      "Herzlichen Glückwunsch! Du hast gelernt, wie man sichere Passwörter erstell " +
      "und erkennt: mindestens 10 Zeichen lang und eine Mischung aus Kleinbuchstaben, " +
      "Großbuchstaben, Sonderzeichen und Zahlen.",
    style: {
      width: "150px",
      height: "150px",
    },
  },
  {
    expression: "smiling",
    rotation: 0,
    text:
      " Um deine Sicherheit weiter zu erhöhen, nutze die Zwei-Faktor-Authentifizierung " +
      "(2FA). Damit brauchst du zusätzlich zum Passwort einen Code, der dir über SMS " +
      "oder E-Mail zugesendet wird.",
    style: {
      width: "150px",
      height: "150px",
    },
  },
  {
    expression: "smiling",
    rotation: 0,
    text:
      "Außerdem solltest du niemals dasselbe Passwort für mehrere Konten verwenden. \n" +
      "Ein Passwort-Manager kann dir helfen, einzigartige und sichere Passwörter zu \n" +
      "erstellen. Bleib sicher!",
    style: {
      width: "150px",
      height: "150px",
    },
  },
  {
    expression: "smiling",
    rotation: 0,
    text: "",
    style: {
      width: "150px",
      height: "150px",
      marginRight: "calc(100% + 400px)",
    },
    delay: 3000,
    end: true,
  },
];

export const instruction =
  "Ein Passwort gilt nur als stark, wenn alle Kriterien erfüllt sind. Ist nur eine Bedingung falsch gilt das Passwort als mittel und ansonten als schwach. Du bekommst für jedes richtig eingeordnete Passwort einen Punkt. Falls du das Passwort falsch einordnest wird deine Punktzahl auf 0 zurückgesetzt.";
