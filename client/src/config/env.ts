import { z } from "zod";

const EnvSchema = z.object({
  BASE_URL: z.string().url(),
});

const envObj = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
};

export const env = EnvSchema.parse(envObj);
