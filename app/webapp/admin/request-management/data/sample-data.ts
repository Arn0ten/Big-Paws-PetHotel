import { sampleRequests, sampleBoardingData } from "../../data/request-management-sample-data"

// Re-export the sample data
export { sampleRequests, sampleBoardingData }

/**
 * Get a request by ID
 * @param id The request ID
 * @returns The request object or undefined if not found
 */
export const getRequestById = (id: string) => {
  return sampleRequests.find((req) => req.id === id)
}

/**
 * Get boarding details for a request
 * @param boardingId The boarding ID
 * @returns The boarding details or undefined if not found
 */
export const getBoardingDetails = (boardingId: string) => {
  return sampleBoardingData.find((boarding) => boarding.id === boardingId)
}

/**
 * Filter requests by status
 * @param requests The requests to filter
 * @param status The status to filter by
 * @returns Filtered requests
 */
export const filterRequestsByStatus = (requests, status) => {
  if (!status || status === "all") return requests
  return requests.filter((req) => req.status === status)
}

/**
 * Search requests by query
 * @param requests The requests to search
 * @param query The search query
 * @returns Matching requests
 */
export const searchRequests = (requests, query) => {
  if (!query) return requests

  const lowerQuery = query.toLowerCase()
  return requests.filter(
    (req) =>
      req.petName.toLowerCase().includes(lowerQuery) ||
      req.petOwnerName.toLowerCase().includes(lowerQuery) ||
      req.description.toLowerCase().includes(lowerQuery),
  )
}
