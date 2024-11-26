import { assertUserExists } from "$lib/server/assertion";
import { deleteSessionTokenCookie, invalidateSessionToken } from "$lib/server/session";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
  assertUserExists(event.locals.auth);
  await invalidateSessionToken(event.cookies.get("session")!);
  deleteSessionTokenCookie(event);

  return new Response("GOTO /");
};
