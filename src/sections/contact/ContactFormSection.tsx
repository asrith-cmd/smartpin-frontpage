import { useEffect, useRef, useState } from "react";
import { useContactForm } from "@/providers/ContactFormProvider";
import { sfPro, dmSans } from "@/constants/fonts";
import { submitContactForm } from "@/lib/submitContactForm";
import type { ContactFormData, ContactFormType } from "@/types/forms";
import { DemoForm } from "./DemoForm";
import { PilotForm } from "./PilotForm";
import { TeamForm } from "./TeamForm";

const COPY: Record<ContactFormType, { eyebrow: string; title: string; desc: string }> = {
  demo: {
    eyebrow: "Schedule a Product Demonstration",
    title: "Let's show you Smart Pin in action",
    desc: "Tell us a bit about your school and we'll set up a live walkthrough.",
  },
  pilot: {
    eyebrow: "Request a Pilot Program",
    title: "Bring Smart Pin to your school",
    desc: "Share a few details about your school and we'll follow up to get a pilot started.",
  },
  team: {
    eyebrow: "Speak With Our Team",
    title: "We're here to help",
    desc: "Send us a message and a member of our team will get back to you shortly.",
  },
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactFormSection() {
  const { activeForm, closeForm } = useContactForm();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    setStatus("idle");
    if (activeForm && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeForm]);

  if (!activeForm) return null;

  const copy = COPY[activeForm];

  const handleSubmit = async (payload: ContactFormData) => {
    setStatus("submitting");
    const res = await submitContactForm(payload);
    setStatus(res.success ? "success" : "error");
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative bg-[#161617] border-t border-white/[0.06] py-20 md:py-28 scroll-mt-[100px]"
    >
      <div className="max-w-[720px] mx-auto px-5 md:px-0">
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <p
              className="text-[#858589] text-xs md:text-sm tracking-[2.8px] uppercase font-medium mb-4"
              style={{ fontFamily: sfPro }}
            >
              {copy.eyebrow}
            </p>
            <h2
              className="text-[#E8E8EF] text-3xl md:text-5xl font-medium leading-[1.1] mb-3"
              style={{ fontFamily: sfPro }}
            >
              {copy.title}
            </h2>
            <p className="text-[#858589] text-base md:text-lg" style={{ fontFamily: dmSans }}>
              {copy.desc}
            </p>
          </div>
          <button
            onClick={closeForm}
            aria-label="Close form"
            className="shrink-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#858589] hover:text-white hover:border-white/40 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="rounded-[16px] border border-white/[0.08] p-8 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-[#E8E8EF] text-xl font-medium mb-2" style={{ fontFamily: sfPro }}>
              Thanks — we'll be in touch.
            </p>
            <p className="text-[#858589] text-sm" style={{ fontFamily: dmSans }}>
              We received your request and will follow up shortly.
            </p>
          </div>
        ) : (
          <>
            {activeForm === "demo" && <DemoForm onSubmit={handleSubmit} submitting={status === "submitting"} />}
            {activeForm === "pilot" && <PilotForm onSubmit={handleSubmit} submitting={status === "submitting"} />}
            {activeForm === "team" && <TeamForm onSubmit={handleSubmit} submitting={status === "submitting"} />}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-4" style={{ fontFamily: dmSans }}>
                Something went wrong — please try again.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
