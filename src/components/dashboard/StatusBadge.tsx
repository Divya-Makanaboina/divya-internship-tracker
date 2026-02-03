import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/types/application";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusStyles: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300",
  Interview: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
  Offer: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300",
  Rejected: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("font-medium", statusStyles[status])}>
      {status}
    </Badge>
  );
}
