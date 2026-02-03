export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export type Department = 
  | "Engineering" 
  | "Product" 
  | "Design" 
  | "Marketing" 
  | "Sales" 
  | "Finance" 
  | "HR" 
  | "Operations" 
  | "Data Science" 
  | "Other";

export interface Application {
  id: string;
  company: string;
  position: string;
  department: Department;
  status: ApplicationStatus;
  dateApplied: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export const STATUS_OPTIONS: ApplicationStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export const DEPARTMENT_OPTIONS: Department[] = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Data Science",
  "Other",
];
