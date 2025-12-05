"use client";

import ExerciseLink from "@/components/exercise-link";
import React, { useEffect, useState } from "react";
import { AchievementId } from "@/util/achievement-data";
import { getUserService } from "@/services/user/UserService";

const exerciseLinksData = [
  {
    slug: "/space/intro",
    text: "Intro & Overview",
    imageSrc: "/intro.png",
    description:
      "Hier bekommst du einen generellen Überblick in das Thema Datenschutz",
    unlocked: true,
    finishedAchievement: AchievementId.INTRO_FINISHED,
  },
  {
    slug: "/space/passwort",
    text: "Passwort Sicherheit",
    imageSrc: "/passwort.png",
    description:
      "Hier lernst du was ein sicheres Passwort ausmacht und worauf du achten solltest, wenn du dir ein neues Passwort ausdenkst",
    finishedAchievement: AchievementId.PASSWORT_FINISHED,
  },
  {
    slug: "/space/privatsphaere",
    text: "Privatsphäre",
    imageSrc: "/privacy.png",
    description:
      "Hier lernst du was genau personenbezogene Daten sind und warum du sie besser schützen solltest.",
    finishedAchievement: AchievementId.PRIVATSPHAERE_FINISHED,
  },
  {
    slug: "/space/daten-verarbeitung",
    text: "Daten Verarbeitung",
    imageSrc: "/data-processing.png",
    description:
      "Hier lernst du wie deine persönlichen Daten verarbeitet werden und was man alles aus ihnen herauslesen kann.",
    finishedAchievement: AchievementId.DATENVERARBEITUNG_FINISHED,
  },
  {
    slug: "/space/phishing",
    text: "Phishing",
    imageSrc: "/phishing.png",
    description:
      "Hier lernst du, wie du Fake oder Phishing Profile von echten Profilen unterscheiden kannst.",
    finishedAchievement: AchievementId.PHISHING_FINISHED,
  },
  {
    slug: "/space/rechte",
    text: "Meine Rechte",
    imageSrc: "/rights.png",
    description:
      "Hier lernst du, welche Rechte du hast und wie du sie geltend machen kannst.",
    finishedAchievement: AchievementId.MEINE_RECHTE_FINISHED,
  },
];

export function ExerciseNavigation() {
  const [modulesUnlocked, setModulesUnlocked] = useState(true);
  const [modulesFinished, setModulesFinished] = useState<string[]>([]);
  const sorted = [...exerciseLinksData].sort((a, b) => {
    const aFinished = modulesFinished.includes(a.finishedAchievement);
    const bFinished = modulesFinished.includes(b.finishedAchievement);
    return aFinished && !bFinished ? 1 : !aFinished && bFinished ? -1 : 0;
  });

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const userService = getUserService();
        const fetchedAchievements = await userService.getAchievement();
        const achievements = Array.isArray(fetchedAchievements)
          ? fetchedAchievements
          : [fetchedAchievements];

        setModulesFinished(
          achievements
            .map((a) => a.achievementEnum)
            .filter((a) => a.endsWith("FINISHED")),
        );

        if (
          !achievements.find(
            (a) => a.achievementEnum === AchievementId.INTRO_FINISHED,
          )
        ) {
          setModulesUnlocked(false);
        }
      } catch {}
    }
    fetchAchievements().then();
  }, []);

  return (
    <div className="h-full">
      <h1 className="text-blue-background text-lg md:text-l lg:text-2xl xl:text-4xl max-h-[60px] font-extrabold mb-2 px-6">
        Sicher unterwegs in sozialen Medien
      </h1>
      <div className="flex flex-col h-reduced-40 justify-center overflow-y-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 h-full">
          {sorted.map(
            (
              {
                slug,
                text,
                imageSrc,
                description,
                unlocked,
                finishedAchievement,
              },
              index,
            ) => (
              <ExerciseLink
                key={index}
                slug={slug}
                text={text}
                imageSrc={imageSrc}
                description={description}
                unlocked={unlocked || modulesUnlocked}
                finished={modulesFinished.includes(finishedAchievement)}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
