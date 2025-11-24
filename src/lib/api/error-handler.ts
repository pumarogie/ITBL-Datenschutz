import { NextResponse } from "next/server";
import { HttpStatus } from "@/lib/constants/http";

export type ApiError = {
  error: string;
  message: string;
};

export const handleApiError = (
  error: unknown,
  defaultMessage: string = "An error occurred",
): NextResponse<ApiError> => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return NextResponse.json<ApiError>(
    {
      error: defaultMessage,
      message: errorMessage,
    },
    { status: HttpStatus.INTERNAL_SERVER_ERROR },
  );
};

export const createErrorResponse = (
  message: string,
  status: number = HttpStatus.BAD_REQUEST,
): NextResponse<ApiError> => {
  return NextResponse.json<ApiError>(
    {
      error: message,
      message: message,
    },
    { status },
  );
};
