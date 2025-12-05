"use client";

import AchievementCard from "@/components/achievements/achievement-card";
import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/progress-bar";
import { Achievement, AchievementData } from "@/util/achievement-data";
import { getUserService } from "@/services/user/UserService";

export type ReturnAchievement = {
  achievementEnum: string;
  isAchieved: boolean;
  userId: string;
};

export default function Achievements() {
  const [progress, setProgress] = useState(0.6);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const context = getUserService();
      const achievementData = await context.getAchievement();
      const fetchedAchievements = AchievementData.achievements
        .map(
          (a) =>
            ({
              ...a,
              progress: getProgress(achievementData, a.id),
            }) as Achievement,
        )
        .sort((a, b) => {
          if (a.progress && !b.progress) {
            return -1; // Show achieved first
          } else if (b.progress && !a.progress) {
            return 1;
          } else {
            return 0;
          }
        });
      setAchievements(fetchedAchievements);
      setProgress(
        fetchedAchievements.filter((a) => a.progress).length /
          AchievementData.achievements.length,
      );
    };

    fetchData();
  }, []);

  function getProgress(
    userData: ReturnAchievement[] | ReturnAchievement,
    achievementId: string,
  ) {
    if (!Array.isArray(userData)) {
      return false;
    }
    return (
      userData.find((u) => u.achievementEnum === achievementId)?.isAchieved ??
      false
    );
  }
  const steps = [
    {
      progress: 0.8,
      text: "Master Quiz",
      icon: "star.svg",
    },
  ];
  return (
    <div className="px-8 overflow-y-auto h-full">
      <h1 className="text-sky-900 text-4xl font-extrabold mt-2 mb-2">
        Dein Fortschritt
      </h1>
      <div className="flex gap-4 pt-12 pb-8">
        <ProgressBar progress={progress} steps={steps} />
      </div>
      <h3 className="text-sky-background text-3xl font-bold text-sky-900 pb-8">
        Erfolge
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {achievements.map((a) => (
          <AchievementCard
            key={a.title}
            id={a.id}
            title={a.title}
            icon={a.icon}
            description={a.description}
            progress={a.progress}
          />
        ))}
      </div>
    </div>
  );
}
