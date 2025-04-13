// import { DEFAULT_IMAGES } from "@/app/webapp/constants/image-constants";
// import type { Pet, PetOwner } from "../utils/types";

// // Dog breeds
// export const DOG_BREEDS = [
//   "Labrador Retriever",
//   "German Shepherd",
//   "Golden Retriever",
//   "Bulldog",
//   "Beagle",
//   "Poodle",
//   "Rottweiler",
//   "Yorkshire Terrier",
//   "Boxer",
//   "Dachshund",
//   "Shih Tzu",
//   "Siberian Husky",
//   "Doberman Pinscher",
//   "Great Dane",
//   "Chihuahua",
//   "Pomeranian",
//   "Border Collie",
//   "Cocker Spaniel",
//   "Australian Shepherd",
//   "Cavalier King Charles Spaniel",
//   "Shiba Inu",
//   "Corgi",
//   "Aspin", // Local Philippine breed
//   "Mixed Breed",
// ];

// // Cat breeds
// export const CAT_BREEDS = [
//   "Persian",
//   "Maine Coon",
//   "Siamese",
//   "Ragdoll",
//   "Bengal",
//   "Abyssinian",
//   "Birman",
//   "Oriental Shorthair",
//   "Sphynx",
//   "Devon Rex",
//   "Himalayan",
//   "American Shorthair",
//   "Scottish Fold",
//   "British Shorthair",
//   "Burmese",
//   "Russian Blue",
//   "Norwegian Forest Cat",
//   "Siberian",
//   "Exotic Shorthair",
//   "Tonkinese",
//   "Mixed Breed",
// ];

// // Mock pet owners data
// // export const MOCK_PET_OWNERS: PetOwner[] = [
// //   {
// //     id: "owner-1",
// //     name: "John Smith",
// //     email: "john.smith@example.com",
// //     phone: "123-456-7890",
// //     address: "123 Main St, Anytown, USA",
// //     avatar: DEFAULT_IMAGES.USER_AVATAR,
// //   },
// //   {
// //     id: "owner-2",
// //     name: "Maria Garcia",
// //     email: "maria.garcia@example.com",
// //     phone: "234-567-8901",
// //     address: "456 Oak Ave, Somewhere, USA",
// //     avatar: DEFAULT_IMAGES.USER_AVATAR,
// //   },
// //   {
// //     id: "owner-3",
// //     name: "David Johnson",
// //     email: "david.johnson@example.com",
// //     phone: "345-678-9012",
// //     address: "789 Pine Rd, Nowhere, USA",
// //     avatar: DEFAULT_IMAGES.USER_AVATAR,
// //   },
// //   {
// //     id: "owner-4",
// //     name: "Sarah Lee",
// //     email: "sarah.lee@example.com",
// //     phone: "456-789-0123",
// //     address: "101 Maple Dr, Everywhere, USA",
// //     avatar: DEFAULT_IMAGES.USER_AVATAR,
// //   },
// //   {
// //     id: "owner-5",
// //     name: "Michael Chen",
// //     email: "michael.chen@example.com",
// //     phone: "567-890-1234",
// //     address: "202 Cedar Ln, Anywhere, USA",
// //     avatar: DEFAULT_IMAGES.USER_AVATAR,
// //   },
// // ]

// // Mock pets data
// // export const MOCK_PETS: Pet[] = [
// //   {
// //     id: "pet-1",
// //     name: "Max",
// //     ownerId: "owner-1",
// //     type: "Dog",
// //     breed: "Labrador Retriever",
// //     age: 3,
// //     size: "Large",
// //     isBoarding: true,
// //     notes:
// //       "Friendly and energetic. Loves to play fetch and needs daily exercise.",
// //     image:
// //       "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-2",
// //     name: "Luna",
// //     ownerId: "owner-2",
// //     type: "Cat",
// //     breed: "Siamese",
// //     age: 2,
// //     size: "Medium",
// //     isBoarding: false,
// //     notes: "Quiet and independent. Prefers to be left alone most of the time.",
// //     image:
// //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-3",
// //     name: "Charlie",
// //     ownerId: "owner-3",
// //     type: "Dog",
// //     breed: "Golden Retriever",
// //     age: 5,
// //     size: "Large",
// //     isBoarding: true,
// //     notes:
// //       "Very friendly with other dogs and children. Has a special diet for allergies.",
// //     image:
// //       "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-4",
// //     name: "Bella",
// //     ownerId: "owner-4",
// //     type: "Cat",
// //     breed: "Maine Coon",
// //     age: 4,
// //     size: "Large",
// //     isBoarding: false,
// //     notes:
// //       "Loves to be brushed and petted. Needs regular grooming due to long fur.",
// //     image:
// //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-5",
// //     name: "Rocky",
// //     ownerId: "owner-5",
// //     type: "Dog",
// //     breed: "Bulldog",
// //     age: 2,
// //     size: "Medium",
// //     isBoarding: false,
// //     notes: "Stubborn but loving. Needs short walks multiple times a day.",
// //     image:
// //       "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-6",
// //     name: "Milo",
// //     ownerId: "owner-1",
// //     type: "Cat",
// //     breed: "Bengal",
// //     age: 1,
// //     size: "Medium",
// //     isBoarding: true,
// //     notes:
// //       "Very active and playful. Needs lots of toys and climbing opportunities.",
// //     image:
// //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-7",
// //     name: "Daisy",
// //     ownerId: "owner-2",
// //     type: "Dog",
// //     breed: "Beagle",
// //     age: 6,
// //     size: "Medium",
// //     isBoarding: false,
// //     notes: "Loves to follow scents. Can be vocal when excited or left alone.",
// //     image:
// //       "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-8",
// //     name: "Oliver",
// //     ownerId: "owner-3",
// //     type: "Cat",
// //     breed: "Scottish Fold",
// //     age: 3,
// //     size: "Small",
// //     isBoarding: false,
// //     notes: "Quiet and gentle. Enjoys sitting on laps and being petted.",
// //     image:
// //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-9",
// //     name: "Cooper",
// //     ownerId: "owner-4",
// //     type: "Dog",
// //     breed: "Siberian Husky",
// //     age: 4,
// //     size: "Large",
// //     isBoarding: true,
// //     notes:
// //       "High energy and needs lots of exercise. Can be escape-prone if not properly contained.",
// //     image:
// //       "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-10",
// //     name: "Lucy",
// //     ownerId: "owner-5",
// //     type: "Cat",
// //     breed: "Ragdoll",
// //     age: 5,
// //     size: "Large",
// //     isBoarding: false,
// //     notes: "Very docile and affectionate. Tends to go limp when picked up.",
// //     image:
// //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-11",
// //     name: "Bailey",
// //     ownerId: "owner-1",
// //     type: "Dog",
// //     breed: "Poodle",
// //     age: 7,
// //     size: "Medium",
// //     isBoarding: false,
// //     notes: "Intelligent and easy to train. Requires regular grooming.",
// //     image:
// //       "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop",
// //   },
// //   {
// //     id: "pet-12",
// //     name: "Simba",
// //     ownerId: "owner-2",
// //     type: "Cat",
// //     breed: "Persian",
// //     age: 6,
// //     size: "Medium",
// //     isBoarding: true,
// //     notes:
// //       "Requires daily grooming to prevent matting. Prefers quiet environments.",
// //     image:
// //       "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&auto=format&fit=crop",
// //   },
// // ];
