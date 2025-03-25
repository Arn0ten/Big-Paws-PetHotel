"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Search, RefreshCw, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onSearch: (term: string) => void;
  onFilterBoardingStatus: (status: string) => void;
  onFilterPaymentStatus: (status: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  isSearching?: boolean;
}

export function FilterBar({
  onSearch,
  onFilterBoardingStatus,
  onFilterPaymentStatus,
  onRefresh,
  isLoading = false,
  isRefreshing = false,
  isSearching = false,
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle real-time search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleRefreshClick = () => {
    onRefresh();
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      setSearchTerm("");
    }
  };

  const handleFilterBoardingStatus = (status: string) => {
    onFilterBoardingStatus(status);
  };

  const handleFilterPaymentStatus = (status: string) => {
    onFilterPaymentStatus(status);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1 flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search by pet or owner name..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
            ref={searchInputRef}
          />
          <div className="absolute left-2.5 top-2.5">
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefreshClick}
          disabled={isRefreshing}
          className="h-10 w-10 flex-shrink-0"
          title="Refresh data"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          <span className="sr-only">Refresh</span>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select onValueChange={handleFilterBoardingStatus} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Boarding Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Boarding">Boarding</SelectItem>
            <SelectItem value="Done Boarding">Done Boarding</SelectItem>
            <SelectItem value="Released">Released</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleFilterPaymentStatus} defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Not Paid">Not Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
