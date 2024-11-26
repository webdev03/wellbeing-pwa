import { error } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { journalEntries } from "$lib/server/db/schema";
import { assertUserExists } from "$lib/server/assertion";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
  assertUserExists(event.locals.auth);
  const data = await event.request.formData();

  const q1 = Math.round(Number(data.get("q1")));
  const q2 = Math.round(Number(data.get("q2")));
  const q3 = Math.round(Number(data.get("q3")));
  const q4 = Math.round(Number(data.get("q4")));
  const q5 = Math.round(Number(data.get("q5")));

  for (const q of [q1, q2, q3, q4, q5]) {
    if (q < 0 || q > 5) throw error(400, "Invalid question answers");
  }

  const change = await db
    .insert(journalEntries)
    .values({
      userId: event.locals.auth.user.id,
      emotionScore: q1 + q2 + q3 + q4 + q5,
      text: ""
    })
    .returning({
      id: journalEntries.id
    });

  return new Response(`/app/journal/${change[0].id}?edit=true`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
};
