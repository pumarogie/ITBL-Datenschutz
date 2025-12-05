import { NextRequest } from "next/server";
import * as z from "zod";
import { achievements, users } from "@/server/database/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/server/database/connection";
import {
  createSuccessResponse,
  createCreatedResponse,
} from "@/lib/api/response";
import { handleApiError, createErrorResponse } from "@/lib/api/error-handler";
import { HttpStatus } from "@/lib/constants/http";

const getAchievementSchema = z.object({
  userId: z.coerce.number(),
});

const setAchievementSchema = z.object({
  userId: z.coerce.number(),
  achievementEnum: z.string(),
  unlocked: z.boolean(),
});

type GetAchievementRequest = z.infer<typeof getAchievementSchema>;
type SetAchievementRequest = z.infer<typeof setAchievementSchema>;

type AchievementResponse = {
  achievementEnum: string;
  isAchieved: boolean;
  userId: number;
};

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return createErrorResponse("userId is required", HttpStatus.BAD_REQUEST);
    }

    const { userId: validatedUserId } = getAchievementSchema.parse({
      userId,
    }) as GetAchievementRequest;

    const userAchievements = await db
      .select({
        achievementEnum: achievements.achievementEnum,
        isAchieved: achievements.isAchieved,
        userId: achievements.userId,
      })
      .from(achievements)
      .where(eq(achievements.userId, validatedUserId));

    return createSuccessResponse<AchievementResponse[]>(userAchievements);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to get achievements");
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const requestData: unknown = await req.json();
    const { userId, achievementEnum, unlocked } = setAchievementSchema.parse(
      requestData,
    ) as SetAchievementRequest;

    const userData = await db.select().from(users).where(eq(users.id, userId));

    if (userData.length === 0) {
      return createErrorResponse("User not found", HttpStatus.NOT_FOUND);
    }

    const foundAchievement = await db
      .select()
      .from(achievements)
      .where(
        and(
          eq(achievements.userId, userId),
          eq(achievements.achievementEnum, achievementEnum),
        ),
      );

    if (foundAchievement.length > 0) {
      return createErrorResponse(
        "Achievement already set",
        HttpStatus.BAD_REQUEST,
      );
    }

    await db.insert(achievements).values({
      userId: userId,
      isAchieved: unlocked,
      achievementEnum: achievementEnum,
    });

    return createCreatedResponse({ message: "Achievement set" });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to set achievement");
  }
};
