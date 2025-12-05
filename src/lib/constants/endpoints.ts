export const ApiEndpoints = {
  USERS: "/api/users",
  ACHIEVEMENTS: "/api/achievements",
  HIGHSCORES: "/api/highscores",
  LEADERBOARD: "/api/leaderboard",
  ANSWERS: "/api/answers",
} as const;

export type ApiEndpoint = (typeof ApiEndpoints)[keyof typeof ApiEndpoints];
