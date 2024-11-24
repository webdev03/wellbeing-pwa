import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-z0-9\-_]+$/,
      "String contains invalid characters. Only a-z, 0-9, -, and _ are allowed."
    ),
  password: z.string().min(8).max(256),
  agreeTermsPrivacy: z.boolean().refine((val) => val === true, {
    message: "Please read and accept the policies"
  })
});

export type FormSchema = typeof formSchema;
