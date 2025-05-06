"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ThumbsUp,
  ThumbsDown,
  CalendarIcon,
  Search,
  Eye,
  Mail,
  Phone,
  X,
} from "lucide-react";
import { formatDate } from "@/app/webapp/admin/request-management/utils/ui-helpers";
import { ConfirmationDialog } from "./confirm-dialog";
import { RegistrationDetailsDialog } from "./registration-details-dialog";
import { useToast } from "@/hooks/use-toast";
import type { PendingRegistration } from "../types";
import { MdLocationOn } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface PendingRegistrationTableProps {
  registrations: PendingRegistration[];
}

export function PendingRegistrationTable({
  registrations,
}: PendingRegistrationTableProps) {
  // Update the state management to handle real-time updates
  // Modify the filteredRegistrations logic to focus on date filtering
  // Update the handleApprove and handleReject functions

  // Replace the useState for registrations at the top of the component
  const [registrationList, setRegistrationList] =
    useState<PendingRegistration[]>(registrations);
  const [searchQuery, setSearchQuery] = useState("");
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<PendingRegistration | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Replace the dateFilter state with this simplified version
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Replace the filteredRegistrations logic with this
  const filteredRegistrations = registrationList.filter((registration) => {
    // Search filter
    const matchesSearch =
      registration.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      registration.phone.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter
    let matchesDateFilter = true;
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filterDate.setHours(0, 0, 0, 0);

      const regDate = new Date(registration.registrationDate);
      regDate.setHours(0, 0, 0, 0);

      matchesDateFilter = regDate.getTime() === filterDate.getTime();
    }

    return matchesSearch && matchesDateFilter;
  });

  // Replace the handleApprove function with this
  const handleApprove = async () => {
    if (!selectedRegistration) return;

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update local state immediately
      setRegistrationList((prev) =>
        prev.filter((reg) => reg.id !== selectedRegistration.id),
      );

      toast({
        title: "Registration Approved",
        description: `${selectedRegistration.fullName}'s registration has been approved and moved to Pet Owner Management.`,
        variant: "success",
      });

      // Close dialog
      setApproveDialogOpen(false);
      setSelectedRegistration(null);

      /* 
      // Backend implementation would include:
      // 1. Update registration status to "approved" in the database
      // 2. Create a new pet owner record with the registration data
      // 3. Send welcome email to the new pet owner
      // 4. Generate credentials for the pet owner portal
      */
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Replace the handleReject function with this
  const handleReject = async () => {
    if (!selectedRegistration) return;

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update local state immediately
      setRegistrationList((prev) =>
        prev.filter((reg) => reg.id !== selectedRegistration.id),
      );

      toast({
        title: "Registration Rejected",
        description: `${selectedRegistration.fullName}'s registration has been rejected.`,
        variant: "default",
      });

      // Close dialog
      setRejectDialogOpen(false);
      setSelectedRegistration(null);

      /*
      // Backend implementation would include:
      // 1. Update registration status to "rejected" in the database
      // 2. Optionally send notification email to the applicant
      // 3. Store rejection reason if provided
      */
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewDetails = (registration: PendingRegistration) => {
    setSelectedRegistration(registration);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-20"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                onClick={() => setSearchQuery("")}
                className="absolute right-0 top-0 h-10 px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Replace the date filter UI with this calendar-based filter */}

        <div className="flex gap-2 items-center">
          <span className="text-sm whitespace-nowrap">Date:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[140px] h-10 justify-start text-left font-normal",
                  !dateFilter && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter
                  ? format(new Date(dateFilter), "PPP")
                  : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFilter ? new Date(dateFilter) : undefined}
                onSelect={(date) =>
                  setDateFilter(date ? date.toISOString().slice(0, 10) : null)
                }
                initialFocus
              />
              {dateFilter && (
                <div className="p-3 border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setDateFilter(null)}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text">Name</TableHead>
              <TableHead className="text">Contact</TableHead>
              <TableHead className="text">Registration Date</TableHead>
              <TableHead className="text">Status</TableHead>
              <TableHead className="text-end">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No pending registrations found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRegistrations.map((registration) => (
                <TableRow
                  key={registration.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={(e) => {
                    // Only open details if not clicking on an action button
                    if (!(e.target as HTMLElement).closest("button")) {
                      handleViewDetails(registration);
                    }
                  }}
                >
                  <TableCell className="font-medium">
                    {registration.fullName}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm">
                        <IoMail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {registration.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <FaPhone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        {registration.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(registration.registrationDate)}
                  </TableCell>
                  <TableCell>
                    {/* Update the Status badge in the table to use solid colors */}
                    {/* Replace the Badge component in the TableCell for Status with: */}
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none">
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleViewDetails(registration);
                        }}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-100"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          setSelectedRegistration(registration);
                          setApproveDialogOpen(true);
                        }}
                        title="Approve"
                      >
                        <FaThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-100"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          setSelectedRegistration(registration);
                          setRejectDialogOpen(true);
                        }}
                        title="Reject"
                      >
                        <FaThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        onConfirm={handleApprove}
        isLoading={isProcessing}
        title="Approve Registration"
        description={`Are you sure you want to approve ${selectedRegistration?.fullName}'s registration?`}
        type="approve"
      />

      <ConfirmationDialog
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onConfirm={handleReject}
        isLoading={isProcessing}
        title="Reject Registration"
        description={`Are you sure you want to reject ${selectedRegistration?.fullName}'s registration?`}
        type="reject"
      />

      {/* Details Dialog */}
      {selectedRegistration && (
        <RegistrationDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          registration={selectedRegistration}
          onApprove={() => {
            setDetailsDialogOpen(false);
            setApproveDialogOpen(true);
          }}
          onReject={() => {
            setDetailsDialogOpen(false);
            setRejectDialogOpen(true);
          }}
        />
      )}
    </div>
  );
}
