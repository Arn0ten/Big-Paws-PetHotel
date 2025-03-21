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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { motion } from "framer-motion";
import { MediaCard } from "@/app/webapp/components/media-card";

interface MediaItem {
  id: string;
  timestamp: Date;
  petName: string;
  requestType: string;
  description: string;
  mediaUrls: string[];
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    timestamp: new Date(),
    petName: "Buddy",
    requestType: "photo",
    description: "Buddy looking cute",
    mediaUrls: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg"],
  },
  {
    id: "2",
    timestamp: new Date(),
    petName: "Whiskers",
    requestType: "video",
    description: "Whiskers playing with a toy",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481813534_9269122403125682_8683199565701118176_n-YujoMBZG0mFO5VkwYqBIUTYsW1DMhu.mp4",
    ],
  },
  {
    id: "3",
    timestamp: new Date(),
    petName: "Charlie",
    requestType: "photo",
    description: "Charlie sleeping",
    mediaUrls: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg"],
  },
  {
    id: "4",
    timestamp: new Date(),
    petName: "Daisy",
    requestType: "photo",
    description: "Daisy in the garden",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
    ],
  },
  {
    id: "5",
    timestamp: new Date(),
    petName: "Rocky",
    requestType: "video",
    description: "Rocky barking at the mailman",
    mediaUrls: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481813534_9269122403125682_8683199565701118176_n-YujoMBZG0mFO5VkwYqBIUTYsW1DMhu.mp4"],
  },
  {
    id: "6",
    timestamp: new Date(),
    petName: "Bella",
    requestType: "photo",
    description: "Bella on the couch",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-eBCIfrOnAMU3j7AdmdBsFEHVtwj1B3.jpeg",
    ],
  },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getMediaTypeBadge(type: string) {
  if (type === "photo") {
    return <Badge variant="secondary">Photo</Badge>;
  } else if (type === "video") {
    return <Badge variant="secondary">Video</Badge>;
  } else {
    return <Badge variant="secondary">Unknown</Badge>;
  }
}

export default function IndexPage() {
  const [items, setItems] = useState<MediaItem[]>(mockMediaItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleMediaClick = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  const handleCloseMedia = () => {
    setSelectedMedia(null);
  };

  const filteredItems = items.filter((item) => {
    const searchMatch =
      item.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search by pet name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Media Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Media Types</SelectItem>
              <SelectItem value="photo">Photo</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>

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
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                disabled={{ before: new Date("2024-01-01") }}
                numberOfMonths={2}
                pagedNavigation
              />
            </PopoverContent>
          </Popover>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
                requestType={item.requestType}
                description={item.description}
                mediaUrls={item.mediaUrls}
                onClick={() => handleMediaClick(item)}
              />
            </motion.div>
          ))}
        </motion.div>

        {selectedMedia && (
          <Drawer open={!!selectedMedia} onOpenChange={handleCloseMedia}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{selectedMedia.petName}</DrawerTitle>
                <DrawerDescription>
                  {selectedMedia.description}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                {selectedMedia.requestType === "photo" &&
                  selectedMedia.mediaUrls.length > 0 && (
                    <img
                      src={selectedMedia.mediaUrls[0] || "/placeholder.svg"}
                      alt={`Photo of ${selectedMedia.petName}`}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  )}
                {selectedMedia.requestType === "video" &&
                  selectedMedia.mediaUrls[0] && (
                    <video
                      src={selectedMedia.mediaUrls[0]}
                      className="w-full h-auto object-contain rounded-md"
                      controls
                    />
                  )}
              </div>
              <DrawerFooter>
                <DrawerClose>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
