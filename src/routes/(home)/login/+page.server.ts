import type { PageServerLoad } from "./$types";
import { setError, fail, superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { users } from "$lib/server/db/schema";
import argon2 from "argon2";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/session";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema))
  };
};

export const actions = {
  default: async (event) => {
    const { request } = event;

    const form = await superValidate(request, zod(formSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { username, password } = form.data;

    const user = await db.query.users.findFirst({
      where: eq(users.username, username)
    });
    if (!user) {
      return setError(form, "username", "Account does not exist");
    }

    if (!(await argon2.verify(user.passwordHash, password))) {
      return setError(form, "password", "Password is incorrect");
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    setSessionTokenCookie(event, token, session.expiresAt);

    return redirect(307, "/app");
  }
};
