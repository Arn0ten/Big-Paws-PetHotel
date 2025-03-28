"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Search,
  Loader2,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { motion } from "framer-motion";
import { MediaCard } from "@/app/webapp/components/media-card";
import { getMediaItems } from "@/app/webapp/data/sample-data";

// BACKEND INTEGRATION: Implement this function to fetch media data from the API
async function fetchMediaItems() {
  // Example implementation:
  // try {
  //   const response = await fetch('/api/pet-owner/media');
  //   if (!response.ok) throw new Error('Failed to fetch media data');
  //   return await response.json();
  // } catch (error) {
  //   console.error('Error fetching media data:', error);
  //   return [];
  // }

  // For development, return mock data
  return new Promise((resolve) => {
    setTimeout(() => resolve(getMediaItems()), 500);
  });
}

export default function MediaArchivePage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch media items on component mount
  useEffect(() => {
    const loadMediaItems = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMediaItems();
        setItems(data);
      } catch (error) {
        console.error("Error loading media items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMediaItems();
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleMediaClick = (item) => {
    setSelectedMedia(item);
    setCurrentImageIndex(0); // Reset to first image when opening
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

  // BACKEND INTEGRATION: Implement this function to download media
  const handleDownload = (url: string, filename = "media") => {
    // For client-side download of a single file:
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // For server-side handling of multiple files (creating a zip):
    // window.location.href = `/api/pet-owner/media/download?ids=${selectedMedia?.id}`;
  };

  // BACKEND INTEGRATION: Implement this function to download multiple media files as a zip
  const handleDownloadAll = (urls: string[], mediaId: string) => {
    // For multiple files, redirect to an API endpoint that will create a zip file
    // window.location.href = `/api/pet-owner/media/download-zip?id=${mediaId}`;

    // For development, just download the first file
    if (urls.length > 0) {
      handleDownload(urls[0], `${selectedMedia?.petName}-media`);
    }
  };

  const filteredItems = items.filter((item) => {
    const searchMatch =
      item.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const typeMatch =
      selectedType === "all" || item.requestType === selectedType;

    const dateMatch =
      !dateRange?.from ||
      (item.timestamp >= dateRange.from &&
        (!dateRange.to || item.timestamp <= dateRange.to));

    return searchMatch && typeMatch && dateMatch;
  });

  return (
    <div className="px-3 sm:px-4 md:container mx-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">
              Media Archive
            </h1>
            <p className="text-base text-muted-foreground dark:text-muted-foreground/90">
              View and see your media requests archive
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <div className="relative flex-1 min-w-[140px]">
            {isSearching ? (
              <Loader2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              type="text"
              placeholder="Search..."
              className="pl-8 h-9"
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
                  setIsLoading(true);
                  // Simulate API call with a delay
                  setTimeout(() => {
                    setIsLoading(false);
                    setIsSearching(false);
                  }, 500);
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
                  setIsSearching(false);
                  // Simulate clearing search results
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                  }, 300);
                }}
                aria-label="Clear search"
              >
                Clear
              </Button>
            )}
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="h-9 w-[110px]">
              <div className="flex items-center gap-1.5 text-sm">
                <Filter className="h-3.5 w-3.5" />
                <span className="truncate">
                  {selectedType === "all"
                    ? "All"
                    : selectedType === "photo"
                      ? "Photos"
                      : "Videos"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="photo">Photos</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-2.5">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from && (
                  <span className="ml-2 text-xs hidden sm:inline">
                    {format(dateRange.from, "MMM d")}
                    {dateRange.to && ` - ${format(dateRange.to, "MMM d")}`}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="flex flex-col">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  disabled={{ after: new Date() }}
                  numberOfMonths={1}
                  pagedNavigation
                />
                {dateRange?.from && (
                  <div className="p-2 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => setDateRange(undefined)}
                    >
                      Clear Date Filter
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-md overflow-hidden">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="p-2 space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          // No results
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              No media found matching your filters
            </div>
          </div>
        ) : (
          // Media grid
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-2 md:gap-4"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MediaCard
                  id={item.id}
                  timestamp={item.timestamp}
                  petName={item.petName}
                  requestType={item.requestType as "photo" | "video"}
                  description={item.description}
                  mediaUrls={item.mediaUrls}
                  onClick={() => handleMediaClick(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedMedia && (
          <Drawer open={!!selectedMedia} onOpenChange={handleCloseMedia}>
            <DrawerContent className="max-h-[90vh] sm:max-h-[85vh]">
              <DrawerHeader className="py-2">
                <DrawerTitle>{selectedMedia.petName}</DrawerTitle>
                <DrawerDescription className="text-xs">
                  {selectedMedia.description}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-2 relative">
                {selectedMedia.requestType === "photo" &&
                  selectedMedia.mediaUrls.length > 0 && (
                    <>
                      {selectedMedia.mediaUrls.length > 1 ? (
                        <Carousel
                          mediaUrls={selectedMedia.mediaUrls}
                          petName={selectedMedia.petName}
                          currentIndex={currentImageIndex}
                          setCurrentIndex={setCurrentImageIndex}
                        />
                      ) : (
                        <img
                          src={selectedMedia.mediaUrls[0] || "/placeholder.svg"}
                          alt={`Photo of ${selectedMedia.petName}`}
                          className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain rounded-md mx-auto"
                        />
                      )}
                    </>
                  )}
                {selectedMedia.requestType === "video" &&
                  selectedMedia.mediaUrls[0] && (
                    <video
                      src={selectedMedia.mediaUrls[0]}
                      className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain rounded-md mx-auto"
                      controls
                      autoPlay
                    />
                  )}
              </div>
              <DrawerFooter className="py-2 flex flex-row justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    selectedMedia.mediaUrls.length > 1
                      ? handleDownloadAll(
                          selectedMedia.mediaUrls,
                          selectedMedia.id,
                        )
                      : handleDownload(
                          selectedMedia.mediaUrls[0],
                          `${selectedMedia.petName}-media`,
                        )
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  {selectedMedia.mediaUrls.length > 1
                    ? "Download All"
                    : "Download"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" size="sm">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}

interface CarouselProps {
  mediaUrls: string[];
  petName: string;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

function Carousel({
  mediaUrls,
  petName,
  currentIndex,
  setCurrentIndex,
}: CarouselProps) {
  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? mediaUrls.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === mediaUrls.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <div className="relative">
      <img
        src={mediaUrls[currentIndex] || "/placeholder.svg"}
        alt={`Photo ${currentIndex + 1} of ${petName}`}
        className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain rounded-md mx-auto"
      />

      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
        {mediaUrls.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full ${
              index === currentIndex
                ? "w-4 bg-primary"
                : "w-1.5 bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 dark:bg-white/30 rounded-full p-1.5 touch-manipulation"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-gray-900" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 dark:bg-white/30 rounded-full p-1.5 touch-manipulation"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white dark:text-gray-900" />
      </button>
    </div>
  );
}
