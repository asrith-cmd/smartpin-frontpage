import type { ContactFormData } from "@/types/forms";

/**
 * Sends a contact form submission.
 *
 * No backend exists yet — this is a stub that simulates network latency and
 * always succeeds, so the UI (validation, loading, success states) can be
 * built and tested end-to-end now. Swap the body of this function for a real
 * call (Resend via a Vercel function, EmailJS, etc.) once one exists; the
 * call sites don't need to change.
 */
export async function submitContactForm(submission: ContactFormData): Promise<{ success: boolean }> {
  console.info("[contact form submission — no backend wired yet]", submission);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true };
}
