import { AchievementId } from "@/util/achievement-data";
import { useMessages } from "@/services/notification/message-provider";
import { getUserService } from "@/services/user/UserService";
import { ApiEndpoints } from "@/lib/constants/endpoints";

export const getFeedback = async (
  situation: string,
  userInput: string,
  solution: string,
): Promise<string> => {
  const response = await fetch(ApiEndpoints.ANSWERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ situation, userInput, solution }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch answer");
  }
  return await response.json();
};

export default getFeedback;

export function extractScoreAndReason(str: string) {
  const trimmedStr = str.slice(1, -1);

  const scoreIndex = trimmedStr.indexOf("score:");
  const reasonIndex = trimmedStr.indexOf("reason:");
  const scoreStr = trimmedStr.substring(scoreIndex + 6, reasonIndex).trim();
  const score = parseInt(scoreStr, 10);
  const reasonStr = trimmedStr.substring(reasonIndex + 7).trim();

  return { score, reason: reasonStr };
}

export async function showAchievementRightInput(
  answers: Array<{ score: number; reason: string }>,
  questionLength: number,
  messageService: ReturnType<typeof useMessages>,
) {
  const currentScore: number = answers
    .map((a) => a.score)
    .reduce((acc, val) => acc + val, 0);
  if (currentScore / (questionLength * 10) > 0) {
    const userService = getUserService();
    await userService
      .setAchievement(AchievementId.RECHTSANWALT_INPUT, true)
      .then(() => {
        messageService.showAchievement(AchievementId.RECHTSANWALT_INPUT);
      });
    await userService
      .setAchievement(AchievementId.MEINE_RECHTE_FINISHED, true)
      .then(() =>
        messageService.showAchievement(AchievementId.MEINE_RECHTE_FINISHED),
      );
  }
  return null;
}
