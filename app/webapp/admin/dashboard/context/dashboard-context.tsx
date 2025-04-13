"use client"

import { createContext, useState } from "react"

// Create the dashboard context
export const DashboardContext = createContext({
  dashboardData: null,
  revenueView: "daily",
  setRevenueView: (view) => {},
})

// Provider component
export function DashboardDataProvider({ children, value }) {
  const [revenueView, setRevenueView] = useState(value.revenueView || "daily")

  // Create the context value with the state and setter
  const contextValue = {
    dashboardData: value.dashboardData,
    revenueView,
    setRevenueView,
  }

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>
}
