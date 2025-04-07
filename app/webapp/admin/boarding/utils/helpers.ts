import type { BoardingOrder, PaymentStatus, BoardingType } from "../types";

/**
 * Format date to a readable string
 * @param dateString ISO date string to format
 * @returns Formatted date string
 *
 * @dev This function should be replaced with your preferred date formatting library
 * or server-side formatting for consistency across the application
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Add the formatTime function if it doesn't exist
export const formatTime = (timeString: string): string => {
  try {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      return "Invalid Time";
    }
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid Time";
  }
};

/**
 * Calculate boarding duration in days or hours
 * @param startDate ISO date string for start date
 * @param endDate ISO date string for end date
 * @param boardingType Type of boarding (Daycare, LongStay, CatHotel)
 * @returns Duration in hours or days depending on boarding type
 *
 * @dev This calculation should match your business logic for billing periods
 */
export const calculateDuration = (
  startDate: string,
  endDate: string,
  boardingType: BoardingType,
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = Math.abs(end.getTime() - start.getTime());

  if (boardingType === "Daycare") {
    return Math.ceil(diffTime / (1000 * 60 * 60)); // Return hours for daycare
  }

  // For LongStay and CatHotel, return days
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Format duration for display
 * @param duration Number of hours or days
 * @param boardingType Type of boarding (Daycare, LongStay, CatHotel)
 * @returns Formatted duration string
 */
export const formatDuration = (
  duration: number,
  boardingType: BoardingType,
): string => {
  if (boardingType === "Daycare") {
    return `${duration} hour${duration !== 1 ? "s" : ""}`;
  }
  return `${duration} day${duration !== 1 ? "s" : ""}`;
};

/**
 * Format price to Philippine Peso
 * @param amount Numeric amount to format
 * @returns Formatted currency string with ₱ symbol
 *
 * @dev Use your application's standard currency formatting utility
 * or consider using a library like Intl.NumberFormat for localization
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Calculate the total of additional services
 * @param order BoardingOrder object
 * @returns Total amount of additional services
 *
 * @dev This function should be used consistently across the application
 * to ensure the same calculation logic is applied everywhere
 */
export const calculateAdditionalServicesTotal = (
  order: BoardingOrder,
): number => {
  if (!order.additionalServices || order.additionalServices.length === 0) {
    return 0;
  }

  return order.additionalServices.reduce(
    (total, service) => total + service.price,
    0,
  );
};

/**
 * Calculate the base boarding price without additional services
 * @param order BoardingOrder object
 * @returns Base boarding price
 *
 * @dev This should match your business logic for calculating base boarding rates
 */
export const calculateBasePrice = (order: BoardingOrder): number => {
  // If baseAmount is explicitly set, use it
  if (order.baseAmount) {
    return order.baseAmount;
  }

  // Otherwise calculate from total price minus additional services
  const additionalServicesTotal = calculateAdditionalServicesTotal(order);
  return order.totalPrice - additionalServicesTotal;
};

/**
 * Update boarding status based on payment status
 * @param order BoardingOrder object
 * @param newPaymentStatus New payment status to set
 * @returns Updated BoardingOrder object
 *
 * @dev This function implements business logic for status transitions
 * and should be aligned with your application's workflow
 */
export const updateBoardingStatus = (
  order: BoardingOrder,
  newPaymentStatus: PaymentStatus,
): BoardingOrder => {
  const updatedOrder = {
    ...order,
    paymentStatus: newPaymentStatus,
    // Add payment history entry
    paymentHistory: [
      ...(order.paymentHistory || []),
      {
        status: newPaymentStatus,
        timestamp: new Date().toISOString(),
        modifiedBy: "Admin",
        reason: `Payment status updated to ${newPaymentStatus}`,
      },
    ],
  };

  // If the order is overdue and the new payment status is 'Paid', don't change the boarding status
  if (order.isOverdue && newPaymentStatus === "Paid") {
    return updatedOrder;
  }

  // Only update the boarding status if the current status is 'Done Boarding' and the new payment status is 'Paid'
  if (order.boardingStatus === "Done Boarding" && newPaymentStatus === "Paid") {
    updatedOrder.boardingStatus = "Released";
    updatedOrder.releaseTimestamp = new Date().toISOString();
  }

  return updatedOrder;
};

/**
 * Filter boarding orders by status
 * @param orders Array of BoardingOrder objects
 * @param boardingStatus Optional boarding status filter
 * @param paymentStatus Optional payment status filter
 * @returns Filtered array of BoardingOrder objects
 *
 * @dev This function should be used for client-side filtering
 * For production, consider implementing server-side filtering for better performance
 */
export const filterOrdersByStatus = (
  orders: BoardingOrder[],
  boardingStatus?: string,
  paymentStatus?: string,
): BoardingOrder[] => {
  return orders.filter((order) => {
    const matchesBoardingStatus =
      !boardingStatus ||
      boardingStatus === "all" ||
      order.boardingStatus === boardingStatus;
    const matchesPaymentStatus =
      !paymentStatus ||
      paymentStatus === "all" ||
      order.paymentStatus === paymentStatus;
    return matchesBoardingStatus && matchesPaymentStatus;
  });
};

/**
 * Search boarding orders by pet name or owner name
 * @param orders Array of BoardingOrder objects
 * @param searchTerm Search term to filter by
 * @returns Filtered array of BoardingOrder objects
 *
 * @dev For production, implement server-side search with proper indexing
 */
export const searchOrders = (
  orders: BoardingOrder[],
  searchTerm: string,
): BoardingOrder[] => {
  if (!searchTerm) return orders;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return orders.filter(
    (order) =>
      order.pet.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.owner.name.toLowerCase().includes(lowerCaseSearchTerm),
  );
};

/**
 * Check if a pet is eligible for release
 * @param order BoardingOrder object
 * @returns Boolean indicating if pet is eligible for release
 *
 * @dev This implements business logic for when pets can be released
 */
export const isEligibleForRelease = (order: BoardingOrder): boolean => {
  return (
    order.paymentStatus === "Paid" && order.boardingStatus === "Done Boarding"
  );
};

/**
 * Check if a pet is eligible for force release
 * @param order BoardingOrder object
 * @returns Boolean indicating if pet is eligible for force release
 *
 * @dev This implements business logic for when pets can be force released
 * BACKEND INTEGRATION: This logic should match the backend validation
 */
export const isEligibleForForceRelease = (order: BoardingOrder): boolean => {
  // Only pets with Paid status can be force released
  return order.paymentStatus === "Paid" && order.boardingStatus === "Boarding";
};

/**
 * Release a pet
 * @param order BoardingOrder object
 * @returns Updated BoardingOrder object with release information
 *
 * @dev This function should be called when a pet is released to its owner
 * In production, this should trigger notifications and receipt generation
 */
export const releasePet = (order: BoardingOrder): BoardingOrder => {
  const now = new Date().toISOString();
  return {
    ...order,
    boardingStatus: "Released",
    releaseTimestamp: now,
    updatedAt: now,
    receiptGenerated: true,
    notificationSent: true,
    isOverdue: false, // Reset the overdue status when releasing
    // Add payment history entry if payment status is being updated
    paymentHistory:
      order.paymentStatus !== "Paid"
        ? [
            ...(order.paymentHistory || []),
            {
              status: "Paid",
              timestamp: now,
              modifiedBy: "Admin",
              reason: "Payment completed at pet release",
            },
          ]
        : order.paymentHistory,
    paymentStatus: "Paid", // Ensure payment status is set to Paid when releasing
  };
};

/**
 * Force release a pet regardless of its current boarding status
 * @param order BoardingOrder object
 * @returns Updated BoardingOrder object with release information
 *
 * @dev This function should be called when an admin force releases a pet
 * In production, this should trigger notifications and receipt generation
 * BACKEND INTEGRATION: This function should call the appropriate API endpoint
 */
export const forceReleasePet = (order: BoardingOrder): BoardingOrder => {
  const now = new Date().toISOString();
  return {
    ...order,
    boardingStatus: "Released",
    releaseTimestamp: now,
    updatedAt: now,
    receiptGenerated: true,
    notificationSent: true,
    isOverdue: false,
    // Add payment history entry if payment status is being updated
    paymentHistory:
      order.paymentStatus !== "Paid"
        ? [
            ...(order.paymentHistory || []),
            {
              status: "Paid",
              timestamp: now,
              modifiedBy: "Admin",
              reason: "Payment completed at force release",
            },
          ]
        : order.paymentHistory,
    paymentStatus: "Paid", // Ensure payment status is set to Paid when force releasing
  };
};

/**
 * Check if a pet pickup is overdue
 * @param orders Array of BoardingOrder objects
 * @returns Updated array with overdue status set
 *
 * @dev This should be run regularly to identify overdue pickups
 * Consider implementing as a scheduled job in production
 */
export const checkOverduePickups = (
  orders: BoardingOrder[],
): BoardingOrder[] => {
  const now = new Date();

  return orders.map((order) => {
    // If the pet is still boarding and the end date has passed
    if (
      order.boardingStatus === "Done Boarding" &&
      new Date(order.endDate) < now
    ) {
      return { ...order, isOverdue: true };
    }
    return { ...order, isOverdue: false };
  });
};

/**
 * Generate a receipt for a released pet
 * @param order BoardingOrder object
 * @returns Formatted receipt string
 *
 * @dev In production, this should generate a proper PDF or HTML receipt
 */
export const generateReceipt = (order: BoardingOrder): string => {
  const duration = calculateDuration(
    order.startDate,
    order.endDate,
    order.boardingType,
  );
  const formattedPrice = formatCurrency(order.totalPrice);
  const basePrice = calculateBasePrice(order);
  const additionalServicesTotal = calculateAdditionalServicesTotal(order);

  return `
    BOARDING RECEIPT
    ----------------
    Receipt ID: REC-${order.id}
    Date: ${formatDate(new Date().toISOString())}
    
    Pet: ${order.pet.name} (${order.pet.breed})
    Owner: ${order.owner.name}
    
    Boarding Type: ${order.boardingType}
    Duration: ${duration}
    From: ${formatDate(order.startDate)}
    To: ${formatDate(order.endDate)}
    
    Base Amount: ${formatCurrency(basePrice)}
    Additional Services: ${formatCurrency(additionalServicesTotal)}
    Total Amount: ${formattedPrice}
    Payment Status: ${order.paymentStatus}
    
    Released on: ${order.releaseTimestamp ? formatDate(order.releaseTimestamp) : "N/A"}
    
    Thank you for choosing our services!
  `;
};

/**
 * Get boarding type description
 * @param type Boarding type string
 * @returns Human-readable description
 */
export const getBoardingTypeDescription = (type: string): string => {
  switch (type) {
    case "Daycare":
      return "Hourly service (less than 24 hours)";
    case "LongStay":
      return "Extended stay (overnight or longer)";
    case "CatHotel":
      return "Cat Hotel accommodation";
    default:
      return type;
  }
};

/**
 * Calculate new end date based on extension duration
 * @param currentEndDate Current end date string
 * @param duration Duration to extend
 * @param unit Unit of duration (hours, days, weeks)
 * @returns New end date
 *
 * @dev This function should match your business logic for extending stays
 */
export const calculateNewEndDate = (
  currentEndDate: string,
  duration: string,
  unit: string,
): Date => {
  const endDate = new Date(currentEndDate);
  const durationNum = Number.parseInt(duration, 10);

  if (unit === "hours") {
    endDate.setHours(endDate.getHours() + durationNum);
  } else if (unit === "days") {
    endDate.setDate(endDate.getDate() + durationNum);
  } else if (unit === "weeks") {
    endDate.setDate(endDate.getDate() + durationNum * 7);
  }

  return endDate;
};
