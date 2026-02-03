import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "@/types/application";
import { Briefcase, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface SummaryCardsProps {
  applications: Application[];
}

export function SummaryCards({ applications }: SummaryCardsProps) {
  const total = applications.length;
  const active = applications.filter(
    (app) => app.status === "Applied" || app.status === "Interview"
  ).length;
  const offers = applications.filter((app) => app.status === "Offer").length;
  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;
  const pending = applications.filter((app) => app.status === "Applied").length;

  const cards = [
    {
      title: "Total Applications",
      value: total,
      icon: Briefcase,
      description: "All applications",
    },
    {
      title: "Active Applications",
      value: active,
      icon: TrendingUp,
      description: "Applied + Interview",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: CheckCircle,
      description: "Offers received",
    },
    {
      title: "Pending Response",
      value: pending,
      icon: Clock,
      description: "Awaiting response",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
