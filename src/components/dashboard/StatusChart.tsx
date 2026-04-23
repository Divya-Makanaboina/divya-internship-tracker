import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application, ApplicationStatus } from "@/types/application";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface StatusChartProps {
  applications: Application[];
}

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Applied: "hsl(var(--chart-1))",
  Interview: "hsl(var(--chart-2))",
  Offer: "hsl(var(--chart-3))",
  Rejected: "hsl(var(--chart-4))",
};

const chartConfig = {
  Applied: { label: "Applied", color: STATUS_COLORS.Applied },
  Interview: { label: "Interview", color: STATUS_COLORS.Interview },
  Offer: { label: "Offer", color: STATUS_COLORS.Offer },
  Rejected: { label: "Rejected", color: STATUS_COLORS.Rejected },
};

export function StatusChart({ applications }: StatusChartProps) {
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    fill: STATUS_COLORS[status as ApplicationStatus],
  }));

  if (data.length === 0) {
    return (
      <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <CardTitle className="text-base">Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[200px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No applications yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-base">Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-sm">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
