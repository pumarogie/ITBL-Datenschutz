import {
  User,
  UserDataAchievement,
  UserService,
} from "@/services/user/UserService";
import { HighScoreType } from "@/server/database/schema";
import { fromBase64, toBase64 } from "@/util/base64";

type UserData = {
  userName: string;
  achievements: UserDataAchievement[];
  highscores: {
    [key: string]: number;
  };
};

const KEY_USER_DATA = "user";

export class LocalUserService implements UserService {
  private data: UserData | null = this.load();

  async getAchievement(): Promise<UserDataAchievement[]> {
    this.load();
    if (this.data === null) {
      throw new Error("Failed to fetch user data");
    }
    return Promise.resolve([...this.data.achievements]);
  }

  async getHighScore(highScoreEnum: HighScoreType): Promise<number | false> {
    this.load();
    if (this.data === null) {
      throw new Error("Failed to fetch user data");
    }
    if (!(highScoreEnum in this.data.highscores)) {
      return Promise.resolve(0);
    }
    return Promise.resolve(this.data.highscores[highScoreEnum]);
  }

  async getUser(): Promise<User> {
    this.load();
    if (this.data === null) {
      throw new Error("Failed to fetch user data");
    }
    return Promise.resolve({ userName: this.data.userName });
  }

  async isLoggedIn(): Promise<boolean> {
    this.load();
    return Promise.resolve(this.data !== null);
  }

  async deleteUser() {
    this.data = null;
    window.localStorage.removeItem(KEY_USER_DATA);
  }

  async setAchievement(
    achievement: string,
    unlocked: boolean,
  ): Promise<boolean> {
    this.load();
    if (this.data === null) {
      throw new Error("Failed to fetch user data");
    }
    const existingAchievement = this.data.achievements.findIndex(
      (a) => a.achievementEnum === achievement,
    );
    if (existingAchievement < 0) {
      this.data.achievements.push({
        achievementEnum: achievement,
        isAchieved: unlocked,
        userId: "",
      });
    } else {
      this.data.achievements[existingAchievement].isAchieved = unlocked;
    }
    this.save();
    return Promise.resolve(true);
  }

  async setHighScore(
    highScoreEnum: HighScoreType,
    highScore: number,
  ): Promise<boolean> {
    this.load();
    if (this.data === null && this.load() === null) {
      throw new Error("Failed to fetch user data");
    }
    this.data!!.highscores[highScoreEnum] = highScore;
    this.save();
    return Promise.resolve(true);
  }

  save() {
    window.localStorage.setItem(
      KEY_USER_DATA,
      toBase64(JSON.stringify(this.data)),
    );
  }

  load(): UserData | null {
    const data = window.localStorage.getItem(KEY_USER_DATA);
    if (data === null) {
      return null;
    }
    try {
      const parsed = JSON.parse(fromBase64(data));
      if (parsed === null) {
        return null;
      }
      this.data = parsed;
      return this.data;
    } catch (e: unknown) {
      return null;
    }
  }

  async createPlayer(username: string, mode: string, gameCode: string) {
    this.data = {
      userName: username,
      achievements: [],
      highscores: {},
    };
    this.save();
  }
}
