"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { motion } from "framer-motion";
import { MediaCard } from "@/app/webapp/components/media-card";

interface MediaItem {
  id: string;
  timestamp: Date;
  petName: string;
  requestType: "photo" | "video";
  description: string;
  mediaUrls: string[];
}

// BACKEND INTEGRATION: Replace this with actual API call to fetch media data
// Sample data for development purposes
const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    timestamp: new Date(),
    petName: "Buddy",
    requestType: "photo",
    description: "Buddy's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-8H6pSDIqmQ3m9rg84YuGhB8TAiCYEv.jpeg",
    ],
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    petName: "Whiskers",
    requestType: "video",
    description: "Whiskers playing with a toy",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481817843_9277714875675610_7115125575926345799_n-lCz1vZTDTYlcmAGIgVjrqw52ElqlYm.mp4",
    ],
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    petName: "Charlie",
    requestType: "photo",
    description: "Charlie's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475884722_1437552477217404_9052949441849644312_n.jpg-dbCP39F5PsvkEXA5fu5b3DrhSH0kRT.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480491302_9250055781727301_8238070743716968783_n.jpg-zuHWDIFIvZYglrA4tCl9zEshPDo7E8.jpeg",
    ],
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 259200000), // 3 days ago
    petName: "Daisy",
    requestType: "photo",
    description: "Daisy's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-neY2SryyFSDQbBaJ9JHrZCSqyq4uKg.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-DGzfDxX7zSuLJmWJLi0kIgtf4g8rI5.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-4Vb1Wt169NtXEbceqxxB4mSRt55chU.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-8H6pSDIqmQ3m9rg84YuGhB8TAiCYEv.jpeg",
    ],
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 345600000), // 4 days ago
    petName: "Rocky",
    requestType: "video",
    description: "Rocky playing in the yard",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481817843_9277714875675610_7115125575926345799_n-lCz1vZTDTYlcmAGIgVjrqw52ElqlYm.mp4",
    ],
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 432000000), // 5 days ago
    petName: "Bella",
    requestType: "photo",
    description: "Bella's grooming session",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-DGzfDxX7zSuLJmWJLi0kIgtf4g8rI5.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-4Vb1Wt169NtXEbceqxxB4mSRt55chU.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
    ],
  },
];

// BACKEND INTEGRATION: Implement this function to fetch media data from the API
async function fetchMediaItems(): Promise<MediaItem[]> {
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
    setTimeout(() => resolve(mockMediaItems), 500);
  });
}

export default function MediaArchivePage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleMediaClick = (item: MediaItem) => {
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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Media Archive</h1>
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          <div className="flex-1 min-w-[180px]">
            <Input
              type="text"
              placeholder="Search by pet name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-auto min-w-[140px]">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Media Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Media Types</SelectItem>
                <SelectItem value="photo">Photo</SelectItem>
                <SelectItem value="video">Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-auto min-w-[180px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange?.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
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
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
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
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"
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
            <DrawerContent className="max-h-[80vh] sm:max-h-[85vh]">
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
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/30 dark:bg-white/20 rounded-full p-1"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/30 dark:bg-white/20 rounded-full p-1"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
