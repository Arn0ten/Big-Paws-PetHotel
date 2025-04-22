"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Camera, Video, Scissors, Clock } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TbClockPlus } from "react-icons/tb";
import { IoVideocam } from "react-icons/io5";
import { BsFillCameraFill } from "react-icons/bs";
import { FaCut } from "react-icons/fa";

interface PopularRequestsChartProps {
  data: any[];
}

export function PopularRequestsChart({ data = [] }: PopularRequestsChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  /**
   * BACKEND INTEGRATION POINT: Popular Requests Data
   *
   * This component displays the distribution of request types.
   *
   * API Endpoint: GET /api/admin/analytics/popular-requests
   * Query Parameters:
   *   - period: "week" | "month" | "year" (optional, defaults to "month")
   *
   * Response Format:
   * [
   *   { name: "Photo", value: 45, color: "#3b82f6" },
   *   { name: "Video", value: 32, color: "#8b5cf6" },
   *   { name: "Grooming", value: 28, color: "#ec4899" },
   *   { name: "Extension", value: 15, color: "#f97316" }
   * ]
   *
   * Update Frequency: Daily or on-demand
   *
   * Implementation Notes:
   * 1. Replace the sample data with actual API calls
   * 2. Add loading states and error handling
   * 3. Consider adding time period filters (this week, this month, this year)
   * 4. Add ability to drill down into each request type for more details
   */

  // Get the icon for each request type
  const getRequestIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "photo":
        return (
          <BsFillCameraFill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        );
      case "video":
        return (
          <IoVideocam className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        );
      case "grooming":
        return <FaCut className="h-4 w-4 text-pink-600 dark:text-pink-400" />;
      case "extension":
        return (
          <TbClockPlus className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        );
      default:
        return (
          <BsFillCameraFill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        );
    }
  };

  // Handle pie chart segment hover
  const onPieEnter = (_: unknown, index: number): void => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Custom label for the pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    name: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // On small screens, show only percentages without labels
    if (isMobile) {
      return `${(percent * 100).toFixed(0)}%`;
    }
    // On medium screens, show abbreviated labels
    else if (isTablet) {
      return `${name.substring(0, 1)}. ${(percent * 100).toFixed(0)}%`;
    }
    // On large screens, show full labels
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-foreground">Popular Requests</CardTitle>
        <CardDescription>Most requested services by pet owners</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2 h-[300px] mb-6 lg:mb-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#fff" : "none"}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Requests"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() =>
                (window.location.href = "/webapp/admin/request-management")
              }
            >
              <motion.div
                className={`rounded-full p-2 flex-shrink-0`}
                style={{
                  backgroundColor: `${item.color}20`,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {getRequestIcon(item.name)}
              </motion.div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {item.name} Requests
                </p>
                <p className="text-xl font-bold text-foreground">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
