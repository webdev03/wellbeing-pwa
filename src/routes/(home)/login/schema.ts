import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(1, "Required")
});

export type FormSchema = typeof formSchema;
