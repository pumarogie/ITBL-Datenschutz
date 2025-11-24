import { NextRequest } from "next/server";
import * as z from "zod";
import { HighScoreEnum, highScores } from "@/server/database/schema";
import { and, eq } from "drizzle-orm";
import { db } from "@/server/database/connection";
import { createSuccessResponse } from "@/lib/api/response";
import { handleApiError, createErrorResponse } from "@/lib/api/error-handler";
import { HttpStatus } from "@/lib/constants/http";

const getHighScoreSchema = z.object({
  userId: z.coerce.number(),
  highScoreEnum: z.nativeEnum(HighScoreEnum),
});

const setHighScoreSchema = z.object({
  userId: z.coerce.number(),
  highScore: z.number(),
  highScoreEnum: z.nativeEnum(HighScoreEnum),
});

type GetHighScoreRequest = z.infer<typeof getHighScoreSchema>;
type SetHighScoreRequest = z.infer<typeof setHighScoreSchema>;

type HighScoreResponse = {
  highScore: number;
};

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const highScoreEnum = searchParams.get("highScoreEnum");

    if (!userId || !highScoreEnum) {
      return createErrorResponse(
        "userId and highScoreEnum are required",
        HttpStatus.BAD_REQUEST,
      );
    }

    const { userId: validatedUserId, highScoreEnum: validatedEnum } =
      getHighScoreSchema.parse({
        userId,
        highScoreEnum,
      }) as GetHighScoreRequest;

    const highScore = await db
      .select({
        highScore: highScores.highScore,
      })
      .from(highScores)
      .where(
        and(
          eq(highScores.userId, validatedUserId),
          eq(highScores.highScoreEnum, validatedEnum),
        ),
      );

    if (highScore.length === 0) {
      return createErrorResponse("No highscores found", HttpStatus.NOT_FOUND);
    }

    return createSuccessResponse<HighScoreResponse>({
      highScore: highScore[0].highScore,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to get highscores");
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const requestData: unknown = await req.json();
    const { userId, highScore, highScoreEnum } = setHighScoreSchema.parse(
      requestData,
    ) as SetHighScoreRequest;

    await db
      .update(highScores)
      .set({ highScore: highScore })
      .where(
        and(
          eq(highScores.userId, userId),
          eq(highScores.highScoreEnum, highScoreEnum),
        ),
      );

    return createSuccessResponse({ message: "Highscore set" });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to set highscore");
  }
};
