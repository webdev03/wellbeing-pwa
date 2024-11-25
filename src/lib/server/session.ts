// Based on the Lucia guide

import type { RequestEvent } from "@sveltejs/kit";
import { dev } from "$app/environment";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, sessions } from "./db/schema";
import type { User, JournalEntry, Session } from "./db/schema";
import { randomBytes, createHash } from "node:crypto";

export function generateSessionToken(): string {
  return randomBytes(24).toString("hex");
}

export async function createSession(token: string, userId: number) {
  // We hash the token so that a database compromise doesn't immediately break login security
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const session: Session = {
    id: hashedToken,
    userId,
    /* 2 weeks */
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
  };
  await db.insert(sessions).values(session);
  return session;
}

export async function validateSessionToken(token: string) {
  const hashedToken = createHash("sha256").update(token).digest("hex");

  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, hashedToken));

  if (result.length < 1) return { session: null, user: null };

  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 7) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt
      })
      .where(eq(sessions.id, session.id));
  }
  return { session, user } as SessionValidationResult;
}

export async function invalidateSession(sessionId: string) {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export type AuthenticatedSessionValidationResult = { session: Session; user: User };

export type SessionValidationResult =
  | AuthenticatedSessionValidationResult
  | { session: null; user: null };

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set("session", token, {
    httpOnly: true,
    secure: !dev,
    sameSite: "lax",
    expires: expiresAt,
    path: "/"
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/"
  });
}
