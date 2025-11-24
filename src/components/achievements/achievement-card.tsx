"use client";

import Button from "@/components/button";
import clsx from "clsx";
import { Star } from "@phosphor-icons/react";
import { Achievement } from "@/util/achievement-data";

export default function AchievementCard({
  title,
  description,
  icon,
  progress,
  className,
}: Achievement & { className?: string | undefined }) {
  const achievementCardStyle = clsx(
    "flex flex-col items-center p-8 pb-6 rounded-3xl h-full w-full",
    progress ? "border-2 border-orange-400 bg-orange-50" : "bg-gray-100",
  );
  const achievementIconCardStyle = clsx(
    "rounded-full w-12 h-12 mb-[-20px] z-10 shrink-0",
    progress ? "border-2 border-orange-400 bg-orange-200" : "bg-gray-200",
  );
  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <div className={achievementIconCardStyle}>
        {icon ? (
          <span className={progress ? "text-[rgb(249,115,22)]" : "text-[gray]"}>
            {icon}
          </span>
        ) : (
          <Star
            color={progress ? "rgb(249 115 22)" : "gray"}
            weight="fill"
            className="w-full h-full p-3"
          />
        )}
      </div>
      <div className={achievementCardStyle}>
        <h3 className="text-xl font-medium text-blue-900 pb-4 text-center">
          {title}
        </h3>
        <p className="pb-4 h-full text-center">{description}</p>
        <Button
          className={clsx("w-full", !progress && "!bg-gray-400")}
          disabled={!progress}
        >
          {progress ? "Geschafft!" : "Noch nicht freigeschaltet"}
        </Button>
      </div>
    </div>
  );
}
