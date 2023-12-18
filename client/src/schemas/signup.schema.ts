import { z } from "zod";

export const UserSignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password Length must be greater than 6 characters"),
});

export type UserSignupType = z.infer<typeof UserSignupSchema>;
