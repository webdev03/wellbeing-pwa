import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { journalEntries } from "$lib/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { assertUserExists } from "$lib/server/assertion";

export const load = (async ({ locals }) => {
  assertUserExists(locals.auth);

  const entries = await db
    .select()
    .from(journalEntries)
    .where(eq(journalEntries.userId, locals.auth.user.id))
    .orderBy(asc(journalEntries.createdAt))
    .limit(60);

  return {
    entries: entries.map((entry) => ({
      x: entry.createdAt.getTime(),
      y: entry.emotionScore * 4
    }))
  };
}) satisfies PageServerLoad;
