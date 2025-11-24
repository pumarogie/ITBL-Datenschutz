import { NextResponse } from "next/server";
import { HttpStatus } from "@/lib/constants/http";

export const createSuccessResponse = <T>(
  data: T,
  status: number = HttpStatus.OK,
): NextResponse<T> => {
  return NextResponse.json<T>(data, { status });
};

export const createCreatedResponse = <T>(data: T): NextResponse<T> => {
  return NextResponse.json<T>(data, { status: HttpStatus.CREATED });
};
