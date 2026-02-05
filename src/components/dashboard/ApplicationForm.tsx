import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Application,
  ApplicationStatus,
  STATUS_OPTIONS,
  DEPARTMENT_OPTIONS,
} from "@/types/application";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {application ? "Edit Application" : "Add Application"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Job position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New York, USA or Remote" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="departmentSelect"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DEPARTMENT_OPTIONS.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {selectedDepartment === "Other" && (
              <FormField
                control={form.control}
                name="customDepartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter department name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="dateApplied"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Applied</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about this application..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portalLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Portal Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://careers.company.com/apply" type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="portalUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portal Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username or email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portalPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portal Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
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
