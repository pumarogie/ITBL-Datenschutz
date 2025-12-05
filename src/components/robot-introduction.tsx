import Robot, { RobotExpression } from "@/components/robot/robot";
import React, { CSSProperties, useEffect, useState } from "react";
import clsx from "clsx";
import AnimatedText from "@/components/animated/animated-text";
import Button from "@/components/button";

type State = {
  expression?: RobotExpression;
  text?: string;
  style?: CSSProperties;
  rotation?: number;
};

const states: State[] = [
  {
    text: "",
    style: {
      right: "-100%",
    },
  },
  {
    text: "Hey! Ich bin AIRis.",
    expression: "resting",
  },
  {
    text: "Ich werde dich durch SafeSpace begleiten und immer wieder mal auftauchen.",
    expression: "smiling",
    rotation: -0.6,
  },
  {
    text: "Du befindest dich hier auf der Übersichtseite. Hier gelangst du zu allen Modulen, die du abschließen musst.",
  },
  {
    text: "Beginne zuerst mit dem Intro & Overview Modul, um dir einen Überblick in das Thema zu schaffen.",
  },
  {
    text: "Danach kannst du dich direkt in die übrigen Module stürzen. Du kannst dir frei aussuchen, womit du zuerst beginnen möchtest.",
  },
  {
    text: "Wenn du alle Module absolviert hast, kannst du dich an das Master Quiz an der linken Seite des Bildschirms wagen.",
    rotation: 0.5,
  },
  {
    text: "Und wenn du das geschafft hast, dann darfst du dich wahrlich Experte in Datenschutz und Social Media nennen!",
    expression: "smiling",
  },
  {
    text: "Ich halte dich gar nicht mehr länger auf! Los gehts!",
  },
  {
    text: "",
    style: {
      right: "-100%",
    },
  },
];

export default function RobotIntroduction({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [state, setState] = useState(0);
  useEffect(() => {
    if (visible) {
      setState(0);
      setTimeout(() => {
        setState(1);
      }, 200);
    }
  }, [visible]);

  function next() {
    if (state < states.length - 1) {
      setState(state + 1);
      if (state + 2 === states.length) {
        onClose();
      }
    }
  }

  return (
    <div
      className={clsx(
        "fixed w-full h-full top-0 left-0 z-10 transition-opacity duration-500",
        !visible && "opacity-0 pointer-events-none",
      )}
    >
      <div
        className="absolute z-10 w-full bottom-20 md:right-10 md:bottom-10 transition-all duration-700 p-4"
        style={states[state].style}
      >
        <div className="flex flex-col items-center md:items-end w-full">
          <div className="bg-white py-4 px-6 rounded-xl font-medium text-xl flex flex-col items-center md:items-end w-full md:max-w-[400px] text-center md:text-right">
            <AnimatedText>{states[state].text as string}</AnimatedText>
            <Button style="secondary" className="mt-4 !text-sm" onClick={next}>
              Weiter
            </Button>
          </div>
          <Robot
            expression={states[state].expression ?? "resting"}
            headRotation={states[state].rotation ?? 0}
            className="size-40"
          />
        </div>
      </div>
      <div className="w-full h-full bg-black opacity-20 transition-opacity pointer-events-none"></div>
    </div>
  );
}
