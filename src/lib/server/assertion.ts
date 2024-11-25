import type { AuthenticatedSessionValidationResult } from "./session";

export function assertUserExists(
  authLocal: App.Locals["auth"]
): asserts authLocal is AuthenticatedSessionValidationResult {
  if (!authLocal || !authLocal.user || !authLocal.session)
    throw new Error("User must be logged in");
}
