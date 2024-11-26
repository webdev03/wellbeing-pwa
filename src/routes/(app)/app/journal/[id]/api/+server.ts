import { assertUserExists } from "$lib/server/assertion";
import { db } from "$lib/server/db";
import { journalEntries } from "$lib/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  assertUserExists(event.locals.auth);

  const entry = await db.query.journalEntries.findFirst({
    where: and(
      eq(journalEntries.id, Number(event.params.id)),
      eq(journalEntries.userId, event.locals.auth.user.id)
    )
  });

  if (!entry) {
    return new Response("Not Found", {
      status: 404
    });
  }

  return new Response(JSON.stringify(entry), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const PUT: RequestHandler = async (event) => {
  assertUserExists(event.locals.auth);

  const req = await event.request.json();

  let changeText = req.text && typeof req.text === "string" && req.text.length <= 5000;

  let changeEmotion =
    req.emotionScore &&
    typeof req.emotionScore === "number" &&
    req.emotionScore >= 0 &&
    req.emotionScore <= 25;

  const newEntry = await db
    .update(journalEntries)
    .set({
      text: changeText ? req.text : undefined,
      emotionScore: changeEmotion ? req.emotionScore : undefined
    })
    .where(
      and(
        eq(journalEntries.id, Number(event.params.id)),
        eq(journalEntries.userId, event.locals.auth.user.id)
      )
    )
    .returning();

  return new Response(JSON.stringify(newEntry[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const DELETE: RequestHandler = async (event) => {
  assertUserExists(event.locals.auth);

  await db
    .delete(journalEntries)
    .where(
      and(
        eq(journalEntries.id, Number(event.params.id)),
        eq(journalEntries.userId, event.locals.auth.user.id)
      )
    );

  return new Response("Success!", {
    status: 200
  });
};
