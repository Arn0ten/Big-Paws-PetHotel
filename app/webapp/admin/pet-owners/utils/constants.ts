// Constants for the Pet Owner Management module

// Dog breeds
export const DOG_BREEDS = [
  "Golden Retriever",
  "German Shepherd",
  "Labrador",
  "Beagle",
  "Poodle",
  "Bulldog",
  "Husky",
  "Pomeranian",
  "Dachshund",
  "Boxer",
  "Shih Tzu",
  "Chihuahua",
  "Border Collie",
  "Rottweiler",
  "Great Dane",
  "Doberman",
  "Corgi",
  "Dalmatian",
  "Pug",
  "Mixed Breed",
]

// Cat breeds
export const CAT_BREEDS = [
  "Siamese",
  "Persian",
  "Maine Coon",
  "Ragdoll",
  "Bengal",
  "Sphynx",
  "British Shorthair",
  "Abyssinian",
  "Scottish Fold",
  "Burmese",
  "Russian Blue",
  "Norwegian Forest Cat",
  "Siberian",
  "American Shorthair",
  "Oriental",
  "Devon Rex",
  "Himalayan",
  "Exotic Shorthair",
  "Munchkin",
  "Mixed Breed",
]

// Items per page for pagination
export const ITEMS_PER_PAGE = 6

// Mock data for pet owners
// BACKEND INTEGRATION POINT: Replace this with API call to fetch pet owners
export const MOCK_PET_OWNERS = [
  {
    id: "PO-001",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    email: "john.doe@example.com",
    phone: "09123456789",
    address: "123 Main St, Makati City, Metro Manila",
    pets: [
      {
        id: "P-001",
        name: "Buddy",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        size: "Large",
        isBoarding: true,
        image: "/placeholder.svg?height=200&width=200",
      },
      {
        id: "P-002",
        name: "Max",
        type: "Dog",
        breed: "German Shepherd",
        age: 5,
        size: "Large",
        isBoarding: false,
        image: "/placeholder.svg?height=200&width=200",
      },
    ],
    createdAt: "2023-01-15",
  },
  // ... other pet owners (truncated for brevity)
]

