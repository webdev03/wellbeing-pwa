import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { journalEntries } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import { assertUserExists } from "$lib/server/assertion";
import { error } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
  const entryId = Number(params.id);
  if (isNaN(entryId)) throw error(400, "Entry is not a number");

  assertUserExists(locals.auth);

  const entry = await db.query.journalEntries.findFirst({
    where: and(eq(journalEntries.id, entryId), eq(journalEntries.userId, locals.auth.user.id))
  });

  if (!entry) throw error(404, "Entry does not exist");

  return { entry };
}) satisfies PageServerLoad;
