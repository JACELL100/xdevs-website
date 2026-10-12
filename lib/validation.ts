import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  details: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000, "Please keep it under 5000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
