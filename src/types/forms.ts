export type ContactFormType = "demo" | "pilot" | "team";

export interface DemoFormData {
  fullName: string;
  workEmail: string;
  phone: string;
  schoolName: string;
  role: string;
  preferredDate: string;
  message: string;
}

export interface PilotFormData {
  fullName: string;
  workEmail: string;
  phone: string;
  schoolDistrict: string;
  studentCount: string;
  role: string;
  message: string;
}

export interface TeamFormData {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export type ContactFormData =
  | { type: "demo"; data: DemoFormData }
  | { type: "pilot"; data: PilotFormData }
  | { type: "team"; data: TeamFormData };
