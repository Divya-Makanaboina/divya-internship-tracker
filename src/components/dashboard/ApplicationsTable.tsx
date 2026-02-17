import { useState, useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Application, ApplicationStatus, STATUS_OPTIONS } from "@/types/application";
import { StatusBadge } from "./StatusBadge";

interface ApplicationsTableProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

type SortKey = "company" | "position" | "department" | "location" | "status" | "dateApplied";
type SortOrder = "asc" | "desc";

export function ApplicationsTable({
  applications,
  onEdit,
  onDelete,
  onStatusChange,
}: ApplicationsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("dateApplied");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<Application | null>(null);

  const handleDeleteClick = (app: Application) => {
    setAppToDelete(app);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (appToDelete) {
      onDelete(appToDelete.id);
      setDeleteDialogOpen(false);
      setAppToDelete(null);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...applications];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (app) =>
          app.company.toLowerCase().includes(searchLower) ||
          app.position.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortKey === "dateApplied") {
        comparison = new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime();
      } else {
        comparison = a[sortKey].localeCompare(b[sortKey]);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [applications, search, statusFilter, sortKey, sortOrder]);

  const SortButton = ({ column, label }: { column: SortKey; label: string }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => handleSort(column)}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ApplicationStatus | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>
                <SortButton column="company" label="Company" />
              </TableHead>
              <TableHead>
                <SortButton column="position" label="Position" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <SortButton column="department" label="Department" />
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <SortButton column="location" label="Location" />
              </TableHead>
              <TableHead>
                <SortButton column="status" label="Status" />
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <SortButton column="dateApplied" label="Date Applied" />
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSorted.map((app) => (
                <Collapsible key={app.id} asChild open={expandedRows.has(app.id)}>
                  <>
                    <TableRow className="group">
                      <TableCell>
                        {app.notes && (
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => toggleRow(app.id)}
                            >
                              {expandedRows.has(app.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{app.company}</TableCell>
                      <TableCell>{app.position}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {app.department}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {app.location || "—"}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={app.status}
                          onValueChange={(value) => onStatusChange(app.id, value as ApplicationStatus)}
                        >
                          <SelectTrigger className="h-7 w-auto border-none bg-transparent p-0 shadow-none focus:ring-0">
                            <StatusBadge status={app.status} />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                <StatusBadge status={status} />
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {format(parseISO(app.dateApplied), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(app)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(app)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {app.notes && (
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={8} className="py-2 pl-12">
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Notes:</span> {app.notes}
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    )}
                  </>
                </Collapsible>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the application for{" "}
              <span className="font-medium text-foreground">
                {appToDelete?.position}
              </span>{" "}
              at{" "}
              <span className="font-medium text-foreground">
                {appToDelete?.company}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
