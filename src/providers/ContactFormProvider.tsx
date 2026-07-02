import { createContext, useContext, useState, type ReactNode } from "react";
import type { ContactFormType } from "@/types/forms";

interface ContactFormContextValue {
  activeForm: ContactFormType | null;
  openForm: (type: ContactFormType) => void;
  closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

/**
 * Tracks which contact form (if any) should be shown in ContactFormSection.
 * Any button/link on the page — BlueBanner's three links, Navbar and section
 * CTAs — can call `openForm` without needing a ref to the form section itself.
 */
export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [activeForm, setActiveForm] = useState<ContactFormType | null>(null);

  return (
    <ContactFormContext.Provider
      value={{
        activeForm,
        openForm: setActiveForm,
        closeForm: () => setActiveForm(null),
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + its hook are intentionally co-located
export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return ctx;
}
