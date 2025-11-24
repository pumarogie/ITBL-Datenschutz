"use client";
import Image from "next/image";
import { useState } from "react";
import Task from "@/components/task";
import Button from "@/components/button";
import clsx from "clsx";
import { useMessages } from "@/services/notification/message-provider";
import { useRouter } from "next/navigation";
import { AchievementId } from "@/util/achievement-data";
import { CheckCircle, Info } from "@phosphor-icons/react";
import TagList from "@/app/(safespace)/space/daten-verarbeitung/kapitel2/analyse/components/tag-list";
import { getUserService } from "@/services/user/UserService";

type Item = {
  img: string;
  text: string;
  attributes: string[];
  isSuccessful?: boolean;
};

const items: Item[] = [
  {
    img: "/datenverarbeitung/analyse/level1/correct_advertisement4.jpg",
    text: "Cafe GLONDJAD",
    attributes: ["Kaffee", "Bar", "Musik", "Chillen", "Treffen", "Stadt"],
    isSuccessful: true,
  },
  {
    img: "/datenverarbeitung/analyse/level1/correct_advertisement6.jpg",
    text: "MayStreem - Kostenlos Musik und Podcasts streamen!",
    attributes: ["Musik", "Streaming", "Abo", "App", "Handy", "Artists"],
    isSuccessful: true,
  },
  {
    img: "/datenverarbeitung/analyse/level1/incorrect_advertisement4.jpg",
    text: "Web Programmierkurs - Jetzt starten!",
    attributes: ["Programmieren", "Computer", "Technik", "Javascript", "Web"],
    isSuccessful: false,
  },
  {
    img: "/datenverarbeitung/analyse/level1/correct_advertisement5.jpg",
    text: "JLB New Sound X2",
    attributes: ["Musik", "Headphones", "Black", "HiFi", "Sound"],
    isSuccessful: true,
  },
  {
    img: "/datenverarbeitung/analyse/level1/correct_advertisement3.jpg",
    text: "Neueröffnung Schuhstore Hype",
    attributes: ["Sneaker", "Schuhe", "Shoppen", "Bunt", "Hype", "Stadt"],
    isSuccessful: true,
  },
  {
    img: "/datenverarbeitung/analyse/level1/correct_advertisement1.jpg",
    text: "Hundezubehör GmbH",
    attributes: ["Essen", "Hunde", "Spielzeug", "Tier", "Wasserschale"],
    isSuccessful: true,
  },
  {
    img: "/datenverarbeitung/analyse/level1/incorrect_advertisement2.jpg",
    text: "VVW - Volleyball Verein Wolfsburg",
    attributes: ["Volleyball", "Sport", "Verein", "Team", "Sommer"],
    isSuccessful: false,
  },
  {
    img: "/datenverarbeitung/analyse/level1/incorrect_advertisement5.jpg",
    text: "Aktienboom! Investiere in diese Unternehmen.",
    attributes: ["Aktien", "Investment", "Geld", "Stocks", "DAX"],
    isSuccessful: false,
  },
  {
    img: "/datenverarbeitung/analyse/level1/incorrect_advertisement6.jpg",
    text: "Autocar - Ausbildung zum Mechatroniker",
    attributes: ["Ausbildung", "Schule", "Autos", "BMW", "Porsche"],
    isSuccessful: false,
  },
  {
    img: "/datenverarbeitung/analyse/level1/incorrect_advertisement1.jpg",
    text: "Kinderwagen Babyroller 20 - Jetzt 50% Rabatt",
    attributes: ["Baby", "Kindersitten", "Kinderwagen"],
    isSuccessful: false,
  },
  {
    img: "/datenverarbeitung/analyse/level1/correct_advertisement2.jpg",
    text: "Entdecke die Technische Universität Bichelheim!",
    attributes: [
      "Studieren",
      "Universität",
      "Mathe",
      "Technik",
      "Studium",
      "Schule",
    ],
    isSuccessful: true,
  },
  {
    img: "/datenverarbeitung/analyse/level1/incorrect_advertisement3.jpg",
    text: "RäpX364 - Neue Single",
    attributes: ["Musik", "Rap", "RnB"],
    isSuccessful: false,
  },
];

function Item({
  img,
  text,
  attributes,
  onClick,
  selected,
}: Item & { onClick: () => void; selected?: boolean }) {
  return (
    <div
      className={clsx(
        "bg-blue-100 p-4 rounded-xl cursor-pointer flex flex-col",
        selected ? "gap-2" : "gap-6",
      )}
      key={text}
      onClick={() => onClick()}
    >
      <Image
        src={img}
        alt={text}
        width="200"
        height="200"
        className={clsx(
          "w-full object-cover rounded-xl",
          selected ? "h-24" : "h-32",
        )}
        priority
      />
      <div className="flex flex-col gap-2">
        <span
          className={clsx(
            "font-medium flex items-center gap-2",
            selected ? "text-md" : "text-xl",
          )}
        >
          {selected && <CheckCircle weight="fill" />}
          {text}
        </span>
        <div className="flex gap-2 flex-wrap">
          {attributes.map((a) => (
            <span
              className={clsx(
                "bg-blue-200 text-blue-900 py-1 px-3 rounded-full",
                selected ? "text-xs" : "text-sm",
              )}
              key={a}
            >
              #{a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DataProcessingPart1() {
  const [selected, setSelected] = useState<Item[]>([]);
  const [success, setSuccess] = useState(false);
  const [showData, setShowData] = useState(false);
  const { addMessage } = useMessages();
  const router = useRouter();

  function selectItem(item: Item) {
    if (success) return;
    if (selected.includes(item)) {
      setSelected((selected) => selected.filter((s) => s != item));
    } else {
      setSelected((selected) => [item, ...selected]);
    }
  }

  async function next() {
    const context = getUserService();
    await context.setAchievement(
      AchievementId.DATA_PROCESSING_CHECKPOINT_COLLECT,
      true,
    );
    router.push("/space/daten-verarbeitung/recap");
  }

  function checkSuccess() {
    const truePos = selected.filter((item) => item.isSuccessful).length;
    const falsePos = selected.filter((item) => !item.isSuccessful).length;

    const totalPos = items.filter((item) => item.isSuccessful).length;
    const totalNeg = items.filter((item) => !item.isSuccessful).length;
    if (truePos == totalPos && falsePos == 0) {
      setSuccess(true);
      addMessage(
        "Super! Du hast alle Anzeigen gefunden, die bei Marie besonders gut ankommen können.",
        "success",
      );
    } else {
      if (falsePos > 0) {
        addMessage(
          "Du hast Anzeigen ausgewählt, die bei Marie vermutlich nicht gut ankommen.",
          "error",
        );
      } else {
        addMessage(
          "Es fehlen noch einige Anzeigen, die Marie gefallen könnten.",
          "error",
        );
      }
    }
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto h-full items-center relative">
      <TagList show={showData} onClose={() => setShowData(false)} />
      {!success && (
        <div className="flex items-center gap-4 w-full">
          <Task>Wähle alle Werbeanzeigen aus, die Marie gefallen könnten.</Task>
          <Button style="secondary" onClick={() => setShowData(true)}>
            <Info weight="fill" className="mr-4" /> Gesammelte Daten
          </Button>
          <Button onClick={checkSuccess}>Erfolg prüfen</Button>
        </div>
      )}

      {success && (
        <Button className="my-6" onClick={next}>
          Weiter
        </Button>
      )}

      <div className="flex gap-8 justify-evenly w-full">
        {!success && (
          <div className="w-full flex flex-col gap-8 items-center">
            <span className="text-2xl font-semibold mb-8 inline-block">
              Alle Werbeanzeigen
            </span>
            <div className="grid grid-cols-1 auto-rows-min 2xl:grid-cols-2 w-full gap-4 max-w-[800px]">
              {items
                .filter((item) => !selected.includes(item))
                .map((item) => (
                  <Item
                    key={item.img}
                    {...item}
                    onClick={() => selectItem(item)}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="w-full flex flex-col gap-8 items-center">
          <span className="text-2xl font-semibold inline-flex items-center gap-4">
            <CheckCircle weight="fill" /> Erfolgreiche Werbeanzeigen (
            {selected.length})
          </span>
          <div className="grid grid-cols-1 auto-rows-min 2xl:grid-cols-2 w-full gap-4 max-w-[800px]">
            {selected.map((item, i) => (
              <Item
                key={item.img}
                {...item}
                onClick={() => selectItem(item)}
                selected
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
