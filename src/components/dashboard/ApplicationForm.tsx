import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  Application,
  ApplicationStatus,
  STATUS_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "@/types/application";
import {
  BasicInfoFields,
  CategoryFields,
  DateNotesFields,
  PortalFields,
} from "./form-fields";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  departmentSelect: z.string().min(1, "Department is required"),
  customDepartment: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  status: z.enum(STATUS_OPTIONS as [ApplicationStatus, ...ApplicationStatus[]]),
  dateApplied: z.date({ required_error: "Application date is required" }),
  notes: z.string(),
  portalLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portalUsername: z.string().optional(),
  portalPassword: z.string().optional(),
}).refine((data) => {
  if (data.departmentSelect === "Other") {
    return data.customDepartment && data.customDepartment.trim().length > 0;
  }
  return true;
}, {
  message: "Please enter a custom department",
  path: ["customDepartment"],
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application | null;
  onSubmit: (data: Omit<Application, "id" | "createdAt" | "updatedAt">) => void;
}

export function ApplicationForm({
  open,
  onOpenChange,
  application,
  onSubmit,
}: ApplicationFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      departmentSelect: "Engineering",
      customDepartment: "",
      location: "",
      status: "Applied",
      dateApplied: new Date(),
      notes: "",
      portalLink: "",
      portalUsername: "",
      portalPassword: "",
    },
  });

  const selectedDepartment = form.watch("departmentSelect");

  useEffect(() => {
    if (application) {
      // Check if the department is a predefined one or custom
      const isPredefined = DEPARTMENT_OPTIONS.includes(application.department as typeof DEPARTMENT_OPTIONS[number]);
      form.reset({
        company: application.company,
        position: application.position,
        departmentSelect: isPredefined ? application.department : "Other",
        customDepartment: isPredefined ? "" : application.department,
        location: application.location || "",
        status: application.status,
        dateApplied: new Date(application.dateApplied),
        notes: application.notes,
        portalLink: application.portalLink || "",
        portalUsername: application.portalUsername || "",
        portalPassword: application.portalPassword || "",
      });
    } else {
      form.reset({
        company: "",
        position: "",
        departmentSelect: "Engineering",
        customDepartment: "",
        location: "",
        status: "Applied",
        dateApplied: new Date(),
        notes: "",
        portalLink: "",
        portalUsername: "",
        portalPassword: "",
      });
    }
  }, [application, form, open]);

  const handleSubmit = (values: FormValues) => {
    const department = values.departmentSelect === "Other" 
      ? values.customDepartment!.trim() 
      : values.departmentSelect;
    
    onSubmit({
      company: values.company,
      position: values.position,
      department,
      location: values.location,
      status: values.status,
      dateApplied: values.dateApplied.toISOString(),
      notes: values.notes,
      portalLink: values.portalLink || "",
      portalUsername: values.portalUsername || "",
      portalPassword: values.portalPassword || "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {application ? "Edit Application" : "Add Application"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 max-h-[50vh]">
              <div className="space-y-4 pb-4">
                <BasicInfoFields form={form} />
                <CategoryFields form={form} selectedDepartment={selectedDepartment} />
                <DateNotesFields form={form} />
                <PortalFields form={form} />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {application ? "Save Changes" : "Add Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
