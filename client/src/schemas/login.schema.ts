import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password Length must be greater than 6 characters"),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;
