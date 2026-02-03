import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "@/types/application";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface LocationChartProps {
  applications: Application[];
}

const chartConfig = {
  count: { label: "Applications", color: "hsl(var(--chart-3))" },
};

export function LocationChart({ applications }: LocationChartProps) {
  const locationCounts = applications.reduce((acc, app) => {
    const location = app.location || "Unknown";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(locationCounts)
    .map(([location, count]) => ({
      location,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 locations

  if (data.length === 0) {
    return (
      <Card className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <CardTitle className="text-base">Geographic Distribution</CardTitle>
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
        <CardTitle className="text-base">Geographic Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="location"
              tick={{ fontSize: 12 }}
              width={80}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
