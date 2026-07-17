import emailjs from '@emailjs/browser';
import type { ContactFormData } from "@/types/forms";

export async function submitContactForm(
  submission: ContactFormData
): Promise<{ success: boolean; errorMessage?: string }> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

  if (!serviceId || !templateId || !publicKey) {
    const errorMessage = "Email service is not configured. Add your EmailJS credentials to the environment variables.";
    console.error("[EmailJS Config Error]", errorMessage);
    return { success: false, errorMessage };
  }

  try {
    emailjs.init(publicKey);

    // Format the email data based on form type
    const emailData = formatEmailData(submission);

    const response = await emailjs.send(serviceId, templateId, emailData, publicKey);

    console.info("[EmailJS Success]", response);
    return { success: true };
  } catch (error) {
    const errorMessage = getEmailJsErrorMessage(error);
    console.error("[EmailJS Error]", error);
    return { success: false, errorMessage };
  }
}

function getEmailJsErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const record = error as Record<string, unknown>;
    if (typeof record.text === "string" && record.text.trim()) return record.text;
    if (typeof record.message === "string" && record.message.trim()) return record.message;
    if (typeof record.status === "number") {
      const detail = typeof record.text === "string" && record.text.trim() ? `: ${record.text}` : "";
      return `EmailJS request failed with status ${record.status}${detail}`;
    }
  }

  return "Unable to send your message right now.";
}

/**
 * Formats form data into email template variables
 */
function formatEmailData(submission: ContactFormData) {
  const { type, data } = submission;
  
  // Common fields for all forms
  const baseData = {
    form_type: type.toUpperCase(),
    to_email: 'harish@aquataurustech.com',
    reply_to: '', // Will be set based on form type
    subject: '', // Will be set based on form type
  };

  switch (type) {
    case 'demo':
      return {
        ...baseData,
        reply_to: data.workEmail,
        subject: `Demo Request from ${data.schoolName}`,
        full_name: data.fullName,
        work_email: data.workEmail,
        phone: data.phone,
        school_name: data.schoolName,
        role: data.role || 'Not specified',
        preferred_date: data.preferredDate,
        message: data.message || 'No additional message',
      };

    case 'pilot':
      return {
        ...baseData,
        reply_to: data.workEmail,
        subject: `Pilot Program Request from ${data.schoolDistrict}`,
        full_name: data.fullName,
        work_email: data.workEmail,
        phone: data.phone,
        school_district: data.schoolDistrict,
        student_count: data.studentCount,
        role: data.role,
        message: data.message || 'No additional message',
      };

    case 'team':
      return {
        ...baseData,
        reply_to: data.email,
        subject: `Contact Form: ${data.topic}`,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || 'Not provided',
        topic: data.topic,
        message: data.message,
      };

    default:
      throw new Error(`Unknown form type: ${type}`);
  }
}
