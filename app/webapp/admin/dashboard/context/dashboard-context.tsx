"use client";

import { createContext } from "react";

// Define the shape of your revenue data
interface RevenueData {
  day?: string;
  week?: string;
  month?: string;
  amount: number;
}

// Define the shape of your dashboard data
interface DashboardData {
  dailyRevenue: RevenueData[];
  weeklyRevenue: RevenueData[];
  monthlyRevenue: RevenueData[];
  // Add other properties as needed
}

// Define the context type
interface DashboardContextProps {
  dashboardData: DashboardData | null;
  setDashboardData: (data: DashboardData | null) => void;
  revenueView: "daily" | "weekly" | "monthly";
  setRevenueView: (view: "daily" | "weekly" | "monthly") => void;
}

// Create the dashboard context
export const DashboardContext = createContext<DashboardContextProps>({
  dashboardData: null,
  setDashboardData: () => {},
  revenueView: "daily",
  setRevenueView: () => {},
});

// Dashboard data provider component
import { ReactNode } from "react";

export function DashboardDataProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: DashboardContextProps;
}) {
  /**
   * BACKEND INTEGRATION POINT: Dashboard Context
   *
   * This context provides dashboard data to all dashboard components.
   * In a production environment, this would be connected to your backend API.
   *
   * Implementation Notes:
   * 1. Replace the static value with data fetched from your API
   * 2. Add loading states and error handling
   * 3. Consider implementing caching for performance
   * 4. Add refresh mechanisms for real-time updates
   */

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
