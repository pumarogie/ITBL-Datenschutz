import { db } from "@/server/database/connection";
import { HighScoreEnum, highScores, users } from "@/server/database/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import * as z from "zod";
import {
  createSuccessResponse,
  createCreatedResponse,
} from "@/lib/api/response";
import { handleApiError, createErrorResponse } from "@/lib/api/error-handler";
import { HttpStatus } from "@/lib/constants/http";

const createUserSchema = z.object({
  username: z.string(),
  mode: z.string(),
  gameCode: z.string().nullable(),
});

const getUserSchema = z.object({
  userId: z.coerce.number(),
});

type CreateUserRequest = z.infer<typeof createUserSchema>;
type GetUserRequest = z.infer<typeof getUserSchema>;

type UserResponse = {
  id: number;
  name: string;
  gameCode: string | null;
};

type CreateUserResponse = {
  userData: UserResponse[];
};

const insertDefaultHighScores = async (userId: number): Promise<void> => {
  for (const highScore in HighScoreEnum) {
    await db.insert(highScores).values({
      userId: userId,
      highScore: 0,
      highScoreEnum: HighScoreEnum[highScore as keyof typeof HighScoreEnum],
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const requestData: unknown = await req.json();
    const { username, mode, gameCode } = createUserSchema.parse(
      requestData,
    ) as CreateUserRequest;

    const existingUser = await db
      .select({
        id: users.id,
        name: users.userName,
      })
      .from(users)
      .where(eq(users.userName, username));

    if (existingUser.length > 0) {
      return createErrorResponse("User already exists", HttpStatus.BAD_REQUEST);
    }

    if (mode === "singlePlayer") {
      await db.insert(users).values({ userName: username, gameCode: null });
    } else if (mode === "multiPlayer") {
      await db.insert(users).values({ userName: username, gameCode: gameCode });
    }

    const userData = await db
      .select({
        id: users.id,
        name: users.userName,
        gameCode: users.gameCode,
      })
      .from(users)
      .where(eq(users.userName, username));

    if (!userData || userData.length === 0) {
      return createErrorResponse("User not found", HttpStatus.NOT_FOUND);
    }

    await insertDefaultHighScores(userData[0].id);

    return createCreatedResponse<CreateUserResponse>({
      userData: userData,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to create user");
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return createErrorResponse("userId is required", HttpStatus.BAD_REQUEST);
    }

    const { userId: validatedUserId } = getUserSchema.parse({
      userId,
    }) as GetUserRequest;

    const userData = await db
      .select({
        id: users.id,
        userName: users.userName,
        gameCode: users.gameCode,
      })
      .from(users)
      .where(eq(users.id, validatedUserId));

    if (!userData || userData.length === 0) {
      return createErrorResponse("User not found", HttpStatus.NOT_FOUND);
    }

    return createSuccessResponse(userData[0]);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        "Invalid request data",
        HttpStatus.BAD_REQUEST,
      );
    }
    return handleApiError(error, "Failed to get user");
  }
};
