// See https://svelte.dev/docs/kit/types#app.d.ts
import { SessionValidationResult } from "$lib/server/session";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: SessionValidationResult;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
