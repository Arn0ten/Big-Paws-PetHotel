/**
 * Sample data for the request management module
 *
 * =====================================================================
 * BACKEND INTEGRATION NOTES:
 * =====================================================================
 *
 * - Replace this with actual API calls to fetch data from your backend
 * - API Endpoints:
 *   - GET /api/requests - Fetch all requests with optional filters
 *     Parameters: status, type, search, sortBy, sortOrder, page, limit
 *   - GET /api/requests/:id - Fetch a single request by ID
 *   - PUT /api/requests/:id/complete - Mark a request as complete
 *     Payload: { processingNotes, mediaUrls[], extensionDate, price, groomingService, audioUrl }
 *   - PUT /api/requests/:id/return - Return a request to New Requests
 *     Payload: { reason }
 *   - GET /api/boarding/:id - Fetch boarding details for a request
 *
 * - Data Models:
 *   - Request: id, type, petId, petName, petOwnerId, petOwnerName, status, createdAt,
 *     description, isUrgent, petSize, boardingId, completedAt, completedBy, processingNotes,
 *     mediaFiles, extensionDetails, groomingService, price, audioUrl
 *   - Boarding: id, petId, petName, ownerId, ownerName, startDate, endDate,
 *     boardingStatus, paymentStatus, totalPrice, additionalServices
 *
 * IMPORTANT: The request types used here MUST match those used in the pet owner interface:
 * - photo: For photo update requests
 * - video: For video requests
 * - grooming: For grooming service requests
 * - boarding-extension: For extending boarding stays
 * - custom: For any other custom requests
 */

// Sample requests data
export const sampleRequests = [
  {
    id: "req-001",
    type: "photo",
    petName: "Max",
    petId: "pet-001",
    petOwnerId: "owner-001",
    petOwnerName: "John Smith",
    status: "in-progress",
    createdAt: "2025-03-10T10:30:00Z",
    description: "Would love to see how Max is doing today! Can you send a photo of him playing in the yard?",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-001",
  },
  {
    id: "req-002",
    type: "video",
    petName: "Bella",
    petId: "pet-002",
    petOwnerId: "owner-002",
    petOwnerName: "Emily Johnson",
    status: "in-progress",
    createdAt: "2025-03-11T09:15:00Z",
    description: "I miss Bella so much! Could you send a short video of her today?",
    isUrgent: true,
    petSize: "Small",
    boardingId: "board-002",
  },
  {
    id: "req-003",
    type: "grooming",
    petName: "Charlie",
    petId: "pet-003",
    petOwnerId: "owner-003",
    petOwnerName: "Michael Brown",
    status: "in-progress",
    createdAt: "2025-03-09T14:45:00Z",
    description: "Charlie needs a bath and nail trim. His fur is getting quite long too.",
    isUrgent: false,
    petSize: "Large",
    boardingId: "board-003",
    groomingService: "premium-wash-and-cut",
  },
  {
    id: "req-004",
    type: "boarding-extension",
    petName: "Luna",
    petId: "pet-004",
    petOwnerId: "owner-004",
    petOwnerName: "Sophia Martinez",
    status: "in-progress",
    createdAt: "2025-03-12T11:20:00Z",
    description: "My flight got delayed. Can I extend Luna's stay by 2 more days?",
    isUrgent: true,
    petSize: "Medium",
    boardingId: "board-004",
    extensionDetails: {
      duration: "2",
      unit: "days",
    },
    currentEndDate: "2025-03-15T12:00:00Z",
  },
  {
    id: "req-005",
    type: "custom",
    petName: "Cooper",
    petId: "pet-005",
    petOwnerId: "owner-005",
    petOwnerName: "Daniel Wilson",
    status: "in-progress",
    createdAt: "2025-03-08T16:30:00Z",
    description:
      "Cooper has been having some digestive issues. Can you mix a tablespoon of pumpkin puree with his food for the next few days?",
    isUrgent: false,
    petSize: "Large",
    boardingId: "board-005",
  },
  {
    id: "req-006",
    type: "photo",
    petName: "Daisy",
    petId: "pet-006",
    petOwnerId: "owner-006",
    petOwnerName: "Olivia Taylor",
    status: "completed",
    createdAt: "2025-03-07T13:10:00Z",
    completedAt: "2025-03-07T15:45:00Z",
    completedBy: "Sarah Admin",
    description: "Could I get a photo update of Daisy? Just want to see how she's settling in.",
    isUrgent: false,
    petSize: "Small",
    boardingId: "board-006",
    processingNotes: "Sent 3 photos of Daisy playing with toys and resting in her bed.",
    mediaFiles: {
      type: "photo",
      urls: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      count: 3,
    },
  },
  {
    id: "req-007",
    type: "grooming",
    petName: "Rocky",
    petId: "pet-007",
    petOwnerId: "owner-007",
    petOwnerName: "William Anderson",
    status: "completed",
    createdAt: "2025-03-06T10:00:00Z",
    completedAt: "2025-03-06T14:30:00Z",
    completedBy: "Mark Groomer",
    description: "Rocky needs a full grooming session with special attention to his matted fur.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-007",
    groomingService: "full-grooming",
    price: 650,
    processingNotes: "Completed full grooming with dematting. Rocky was very cooperative.",
  },
  {
    id: "req-008",
    type: "boarding-extension",
    petName: "Milo",
    petId: "pet-008",
    petOwnerId: "owner-008",
    petOwnerName: "Emma Thomas",
    status: "completed",
    createdAt: "2025-03-05T09:30:00Z",
    completedAt: "2025-03-05T11:15:00Z",
    completedBy: "John Manager",
    description: "Need to extend Milo's stay by 3 more days due to work emergency.",
    isUrgent: true,
    petSize: "Small",
    boardingId: "board-008",
    extensionDetails: {
      duration: "3",
      unit: "days",
    },
    currentEndDate: "2025-03-10T12:00:00Z",
    newEndDate: "2025-03-13T12:00:00Z",
    price: 960,
    processingNotes: "Extended stay approved. Updated boarding record and notified staff.",
  },
  {
    id: "req-009",
    type: "video",
    petName: "Zoe",
    petId: "pet-009",
    petOwnerId: "owner-009",
    petOwnerName: "James Harris",
    status: "in-progress",
    createdAt: "2025-03-13T08:45:00Z",
    description: "Could you send a video of Zoe during playtime? My kids really miss her.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-009",
  },
  {
    id: "req-010",
    type: "photo",
    petName: "Coco",
    petId: "pet-010",
    petOwnerId: "owner-010",
    petOwnerName: "Ava Garcia",
    status: "in-progress",
    createdAt: "2025-03-12T15:20:00Z",
    description: "Just checking in on Coco. Can I get a photo update?",
    isUrgent: false,
    petSize: "Small",
    boardingId: "board-010",
  },
  {
    id: "req-011",
    type: "custom",
    petName: "Leo",
    petId: "pet-011",
    petOwnerId: "owner-011",
    petOwnerName: "Noah Clark",
    status: "completed",
    createdAt: "2025-03-04T13:40:00Z",
    completedAt: "2025-03-04T16:20:00Z",
    completedBy: "Lisa Caretaker",
    description:
      "Leo has a favorite toy - a blue squeaky bone. Could you make sure he has it with him during his stay?",
    isUrgent: false,
    petSize: "Large",
    boardingId: "board-011",
    processingNotes:
      "Found Leo's blue squeaky bone in his belongings and made sure it's available to him throughout the day.",
  },
  {
    id: "req-012",
    type: "grooming",
    petName: "Molly",
    petId: "pet-012",
    petOwnerId: "owner-012",
    petOwnerName: "Isabella Rodriguez",
    status: "in-progress",
    createdAt: "2025-03-11T11:30:00Z",
    description: "Molly needs a basic wash and brush. Nothing fancy, just to keep her clean.",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-012",
    groomingService: "basic-wash",
  },
  {
    id: "req-013",
    type: "video",
    petName: "Oliver",
    petId: "pet-013",
    petOwnerId: "owner-013",
    petOwnerName: "Ethan Wilson",
    status: "completed",
    createdAt: "2025-03-03T14:20:00Z",
    completedAt: "2025-03-03T16:45:00Z",
    completedBy: "Mark Admin",
    description: "Could you send a video of Oliver playing with other dogs?",
    isUrgent: false,
    petSize: "Medium",
    boardingId: "board-013",
    processingNotes: "Recorded Oliver during group playtime. He's very social!",
    mediaFiles: {
      type: "video",
      urls: ["/placeholder.svg?height=400&width=600"],
      count: 1,
    },
    audioUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/funny-pets-262921-3XpmWTqoYttdWiqsAmWVf5Iq5gzyke.mp3",
  },
]

// Sample boarding data that matches with the requests
export const sampleBoardingData = [
  {
    id: "board-001",
    pet: { id: "pet-001", name: "Max", size: "Medium" },
    owner: { id: "owner-001", name: "John Smith" },
    startDate: "2025-03-05T10:00:00Z",
    endDate: "2025-03-12T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-002",
    pet: { id: "pet-002", name: "Bella", size: "Small" },
    owner: { id: "owner-002", name: "Emily Johnson" },
    startDate: "2025-03-08T14:00:00Z",
    endDate: "2025-03-15T14:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-003",
    pet: { id: "pet-003", name: "Charlie", size: "Large" },
    owner: { id: "owner-003", name: "Michael Brown" },
    startDate: "2025-03-06T09:00:00Z",
    endDate: "2025-03-13T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-004",
    pet: { id: "pet-004", name: "Luna", size: "Medium" },
    owner: { id: "owner-004", name: "Sophia Martinez" },
    startDate: "2025-03-09T11:00:00Z",
    endDate: "2025-03-15T12:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2400,
  },
  {
    id: "board-005",
    pet: { id: "pet-005", name: "Cooper", size: "Large" },
    owner: { id: "owner-005", name: "Daniel Wilson" },
    startDate: "2025-03-07T13:00:00Z",
    endDate: "2025-03-14T13:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-006",
    pet: { id: "pet-006", name: "Daisy", size: "Small" },
    owner: { id: "owner-006", name: "Olivia Taylor" },
    startDate: "2025-03-04T15:00:00Z",
    endDate: "2025-03-11T15:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-007",
    pet: { id: "pet-007", name: "Rocky", size: "Medium" },
    owner: { id: "owner-007", name: "William Anderson" },
    startDate: "2025-03-03T10:00:00Z",
    endDate: "2025-03-10T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Pending",
    totalPrice: 3050,
    additionalServices: [
      {
        name: "Grooming: Full Grooming",
        price: 650,
        requestId: "req-007",
        timestamp: "2025-03-06T14:30:00Z",
      },
    ],
  },
  {
    id: "board-008",
    pet: { id: "pet-008", name: "Milo", size: "Small" },
    owner: { id: "owner-008", name: "Emma Thomas" },
    startDate: "2025-03-01T12:00:00Z",
    endDate: "2025-03-13T12:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Pending",
    totalPrice: 3200,
    additionalServices: [
      {
        name: "3 days extension",
        price: 960,
        requestId: "req-008",
        timestamp: "2025-03-05T11:15:00Z",
      },
    ],
  },
  {
    id: "board-009",
    pet: { id: "pet-009", name: "Zoe", size: "Medium" },
    owner: { id: "owner-009", name: "James Harris" },
    startDate: "2025-03-10T09:00:00Z",
    endDate: "2025-03-17T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-010",
    pet: { id: "pet-010", name: "Coco", size: "Small" },
    owner: { id: "owner-010", name: "Ava Garcia" },
    startDate: "2025-03-09T14:00:00Z",
    endDate: "2025-03-16T14:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2240,
  },
  {
    id: "board-011",
    pet: { id: "pet-011", name: "Leo", size: "Large" },
    owner: { id: "owner-011", name: "Noah Clark" },
    startDate: "2025-03-02T11:00:00Z",
    endDate: "2025-03-09T11:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 3360,
  },
  {
    id: "board-012",
    pet: { id: "pet-012", name: "Molly", size: "Medium" },
    owner: { id: "owner-012", name: "Isabella Rodriguez" },
    startDate: "2025-03-08T10:00:00Z",
    endDate: "2025-03-15T10:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
  {
    id: "board-013",
    pet: { id: "pet-013", name: "Oliver", size: "Medium" },
    owner: { id: "owner-013", name: "Ethan Wilson" },
    startDate: "2025-03-01T09:00:00Z",
    endDate: "2025-03-08T09:00:00Z",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 2800,
  },
]

/**
 * Helper functions for working with the sample data
 *
 * BACKEND INTEGRATION:
 * Replace these functions with actual API calls in production
 */

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

