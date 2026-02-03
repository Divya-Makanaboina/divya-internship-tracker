export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export type PredefinedDepartment = 
  | "Engineering" 
  | "Product" 
  | "Design" 
  | "Marketing" 
  | "Sales" 
  | "Finance" 
  | "HR" 
  | "Operations" 
  | "Data Science";

export interface Application {
  id: string;
  company: string;
  position: string;
  department: string; // Can be predefined or custom
  location: string; // Job location (city, country, or "Remote")
  status: ApplicationStatus;
  dateApplied: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_OPTIONS: ApplicationStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export const PREDEFINED_DEPARTMENTS: PredefinedDepartment[] = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Data Science",
];

// Keep for backwards compatibility - includes "Other" for dropdown
export const DEPARTMENT_OPTIONS = [...PREDEFINED_DEPARTMENTS, "Other"] as const;
