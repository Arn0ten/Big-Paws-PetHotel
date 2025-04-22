"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { exportToCsv, printChart } from "../utils/export-utils";
import { MdDownload } from "react-icons/md";
import { MdLocalPrintshop } from "react-icons/md";

interface RequestTrendChartProps {
  data: any[];
}

export function RequestTrendChart({ data = [] }: RequestTrendChartProps) {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days">(
    "30days",
  );

  /**
   * BACKEND INTEGRATION POINT: Request Trend Data
   *
   * This component displays the trend of service requests over time.
   *
   * API Endpoint: GET /api/admin/analytics/request-trends
   * Query Parameters:
   *   - timeRange: "7days" | "30days" | "90days"
   *   - startDate (optional): ISO date string
   *   - endDate (optional): ISO date string
   *
   * Response Format:
   * [
   *   { date: "Jun 1", requests: 42 },
   *   { date: "Jun 2", requests: 45 },
   *   ...
   * ]
   *
   * Update Frequency: Daily or on-demand when timeRange changes
   *
   * Implementation Notes:
   * 1. Replace the sample data with actual API calls
   * 2. Add loading states and error handling
   * 3. Consider adding date range picker for custom time ranges
   * 4. Add ability to filter by request type
   */

  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!data || data.length === 0) return [];

    let daysToShow = 30;

    switch (timeRange) {
      case "7days":
        daysToShow = 7;
        break;
      case "30days":
        daysToShow = 30;
        break;
      case "90days":
        daysToShow = 90;
        break;
    }

    // Return the last X days of data
    return data.slice(-daysToShow);
  };

  const filteredData = getFilteredData();

  // Handle CSV export
  const handleExportCsv = () => {
    try {
      exportToCsv(filteredData, "request-trends.csv");
      toast({
        title: "Export successful",
        description: "Request trend data has been exported to CSV",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      });
    }
  };

  // Handle chart printing
  const handlePrintChart = () => {
    try {
      printChart("request-trend-chart", "Request Trends");
      toast({
        title: "Print initiated",
        description: "The chart print dialog has been opened",
      });
    } catch (error) {
      toast({
        title: "Print failed",
        description: "There was an error printing the chart",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Request Trend</CardTitle>
          <CardDescription>
            Pet owner service requests over time
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border overflow-hidden">
            <Button
              variant={timeRange === "7days" ? "default" : "ghost"}
              size="sm"
              className="rounded-none text-xs h-8"
              onClick={() => setTimeRange("7days")}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === "30days" ? "default" : "ghost"}
              size="sm"
              className="rounded-none text-xs h-8"
              onClick={() => setTimeRange("30days")}
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === "90days" ? "default" : "ghost"}
              size="sm"
              className="rounded-none text-xs h-8"
              onClick={() => setTimeRange("90days")}
            >
              90 Days
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCsv}>
                <MdDownload className="mr-2 h-4 w-4 text-blue-500" />
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrintChart}>
                <MdLocalPrintshop className="mr-2 h-4 w-4 text-purple-500" />
                Print Chart
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" id="request-trend-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ccc"
                opacity={0.3}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  // On small screens, show fewer ticks
                  if (
                    typeof window !== "undefined" &&
                    window.innerWidth < 768
                  ) {
                    // Only show every 5th date
                    const day = Number.parseInt(value.split(" ")[1]);
                    return day % 5 === 0 ? `${day}` : "";
                  }
                  return value;
                }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                width={40}
                tickFormatter={(value) => value}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
                formatter={(value) => [`${value} requests`, "Requests"]}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorRequests)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
