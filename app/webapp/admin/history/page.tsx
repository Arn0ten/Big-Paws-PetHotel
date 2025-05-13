"use client";

import {useState, useEffect, useRef} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
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
import {Calendar} from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {useToast} from "@/hooks/use-toast";
import {useMediaQuery} from "@/hooks/use-media-query";
import {
    Activity,
    CalendarIcon,
    Download,
    Filter,
    ImageIcon,
    Loader2,
    MoreHorizontal,
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
    Dog,
    Cat,
    X,
    Scissors,
    CalendarPlus,
} from "lucide-react";
import {formatCurrency, formatDate} from "./utils/helpers";
import {HistoryTableSkeleton} from "./components/history-table-skeleton";
import {MediaCardSkeleton} from "./components/media-card-skeleton";
import {MediaCard} from "./components/media-card";
import {
    type HistoryEntry,
    type MediaEntry,
    generateSampleHistoryData,
    generateSampleMediaData,
} from "@/app/webapp/admin/data/history-sample-data";
import {PaginationControls} from "@/app/webapp/admin/components/pagination-controls";
import {HistoryDetailsDialog} from "./components/history-details-dialog";
import {MdPets} from "react-icons/md";
import {HiUsers} from "react-icons/hi2";
import {RiCalendarScheduleFill} from "react-icons/ri";
import {
    VscGitPullRequestNewChanges,
    VscGitPullRequestGoToChanges,
} from "react-icons/vsc";
import {FaHistory} from "react-icons/fa";

import {useActivityHistory} from './hooks';
import {ActivityLog} from "@/types/preloadHistory";


// Update module names and icons
const getModuleIcon = (module: string) => {
    switch (module) {
        case "Pet Owner Management":
            return <HiUsers className="h-4 w-4 text-blue-500"/>;
        case "Pet Management":
            return <MdPets className="h-4 w-4 text-green-500"/>;
        case "Boarding Management":
            return <RiCalendarScheduleFill className="h-4 w-4 text-orange-500"/>;
        case "Request":
            return <FileText className="h-4 w-4 text-purple-500"/>;
        case "Request Management":
            return (
                <VscGitPullRequestGoToChanges className="h-4 w-4 text-indigo-500"/>
            );
        default:
            return <Activity className="h-4 w-4 text-gray-500"/>;
    }
};

// Update module labels
const getModuleLabel = (module: string) => {
    switch (module) {
        case "Pet Owner Management":
            return "Pet Owner Management";
        case "Pet Management":
            return "Pet Management";
        case "Boarding Management":
            return "Boarding Management";
        case "Request Management":
            return "Request Management";
        default:
            return module;
    }
};

// Update the getStatusBadge function to use solid backgrounds
const getStatusBadge = (status: string | undefined) => {
    switch (status) {
        case "completed":
            return (
                <Badge className="bg-green-600 text-white hover:bg-green-700 w-[100px] flex justify-center">
                    Completed
                </Badge>
            );
        case "pending":
            return (
                <Badge className="bg-yellow-600 text-white hover:bg-yellow-700 w-[100px] flex justify-center">
                    Pending
                </Badge>
            );
        case "active":
            return (
                <Badge className="bg-blue-600 text-white hover:bg-blue-700 w-[100px] flex justify-center">
                    Active
                </Badge>
            );
        case "deleted":
            return (
                <Badge className="bg-red-600 text-white hover:bg-red-700 w-[100px] flex justify-center">
                    Deleted
                </Badge>
            );
        case "updated":
            return (
                <Badge className="bg-purple-600 text-white hover:bg-purple-700 w-[100px] flex justify-center">
                    Updated
                </Badge>
            );
        default:
            return (
                <Badge className="bg-gray-600 text-white hover:bg-gray-700 w-[100px] flex justify-center">
                    Unknown
                </Badge>
            );
    }
};

// Update the getMediaTypeBadge function to include new request types
const getMediaTypeBadge = (mediaType: string) => {
    switch (mediaType) {
        case "PHOTO_REQUEST":
            return (
                <Badge className="bg-blue-600 text-white w-[80px] flex justify-center">
                    <ImageIcon className="h-3 w-3 mr-1"/>
                    Photo
                </Badge>
            );
        case "VIDEO_REQUEST":
            return (
                <Badge className="bg-purple-600 text-white w-[80px] flex justify-center">
                    <Video className="h-3 w-3 mr-1"/>
                    Video
                </Badge>
            );
        case "GROOMING_SERVICE":
            return (
                <Badge className="bg-green-600 text-white w-[90px] flex justify-center">
                    <Scissors className="h-3 w-3 mr-1"/>
                    Grooming
                </Badge>
            );
        case "BOARDING_EXTENSION":
            return (
                <Badge className="bg-orange-600 text-white w-[140px] flex justify-center">
                    <CalendarPlus className="h-3 w-3 mr-1"/>
                    Extension
                </Badge>
            );
        case "Dog":
            return (
                <Badge className="bg-blue-600 text-white w-[80px] flex justify-center">
                    <Dog className="h-3 w-3 mr-1"/>
                    Dog
                </Badge>
            );
        case "Cat":
            return (
                <Badge className="bg-purple-600 text-white w-[80px] flex justify-center">
                    <Cat className="h-3 w-3 mr-1"/>
                    Cat
                </Badge>
            );
        default:
            return (
                <Badge className="bg-gray-600 text-white w-[80px] flex justify-center">
                    Unknown
                </Badge>
            );
    }
};

export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState("activity");
    const [activityData, setActivityData] = useState<ActivityLog[]>([]);
    const [mediaData, setMediaData] = useState<MediaEntry[]>([]);
    const [filteredActivity, setFilteredActivity] = useState<ActivityLog[]>([]);
    const [filteredMedia, setFilteredMedia] = useState<MediaEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [moduleFilter, setModuleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const [mediaTypeFilter, setMediaTypeFilter] = useState("all");
    const [petOwnerFilter, setPetOwnerFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEntry, setSelectedEntry] = useState<ActivityLog | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<MediaEntry | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showMediaDetailsDialog, setShowMediaDetailsDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activityCurrentPage, setActivityCurrentPage] = useState(1);
    const [mediaCurrentPage, setMediaCurrentPage] = useState(1);
    const itemsPerPage = 10; // Standardized to 10 items per page
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const {toast} = useToast();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const {activities, isLoading: isActivitiesLoading} = useActivityHistory();


    useEffect(() => {
        if (!isActivitiesLoading) {
            setIsLoading(false);
        }
    }, [isActivitiesLoading]);


    useEffect(() => {
        if (activities) {
            setActivityData(activities);
            setFilteredActivity(activities);
        }
    }, [activities]);


    // Fetch history data on component mount
    useEffect(() => {
        setTimeout(() => {
            const sampleHistoryData = generateSampleHistoryData();

            const sampleMediaData = generateSampleMediaData(sampleHistoryData);
            setMediaData(sampleMediaData);
            setFilteredMedia(sampleMediaData);

            setIsLoading(false);
        }, 1000);
    }, []);

    // Apply filters to history data
    useEffect(() => {
        if (activityData.length === 0) return;
        let filtered = [...activityData];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((activity: ActivityLog) => {
                const searchableFields = [
                    activity.description ?? '',
                    activity.petName ?? '',
                    activity.ownerName ?? '',
                    activity.performedBy ?? '',
                    activity.activityType ?? ''
                ].map(field => field.toLowerCase());

                return searchableFields.some(field => field.includes(query));
            });
        }


        // Apply module filter
        if (moduleFilter !== "all") {
            filtered = filtered.filter((entry) => entry.activityType === moduleFilter);
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

        setFilteredActivity(filtered);
    }, [
        activityData,
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

    useEffect(() => {
        // Reset to page 1 when filters change
        if (activeTab === "activity") {
            setActivityCurrentPage(1);
        } else {
            setMediaCurrentPage(1);
        }
    }, [
        searchQuery,
        moduleFilter,
        statusFilter,
        dateFilter,
        mediaTypeFilter,
        petOwnerFilter,
        activeTab,
    ]);

    // Calculate pagination values for history data
    const totalHistoryItems = filteredActivity.length;
    const totalHistoryPages = Math.ceil(totalHistoryItems / itemsPerPage);
    const historyStartIndex = (activityCurrentPage - 1) * itemsPerPage;
    const historyEndIndex = Math.min(
        historyStartIndex + itemsPerPage,
        totalHistoryItems,
    );
    const currentHistoryItems = filteredActivity.slice(
        historyStartIndex,
        historyEndIndex,
    );

    // Calculate pagination values for media data
    const totalMediaItems = filteredMedia.length;
    const totalMediaPages = Math.ceil(totalMediaItems / itemsPerPage);
    const mediaStartIndex = (mediaCurrentPage - 1) * itemsPerPage;
    const mediaEndIndex = Math.min(
        mediaStartIndex + itemsPerPage,
        totalMediaItems,
    );
    const currentMediaItems = filteredMedia.slice(mediaStartIndex, mediaEndIndex);

    // Handle page change
    const handleActivityPageChange = (page: number) => {
        setActivityCurrentPage(page);
    };

    const handleMediaPageChange = (page: number) => {
        setMediaCurrentPage(page);
    };

    // Handle view details button click
    const handleViewDetails = (entry: ActivityLog) => {
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

        // setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Update local state
            setActivityData((prev) =>
                prev.filter((entry) => entry.id !== entryToDelete),
            );
            setFilteredActivity((prev) =>
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

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

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
                        <Activity className="h-4 w-4"/>
                        <span>Activity Log</span>
                    </TabsTrigger>
                    <TabsTrigger value="media" className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4"/>
                        <span>Media Archive</span>
                    </TabsTrigger>
                </TabsList>

                {/* Activity Log Tab */}
                <TabsContent value="activity" className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-row justify-between items-center gap-4 flex-wrap md:flex-nowrap">
                        {/* Left side - Search and Filters */}
                        <div className="flex flex-wrap gap-2 items-center order-1 md:order-1 w-full md:w-auto">
                            <div className="relative flex-1 min-w-0 md:w-[300px]">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {isSearching ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/>
                                    ) : (
                                        <Search className="h-4 w-4 text-muted-foreground"/>
                                    )}
                                </div>
                                <Input
                                    placeholder="Search by pet, owner, or description..."
                                    className="pl-9 h-10"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const query = e.target.value;
                                        setSearchQuery(query);
                                        setIsSearching(true);

                                        // Clear any existing timeout
                                        if (searchTimeoutRef.current) {
                                            clearTimeout(searchTimeoutRef.current);
                                        }

                                        // Set a new timeout for the search
                                        searchTimeoutRef.current = setTimeout(() => {
                                            // In a real implementation, you would call your API here
                                            setIsLoading(true);

                                            // Simulate API call
                                            setTimeout(() => {
                                                // Apply filters
                                                if (activeTab === "activity") {
                                                    let filtered = [...activityData];
                                                    if (query) {
                                                        const searchLower = query.toLowerCase();
                                                        filtered = filtered.filter(
                                                            (entry) =>
                                                                (entry.description &&
                                                                    entry.description
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.petName &&
                                                                    entry.petName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.ownerName &&
                                                                    entry.ownerName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.performedBy &&
                                                                    entry.performedBy
                                                                        .toLowerCase()
                                                                        .includes(searchLower)),
                                                        );
                                                    }
                                                    setFilteredActivity(filtered);
                                                } else {
                                                    let filtered = [...mediaData];
                                                    if (query) {
                                                        const searchLower = query.toLowerCase();
                                                        filtered = filtered.filter(
                                                            (entry) =>
                                                                (entry.description &&
                                                                    entry.description
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.petName &&
                                                                    entry.petName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.ownerName &&
                                                                    entry.ownerName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.completedBy &&
                                                                    entry.completedBy
                                                                        .toLowerCase()
                                                                        .includes(searchLower)),
                                                        );
                                                    }
                                                    setFilteredMedia(filtered);
                                                }

                                                setIsLoading(false);
                                                setIsSearching(false);
                                            }, 800);
                                        }, 300);
                                    }}
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setIsSearching(true);
                                            setIsLoading(true);

                                            // Simulate clearing search
                                            setTimeout(() => {
                                                if (activeTab === "activity") {
                                                    setFilteredActivity(activityData);
                                                } else {
                                                    setFilteredMedia(mediaData);
                                                }
                                                setIsLoading(false);
                                                setIsSearching(false);
                                            }, 300);
                                        }}
                                        aria-label="Clear search"
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>

                            <Select value={moduleFilter} onValueChange={setModuleFilter}>
                                <SelectTrigger className="w-[140px] h-10">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Filter className="h-3.5 w-3.5"/>
                                        <span className="truncate">
                      {moduleFilter === "all"
                          ? "All Modules"
                          : moduleFilter}
                    </span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Modules</SelectItem>
                                    <SelectItem value="pet-owner">
                                        Pet Owner Management
                                    </SelectItem>
                                    <SelectItem value="pet">Pet Management</SelectItem>
                                    <SelectItem value="boarding">Boarding Management</SelectItem>
                                    <SelectItem value="request">Requests</SelectItem>
                                    <SelectItem value="request-management">
                                        Request Management
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[140px] h-10">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Filter className="h-3.5 w-3.5"/>
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
                                            "w-[140px] h-10 justify-start text-left font-normal",
                                            !dateFilter && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
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

                            {(searchQuery ||
                                moduleFilter !== "all" ||
                                statusFilter !== "all" ||
                                dateFilter) && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setModuleFilter("all");
                                        setStatusFilter("all");
                                        setDateFilter(undefined);
                                    }}
                                    title="Clear filters"
                                >
                                    <X className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Activity Table */}
                    <Card>
                        <CardContent className="p-0">
                            {isLoading ? (
                                <div className="p-4 space-y-4">
                                    <HistoryTableSkeleton/>
                                </div>
                            ) : filteredActivity.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center">
                                    <Activity className="h-12 w-12 text-muted-foreground mb-4"/>
                                    <h3 className="text-lg font-medium">No activity found</h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Try adjusting your filters or search query
                                    </p>
                                </div>
                            ) : (
                                <>
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
                                                {currentHistoryItems.map((entry) => (
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
                                                                {getModuleIcon(entry.activityType)}
                                                                <span>{getModuleLabel(entry.activityType)}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{entry.description}</TableCell>
                                                        <TableCell>
                                                            {entry.petName && (
                                                                <div className="font-medium">
                                                                    {entry.petName}
                                                                </div>
                                                            )}
                                                            {entry.ownerName && (
                                                                <div className="text-sm text-muted-foreground">
                                                                    {entry.ownerName}
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {getStatusBadge("completed")}
                                                        </TableCell>
                                                        <TableCell
                                                            className="text-right"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreHorizontal className="h-4 w-4"/>
                                                                        <span className="sr-only">Actions</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator/>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleViewDetails(entry)}
                                                                    >
                                                                        <FileText
                                                                            className="h-4 w-4 mr-2 text-blue-500"/>
                                                                        View Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleDelete(entry.id)}
                                                                        className="text-red-600 dark:text-red-400"
                                                                    >
                                                                        <Trash2
                                                                            className="h-4 w-4 mr-2 text-red-500"/>
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

                                    {/* Standardized Pagination Controls */}
                                    <PaginationControls
                                        currentPage={activityCurrentPage}
                                        totalPages={totalHistoryPages}
                                        onPageChange={handleActivityPageChange}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Media Archive Tab */}
                <TabsContent value="media" className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-row justify-between items-center gap-4 flex-wrap md:flex-nowrap">
                        {/* Left side - Search and Filters */}
                        <div className="flex flex-wrap gap-2 items-center order-1 md:order-1 w-full md:w-auto">
                            <div className="relative flex-1 min-w-0 md:w-[300px]">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {isSearching ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground"/>
                                    ) : (
                                        <Search className="h-4 w-4 text-muted-foreground"/>
                                    )}
                                </div>
                                <Input
                                    placeholder="Search by pet, owner, or description..."
                                    className="pl-9 h-10"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const query = e.target.value;
                                        setSearchQuery(query);
                                        setIsSearching(true);

                                        // Clear any existing timeout
                                        if (searchTimeoutRef.current) {
                                            clearTimeout(searchTimeoutRef.current);
                                        }

                                        // Set a new timeout for the search
                                        searchTimeoutRef.current = setTimeout(() => {
                                            // In a real implementation, you would call your API here
                                            setIsLoading(true);

                                            // Simulate API call
                                            setTimeout(() => {
                                                // Apply filters
                                                if (activeTab === "activity") {
                                                    let filtered = [...activityData];
                                                    if (query) {
                                                        const searchLower = query.toLowerCase();
                                                        filtered = filtered.filter(
                                                            (entry) =>
                                                                (entry.description &&
                                                                    entry.description
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.petName &&
                                                                    entry.petName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.ownerName &&
                                                                    entry.ownerName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.performedBy &&
                                                                    entry.performedBy
                                                                        .toLowerCase()
                                                                        .includes(searchLower)),
                                                        );
                                                    }
                                                    setFilteredActivity(filtered);
                                                } else {
                                                    let filtered = [...mediaData];
                                                    if (query) {
                                                        const searchLower = query.toLowerCase();
                                                        filtered = filtered.filter(
                                                            (entry) =>
                                                                (entry.description &&
                                                                    entry.description
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.petName &&
                                                                    entry.petName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.ownerName &&
                                                                    entry.ownerName
                                                                        .toLowerCase()
                                                                        .includes(searchLower)) ||
                                                                (entry.completedBy &&
                                                                    entry.completedBy
                                                                        .toLowerCase()
                                                                        .includes(searchLower)),
                                                        );
                                                    }
                                                    setFilteredMedia(filtered);
                                                }

                                                setIsLoading(false);
                                                setIsSearching(false);
                                            }, 800);
                                        }, 300);
                                    }}
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs font-medium"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setIsSearching(true);
                                            setIsLoading(true);

                                            // Simulate clearing search
                                            setTimeout(() => {
                                                if (activeTab === "activity") {
                                                    setFilteredActivity(activityData);
                                                } else {
                                                    setFilteredMedia(mediaData);
                                                }
                                                setIsLoading(false);
                                                setIsSearching(false);
                                            }, 300);
                                        }}
                                        aria-label="Clear search"
                                    >
                                        Clear
                                    </Button>
                                )}
                            </div>

                            <Select
                                value={mediaTypeFilter}
                                onValueChange={setMediaTypeFilter}
                            >
                                <SelectTrigger className="w-[140px] h-10">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Filter className="h-3.5 w-3.5"/>
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
                                    <SelectItem value="grooming">Grooming</SelectItem>
                                    <SelectItem value="boarding-extension">
                                        Boarding Extension
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={petOwnerFilter} onValueChange={setPetOwnerFilter}>
                                <SelectTrigger className="w-[140px] h-10">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Filter className="h-3.5 w-3.5"/>
                                        <span className="truncate">
                      {petOwnerFilter === "all" ? "All Owners" : petOwnerFilter}
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
                                            "w-[140px] h-10 justify-start text-left font-normal",
                                            !dateFilter && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
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

                            {(searchQuery ||
                                mediaTypeFilter !== "all" ||
                                petOwnerFilter !== "all" ||
                                dateFilter) && (
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setMediaTypeFilter("all");
                                        setPetOwnerFilter("all");
                                        setDateFilter(undefined);
                                    }}
                                    title="Clear filters"
                                >
                                    <X className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Media Gallery */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                            <MediaCardSkeleton/>
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4"/>
                                <h3 className="text-lg font-medium">No media found</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Try adjusting your filters or search query
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {currentMediaItems.map((media) => (
                                    <MediaCard
                                        key={media.id}
                                        id={media.id}
                                        timestamp={media.timestamp}
                                        petName={media.petName}
                                        requestType={media.requestType === "PHOTO_REQUEST" || media.requestType === "VIDEO_REQUEST" ? media.requestType : "PHOTO_REQUEST"}
                                        description={media.description}
                                        mediaUrls={media.mediaUrls}
                                        onClick={() => handleViewMediaDetails(media)}
                                    />
                                ))}
                            </div>

                            {/* Standardized Pagination Controls */}
                            <PaginationControls
                                currentPage={mediaCurrentPage}
                                totalPages={totalMediaPages}
                                onPageChange={handleMediaPageChange}
                            />
                        </>
                    )}
                </TabsContent>
            </Tabs>

            {/* Details Dialog */}
            <HistoryDetailsDialog
                open={showDetailsDialog}
                onOpenChange={setShowDetailsDialog}
                entry={selectedEntry}
                onDelete={() => {
                    setShowDetailsDialog(false);
                    if (selectedEntry) {
                        handleDelete(selectedEntry.id);
                    }
                }}
                getModuleIcon={getModuleIcon}
                getModuleLabel={getModuleLabel}
                getStatusBadge={getStatusBadge}
            />

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
                                    {selectedMedia.requestType === "PHOTO_REQUEST" ? (
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
                                                        <ChevronLeft className="h-5 w-5 text-white"/>
                                                    </button>

                                                    <button
                                                        onClick={goToNextImage}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2"
                                                        aria-label="Next image"
                                                    >
                                                        <ChevronRight className="h-5 w-5 text-white"/>
                                                    </button>

                                                    {/* Pagination indicators */}
                                                    <div
                                                        className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                                        {selectedMedia.mediaUrls.map((_, idx) => (
                                                            <button
                                                                key={idx}
                                                                className={`h-1.5 rounded-full ${
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
                            <Download className="h-4 w-4 mr-2"/>
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
                            <Trash2 className="h-4 w-4 mr-2"/>
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
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4"/>
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
