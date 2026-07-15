import emailjs from '@emailjs/browser';
import type { ContactFormData } from "@/types/forms";

// EmailJS configuration - you'll need to replace these with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_f6oh0sq', // Gmail/Outlook service ID
  TEMPLATE_ID: 'template_skfr48d', // Email template ID
  PUBLIC_KEY: 'quRfdU10UPqbWQgBv' // Your EmailJS public key
};

export async function submitContactForm(submission: ContactFormData): Promise<{ success: boolean }> {
  try {
    // Format the email data based on form type
    const emailData = formatEmailData(submission);
    
    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      emailData,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    console.info('[EmailJS Success]', response);
    return { success: true };
    
  } catch (error) {
    console.error('[EmailJS Error]', error);
    return { success: false };
  }
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
