"use client";

import QuizList from "@/components/quiz/quiz-list";
import { QuizParams } from "@/components/quiz/quiz";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Robot from "@/components/robot/robot";
import Button from "@/components/button";
import { AchievementId } from "@/util/achievement-data";
import { useMessages } from "@/services/notification/message-provider";
import { PersistUserService } from "@/services/user/PersistUserService";
import { getUserService } from "@/services/user/UserService";

const quizzes: QuizParams[] = [
  {
    question:
      "Ein Foto von dir bei einem öffentlichen Sportereignis wird in einem lokalen Nachrichtenartikel verwendet, ohne dich um Erlaubnis zu bitten.",
    answers: [
      "Ja, das ist eine Verletzung meiner Rechte, weil: das Bild in einem kommerziellen Kontext ohne meine Zustimmung verwendet wurde, obwohl es häufig durch Allgemeine Geschäftsbedingungen (AGB) oder Teilnahmebedingungen bei Veranstaltungen geregelt ist, dass Bilder zu solchen Zwecken genutzt werden dürfen.",
      "Nein, das ist keine Verletzung meiner Rechte, weil: das Foto während einer öffentlichen Veranstaltung aufgenommen wurde und für Nachrichtenzwecke verwendet wird, was normalerweise als rechtlich zulässig gilt, insbesondere wenn es sich um eine Berichterstattung von öffentlichem Interesse handelt.",
      "Nein, das ist keine Verletzung meiner Rechte, weil: öffentliche Veranstaltungen in der Regel erlauben, dass Bilder der Teilnehmer für verschiedene Zwecke genutzt werden, einschließlich kommerzieller und redaktioneller Berichterstattung, ohne individuelle Einwilligung.",
      "Ja, das ist eine Verletzung meiner Rechte, weil: meine persönliche Zustimmung für jede Art von Veröffentlichung erforderlich ist, unabhängig vom Kontext oder der Art der Veranstaltung.",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      "Du hast in deinem privaten Instagram-Account ein Foto von einer Party gepostet, bei der auch Freunde von dir zu sehen sind. Ein Magazin nimmt das Bild ohne deine Zustimmung und verwendet es für einen Online-Artikel über Jugendpartys.",
    answers: [
      "Nein, das ist keine Verletzung meiner Rechte, weil: Inhalte, die online geteilt werden, automatisch für redaktionelle Zwecke genutzt werden dürfen, insbesondere wenn sie in einem öffentlichen Profil gepostet wurden.",
      "Ja, das ist eine Verletzung meiner Rechte, weil: alle abgebildeten Personen ihre Zustimmung zur Veröffentlichung in einem Magazin geben müssen, unabhängig davon, wo das Foto ursprünglich gepostet wurde.",
      "Nein, das ist keine Verletzung meiner Rechte, weil: das Foto auf einem sozialen Netzwerk geteilt wurde und daher als öffentlich zugänglich gilt.",
      "Ja, das ist eine Verletzung meiner Rechte, weil: das Magazin mein Bild ohne Zustimmung verwendet hat, was meine Urheberrechte und die Privatsphäre der abgebildeten Personen verletzt. ",
    ],
    correctAnswer: 3,
    showCorrectAnswer: true,
  },
  {
    question:
      "Du hattest einen privaten Chatverlauf mit einem Freund auf einer Messenger-App. Später bemerkst du, dass der Freund Screenshots dieses Chats auf einer öffentlichen Social-Media-Plattform geteilt hat.",
    answers: [
      "Nein, das ist keine Verletzung meiner Rechte, weil: der Freund hat das Recht, seine Nachrichten und Kommunikation zu teilen, wie er möchte.",
      "Ja, das ist eine Verletzung meiner Rechte, weil: Nachrichten in Messenger-Apps generell nie weitergegeben werden dürfen, selbst wenn beide Parteien zustimmen würden",
      "Ja, das ist eine Verletzung meiner Rechte, weil: private Nachrichten ohne Zustimmung des anderen Beteiligten nicht öffentlich geteilt werden dürfen. ",
      "Nein, das ist keine Verletzung meiner Rechte, weil: sobald Nachrichten gesendet werden, verliert der Absender die Kontrolle über deren Weiterverwendung.",
    ],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question:
      "Hast du das Recht, die Löschung dieser Informationen zu verlangen?",
    answers: [
      "Ja, ich habe das Recht, weil das Recht auf Vergessenwerden ermöglicht es Einzelpersonen, die Löschung persönlicher Daten zu verlangen, wenn diese Daten nicht mehr relevant sind oder ihre Veröffentlichung unangemessen ist.",
      "Nein, ich habe nicht das Recht, weil einmal im Internet veröffentlichte Informationen für immer zugänglich bleiben müssen.",
      "Ja, weil Daten, die das persönliche Ansehen schädigen können, sollten entfernt werden können.",
      "Nein, weil historische Daten von öffentlichem Interesse sind und erhalten bleiben müssen.",
    ],
    correctAnswer: 0,
    showCorrectAnswer: true,
  },
  {
    question:
      ": Du findest alte, peinliche Fotos und Beiträge von dir aus deiner Jugendzeit auf einer Suchmaschine. Du möchtest, dass diese Informationen aus den Suchergebnissen entfernt werden.",
    answers: [
      "Ja, ich habe das Recht, weil: jeder kann jederzeit verlangen, dass jegliche Informationen über sie aus dem Internet gelöscht werden, unabhängig von deren Relevanz oder Kontext.",
      "Nein, ich habe nicht das Recht, weil: einmal im Internet veröffentlichte Informationen für immer zugänglich bleiben müssen.",
      "Ja, ich habe das Recht, weil: das Recht auf Vergessenwerden ermöglicht es Einzelpersonen, die Löschung persönlicher Daten zu verlangen, wenn diese Daten nicht mehr relevant sind oder ihre Veröffentlichung unangemessen ist.",
      "Nein, ich habe nicht das Recht, weil: Suchmaschinen nicht verpflichtet sind, alte oder peinliche Inhalte aus ihren Ergebnissen zu entfernen, selbst wenn diese nicht mehr relevant sind.",
    ],
    correctAnswer: 2,
    showCorrectAnswer: true,
  },
  {
    question:
      "Du möchtest eine Selbstauskunft bei der Schufa anfordern, um zu sehen, welche Daten über dich gespeichert sind, aber die Schufa verweigert deine Anfrage.",
    answers: [
      "Ja, das ist rechtlich zulässig, weil Webseiten das Recht haben, ihre Interessen zu schützen und ihre Nutzeraktivitäten zu verfolgen.",
      "Nein, das ist nicht rechtlich zulässig, weil die Aktivierung von Cookies basierend auf 'legitimem Interesse' erfordert die aktive Zustimmung der Nutzer und darf nicht standardmäßig aktiviert sein.",
      "Ja, weil Nutzer durch die Nutzung der Webseite implizit zustimmen, dass ihre Daten genutzt werden dürfen.",
      "Nein, weil das EU-Recht eine klare und informierte Zustimmung für das Setzen von Cookies vorschreibt.",
    ],
    correctAnswer: 1,
    showCorrectAnswer: true,
  },
  {
    question:
      " Du möchtest eine Selbstauskunft bei der Schufa anfordern, um zu sehen, welche Daten über dich gespeichert sind, aber die Schufa verweigert deine Anfrage.",
    answers: [
      "Ja, sie dürfen das, weil: die Schufa das Recht hat, bestimmte Informationen zurückzuhalten, um ihren Dienst zu schützen.",
      "Nein, sie dürfen das nicht, weil: die Schufa gesetzlich verpflichtet ist, alle Anfragen von Privatpersonen innerhalb eines Monats zu beantworten.",
      "Ja, sie dürfen das, weil: die Schufa nur auf Anfrage von Banken und Unternehmen Auskünfte erteilen muss, nicht an Privatpersonen.",
      "Nein, sie dürfen das nicht, weil: jeder Bürger das Recht hat, einmal jährlich eine kostenlose Selbstauskunft zu erhalten, um die über ihn gespeicherten Daten zu überprüfen. ",
    ],
    correctAnswer: 0,
    showCorrectAnswer: true,
  },
];

export default function DataProtectionChapter1Quiz() {
  const [moduleFinished, setModuleFinished] = useState(false);
  const messageService = useMessages();
  const router = useRouter();
  return (
    <>
      {moduleFinished ? (
        <div className="flex flex-col items-center text-center gap-6 md:mt-6">
          <span className="text-5xl text-blue-background">Gut gemacht!</span>
          <Robot expression="smiling" />
          <span className="max-w-[600px]">
            Du hast das Modul erfolgreich abgeschlossen!
          </span>
          <Button
            onClick={() => {
              const userService = getUserService();
              userService
                .setAchievement(AchievementId.MEINE_RECHTE_FINISHED, true)
                .then(() => {
                  messageService.showAchievement(
                    AchievementId.MEINE_RECHTE_FINISHED,
                  );
                });
              setTimeout(() => {
                router.push("/space");
              }, 3500);
            }}
          >
            Zurück zur Startseite
          </Button>
        </div>
      ) : (
        <QuizList
          quizzes={quizzes}
          onFinish={() => {
            setModuleFinished(true);
          }}
          achievement={AchievementId.RECHTSANWALT_INPUT}
        />
      )}
    </>
  );
}
