import { NextRequest } from "next/server";
import * as z from "zod";
import { db } from "@/server/database/connection";
import { achievements, users } from "@/server/database/schema";
import { and, eq, sql } from "drizzle-orm";
import { createSuccessResponse } from "@/lib/api/response";
import { handleApiError, createErrorResponse } from "@/lib/api/error-handler";
import { HttpStatus } from "@/lib/constants/http";

const requestSchema = z.object({
  gameCode: z.string(),
});

type LeaderboardRequest = z.infer<typeof requestSchema>;

type UserData = {
  username: string;
  score: number;
};

type LeaderboardEntry = {
  name: string;
  score: number;
};

export const POST = async (req: NextRequest) => {
  try {
    const requestData: unknown = await req.json();
    const { gameCode } = requestSchema.parse(requestData) as LeaderboardRequest;

    const userData = await db
      .select({
        username: users.userName,
        score: sql<number>`COUNT(${achievements.id})::int`.as("score"),
      })
      .from(users)
      .leftJoin(
        achievements,
        and(
          eq(users.id, achievements.userId),
          eq(achievements.isAchieved, true),
          sql`${achievements.achievementEnum} NOT LIKE '#%'`,
        ),
      )
      .where(eq(users.gameCode, gameCode))
      .groupBy(users.userName)
      .orderBy(sql`score DESC`);

    if (!userData || userData.length === 0) {
      return createErrorResponse("No user data found", HttpStatus.NOT_FOUND);
    }

    const leaderboardData: LeaderboardEntry[] = userData.map(
      (user: UserData) => ({
        name: user.username,
        score: user.score,
      }),
    );

    return createSuccessResponse<LeaderboardEntry[]>(leaderboardData);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to get leaderboard data");
  }
};
