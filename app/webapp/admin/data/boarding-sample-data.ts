/**
 * BOARDING MANAGEMENT SAMPLE DATA
 *
 * This file contains centralized sample data for the Boarding Management module.
 */

import {
  type BaseBoardingOrder,
  type PaymentStatus,
  getPetImageByType,
} from "./shared-sample-data";

// Extend the base boarding order interface with additional properties
export interface BoardingOrder extends BaseBoardingOrder {
  pet: {
    id: string;
    name: string;
    type: string;
    breed: string;
    size: string;
    age: number;
    imageUrl: string;
  };
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  additionalServices?: {
    name: string;
    price: number;
    requestId: string;
    timestamp: string;
  }[];
  lastModifiedBy?: string;
  lastModificationReason?: string;
  paymentHistory?: {
    status: string;
    timestamp: string;
    modifiedBy?: string;
    reason?: string;
  }[];
  releaseTimestamp?: string;
  receiptGenerated?: boolean;
  notificationSent?: boolean;
  originalEndDate?: string;
}

// Helper function to generate random time between 1 and 22 hours
const randomHours = () => Math.floor(Math.random() * 22) + 1;

// Sample data for demonstration purposes
export const sampleBoardingOrders: BoardingOrder[] = [
  {
    id: "BO-1001",
    petId: "P-1001",
    ownerId: "O-1001",
    pet: {
      id: "P-1001",
      name: "sdsdsd",
      type: "Dog",
      breed: "Golden Retriever",
      size: "Large",
      age: 3,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Anytown, CA 94321",
    },
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    boardingType: "LongStay",
    boardingStatus: "Boarding",
    paymentStatus: "Pending",
    totalPrice: 350.0,
    baseAmount: 250.0,
    additionalServices: [
      {
        name: "Grooming: Premium Wash & Cut",
        price: 100.0,
        requestId: "req-002",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isOverdue: false, 
    lastModifiedBy: "Admin",
    lastModificationReason: "Grooming service added",
    paymentHistory: [
      {
        status: "Paid",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Initial payment",
      },
      {
        status: "Pending",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Additional service added",
      },
    ],
  },
  // Add a new boarding order with extension
  {
    id: "BO-1009",
    petId: "P-1009",
    ownerId: "O-1009",
    pet: {
      id: "P-1009",
      name: "Buddy",
      type: "Dog",
      breed: "Shih Tzu",
      size: "Small",
      age: 4,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1009",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "(555) 890-1234",
      address: "606 Pine Ave, Somewhere, CA 94322",
    },
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    originalEndDate: new Date(
      Date.now() + 1 * 24 * 60 * 60 * 1000,
    ).toISOString(), // Original end date was 1 day from now
    boardingType: "LongStay",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 280.0,
    baseAmount: 200.0,
    hasExtension: true,
    extensionDays: 3,
    extensionRequestId: "req-005",
    additionalServices: [
      {
        name: "3-day boarding extension",
        price: 80.0,
        requestId: "req-005",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isOverdue: false,
    lastModifiedBy: "Admin",
    lastModificationReason: "Boarding extension approved",
    paymentHistory: [
      {
        status: "Paid",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Initial payment",
      },
      {
        status: "Paid",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Extension payment",
      },
    ],
  },
  // Add a daycare with extension
  {
    id: "BO-1010",
    petId: "P-1010",
    ownerId: "O-1010",
    pet: {
      id: "P-1010",
      name: "Coco",
      type: "Dog",
      breed: "Pomeranian",
      size: "Small",
      age: 2,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1010",
      name: "Oliver Chen",
      email: "oliver.c@example.com",
      phone: "(555) 345-6789",
      address: "707 Maple St, Elsewhere, CA 94323",
    },
    startDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    endDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    originalEndDate: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // Original end time was 1 hour from now
    boardingType: "Daycare",
    boardingStatus: "Boarding",
    paymentStatus: "Paid",
    totalPrice: 120.0,
    baseAmount: 80.0,
    hasExtension: true,
    extensionHours: 3,
    extensionRequestId: "req-006",
    additionalServices: [
      {
        name: "3-hour daycare extension",
        price: 40.0,
        requestId: "req-006",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isOverdue: false,
    lastModifiedBy: "Admin",
    lastModificationReason: "Daycare extension approved",
    paymentHistory: [
      {
        status: "Paid",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Initial payment",
      },
      {
        status: "Paid",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Extension payment",
      },
    ],
  },
  {
    id: "BO-1002",
    petId: "P-1002",
    ownerId: "O-1002",
    pet: {
      id: "P-1002",
      name: "Bella",
      type: "Cat",
      breed: "Siamese",
      size: "Small",
      age: 2,
      imageUrl: getPetImageByType("Cat"),
    },
    owner: {
      id: "O-1002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, Somewhere, NY 10001",
    },
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    boardingType: "Daycare",
    boardingStatus: "Done Boarding",
    paymentStatus: "Paid",
    totalPrice: 120.0,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isOverdue: true,
  },
  {
    id: "BO-1003",
    petId: "P-1003",
    ownerId: "O-1003",
    pet: {
      id: "P-1003",
      name: "Charlie",
      type: "Dog",
      breed: "Beagle",
      size: "Medium",
      age: 4,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1003",
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "(555) 456-7890",
      address: "789 Pine St, Elsewhere, TX 75001",
    },
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    boardingType: "LongStay",
    boardingStatus: "Released",
    paymentStatus: "Paid",
    totalPrice: 350.0,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    releaseTimestamp: new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000,
    ).toISOString(), // 5 days ago
    isOverdue: false,
    receiptGenerated: true,
    notificationSent: true,
  },
  {
    id: "BO-1004",
    petId: "P-1004",
    ownerId: "O-1004",
    pet: {
      id: "P-1004",
      name: "Luna",
      type: "Cat",
      breed: "Maine Coon",
      size: "Medium",
      age: 3,
      imageUrl: getPetImageByType("Cat"),
    },
    owner: {
      id: "O-1004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(555) 234-5678",
      address: "101 Maple Dr, Nowhere, WA 98001",
    },
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    boardingType: "LongStay",
    boardingStatus: "Boarding",
    paymentStatus: "Pending",
    totalPrice: 230.0,
    baseAmount: 180.0,
    additionalServices: [
      {
        name: "2 days extension",
        price: 50.0,
        requestId: "req-003",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isOverdue: false,
    lastModifiedBy: "Admin",
    lastModificationReason: "Boarding extension approved",
    paymentHistory: [
      {
        status: "Paid",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Initial payment",
      },
      {
        status: "Pending",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        modifiedBy: "Admin",
        reason: "Extension added",
      },
    ],
  },
  {
    id: "BO-1005",
    petId: "P-1005",
    ownerId: "O-1005",
    pet: {
      id: "P-1005",
      name: "Rocky",
      type: "Dog",
      breed: "German Shepherd",
      size: "Large",
      age: 5,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1005",
      name: "David Wilson",
      email: "david.w@example.com",
      phone: "(555) 345-6789",
      address: "202 Cedar Ln, Anyplace, FL 33001",
    },
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days  // 7 days ago
    boardingType: "LongStay",
    boardingStatus: "Done Boarding",
    paymentStatus: "Not Paid",
    totalPrice: 300.0,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    isOverdue: true,
  },
  {
    id: "BO-1006",
    petId: "P-1006",
    ownerId: "O-1006",
    pet: {
      id: "P-1006",
      name: "Daisy",
      type: "Dog",
      breed: "Poodle",
      size: "Small",
      age: 2,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1006",
      name: "Jennifer Taylor",
      email: "jennifer.t@example.com",
      phone: "(555) 567-8901",
      address: "303 Birch Rd, Somewhere Else, IL 60001",
    },
    startDate: new Date(
      Date.now() - randomHours() * 60 * 60 * 1000,
    ).toISOString(), // Random hours ago
    endDate: new Date().toISOString(), // Now
    boardingType: "Daycare",
    boardingStatus: "Done Boarding",
    paymentStatus: "Paid",
    totalPrice: 150.0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    isOverdue: false,
  },
  {
    id: "BO-1007",
    petId: "P-1007",
    ownerId: "O-1007",
    pet: {
      id: "P-1007",
      name: "Milo",
      type: "Cat",
      breed: "Persian",
      size: "Small",
      age: 4,
      imageUrl: getPetImageByType("Cat"),
    },
    owner: {
      id: "O-1007",
      name: "Amanda Lee",
      email: "amanda.l@example.com",
      phone: "(555) 678-9012",
      address: "404 Elm St, Anyville, CA 90210",
    },
    startDate: new Date(
      Date.now() - randomHours() * 60 * 60 * 1000,
    ).toISOString(), // Random hours ago
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    boardingType: "Daycare",
    boardingStatus: "Boarding",
    paymentStatus: "Pending",
    totalPrice: 80.0,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isOverdue: false,
  },
  {
    id: "BO-1008",
    petId: "P-1008",
    ownerId: "O-1008",
    pet: {
      id: "P-1008",
      name: "Cooper",
      type: "Dog",
      breed: "Labrador Retriever",
      size: "Large",
      age: 3,
      imageUrl: getPetImageByType("Dog"),
    },
    owner: {
      id: "O-1008",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "(555) 789-0123",
      address: "505 Oak St, Somewhere City, TX 75002",
    },
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    boardingType: "LongStay",
    boardingStatus: "Released",
    paymentStatus: "Paid",
    totalPrice: 420.0,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    releaseTimestamp: new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000,
    ).toISOString(), // 7 days ago
    isOverdue: false,
    receiptGenerated: true,
    notificationSent: true,
  },
];

/**
 * Check for overdue pickups based on current date and end date
 *
 * @param orders - Array of boarding orders to check
 * @returns Array of boarding orders with updated overdue status
 */
export const checkOverduePickups = (
  orders: BoardingOrder[],
): BoardingOrder[] => {
  const now = new Date();

  return orders.map((order) => {
    if (order.boardingStatus === "Done Boarding") {
      const endDate = new Date(order.endDate);
      const isOverdue = endDate < now;
      return { ...order, isOverdue };
    }
    return order;
  });
};

/**
 * Update boarding status for an order
 *
 * @param order - The boarding order to update
 * @param paymentStatus - The new payment status
 * @returns Updated boarding order
 */
export const updateBoardingStatus = (
  order: BoardingOrder,
  paymentStatus: string,
): BoardingOrder => {
  return {
    ...order,
    paymentStatus: paymentStatus as PaymentStatus,
    updatedAt: new Date().toISOString(),
    paymentHistory: [
      ...(order.paymentHistory || []),
      {
        status: paymentStatus,
        timestamp: new Date().toISOString(),
        modifiedBy: "Admin",
        reason: `Payment status updated to ${paymentStatus}`,
      },
    ],
  };
};

/**
 * Release a pet from boarding
 *
 * @param order - The boarding order to update
 * @returns Updated boarding order with released status
 */
export const releasePet = (order: BoardingOrder): BoardingOrder => {
  return {
    ...order,
    boardingStatus: "Released",
    releaseTimestamp: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    receiptGenerated: true,
    notificationSent: true,
  };
};

/**
 * Filter orders by status
 *
 * @param orders - The orders to filter
 * @param boardingStatus - The boarding status to filter by
 * @param paymentStatus - The payment status to filter by
 * @returns Filtered orders
 */
export const filterOrdersByStatus = (
  orders: BoardingOrder[],
  boardingStatus = "all",
  paymentStatus = "all",
): BoardingOrder[] => {
  return orders.filter((order) => {
    const matchesBoardingStatus =
      boardingStatus === "all" || order.boardingStatus === boardingStatus;
    const matchesPaymentStatus =
      paymentStatus === "all" || order.paymentStatus === paymentStatus;
    return matchesBoardingStatus && matchesPaymentStatus;
  });
};

/**
 * Search orders by query
 *
 * @param orders - The orders to search
 * @param query - The search query
 * @returns Matching orders
 */
export const searchOrders = (
  orders: BoardingOrder[],
  query: string,
): BoardingOrder[] => {
  if (!query) return orders;

  const lowerQuery = query.toLowerCase();
  return orders.filter(
    (order) =>
      order.pet.name.toLowerCase().includes(lowerQuery) ||
      order.owner.name.toLowerCase().includes(lowerQuery) ||
      order.pet.breed.toLowerCase().includes(lowerQuery),
  );
};
