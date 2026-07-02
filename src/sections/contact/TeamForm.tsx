import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextInput } from "@/components/common/TextInput";
import { TextArea } from "@/components/common/TextArea";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import type { ContactFormData, TeamFormData } from "@/types/forms";

const EMPTY: TeamFormData = { fullName: "", email: "", phone: "", topic: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TOPIC_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
];

interface TeamFormProps {
  onSubmit: (payload: ContactFormData) => void;
  submitting: boolean;
}

export function TeamForm({ onSubmit, submitting }: TeamFormProps) {
  const [data, setData] = useState<TeamFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof TeamFormData, string>>>({});

  const update =
    (field: keyof TeamFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((d) => ({ ...d, [field]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof TeamFormData, string>> = {};
    if (!data.fullName.trim()) next.fullName = "Required";
    if (!data.email.trim()) next.email = "Required";
    else if (!EMAIL_RE.test(data.email)) next.email = "Enter a valid email";
    if (!data.topic.trim()) next.topic = "Required";
    if (!data.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ type: "team", data });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextInput
          label="Full Name"
          required
          value={data.fullName}
          onChange={update("fullName")}
          error={errors.fullName}
          placeholder="Jane Smith"
        />
        <TextInput
          label="Email"
          type="email"
          required
          value={data.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="jane@school.edu"
        />
        <TextInput
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={update("phone")}
          placeholder="(555) 123-4567"
        />
        <Select
          label="Topic"
          required
          options={TOPIC_OPTIONS}
          value={data.topic}
          onChange={update("topic")}
          error={errors.topic}
        />
      </div>
      <TextArea
        label="Message"
        required
        value={data.message}
        onChange={update("message")}
        error={errors.message}
        placeholder="How can we help?"
      />
      <Button type="submit" variant="filled-blue" className="px-8 h-12 self-start" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
