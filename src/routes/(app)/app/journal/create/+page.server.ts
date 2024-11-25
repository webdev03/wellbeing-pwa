import { redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { users } from "$lib/server/db/schema";
import { assertUserExists } from "$lib/server/assertion";

export const actions = {
  default: async (event) => {
    assertUserExists(event.locals.auth);
    const data = await event.request.formData();
    // TODO
  }
};
