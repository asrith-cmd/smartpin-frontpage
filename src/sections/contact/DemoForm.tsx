import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextInput } from "@/components/common/TextInput";
import { TextArea } from "@/components/common/TextArea";
import { Button } from "@/components/common/Button";
import type { ContactFormData, DemoFormData } from "@/types/forms";

const EMPTY: DemoFormData = {
  fullName: "",
  workEmail: "",
  phone: "",
  schoolName: "",
  role: "",
  preferredDate: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface DemoFormProps {
  onSubmit: (payload: ContactFormData) => void;
  submitting: boolean;
}

export function DemoForm({ onSubmit, submitting }: DemoFormProps) {
  const [data, setData] = useState<DemoFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});

  const update =
    (field: keyof DemoFormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData((d) => ({ ...d, [field]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof DemoFormData, string>> = {};
    if (!data.fullName.trim()) next.fullName = "Required";
    if (!data.workEmail.trim()) next.workEmail = "Required";
    else if (!EMAIL_RE.test(data.workEmail)) next.workEmail = "Enter a valid email";
    if (!data.phone.trim()) next.phone = "Required";
    if (!data.schoolName.trim()) next.schoolName = "Required";
    if (!data.preferredDate.trim()) next.preferredDate = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ type: "demo", data });
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
          label="Work Email"
          type="email"
          required
          value={data.workEmail}
          onChange={update("workEmail")}
          error={errors.workEmail}
          placeholder="jane@school.edu"
        />
        <TextInput
          label="Phone Number"
          type="tel"
          required
          value={data.phone}
          onChange={update("phone")}
          error={errors.phone}
          placeholder="(555) 123-4567"
        />
        <TextInput
          label="School Name"
          required
          value={data.schoolName}
          onChange={update("schoolName")}
          error={errors.schoolName}
          placeholder="Westfield Academy"
        />
        <TextInput
          label="Your Role"
          value={data.role}
          onChange={update("role")}
          placeholder="Principal, IT Director, ..."
        />
        <TextInput
          label="Preferred Date"
          type="date"
          required
          value={data.preferredDate}
          onChange={update("preferredDate")}
          error={errors.preferredDate}
        />
      </div>
      <TextArea
        label="Anything else we should know?"
        value={data.message}
        onChange={update("message")}
        placeholder="Optional message"
      />
      <Button type="submit" variant="filled-blue" className="px-8 h-12 self-start" disabled={submitting}>
        {submitting ? "Sending..." : "Schedule Demo"}
      </Button>
    </form>
  );
}
