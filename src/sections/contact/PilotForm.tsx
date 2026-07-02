import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextInput } from "@/components/common/TextInput";
import { TextArea } from "@/components/common/TextArea";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import type { ContactFormData, PilotFormData } from "@/types/forms";

const EMPTY: PilotFormData = {
  fullName: "",
  workEmail: "",
  phone: "",
  schoolDistrict: "",
  studentCount: "",
  role: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STUDENT_COUNT_OPTIONS = [
  { value: "1-100", label: "1 – 100 students" },
  { value: "101-500", label: "101 – 500 students" },
  { value: "501-1000", label: "501 – 1,000 students" },
  { value: "1000+", label: "1,000+ students" },
];

interface PilotFormProps {
  onSubmit: (payload: ContactFormData) => void;
  submitting: boolean;
}

export function PilotForm({ onSubmit, submitting }: PilotFormProps) {
  const [data, setData] = useState<PilotFormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof PilotFormData, string>>>({});

  const update =
    (field: keyof PilotFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((d) => ({ ...d, [field]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof PilotFormData, string>> = {};
    if (!data.fullName.trim()) next.fullName = "Required";
    if (!data.workEmail.trim()) next.workEmail = "Required";
    else if (!EMAIL_RE.test(data.workEmail)) next.workEmail = "Enter a valid email";
    if (!data.phone.trim()) next.phone = "Required";
    if (!data.schoolDistrict.trim()) next.schoolDistrict = "Required";
    if (!data.studentCount.trim()) next.studentCount = "Required";
    if (!data.role.trim()) next.role = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ type: "pilot", data });
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
          label="School / District Name"
          required
          value={data.schoolDistrict}
          onChange={update("schoolDistrict")}
          error={errors.schoolDistrict}
          placeholder="Oakwood School District"
        />
        <Select
          label="Approx. Number of Students"
          required
          options={STUDENT_COUNT_OPTIONS}
          value={data.studentCount}
          onChange={update("studentCount")}
          error={errors.studentCount}
        />
        <TextInput
          label="Your Role"
          required
          value={data.role}
          onChange={update("role")}
          error={errors.role}
          placeholder="Principal, IT Director, ..."
        />
      </div>
      <TextArea
        label="Tell us about your school"
        value={data.message}
        onChange={update("message")}
        placeholder="Optional message"
      />
      <Button type="submit" variant="filled-blue" className="px-8 h-12 self-start" disabled={submitting}>
        {submitting ? "Sending..." : "Request Pilot Program"}
      </Button>
    </form>
  );
}
