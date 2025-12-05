import { HighScoreType } from "@/server/database/schema";
import { UserDataAchievement, UserService } from "@/services/user/UserService";
import { ApiEndpoints } from "@/lib/constants/endpoints";
import { apiFetch } from "@/lib/utils/fetch";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  isLocalStorageAvailable,
} from "@/lib/utils/storage";

type UserResponse = {
  userData: Array<{
    id: string;
    gameCode: string;
  }>;
};

type GetUserResponse = {
  id: number;
  userName: string;
  gameCode: string | null;
};

type HighScoreResponse = {
  highScore: number;
};

export class PersistUserService implements UserService {
  public userId: string | null = getLocalStorageItem("userId");

  constructor() {}

  async getUser(): Promise<GetUserResponse> {
    if (this.userId === null) {
      return Promise.reject("User not found.");
    }

    return apiFetch<GetUserResponse>(
      `${ApiEndpoints.USERS}?userId=${this.userId}`,
      { method: "GET" },
    );
  }

  async isLoggedIn(): Promise<boolean> {
    return Promise.resolve(
      isLocalStorageAvailable() && getLocalStorageItem("userId") !== null,
    );
  }

  async deleteUser(): Promise<void> {
    if (isLocalStorageAvailable()) {
      removeLocalStorageItem("gameCode");
      removeLocalStorageItem("userId");
    }
  }

  async createPlayer(
    username: string,
    mode: string,
    gameCode: string,
  ): Promise<void> {
    try {
      const result = await apiFetch<UserResponse>(ApiEndpoints.USERS, {
        method: "POST",
        body: { username, mode, gameCode },
      });

      if (isLocalStorageAvailable()) {
        setLocalStorageItem("userId", result.userData[0].id);

        if (gameCode !== "") {
          setLocalStorageItem("gameCode", result.userData[0].gameCode);
        }
      }
    } catch (error: unknown) {
      throw new Error("Failed to create user");
    }
  }

  async setAchievement(
    achievement: string,
    unlocked: boolean,
  ): Promise<boolean> {
    try {
      await apiFetch(ApiEndpoints.ACHIEVEMENTS, {
        method: "POST",
        body: {
          userId: this.userId,
          achievementEnum: achievement,
          unlocked: unlocked,
        },
      });
      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  async setHighScore(
    highScoreEnum: HighScoreType,
    highScore: number,
  ): Promise<boolean> {
    try {
      await apiFetch(ApiEndpoints.HIGHSCORES, {
        method: "PUT",
        body: {
          userId: this.userId,
          highScore: highScore,
          highScoreEnum: highScoreEnum,
        },
      });
      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  async getHighScore(highScoreEnum: HighScoreType): Promise<number | false> {
    try {
      const result = await apiFetch<HighScoreResponse>(
        `${ApiEndpoints.HIGHSCORES}?userId=${this.userId}&highScoreEnum=${highScoreEnum}`,
        { method: "GET" },
      );
      return result.highScore;
    } catch (error: unknown) {
      return false;
    }
  }

  async getAchievement(): Promise<UserDataAchievement[]> {
    try {
      const data = await apiFetch<UserDataAchievement | UserDataAchievement[]>(
        `${ApiEndpoints.ACHIEVEMENTS}?userId=${this.userId}`,
        { method: "GET" },
      );
      return Array.isArray(data) ? data : [data];
    } catch (error: unknown) {
      return [];
    }
  }
}
