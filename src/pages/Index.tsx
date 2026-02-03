import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { TimelineChart } from "@/components/dashboard/TimelineChart";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { LocationChart } from "@/components/dashboard/LocationChart";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { ApplicationForm } from "@/components/dashboard/ApplicationForm";
import { useApplications } from "@/hooks/useApplications";
import { Application } from "@/types/application";
import { triggerSuccessConfetti } from "@/lib/confetti";

const Index = () => {
  const { applications, addApplication, updateApplication, deleteApplication } = useApplications();
  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const handleAdd = () => {
    setEditingApp(null);
    setFormOpen(true);
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setFormOpen(true);
  };

  const handleSubmit = (data: Omit<Application, "id" | "createdAt" | "updatedAt">) => {
    if (editingApp) {
      updateApplication(editingApp.id, data);
    } else {
      addApplication(data);
      triggerSuccessConfetti();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Internship Tracker
            </h1>
            <p className="text-muted-foreground">
              Track and analyze your internship applications
            </p>
          </div>
          <Button onClick={handleAdd} className="btn-cta w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>

        {/* Summary Cards */}
        <section className="mb-8">
          <SummaryCards applications={applications} />
        </section>

        {/* Charts */}
        <section className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusChart applications={applications} />
          <TimelineChart applications={applications} />
          <DepartmentChart applications={applications} />
          <LocationChart applications={applications} />
        </section>

        {/* Applications Table */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">All Applications</h2>
          <ApplicationsTable
            applications={applications}
            onEdit={handleEdit}
            onDelete={deleteApplication}
          />
        </section>

        {/* Add/Edit Form Modal */}
        <ApplicationForm
          open={formOpen}
          onOpenChange={setFormOpen}
          application={editingApp}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Index;
