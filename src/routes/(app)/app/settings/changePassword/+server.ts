import { assertUserExists } from "$lib/server/assertion";
import { db } from "$lib/server/db";
import { sessions, users } from "$lib/server/db/schema";
import { eq, and, ne } from "drizzle-orm";
import argon2 from "argon2";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
  assertUserExists(event.locals.auth);

  const req = await event.request.json();

  let newPassword = String(req?.newPassword);

  if (!newPassword || newPassword.length < 8) return new Response("Bad request", { status: 400 });

  await Promise.all([
    db
      .update(users)
      .set({
        passwordHash: await argon2.hash(newPassword, {
          type: argon2.argon2i
        })
      })
      .where(eq(users.id, event.locals.auth.user.id)),

    // Log all other users out
    db.delete(sessions).where(
      and(
        eq(sessions.userId, event.locals.auth.user.id),

        // If the user realises they forgot the password they just wrote, here's a backup plan?
        ne(sessions.id, event.locals.auth.session.id)
      )
    )
  ]);

  return new Response("Done", {
    status: 200
  });
};
