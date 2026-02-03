import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "@/types/application";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { format, parseISO, startOfWeek, endOfWeek, eachWeekOfInterval, subWeeks } from "date-fns";

interface TimelineChartProps {
  applications: Application[];
}

const chartConfig = {
  applications: { label: "Applications", color: "hsl(var(--primary))" },
};

export function TimelineChart({ applications }: TimelineChartProps) {
  // Get last 8 weeks
  const now = new Date();
  const weeks = eachWeekOfInterval({
    start: subWeeks(now, 7),
    end: now,
  });

  const data = weeks.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart);
    const count = applications.filter((app) => {
      const appDate = parseISO(app.dateApplied);
      return appDate >= weekStart && appDate <= weekEnd;
    }).length;

    return {
      week: format(weekStart, "MMM d"),
      applications: count,
    };
  });

  if (applications.length === 0) {
    return (
      <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <CardTitle className="text-base">Applications Over Time</CardTitle>
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
        <CardTitle className="text-base">Applications Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="applications"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
