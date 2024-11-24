import {
  validateSessionToken,
  setSessionTokenCookie,
  deleteSessionTokenCookie
} from "./lib/server/session";

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session") ?? null;
  if (token === null) {
    event.locals.auth = {
      session: null,
      user: null
    };
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(token);
  if (session !== null) {
    setSessionTokenCookie(event, token, session.expiresAt);
    event.locals.auth = {
      session,
      user
    };
  } else {
    deleteSessionTokenCookie(event);
    event.locals.auth = {
      session: null,
      user: null
    };
  }

  return resolve(event);
};
