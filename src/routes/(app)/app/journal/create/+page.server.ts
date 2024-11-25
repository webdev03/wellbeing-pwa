import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { users } from "$lib/server/db/schema";
import argon2 from "argon2";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/session";

export const actions = {
  default: async (event) => {
    // TODO
  }
};
