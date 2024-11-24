import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (!locals.auth.session || !locals.auth.user) {
    return redirect(307, "/login");
  }
  return {
    auth: {
      user: {
        id: locals.auth.user.id,
        username: locals.auth.user.username
      }
    }
  };
}) satisfies LayoutServerLoad;
