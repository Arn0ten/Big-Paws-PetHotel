// Types for history module
export interface HistoryEntry {
  id: string;
  timestamp: string;
  module: "pet-owner" | "pet" | "boarding" | "request" | "request-management";
  action: string;
  description: string;
  performedBy: string;
  status?: string;
  petId?: string;
  petName?: string;
  ownerId?: string;
  ownerName?: string;
  amount?: number;
  requestId?: string;
  requestType?: string;
  mediaUrls?: string[]; // Updated to support multiple media URLs
  mediaTypes?: ("image" | "video")[]; // Updated to track media types for each URL
}

export interface MediaEntry {
  id: string;
  timestamp: string;
  petName: string;
  ownerName: string;
  requestId: string;
  requestType: "photo" | "video";
  description: string;
  mediaUrls: string[]; // Array of media URLs
  mediaTypes: ("image" | "video")[]; // Array of media types corresponding to each URL
  completedBy: string;
  completedAt: string;
}

// Generate sample history data with multiple media URLs
// BACKEND INTEGRATION: Replace this with actual API calls to fetch history data
export const generateSampleHistoryData = (): HistoryEntry[] => {
  const historyEntries: HistoryEntry[] = [];

  // Add pet owner registration entries
  historyEntries.push({
    id: "hist-001",
    timestamp: "2023-11-01T09:30:00Z",
    module: "pet-owner",
    action: "register",
    description: "New pet owner registered",
    performedBy: "Admin",
    status: "completed",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  });

  // Add pet registration entries
  historyEntries.push({
    id: "hist-003",
    timestamp: "2023-11-03T10:45:00Z",
    module: "pet",
    action: "add",
    description: "New pet added",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
  });

  // Add boarding entries
  historyEntries.push({
    id: "hist-005",
    timestamp: "2023-11-05T08:30:00Z",
    module: "boarding",
    action: "check-in",
    description: "Pet checked in for boarding",
    performedBy: "Admin",
    status: "active",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    amount: 1200.0,
  });

  // Add request entries
  historyEntries.push({
    id: "hist-007",
    timestamp: "2023-11-12T09:15:00Z",
    module: "request",
    action: "submit",
    description: "Photo request submitted",
    performedBy: "Maria Santos",
    status: "pending",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-001",
    requestType: "photo",
  });

  // Add completed photo request with multiple images
  historyEntries.push({
    id: "hist-008",
    timestamp: "2023-11-13T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-001",
    requestType: "photo",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480958858_1347138986475614_3113605541324887048_n.jpg-2Qs4qGN7rZSZAT5rqCQ7c2UyD2rtHY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/476423370_1180780884058793_1895486931922885045_n.jpg-qRHW956GdINyfw6VoD6nITBdYG4QrV.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-8H6pSDIqmQ3m9rg84YuGhB8TAiCYEv.jpeg",
    ],
    mediaTypes: ["image", "image", "image"],
  });

  // Add video request
  historyEntries.push({
    id: "hist-009",
    timestamp: "2023-11-14T13:45:00Z",
    module: "request",
    action: "submit",
    description: "Video request submitted",
    performedBy: "John Reyes",
    status: "pending",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-002",
    requestType: "video",
  });

  // Add completed video request
  historyEntries.push({
    id: "hist-010",
    timestamp: "2023-11-15T14:20:00Z",
    module: "request-management",
    action: "complete",
    description: "Video request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-002",
    petName: "Max",
    ownerId: "owner-002",
    ownerName: "John Reyes",
    requestId: "req-002",
    requestType: "video",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481813534_9269122403125682_8683199565701118176_n-YujoMBZG0mFO5VkwYqBIUTYsW1DMhu.mp4",
    ],
    mediaTypes: ["video"],
  });

  // Add another photo request with multiple images
  historyEntries.push({
    id: "hist-021",
    timestamp: "2023-11-26T10:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-001",
    petName: "Buddy",
    ownerId: "owner-001",
    ownerName: "Maria Santos",
    requestId: "req-006",
    requestType: "photo",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-DGzfDxX7zSuLJmWJLi0kIgtf4g8rI5.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-4Vb1Wt169NtXEbceqxxB4mSRt55chU.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-neY2SryyFSDQbBaJ9JHrZCSqyq4uKg.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480491302_9250055781727301_8238070743716968783_n.jpg-zuHWDIFIvZYglrA4tCl9zEshPDo7E8.jpeg",
    ],
    mediaTypes: ["image", "image", "image", "image"],
  });

  // Add more entries with different pet owners and pets
  historyEntries.push({
    id: "hist-027",
    timestamp: "2023-12-02T15:30:00Z",
    module: "request-management",
    action: "complete",
    description: "Photo request completed",
    performedBy: "Admin",
    status: "completed",
    petId: "pet-004",
    petName: "Coco",
    ownerId: "owner-004",
    ownerName: "Carlos Tan",
    requestId: "req-007",
    requestType: "photo",
    mediaUrls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480179834_591444434054760_4947462491439067277_n.jpg-DGzfDxX7zSuLJmWJLi0kIgtf4g8rI5.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480369671_9302515229807832_3565174851267196364_n.jpg-4Vb1Wt169NtXEbceqxxB4mSRt55chU.jpeg",
    ],
    mediaTypes: ["image", "image"],
  });

  return historyEntries.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};

// Generate sample media entries based on history data
// BACKEND INTEGRATION: Replace this with actual API calls to fetch media data
export const generateSampleMediaData = (
  historyData: HistoryEntry[],
): MediaEntry[] => {
  const mediaEntries: MediaEntry[] = [];

  // Filter history entries for completed media requests
  const completedMediaRequests = historyData.filter(
    (entry) =>
      entry.module === "request-management" &&
      entry.action === "complete" &&
      (entry.requestType === "photo" || entry.requestType === "video") &&
      entry.mediaUrls &&
      entry.mediaUrls.length > 0,
  );

  // Create media entries from completed requests
  completedMediaRequests.forEach((entry) => {
    if (
      (entry.requestType === "photo" || entry.requestType === "video") &&
      entry.mediaUrls &&
      entry.mediaTypes
    ) {
      mediaEntries.push({
        id: entry.id,
        timestamp: entry.timestamp,
        petName: entry.petName || "",
        ownerName: entry.ownerName || "",
        requestId: entry.requestId || "",
        requestType: entry.requestType as "photo" | "video",
        description: entry.description,
        mediaUrls: entry.mediaUrls,
        mediaTypes: entry.mediaTypes,
        completedBy: entry.performedBy,
        completedAt: entry.timestamp,
      });
    }
  });

  return mediaEntries.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};

export const sampleHistoryData = generateSampleHistoryData();
export const sampleMediaData = generateSampleMediaData(sampleHistoryData);
