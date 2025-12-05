import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const globalQueryClient = global as unknown as {
  queryClient?: postgres.Sql;
};

const queryClient =
  globalQueryClient.queryClient ??
  postgres(process.env.DATABASE_URL!, { max: 50 });

if (process.env.NODE_ENV === "development")
  globalQueryClient.queryClient = queryClient;

export const db = drizzle(queryClient);
