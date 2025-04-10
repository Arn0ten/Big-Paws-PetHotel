"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BoardingOrder } from "../types";
import {
  CalendarClock,
  CheckCircle,
  AlertTriangle,
  LogOut,
} from "lucide-react";

interface StatsCardsProps {
  boardingOrders: BoardingOrder[];
  isLoading?: boolean;
  onCardClick?: (tabValue: string) => void; // Add this prop for card click handling
}

export function StatsCards({
  boardingOrders,
  isLoading = false,
  onCardClick,
}: StatsCardsProps) {
  // Calculate statistics
  const totalBoardings = boardingOrders.length;

  const activeBoardings = boardingOrders.filter(
    (order) => order.boardingStatus === "Boarding",
  ).length;

  const completedBoardings = boardingOrders.filter(
    (order) => order.boardingStatus === "Done Boarding",
  ).length;

  const releasedPets = boardingOrders.filter(
    (order) => order.boardingStatus === "Released",
  ).length;

  const overduePickups = boardingOrders.filter(
    (order) => order.isOverdue,
  ).length;

  // Handle card click
  const handleCardClick = (tabValue: string) => {
    if (onCardClick) {
      onCardClick(tabValue);
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        className="bg-blue-600 text-white border-blue-700 transition-all hover:shadow-md cursor-pointer"
        onClick={() => handleCardClick("all")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Total Boardings
          </CardTitle>
          <CalendarClock className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalBoardings}</div>
          <p className="text-xs text-blue-100">All boarding records</p>
        </CardContent>
      </Card>

      <Card
        className="bg-green-600 text-white border-green-700 transition-all hover:shadow-md cursor-pointer"
        onClick={() => handleCardClick("active")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Active Boardings
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{activeBoardings}</div>
          <p className="text-xs text-green-100">
            {completedBoardings} ready for pickup
          </p>
        </CardContent>
      </Card>
      <Card
        className={`${overduePickups > 0 ? "bg-red-600 text-white border-red-700" : "bg-gray-600 text-white border-gray-700"} transition-all hover:shadow-md cursor-pointer`}
        onClick={() => handleCardClick("overdue")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Overdue Pickups
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{overduePickups}</div>
          <p className="text-xs text-white/80">
            {overduePickups > 0
              ? "Requires immediate attention"
              : "No overdue pickups"}
          </p>
        </CardContent>
      </Card>
      <Card
        className="bg-purple-600 text-white border-purple-700 transition-all hover:shadow-md cursor-pointer"
        onClick={() => handleCardClick("released")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">
            Released Pets
          </CardTitle>
          <LogOut className="h-4 w-4 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{releasedPets}</div>
          <p className="text-xs text-purple-100">Completed boardings</p>
        </CardContent>
      </Card>

      
    </div>
  );
}
