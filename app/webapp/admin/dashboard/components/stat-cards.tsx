"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPaw } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaPesoSign } from "react-icons/fa6";

// Animation variants for summary card icons
const iconAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
    },
  },
};

interface StatCardsProps {
  data: any;
}

export function StatCards({ data }: StatCardsProps) {
  /**
   * BACKEND INTEGRATION POINT: Summary Statistics
   *
   * This component displays key metrics from the dashboard data.
   *
   * Data Required:
   * - activeBoardings: Number of currently boarding pets
   * - petCheckouts: Number of completed boardings
   * - pendingRequests: Number of pending requests
   * - registeredOwners: Number of registered pet owners
   * - revenue: Object containing daily, weekly, and monthly revenue
   *
   * API Endpoint: GET /api/admin/dashboard/stats
   * Update Frequency: Real-time or polling (every 1-5 minutes)
   *
   * Implementation Notes:
   * 1. Replace the sample data with actual API calls
   * 2. Add loading states and error handling
   * 3. Consider implementing WebSockets for real-time updates
   */

  // Fallback values if data is not available
  const {
    activeBoardings = 0,
    petCheckouts = 0,
    pendingRequests = 0,
    registeredOwners = 0,
    revenue = { daily: 0, weekly: 0, monthly: 0 },
  } = data || {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <Card
        className="overflow-hidden border-l-4 border-l-blue-500 cursor-pointer transition-all hover:shadow-md"
        onClick={() => (window.location.href = "/webapp/admin/boarding")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Pets Boarding
          </CardTitle>
          <motion.div
            className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={iconAnimation}
          >
            <FaPaw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {activeBoardings}
          </div>
          <div className="text-xs text-muted-foreground mt-1 w-full">
            Currently boarding pets
          </div>
        </CardContent>
      </Card>

      <Card
        className="overflow-hidden border-l-4 border-l-green-500 cursor-pointer transition-all hover:shadow-md"
        onClick={() => (window.location.href = "/webapp/admin/history")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Pet Checkouts
          </CardTitle>
          <motion.div
            className="rounded-full bg-green-100 p-2 dark:bg-green-900/30"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={iconAnimation}
          >
            <FaCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {petCheckouts}
          </div>
          <div className="text-xs text-muted-foreground mt-1 w-full">
            Released pets
          </div>
        </CardContent>
      </Card>

      <Card
        className="overflow-hidden border-l-4 border-l-purple-500 cursor-pointer transition-all hover:shadow-md"
        onClick={() => (window.location.href = "/webapp/admin/requests")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Pending Requests
          </CardTitle>
          <motion.div
            className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={iconAnimation}
          >
            <MdOutlinePendingActions className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {pendingRequests}
          </div>
          <div className="text-xs text-muted-foreground mt-1 w-full">
            Awaiting response
          </div>
        </CardContent>
      </Card>

      <Card
        className="overflow-hidden border-l-4 border-l-orange-500 cursor-pointer transition-all hover:shadow-md"
        onClick={() => (window.location.href = "/webapp/admin/pet-owners")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Registered Owners
          </CardTitle>
          <motion.div
            className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={iconAnimation}
          >
            <HiMiniUsers className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {registeredOwners}
          </div>
          <div className="text-xs text-muted-foreground mt-1 w-full">
            Total pet owners
          </div>
        </CardContent>
      </Card>

      <RevenueCard revenue={revenue} />
    </div>
  );
}

// Separate component for the revenue card with its own state
function RevenueCard({
  revenue,
}: {
  revenue: { daily: number; weekly: number; monthly: number };
}) {
  const [revenueView, setRevenueView] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const getCurrentRevenue = () => {
    if (!revenue) return 0;
    return revenue[revenueView] || 0;
  };

  return (
    <Card
      className="overflow-hidden border-l-4 border-l-pink-500 cursor-pointer transition-all hover:shadow-md"
      onClick={() => (window.location.href = "/webapp/admin/history")}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="text-sm font-medium text-foreground">
            Revenue
          </CardTitle>
          <div className="flex mt-1 space-x-1">
            <button
              className={`text-xs px-1.5 py-0.5 rounded ${revenueView === "daily" ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" : "text-muted-foreground"}`}
              onClick={(e) => {
                e.stopPropagation();
                setRevenueView("daily");
              }}
            >
              Daily
            </button>
            <button
              className={`text-xs px-1.5 py-0.5 rounded ${revenueView === "weekly" ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" : "text-muted-foreground"}`}
              onClick={(e) => {
                e.stopPropagation();
                setRevenueView("weekly");
              }}
            >
              Weekly
            </button>
            <button
              className={`text-xs px-1.5 py-0.5 rounded ${revenueView === "monthly" ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400" : "text-muted-foreground"}`}
              onClick={(e) => {
                e.stopPropagation();
                setRevenueView("monthly");
              }}
            >
              Monthly
            </button>
          </div>
        </div>
        <motion.div
          className="rounded-full bg-pink-100 p-2 dark:bg-pink-900/30"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconAnimation}
        >
          <FaPesoSign className="h-5 w-5 text-pink-600 dark:text-pink-400" />
        </motion.div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          ₱{getCurrentRevenue().toLocaleString()}
        </div>
        <div className="text-xs text-muted-foreground mt-1 w-full">
          {revenueView === "daily"
            ? "Today"
            : revenueView === "weekly"
              ? "This week"
              : "This month"}
        </div>
      </CardContent>
    </Card>
  );
}
