/** Client-safe form state for the contact form (no zod import here). */
export type ContactField = "name" | "email" | "service" | "details";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echo back values so the form keeps them after a failed submit. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle" };
