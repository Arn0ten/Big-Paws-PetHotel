// Helper functions for the history module
// BACKEND INTEGRATION: These functions can be shared across modules

import type { HistoryEntry, MediaEntry } from "@/app/webapp/admin/data/history-sample-data"

// Format date with or without time
export const formatDate = (dateString: string, includeTime = true): string => {
  if (!dateString) return "N/A"

  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return "Invalid Date"
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }

  return new Intl.DateTimeFormat("en-PH", options).format(date)
}

// Format currency in Philippine Peso
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Filter history entries by search query
export const searchHistoryEntries = (entries: HistoryEntry[], query: string): HistoryEntry[] => {
  if (!query) return entries

  const searchLower = query.toLowerCase()
  return entries.filter(
    (entry) =>
      (entry.description && entry.description.toLowerCase().includes(searchLower)) ||
      (entry.petName && entry.petName.toLowerCase().includes(searchLower)) ||
      (entry.ownerName && entry.ownerName.toLowerCase().includes(searchLower)) ||
      (entry.performedBy && entry.performedBy.toLowerCase().includes(searchLower)),
  )
}

// Filter media entries by search query
export const searchMediaEntries = (entries: MediaEntry[], query: string): MediaEntry[] => {
  if (!query) return entries

  const searchLower = query.toLowerCase()
  return entries.filter(
    (entry) =>
      (entry.description && entry.description.toLowerCase().includes(searchLower)) ||
      (entry.petName && entry.petName.toLowerCase().includes(searchLower)) ||
      (entry.ownerName && entry.ownerName.toLowerCase().includes(searchLower)) ||
      (entry.completedBy && entry.completedBy.toLowerCase().includes(searchLower)),
  )
}

// Filter history entries by module
export const filterHistoryByModule = (entries: HistoryEntry[], module: string): HistoryEntry[] => {
  if (module === "all") return entries
  return entries.filter((entry) => entry.module === module)
}

// Update the filterHistoryByStatus function to default to completed/succeeding statuses
export const filterHistoryByStatus = (entries: HistoryEntry[], status: string): HistoryEntry[] => {
  if (status === "all") {
    // Even when "all" is selected, we only show completed/succeeding events
    return entries.filter((entry) => entry.status === "completed" || entry.status === "succeeding")
  }
  return entries.filter((entry) => entry.status === status)
}

// Filter media entries by type
export const filterMediaByType = (entries: MediaEntry[], type: string): MediaEntry[] => {
  if (type === "all") return entries
  return entries.filter((entry) => entry.requestType === type)
}

// Filter media entries by pet owner
export const filterMediaByOwner = (entries: MediaEntry[], owner: string): MediaEntry[] => {
  if (owner === "all") return entries
  return entries.filter((entry) => entry.ownerName === owner)
}

// Filter entries by date
export const filterByDate = (entries: HistoryEntry[] | MediaEntry[], date: Date): (HistoryEntry | MediaEntry)[] => {
  if (!date) return entries

  const filterDate = new Date(date)
  filterDate.setHours(0, 0, 0, 0)

  return entries.filter((entry) => {
    const entryDate = new Date(entry.timestamp)
    entryDate.setHours(0, 0, 0, 0)
    return entryDate.getTime() === filterDate.getTime()
  })
}

// Sort entries by date
export const sortByDate = (
  entries: HistoryEntry[] | MediaEntry[],
  order: "asc" | "desc",
): (HistoryEntry | MediaEntry)[] => {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime()
    const dateB = new Date(b.timestamp).getTime()
    return order === "desc" ? dateB - dateA : dateA - dateB
  })
}

// Get unique pet owners from media entries
export const getUniquePetOwners = (entries: MediaEntry[]): string[] => {
  return Array.from(new Set(entries.map((entry) => entry.ownerName)))
}

// BACKEND  string[] => {
//return Array.from(new Set(entries.map((entry) => entry.ownerName)));
//}

// BACKEND INTEGRATION: These functions should be implemented on the server side
// to handle actual API calls and database operations

// Delete history entry
export const deleteHistoryEntry = async (id: string): Promise<boolean> => {
  try {
    // BACKEND IMPLEMENTATION:
    // 1. Connect to database
    // 2. Delete entry with matching ID
    // 3. Return success status

    // Example implementation:
    // const response = await fetch(`/api/admin/history/${id}`, {
    //   method: 'DELETE',
    // });
    // return response.ok;

    // Simulated success for frontend development
    return true
  } catch (error) {
    console.error("Error deleting history entry:", error)
    return false
  }
}

// Download media file
export const downloadMedia = async (url: string, filename: string): Promise<boolean> => {
  try {
    // BACKEND IMPLEMENTATION:
    // 1. Fetch the file from storage
    // 2. Create a download link
    // 3. Trigger download

    // Example implementation:
    // const response = await fetch(url);
    // const blob = await response.blob();
    // const downloadUrl = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = downloadUrl;
    // link.download = filename;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // For frontend development, we'll just open the URL in a new tab
    window.open(url, "_blank")
    return true
  } catch (error) {
    console.error("Error downloading media:", error)
    return false
  }
}

// Add a new helper function for downloading multiple files as a zip
// BACKEND INTEGRATION: This function should be implemented on the server side
export const downloadMultipleMedia = async (urls: string[], filename: string): Promise<boolean> => {
  try {
    // BACKEND IMPLEMENTATION:
    // 1. Create a server endpoint that fetches all files
    // 2. Create a zip file containing all media
    // 3. Return the zip file for download

    // Example implementation:
    // const response = await fetch('/api/admin/media/download-zip', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ urls }),
    // });
    //
    // if (!response.ok) throw new Error('Failed to create zip file');
    //
    // const blob = await response.blob();
    // const downloadUrl = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = downloadUrl;
    // link.download = filename || 'media-archive.zip';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // For frontend development, we'll just open the first URL in a new tab
    // and log a message about the need for backend implementation
    console.log("BACKEND INTEGRATION NEEDED: Download multiple files as zip", urls)
    if (urls.length > 0) {
      window.open(urls[0], "_blank")
    }
    return true
  } catch (error) {
    console.error("Error downloading multiple media:", error)
    return false
  }
}
