"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Button from "@/components/button";
import clsx from "clsx";
import { HintCard } from "@/components/hint-card";
import Robot from "@/components/robot/robot";
import { AchievementId } from "@/util/achievement-data";
import { useMessages } from "@/services/notification/message-provider";
import { Question } from "@phosphor-icons/react";
import Task from "@/components/task";
import { getUserService } from "@/services/user/UserService";

type Field = {
  id: string;
  article: string;
  explanation: string;
  title: string;
  socialMediaExample: string;
};

const dsgvoArticles: Field[] = [
  {
    id: "info",
    article: "Art. 13 und 14 DSGVO",
    title: "Recht auf Information ",
    explanation:
      "Sie haben das Recht, zu erfahren, wer Ihre Daten verarbeitet und zu welchem Zweck, sowie welche Datenkategorien betroffen sind und wie lange die Daten gespeichert werden.",
    socialMediaExample:
      "Social Media Plattformen müssen klar darüber informieren, welche Daten sie sammeln, wie diese Daten verwendet werden und an wen sie weitergegeben werden.",
  },
  {
    id: "access",
    article: "Art. 15 DSGVO",
    title: "Recht auf Auskunft",
    explanation:
      "Sie können von einem Unternehmen oder einer Organisation eine Bestätigung verlangen, ob personenbezogene Daten von Ihnen verarbeitet werden. Sie haben auch das Recht auf eine Kopie dieser Daten.",
    socialMediaExample:
      "Sie können bei Social Media Plattformen anfragen, welche personenbezogenen Daten über Sie gespeichert sind. Plattformen wie Facebook, Twitter und Instagram bieten Mechanismen, um diese Informationen abzurufen.",
  },
  {
    id: "rectification",
    article: "Art. 16 DSGVO",
    title: "Recht auf Berichtigung",
    explanation:
      "Sie können die Berichtigung falscher oder unvollständiger personenbezogener Daten verlangen.",
    socialMediaExample:
      "Sie können die Korrektur falscher Informationen auf Ihrem Social Media Profil verlangen.",
  },
  {
    id: "deletion",
    article: "Art. 17 DSGVO",
    title: "Recht auf Löschung (Recht auf Vergessenwerden)",
    explanation:
      "Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, wenn bestimmte Bedingungen erfüllt sind, z.B. wenn die Daten nicht mehr für die Zwecke benötigt werden, für die sie erhoben wurden.",
    socialMediaExample:
      "Sie können die Löschung Ihres Accounts und der damit verbundenen Daten verlangen. Plattformen müssen diesem Wunsch nachkommen, es sei denn, es bestehen rechtliche Gründe für die Aufbewahrung der Daten.",
  },
  {
    id: "restriction",
    article: "Art. 18 DSGVO",
    title: "Recht auf Einschränkung der Verarbeitung",
    explanation:
      "Sie können die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen, wenn bestimmte Voraussetzungen vorliegen, z.B. wenn die Richtigkeit der Daten von Ihnen bestritten wird.",
    socialMediaExample:
      "Sie können die Einschränkung der Nutzung Ihrer Daten durch Social Media Plattformen verlangen, z.B. wenn die Daten nicht korrekt sind oder die Verarbeitung unrechtmäßig ist.",
  },
  {
    id: "portability",
    article: "Art. 20 DSGVO",
    title: "Recht auf Datenübertragbarkeit",
    explanation:
      "Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen zu übermitteln.",
    socialMediaExample:
      "Sie haben das Recht, Ihre Social Media Daten von einer Plattform zur anderen zu übertragen. Einige Plattformen bieten Exportfunktionen für Ihre Daten an.",
  },
  {
    id: "objection",
    article: "Art. 21 DSGVO",
    title: "Widerspruchsrecht",
    explanation:
      "Sie können der Verarbeitung Ihrer personenbezogenen Daten widersprechen, wenn diese auf berechtigten Interessen des Verantwortlichen oder für Direktwerbung erfolgt.",
    socialMediaExample:
      "Sie können der Nutzung Ihrer Daten für bestimmte Zwecke widersprechen, z.B. für personalisierte Werbung oder andere Marketingmaßnahmen.",
  },
  {
    id: "automated",
    article: "Art. 22 DSGVO",
    title:
      "Recht, nicht einer automatisierten Entscheidung unterworfen zu werden",
    explanation:
      "Sie haben das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung beruhenden Entscheidung unterworfen zu werden, die rechtliche oder ähnlich erhebliche Auswirkungen auf Sie hat.",
    socialMediaExample:
      "Wenn Sie der Verarbeitung Ihrer Daten durch eine Social Media Plattform zugestimmt haben, können Sie diese Einwilligung jederzeit widerrufen.",
  },
  {
    id: "complaint",
    article: "Art. 77 DSGVO",
    title: "Recht auf Beschwerde bei einer Aufsichtsbehörde",
    explanation:
      "Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren.",
    socialMediaExample:
      "Wenn Sie der Meinung sind, dass Ihre Datenschutzrechte von einer Social Media Plattform verletzt wurden, können Sie sich bei der zuständigen Datenschutzaufsichtsbehörde beschweren.",
  },
];

const instruction =
  "Ordne jede der oben aufgeführten Aussagen jeweils einem Artikel der Datenschutzgrundverordnung (DSGVO) zu. Ziehe die einzelnen Aussagen aus dem Wörter-Pool und lege sie in das entsprechende Kästchen des Artikels. Um dir die Erklärungen der Artikel anzeigen zu lassen kannst du auf das Fragezeichen klicken.";

function shuffleArray(array: string[]) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

type Column = {
  id: string;
  items: string[];
};

const initialColumns: { [key: string]: Column } = {
  wordsPool: { id: "wordsPool", items: [] },
  ...dsgvoArticles.reduce(
    (acc, article) => {
      acc[article.id] = { id: article.id, items: [] };
      return acc;
    },
    {} as { [key: string]: Column },
  ),
};

export default function Profiling() {
  const router = useRouter();
  const messageService = useMessages();
  const [columns, setColumns] = useState(initialColumns);
  const [wrongAnimation, setWrongAnimation] = useState(false);
  const [incorrectItems, setIncorrectItems] = useState<{
    [key: string]: string[];
  }>({});
  const [moduleFinished, setModuleFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState("");
  const [firstTry, setFirstTry] = useState(true);
  const [instructionsRead, setInstructionsRead] = useState(false);

  useEffect(() => {
    const shuffledItems = shuffleArray(
      dsgvoArticles.map((a) => a.socialMediaExample),
    );
    setColumns({
      ...initialColumns,
      wordsPool: { id: "wordsPool", items: shuffledItems },
    });
  }, []);

  const handleFinish = async () => {
    const articleExampleMap = dsgvoArticles.reduce(
      (acc, article) => {
        acc[article.id] = article.socialMediaExample;
        return acc;
      },
      {} as { [key: string]: string },
    );

    const newIncorrectItems: { [key: string]: string[] } = {};

    let isFinished = true;
    Object.keys(columns).forEach((columnId) => {
      if (columnId === "wordsPool") {
        return true;
      }
      const column = columns[columnId];
      const isCorrect = column.items[0] === articleExampleMap[columnId];
      if (!isCorrect) {
        newIncorrectItems[columnId] = column.items;
        isFinished = false;
      }
      return isCorrect;
    });

    setIncorrectItems(newIncorrectItems);

    if (isFinished) {
      if (firstTry) {
        const userService = getUserService();
        await userService
          .setAchievement(AchievementId.RECHTSANWALT, true)
          .then(() => {
            messageService.showAchievement(AchievementId.RECHTSANWALT);
          });
      }
      setModuleFinished(true);
    } else {
      setFirstTry(false);
      messageService.addMessage(
        "Leider hast du nicht alle Aussagen richtig gematcht. Versuchs nochmal!",
        "error",
      );
      setWrongAnimation(true);
      setTimeout(() => setWrongAnimation(false), 700);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = Array.from(sourceColumn.items);
    const destItems = Array.from(destColumn.items);
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      });
    } else {
      if (destColumn.items.length >= 1 && destColumn.id !== "wordsPool") {
        const [destRemoved] = destItems.splice(0, 1);
        destItems.splice(destination.index, 0, removed);
        sourceItems.splice(source.index, 0, destRemoved);

        setColumns({
          ...columns,
          [source.droppableId]: { ...sourceColumn, items: sourceItems },
          [destination.droppableId]: { ...destColumn, items: destItems },
        });
      } else {
        destItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: { ...sourceColumn, items: sourceItems },
          [destination.droppableId]: { ...destColumn, items: destItems },
        });
      }
    }
  };

  const handleExplanationClick = (columnId: string) => {
    if (instructionsRead) {
      showExplanation === columnId
        ? setShowExplanation("")
        : setShowExplanation(columnId);
    }
  };

  return (
    <React.Fragment>
      {moduleFinished ? (
        <div className="flex flex-col items-center text-center gap-6 md:mt-6">
          <span className="text-5xl text-blue-background">Gut gemacht!</span>
          <Robot expression="smiling" />
          <span className="max-w-[600px]">
            {" "}
            Du hast alle Aussagen den richtigen Artiklen der
            Datenschutzgrundverordnung zugeordnet.
          </span>
          <Button onClick={() => router.push("/space/rechte/intro")}>
            Weiter
          </Button>
        </div>
      ) : (
        <div>
          {!instructionsRead && (
            <div className="p-2 flex flex-col gap-4 lg:mb-4 max-w-[1100px]">
              <Task>{instruction}</Task>
              <Button
                onClick={() => setInstructionsRead(true)}
                className="max-w-[150px]"
              >
                Starten
              </Button>
            </div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.wordsPool.items.length != 0 && (
              <Droppable droppableId="wordsPool">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={clsx(
                      "p-2 flex flex-wrap gap-x-4 gap-y-2 mb-4 w-full",
                      !instructionsRead && "opacity-60",
                    )}
                  >
                    {columns.wordsPool.items.map((item, index) => (
                      <Draggable
                        key={item}
                        draggableId={item}
                        index={index}
                        isDragDisabled={!instructionsRead}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 text-blue-background bg-module-blue rounded-xl text-xs sm:text-sm lg:text-base lg:max-w-[49%] 2xl:max-w-[32%]"
                          >
                            {instructionsRead
                              ? item
                              : item.substring(0, 25) + "..."}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
            <div className={clsx(!instructionsRead && "opacity-60")}>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-y-5">
                {Object.entries(columns)
                  .filter(([columnId]) => columnId !== "wordsPool")
                  .map(([columnId, column]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="min-h-[10vh] flex flex-col justify-start"
                        >
                          <div className="flex space-between flex-col">
                            <span
                              onClick={() => handleExplanationClick(columnId)}
                              className={clsx(
                                "flex justify-between items-center min-h-[45px] lg:min-h-[56px]",
                                instructionsRead && "hover:cursor-pointer",
                              )}
                            >
                              <h3
                                className={clsx(
                                  "text-sm lg:text-lg text-blue-background font-medium",
                                  instructionsRead &&
                                    "hover:underline hoverunderline-offset-3 max-w-[93%]",
                                )}
                              >
                                {
                                  dsgvoArticles.find((a) => a.id === column.id)
                                    ?.title
                                }
                              </h3>
                              <Question
                                weight="fill"
                                size={25}
                                color="#FB6D3A"
                              />
                            </span>
                            {showExplanation === columnId && (
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-700">
                                  {
                                    dsgvoArticles.find(
                                      (a) => a.id === column.id,
                                    )?.article
                                  }
                                </span>

                                <span className="text-gray-700 text-sm mb-2">
                                  {
                                    dsgvoArticles.find(
                                      (a) => a.id === column.id,
                                    )?.explanation
                                  }
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="py-2 px-4 border-gray-300 border-2 rounded-2xl min-h-[10vh]">
                            {column.items.map((item, index) => (
                              <Draggable
                                key={item}
                                draggableId={item}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={clsx(
                                      "p-2 bg-module-blue text-blue-background rounded-xl text-xs sm:text-sm lg:text-base",
                                      wrongAnimation &&
                                        incorrectItems[columnId]?.includes(
                                          item,
                                        ) &&
                                        "animate-shake text-white bg-red-500",
                                    )}
                                  >
                                    {item}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  ))}
              </div>
              {instructionsRead && (
                <div className="flex justify-between">
                  <div>
                    <Button
                      className="min-w-[150px] mt-6"
                      onClick={() => handleFinish()}
                      style={
                        columns.wordsPool.items.length == 0
                          ? "default"
                          : "neutral"
                      }
                      disabled={columns.wordsPool.items.length != 0}
                    >
                      {columns.wordsPool.items.length == 0
                        ? "Überprüfen"
                        : "noch " +
                          columns.wordsPool.items.length +
                          "/" +
                          dsgvoArticles.length +
                          "zuordnen"}
                    </Button>
                  </div>
                  <HintCard
                    text={"Was muss ich machen?"}
                    buttonText={"Aufgabe anzeigen"}
                    hint={instruction}
                    className="max-w-[250px] sm:max-w-[400px] ml-2 mt-8 flex-end p-2"
                  />
                </div>
              )}
            </div>
          </DragDropContext>
        </div>
      )}
    </React.Fragment>
  );
}
