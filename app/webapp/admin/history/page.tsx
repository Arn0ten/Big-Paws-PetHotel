"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Activity,
  CalendarIcon,
  Download,
  Filter,
  Image,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash2,
  User,
  Video,
  PawPrint,
  Home,
  FileText,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatCurrency, formatDate } from "./utils/helpers";
import { HistoryTableSkeleton } from "./components/history-table-skeleton";
import { MediaCardSkeleton } from "./components/media-card-skeleton";
import { MediaCard } from "./components/media-card";
import {
  type HistoryEntry,
  type MediaEntry,
  generateSampleHistoryData,
  generateSampleMediaData,
} from "./data/sample-data";

// Update module names and icons
const getModuleIcon = (module: string) => {
  switch (module) {
    case "pet-owner":
      return <User className="h-4 w-4 text-blue-500" />;
    case "pet":
      return <PawPrint className="h-4 w-4 text-green-500" />;
    case "boarding":
      return <Home className="h-4 w-4 text-orange-500" />;
    case "request":
      return <FileText className="h-4 w-4 text-purple-500" />;
    case "request-management":
      return <CheckSquare className="h-4 w-4 text-indigo-500" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

// Update module labels
const getModuleLabel = (module: string) => {
  switch (module) {
    case "pet-owner":
      return "Pet Owner Management";
    case "pet":
      return "Pet Management";
    case "boarding":
      return "Boarding Management";
    case "request":
      return "Requests";
    case "request-management":
      return "Request Management";
    default:
      return module;
  }
};

// Helper function to render status badge
const getStatusBadge = (status: string | undefined) => {
  switch (status) {
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/50"
        >
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50"
        >
          Pending
        </Badge>
      );
    case "active":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50"
        >
          Active
        </Badge>
      );
    case "deleted":
      return (
        <Badge
          variant="outline"
          className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50"
        >
          Deleted
        </Badge>
      );
    case "updated":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50"
        >
          Updated
        </Badge>
      );
    default:
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-700/50"
        >
          Unknown
        </Badge>
      );
  }
};

// Helper function to render media type badge
const getMediaTypeBadge = (mediaType: string) => {
  switch (mediaType) {
    case "photo":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50"
        >
          <Image className="h-3 w-3 mr-1" />
          Photo
        </Badge>
      );
    case "video":
      return (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50"
        >
          <Video className="h-3 w-3 mr-1" />
          Video
        </Badge>
      );
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("activity");
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
  const [mediaData, setMediaData] = useState<MediaEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryEntry[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all");
  const [petOwnerFilter, setPetOwnerFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaEntry | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showMediaDetailsDialog, setShowMediaDetailsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // Fetch history data on component mount
  useEffect(() => {
    // BACKEND INTEGRATION: Replace with actual API call
    // Example:
    // const fetchHistoryData = async () => {
    //   try {
    //     setIsLoading(true)
    //     const response = await fetch('/api/admin/history')
    //     if (!response.ok) throw new Error('Failed to fetch history data')
    //     const data = await response.json()
    //     setHistoryData(data)
    //     setFilteredHistory(data)
    //     setIsLoading(false)
    //   } catch (error) {
    //     console.error('Error fetching history data:', error)
    //     toast({
    //       title: "Error",
    //       description: "Failed to load history data. Please try again.",
    //       variant: "destructive",
    //     })
    //     setIsLoading(false)
    //   }
    // }
    // fetchHistoryData()

    // Simulate API call with sample data
    setTimeout(() => {
      const sampleHistoryData = generateSampleHistoryData();
      setHistoryData(sampleHistoryData);
      setFilteredHistory(sampleHistoryData);

      const sampleMediaData = generateSampleMediaData(sampleHistoryData);
      setMediaData(sampleMediaData);
      setFilteredMedia(sampleMediaData);

      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters to history data
  useEffect(() => {
    if (historyData.length === 0) return;

    let filtered = [...historyData];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          (entry.description &&
            entry.description.toLowerCase().includes(query)) ||
          (entry.petName && entry.petName.toLowerCase().includes(query)) ||
          (entry.ownerName && entry.ownerName.toLowerCase().includes(query)) ||
          (entry.performedBy &&
            entry.performedBy.toLowerCase().includes(query)),
      );
    }

    // Apply module filter
    if (moduleFilter !== "all") {
      filtered = filtered.filter((entry) => entry.module === moduleFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((entry) => entry.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filterDate.setHours(0, 0, 0, 0);

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === filterDate.getTime();
      });
    }

    // Apply sort order
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredHistory(filtered);
  }, [
    historyData,
    searchQuery,
    moduleFilter,
    statusFilter,
    dateFilter,
    sortOrder,
  ]);

  // Apply filters to media data
  useEffect(() => {
    if (mediaData.length === 0) return;

    let filtered = [...mediaData];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (entry) =>
          (entry.description &&
            entry.description.toLowerCase().includes(query)) ||
          (entry.petName && entry.petName.toLowerCase().includes(query)) ||
          (entry.ownerName && entry.ownerName.toLowerCase().includes(query)) ||
          (entry.completedBy &&
            entry.completedBy.toLowerCase().includes(query)),
      );
    }

    // Apply media type filter
    if (mediaTypeFilter !== "all") {
      filtered = filtered.filter(
        (entry) => entry.requestType === mediaTypeFilter,
      );
    }

    // Apply pet owner filter
    if (petOwnerFilter !== "all") {
      filtered = filtered.filter((entry) => entry.ownerName === petOwnerFilter);
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filterDate.setHours(0, 0, 0, 0);

      filtered = filtered.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === filterDate.getTime();
      });
    }

    // Apply sort order
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredMedia(filtered);
  }, [
    mediaData,
    searchQuery,
    mediaTypeFilter,
    petOwnerFilter,
    dateFilter,
    sortOrder,
  ]);

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true);
    setSearchQuery("");
    setModuleFilter("all");
    setStatusFilter("all");
    setDateFilter(undefined);
    setMediaTypeFilter("all");
    setPetOwnerFilter("all");

    // BACKEND INTEGRATION: Replace with actual API call
    // Example:
    // const refreshData = async () => {
    //   try {
    //     const response = await fetch('/api/admin/history')
    //     if (!response.ok) throw new Error('Failed to fetch history data')
    //     const data = await response.json()
    //     setHistoryData(data)
    //     setFilteredHistory(data)
    //
    //     const mediaResponse = await fetch('/api/admin/media')
    //     if (!mediaResponse.ok) throw new Error('Failed to fetch media data')
    //     const mediaData = await mediaResponse.json()
    //     setMediaData(mediaData)
    //     setFilteredMedia(mediaData)
    //
    //     setIsLoading(false)
    //     toast({
    //       title: "Success",
    //       description: "Data refreshed successfully",
    //     })
    //   } catch (error) {
    //     console.error('Error refreshing data:', error)
    //     toast({
    //       title: "Error",
    //       description: "Failed to refresh data. Please try again.",
    //       variant: "destructive",
    //     })
    //     setIsLoading(false)
    //   }
    // }
    // refreshData()

    // Simulate API call with sample data
    setTimeout(() => {
      const sampleHistoryData = generateSampleHistoryData();
      setHistoryData(sampleHistoryData);
      setFilteredHistory(sampleHistoryData);

      const sampleMediaData = generateSampleMediaData(sampleHistoryData);
      setMediaData(sampleMediaData);
      setFilteredMedia(sampleMediaData);

      setIsLoading(false);
      toast({
        title: "Success",
        description: "Data refreshed successfully",
      });
    }, 1000);
  };

  // Handle view details button click
  const handleViewDetails = (entry: HistoryEntry) => {
    setSelectedEntry(entry);
    setShowDetailsDialog(true);
  };

  // Handle view media details button click
  const handleViewMediaDetails = (entry: MediaEntry) => {
    setSelectedMedia(entry);
    setCurrentImageIndex(0); // Reset to first image when opening
    setShowMediaDetailsDialog(true);
  };

  // Handle delete button click
  const handleDelete = (id: string) => {
    setEntryToDelete(id);
    setShowDeleteDialog(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!entryToDelete) return;

    setIsLoading(true);

    // BACKEND INTEGRATION: Replace with actual API call
    // Example:
    // const deleteEntry = async () => {
    //   try {
    //     const response = await fetch(`/api/admin/history/${entryToDelete}`, {
    //       method: 'DELETE',
    //     })
    //     if (!response.ok) throw new Error('Failed to delete entry')
    //
    //     // Update local state
    //     setHistoryData(prev => prev.filter(entry => entry.id !== entryToDelete))
    //     setFilteredHistory(prev => prev.filter(entry => entry.id !== entryToDelete))
    //
    //     // Also remove from media data if it exists there
    //     setMediaData(prev => prev.filter(entry => entry.id !== entryToDelete))
    //     setFilteredMedia(prev => prev.filter(entry => entry.id !== entryToDelete))
    //
    //     setIsLoading(false)
    //     toast({
    //       title: "Success",
    //       description: "Entry deleted successfully",
    //     })
    //   } catch (error) {
    //     console.error('Error deleting entry:', error)
    //     toast({
    //       title: "Error",
    //       description: "Failed to delete entry. Please try again.",
    //       variant: "destructive",
    //     })
    //     setIsLoading(false)
    //   }
    // }
    // deleteEntry()

    // Simulate API call
    setTimeout(() => {
      // Update local state
      setHistoryData((prev) =>
        prev.filter((entry) => entry.id !== entryToDelete),
      );
      setFilteredHistory((prev) =>
        prev.filter((entry) => entry.id !== entryToDelete),
      );

      // Also remove from media data if it exists there
      setMediaData((prev) =>
        prev.filter((entry) => entry.id !== entryToDelete),
      );
      setFilteredMedia((prev) =>
        prev.filter((entry) => entry.id !== entryToDelete),
      );

      setIsLoading(false);
      setShowDeleteDialog(false);
      setEntryToDelete(null);

      toast({
        title: "Success",
        description: "Entry deleted successfully",
      });
    }, 1000);
  };

  // BACKEND INTEGRATION: Implement this function to download media
  const handleDownload = (url: string, filename = "media") => {
    // For client-side download of a single file:
    window.open(url, "_blank");

    // For server-side handling with proper filename:
    // window.location.href = `/api/admin/media/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
  };

  // BACKEND INTEGRATION: Implement this function to download multiple media files as a zip
  const handleDownloadAll = (urls: string[], mediaId: string) => {
    // For multiple files, redirect to an API endpoint that will create a zip file
    // window.location.href = `/api/admin/media/download-zip?id=${mediaId}`;

    // For development, just download the first file
    if (urls.length > 0) {
      handleDownload(urls[0], `media-${mediaId}`);
    }
  };

  // Get unique pet owners for filter
  const uniquePetOwners = Array.from(
    new Set(mediaData.map((entry) => entry.ownerName)),
  );

  // Navigation for media carousel
  const goToPreviousImage = () => {
    if (!selectedMedia) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedMedia.mediaUrls.length - 1 : prev - 1,
    );
  };

  const goToNextImage = () => {
    if (!selectedMedia) return;
    setCurrentImageIndex((prev) =>
      prev === selectedMedia.mediaUrls.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          History
        </h1>
        <p className="text-muted-foreground">
          View historical data, activity logs, and media archives.
        </p>
      </div>

      <Tabs
        defaultValue="activity"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Activity Log</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Media Archive</span>
          </TabsTrigger>
        </TabsList>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by pet, owner, or description..."
                  className="pl-9 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {moduleFilter === "all"
                          ? "All Modules"
                          : getModuleLabel(moduleFilter)}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="pet-owner">
                      Pet Owner Management
                    </SelectItem>
                    <SelectItem value="pet">Pet Management</SelectItem>
                    <SelectItem value="boarding">
                      Boarding Management
                    </SelectItem>
                    <SelectItem value="request">Requests</SelectItem>
                    <SelectItem value="request-management">
                      Request Management
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {statusFilter === "all" ? "All Status" : statusFilter}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[140px] h-10 justify-start text-left font-normal",
                        !dateFilter && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter
                        ? format(dateFilter, "PPP")
                        : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                    />
                    {dateFilter && (
                      <div className="p-3 border-t border-border">
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => setDateFilter(undefined)}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="h-10 w-10 flex-shrink-0"
                  title="Refresh data"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Activity Table */}
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <HistoryTableSkeleton />
                </div>
              ) : filteredHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No activity found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Timestamp</TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Pet / Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((entry) => (
                        <TableRow
                          key={entry.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleViewDetails(entry)}
                        >
                          <TableCell className="font-medium">
                            {formatDate(entry.timestamp)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getModuleIcon(entry.module)}
                              <span>{getModuleLabel(entry.module)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell>
                            {entry.petName && (
                              <div className="font-medium">{entry.petName}</div>
                            )}
                            {entry.ownerName && (
                              <div className="text-sm text-muted-foreground">
                                {entry.ownerName}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(entry.status)}</TableCell>
                          <TableCell
                            className="text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleViewDetails(entry)}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(entry.id)}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Archive Tab */}
        <TabsContent value="media" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by pet, owner, or description..."
                  className="pl-9 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <Select
                  value={mediaTypeFilter}
                  onValueChange={setMediaTypeFilter}
                >
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {mediaTypeFilter === "all"
                          ? "All Media"
                          : mediaTypeFilter === "photo"
                            ? "Photos"
                            : "Videos"}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Media</SelectItem>
                    <SelectItem value="photo">Photos</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={petOwnerFilter}
                  onValueChange={setPetOwnerFilter}
                >
                  <SelectTrigger className="w-full sm:w-[140px] h-10">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {petOwnerFilter === "all"
                          ? "All Owners"
                          : petOwnerFilter}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Owners</SelectItem>
                    {uniquePetOwners.map((owner) => (
                      <SelectItem key={owner} value={owner}>
                        {owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[140px] h-10 justify-start text-left font-normal",
                        !dateFilter && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFilter
                        ? format(dateFilter, "PPP")
                        : "Filter by date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFilter}
                      onSelect={setDateFilter}
                      initialFocus
                    />
                    {dateFilter && (
                      <div className="p-3 border-t border-border">
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => setDateFilter(undefined)}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="h-10 w-10 flex-shrink-0"
                  title="Refresh data"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
              <MediaCardSkeleton />
            </div>
          ) : filteredMedia.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Image className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No media found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedia.map((media) => (
                <MediaCard
                  key={media.id}
                  id={media.id}
                  timestamp={media.timestamp}
                  petName={media.petName}
                  requestType={media.requestType}
                  description={media.description}
                  mediaUrls={media.mediaUrls}
                  onClick={() => handleViewMediaDetails(media)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "sm:max-w-md"} max-h-[90vh] overflow-y-auto`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">Activity Details</DialogTitle>
            <DialogDescription>
              Detailed information about this activity
            </DialogDescription>
          </DialogHeader>

          {selectedEntry && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Timestamp
                  </span>
                  <div className="text-base font-medium mt-1">
                    {formatDate(selectedEntry.timestamp)}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Module
                  </span>
                  <div className="text-base font-medium mt-1 flex items-center gap-2">
                    {getModuleIcon(selectedEntry.module)}
                    <span>{getModuleLabel(selectedEntry.module)}</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Description
                </span>
                <div className="text-base font-medium mt-1">
                  {selectedEntry.description}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Performed By
                </span>
                <div className="text-base font-medium mt-1">
                  {selectedEntry.performedBy}
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Status
                </span>
                <div className="text-base font-medium mt-1">
                  {getStatusBadge(selectedEntry.status)}
                </div>
              </div>

              {(selectedEntry.petName || selectedEntry.ownerName) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedEntry.petName && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Pet
                      </span>
                      <div className="text-base font-medium mt-1">
                        {selectedEntry.petName}
                      </div>
                    </div>
                  )}

                  {selectedEntry.ownerName && (
                    <div>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Owner
                      </span>
                      <div className="text-base font-medium mt-1">
                        {selectedEntry.ownerName}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedEntry.amount && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Amount
                  </span>
                  <div className="text-base font-medium mt-1 text-green-600 dark:text-green-400">
                    {formatCurrency(selectedEntry.amount)}
                  </div>
                </div>
              )}

              {/* Enhanced media display with support for multiple images */}
              {selectedEntry.mediaUrls &&
                selectedEntry.mediaUrls.length > 0 && (
                  <div>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Media ({selectedEntry.mediaUrls.length}{" "}
                      {selectedEntry.mediaUrls.length === 1 ? "item" : "items"})
                    </span>

                    {selectedEntry.mediaUrls.length === 1 ? (
                      // Single media display
                      <div className="mt-1 bg-muted rounded-md overflow-hidden">
                        {selectedEntry.mediaTypes &&
                        selectedEntry.mediaTypes[0] === "image" ? (
                          <img
                            src={
                              selectedEntry.mediaUrls[0] || "/placeholder.svg"
                            }
                            alt="Media"
                            className="w-full h-auto object-contain"
                          />
                        ) : (
                          <video
                            src={selectedEntry.mediaUrls[0]}
                            controls
                            className="w-full h-auto"
                          />
                        )}
                      </div>
                    ) : (
                      // Multiple media display with thumbnails
                      <div className="mt-1 space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          {selectedEntry.mediaUrls
                            .slice(0, 3)
                            .map((url, idx) => (
                              <div
                                key={idx}
                                className="bg-muted rounded-md overflow-hidden aspect-square"
                              >
                                {selectedEntry.mediaTypes &&
                                selectedEntry.mediaTypes[idx] === "image" ? (
                                  <img
                                    src={url || "/placeholder.svg"}
                                    alt={`Media ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-black">
                                    <Video className="h-6 w-6 text-white" />
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>

                        {selectedEntry.mediaUrls.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{selectedEntry.mediaUrls.length - 3} more items
                          </div>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            // Find the corresponding media entry and open the media details dialog
                            const mediaEntry = mediaData.find(
                              (m) => m.id === selectedEntry.id,
                            );
                            if (mediaEntry) {
                              setSelectedMedia(mediaEntry);
                              setCurrentImageIndex(0);
                              setShowDetailsDialog(false);
                              setShowMediaDetailsDialog(true);
                            }
                          }}
                        >
                          View All Media
                        </Button>
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDetailsDialog(false);
                if (selectedEntry) {
                  handleDelete(selectedEntry.id);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Details Dialog */}
      <Dialog
        open={showMediaDetailsDialog}
        onOpenChange={setShowMediaDetailsDialog}
      >
        <DialogContent
          className={`${isMobile ? "max-w-[95%]" : "max-w-3xl"} max-h-[90vh] overflow-y-auto`}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">Media Details</DialogTitle>
            <DialogDescription>
              Detailed view of the media request
            </DialogDescription>
          </DialogHeader>

          {selectedMedia && (
            <div className="space-y-4 py-4">
              {selectedMedia.mediaUrls.length > 0 && (
                <div className="space-y-4">
                  {selectedMedia.requestType === "photo" ? (
                    selectedMedia.mediaUrls.length === 1 ? (
                      <div className="bg-muted rounded-md overflow-hidden">
                        <img
                          src={selectedMedia.mediaUrls[0] || "/placeholder.svg"}
                          alt={`Photo of ${selectedMedia.petName}`}
                          className="w-full h-auto object-contain max-h-[400px]"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">
                          Media Gallery ({selectedMedia.mediaUrls.length} items)
                        </h3>

                        {/* Carousel for multiple images */}
                        <div className="relative bg-muted rounded-md overflow-hidden">
                          <img
                            src={
                              selectedMedia.mediaUrls[currentImageIndex] ||
                              "/placeholder.svg"
                            }
                            alt={`Photo ${currentImageIndex + 1} of ${selectedMedia.petName}`}
                            className="w-full h-auto object-contain max-h-[400px] mx-auto"
                          />

                          {/* Navigation controls */}
                          <button
                            onClick={goToPreviousImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-5 w-5 text-white" />
                          </button>

                          <button
                            onClick={goToNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-5 w-5 text-white" />
                          </button>

                          {/* Pagination indicators */}
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {selectedMedia.mediaUrls.map((_, idx) => (
                              <button
                                key={idx}
                                className={`h-1.5  => (
                              <button
                                key={idx}
                                className={\`h-1.5 rounded-full ${
                                  idx === currentImageIndex
                                    ? "w-4 bg-primary"
                                    : "w-1.5 bg-gray-300 dark:bg-gray-600"
                                }`}
                                onClick={() => setCurrentImageIndex(idx)}
                                aria-label={`Go to image ${idx + 1}`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Thumbnails for quick navigation */}
                        <div className="grid grid-cols-5 gap-2">
                          {selectedMedia.mediaUrls.map((url, idx) => (
                            <div
                              key={idx}
                              className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                                idx === currentImageIndex
                                  ? "border-primary"
                                  : "border-transparent"
                              }`}
                              onClick={() => setCurrentImageIndex(idx)}
                            >
                              <img
                                src={url || "/placeholder.svg"}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-auto aspect-square object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="bg-muted rounded-md overflow-hidden">
                      <video
                        src={selectedMedia.mediaUrls[0]}
                        controls
                        className="w-full h-auto max-h-[400px]"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Pet Name
                  </span>
                  <div className="text-base font-medium mt-1">
                    {selectedMedia.petName}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Owner Name
                  </span>
                  <div className="text-base font-medium mt-1">
                    {selectedMedia.ownerName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Request Type
                  </span>
                  <div className="text-base font-medium mt-1">
                    {getMediaTypeBadge(selectedMedia.requestType)}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Completed By
                  </span>
                  <div className="text-base font-medium mt-1">
                    {selectedMedia.completedBy}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Requested On
                  </span>
                  <div className="text-base font-medium mt-1">
                    {formatDate(selectedMedia.timestamp)}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Completed On
                  </span>
                  <div className="text-base font-medium mt-1">
                    {formatDate(selectedMedia.completedAt)}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Description
                </span>
                <div className="text-base mt-1">
                  {selectedMedia.description}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowMediaDetailsDialog(false)}
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // BACKEND INTEGRATION: Implement download functionality
                // For multiple media items, consider creating a zip file
                if (selectedMedia && selectedMedia.mediaUrls.length > 0) {
                  if (selectedMedia.mediaUrls.length === 1) {
                    // Download single file
                    handleDownload(
                      selectedMedia.mediaUrls[0],
                      `${selectedMedia.petName}-${selectedMedia.requestType}`,
                    );
                  } else {
                    // For multiple files, implement a zip download
                    handleDownloadAll(
                      selectedMedia.mediaUrls,
                      selectedMedia.id,
                    );
                  }
                }
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              {selectedMedia && selectedMedia.mediaUrls.length > 1
                ? "Download All"
                : "Download"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowMediaDetailsDialog(false);
                if (selectedMedia) {
                  handleDelete(selectedMedia.id);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              entry from the history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
