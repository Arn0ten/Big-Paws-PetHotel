import {
  sampleHistoryData as historyData,
  sampleMediaData as mediaData,
} from "../../data/history-sample-data";

// Re-export the sample data
export const sampleHistoryData = historyData;
export const sampleMediaData = mediaData;

/**
 * Get a history entry by ID
 * @param id The history entry ID
 * @returns The history entry or undefined if not found
 */
export const getHistoryEntryById = (id: string) => {
  return sampleHistoryData.find((entry) => entry.id === id);
};

/**
 * Get a media entry by ID
 * @param id The media entry ID
 * @returns The media entry or undefined if not found
 */
export const getMediaEntryById = (id: string) => {
  return sampleMediaData.find((entry) => entry.id === id);
};

/**
 * Filter history entries by module
 * @param entries The entries to filter
 * @param module The module to filter by
 * @returns Filtered entries
 */
export const filterHistoryByModule = (entries, module) => {
  if (!module || module === "all") return entries;
  return entries.filter((entry) => entry.module === module);
};

/**
 * Search history entries by query
 * @param entries The entries to search
 * @param query The search query
 * @returns Matching entries
 */
export const searchHistoryEntries = (entries, query) => {
  if (!query) return entries;

  const lowerQuery = query.toLowerCase();
  return entries.filter(
    (entry) =>
      (entry.description &&
        entry.description.toLowerCase().includes(lowerQuery)) ||
      (entry.petName && entry.petName.toLowerCase().includes(lowerQuery)) ||
      (entry.ownerName && entry.ownerName.toLowerCase().includes(lowerQuery)) ||
      (entry.performedBy &&
        entry.performedBy.toLowerCase().includes(lowerQuery)),
  );
};
