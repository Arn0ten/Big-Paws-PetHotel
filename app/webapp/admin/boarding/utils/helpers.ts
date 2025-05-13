import type { BoardingOrder, PaymentStatus, BoardingType } from "../types"
import {BoardingDTO, RequestBreakdown} from "@/types/boarding"

/**
 * Format date to a readable string
 * @param dateString ISO date string to format
 * @returns Formatted date string
 *
 * @dev This function should be replaced with your preferred date formatting library
 * or server-side formatting for consistency across the application
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Add the formatTime function if it doesn't exist
export const formatTime = (timeString: string): string => {
  try {
    const date = new Date(timeString)
    if (isNaN(date.getTime())) {
      return "Invalid Time"
    }
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  } catch (error) {
    console.error("Error formatting time:", error)
    return "Invalid Time"
  }
}

/**
 * Calculate boarding duration in days or hours
 * @param startDate ISO date string for start date
 * @param endDate ISO date string for end date
 * @param boardingType Type of boarding (Daycare, LongStay, CatHotel)
 * @returns Duration in hours or days depending on boarding type
 *
 * @dev This calculation should match your business logic for billing periods
 */
export const calculateDuration = (startDate: string, endDate: string, boardingType: String): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffTime = Math.abs(end.getTime() - start.getTime())

  if (boardingType === "DAYCARE") {
    return Math.ceil(diffTime / (1000 * 60 * 60)) // Return hours for daycare
  }

  // For LongStay and CatHotel, return days
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Format duration for display
 * @param duration Number of hours or days
 * @param boardingType Type of boarding (Daycare, LongStay, CatHotel)
 * @returns Formatted duration string
 */
export const formatDuration = (duration: number, boardingType: String): string => {
  if (boardingType === "DAYCARE") {
    return `${duration} hour${duration !== 1 ? "s" : ""}`
  }
  return `${duration} day${duration !== 1 ? "s" : ""}`
}

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
  }).format(amount)
}

/**
 * Calculate the total of additional services
 * @param order BoardingOrder object
 * @returns Total amount of additional services
 *
 * @dev This function should be used consistently across the application
 * to ensure the same calculation logic is applied everywhere
 */
export const calculateAdditionalServicesTotal = (order: BoardingDTO): number => {
  if (!order.requestBreakdown || order.requestBreakdown.length === 0) {
    return 0
  }

  return order.requestBreakdown.reduce((total, service) => total + service.total, 0)
}

/**
 * Calculate the base boarding price without additional services
 * @param order BoardingOrder object
 * @returns Base boarding price
 *
 * @dev This should match your business logic for calculating base boarding rates
 */
export const calculateBasePrice = (order: BoardingDTO): number => {
  // If baseAmount is explicitly set, use it
  if (order.boardingPrice) {
    return order.boardingPrice
  }

  // Otherwise calculate from total price minus additional services
  const additionalServicesTotal = calculateAdditionalServicesTotal(order)
  return order.total - additionalServicesTotal
}

/**
 * Update boarding status based on payment status
 * @param order BoardingOrder object
 * @param newPaymentStatus New payment status to set
 * @returns Updated BoardingOrder object
 *
 * @dev This function implements business logic for status transitions
 * and should be aligned with your application's workflow
 */
export const updateBoardingStatus = (order: BoardingDTO, newPaymentStatus: PaymentStatus): BoardingDTO => {
  const updatedOrder = {
    ...order,
    paymentStatus: newPaymentStatus,
    updatedAt: new Date().toISOString(),
    lastModifiedBy: "Admin",
    lastModificationReason: `Payment status updated to ${newPaymentStatus}`,
  }

  // If the order is overdue and the new payment status is 'Paid', don't change the boarding status
  if (order.overdue && newPaymentStatus === "PAID") {
    // Log the successful operation
    logAdminActivity({
      module: "boarding",
      action: "update-payment",
      description: `Updated payment status to ${newPaymentStatus} for overdue boarding: ${order.petName}`,
      status: "completed",
      entityId: order.id,
      relatedEntityId: order.petId,
    })

    return updatedOrder
  }

  // Only update the boarding status if the current status is 'Done Boarding' and the new payment status is 'Paid'
  if (order.boardingStatus === "DONE_BOARDING" && newPaymentStatus === "PAID") {
    updatedOrder.boardingStatus = "RELEASED"
    updatedOrder.releasedAt = new Date().toISOString()

    // Log the successful operation with release info
    logAdminActivity({
      module: "BOARDING",
      action: "update-payment-and-release",
      description: `Updated payment status to Paid and released pet: ${order.petName}`,
      status: "completed",
      entityId: order.id,
      relatedEntityId: order.petId,
    })
  } else {
    // Log just the payment update
    logAdminActivity({
      module: "BOARDING",
      action: "update-payment",
      description: `Updated payment status to ${newPaymentStatus} for boarding: ${order.petName}`,
      status: "completed",
      entityId: order.id,
      relatedEntityId: order.petId,
    })
  }

  return updatedOrder
}

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
  orders: BoardingDTO[],
  boardingStatus?: string,
  paymentStatus?: string,
): BoardingDTO[] => {
  return orders.filter((order) => {
    const matchesBoardingStatus = !boardingStatus || boardingStatus === "all" || order.boardingStatus === boardingStatus
    const matchesPaymentStatus = !paymentStatus || paymentStatus === "all" || order.paymentStatus === paymentStatus
    return matchesBoardingStatus && matchesPaymentStatus
  })
}

/**
 * Search boarding orders by pet name or owner name
 * @param orders Array of BoardingOrder objects
 * @param searchTerm Search term to filter by
 * @returns Filtered array of BoardingOrder objects
 *
 * @dev For production, implement server-side search with proper indexing
 */
export const searchOrders = (orders: BoardingDTO[], searchTerm: string): BoardingDTO[] => {
  if (!searchTerm) return orders

  const lowerCaseSearchTerm = searchTerm.toLowerCase()

  return orders.filter(
    (order) =>
      order.petName.toLowerCase().includes(lowerCaseSearchTerm) ||
      order.ownerName.toLowerCase().includes(lowerCaseSearchTerm),
  )
}

/**
 * Check if a pet is eligible for release
 * @param order BoardingOrder object
 * @returns Boolean indicating if pet is eligible for release
 *
 * @dev This implements business logic for when pets can be released
 */
export const isEligibleForRelease = (order: BoardingDTO): boolean => {
  return order.paymentStatus === "PAID" && order.boardingStatus === "DONE_BOARDING" || order.boardingStatus === "BOARDING"
}

/**
 * Check if a pet is eligible for force release
 * @param order BoardingOrder object
 * @returns Boolean indicating if pet is eligible for force release
 *
 * @dev This implements business logic for when pets can be force released
 * BACKEND INTEGRATION: This logic should match the backend validation
 */
export const isEligibleForForceRelease = (order: BoardingDTO): boolean => {
  // Only pets with Paid status can be force released
  // CARE INCASE OF ERROR
  return order.paymentStatus === "PAID" && order.boardingStatus === "BOARDING"
}

// Add logging to the releasePet function
export const releasePet = (order: BoardingDTO): BoardingDTO => {
  const now = new Date().toISOString()
  const updatedOrder = {
    ...order,
    boardingStatus: "RELEASED",
    releaseTimestamp: now,
    updatedAt: now,
    receiptGenerated: true,
    notificationSent: true,
    isOverdue: false, // Reset the overdue status when releasing
    lastModifiedBy: "Admin",
    lastModificationReason: "Payment completed at pet release",
    paymentStatus: "Paid", // Ensure payment status is set to Paid when releasing
  }

  // Log the successful operation
  logAdminActivity({
    module: "BOARDING",
    action: "RELEASED",
    description: `Released pet: ${order.petName} (Owner: ${order.ownerName})`,
    status: "completed",
    entityId: order.id,
    relatedEntityId: order.petId,
    metadata: {
      boardingType: order.boardingType,
      totalPrice: order.total,
      startDate: order.boardingStart,
      endDate: order.boardingEnd,
      releaseDate: now,
    },
  })

  return updatedOrder
}

// Add logging to the forceReleasePet function
export const forceReleasePet = (order: BoardingDTO): BoardingDTO => {
  const now = new Date().toISOString()
  const updatedOrder = {
    ...order,
    boardingStatus: "RELEASED",
    releaseTimestamp: now,
    updatedAt: now,
    receiptGenerated: true,
    notificationSent: true,
    isOverdue: false,
    lastModifiedBy: "Admin",
    lastModificationReason: "Payment completed at force release",
    paymentStatus: "Paid", // Ensure payment status is set to Paid when force releasing
  }

  // Log the successful operation
  logAdminActivity({
    module: "boarding",
    action: "force-release",
    description: `Force released pet: ${order.petName} (Owner: ${order.ownerName})`,
    status: "completed",
    entityId: order.id,
    relatedEntityId: order.petId,
    metadata: {
      boardingType: order.boardingType,
      totalPrice: order.total,
      startDate: order.boardingStart,
      endDate: order.boardingEnd,
      releaseDate: now,
      wasOverdue: order.overdue,
    },
  })

  return updatedOrder
}

/**
 * Check if a pet pickup is overdue
 * @param orders Array of BoardingOrder objects
 * @returns Updated array with overdue status set
 *
 * @dev This should be run regularly to identify overdue pickups
 * Consider implementing as a scheduled job in production
 */
export const checkOverduePickups = (orders: BoardingDTO[]): BoardingDTO[] => {
  const now = new Date()

  return orders.map((order) => {
    // If the pet is still boarding and the end date has passed
    if (order.boardingStatus === "Done Boarding" && new Date(order.boardingEnd) < now) {
      return { ...order, isOverdue: true }
    }
    return { ...order, isOverdue: false }
  })
}

/**
 * Generate a receipt for a released pet
 * @param order BoardingOrder object
 * @returns Formatted receipt string
 *
 * @dev In production, this should generate a proper PDF or HTML receipt
 */
export const generateReceipt = (order: BoardingDTO): string => {
  const duration = calculateDuration(order.boardingStart, order.boardingEnd, order.boardingType)
  const formattedPrice = formatCurrency(order.total)
  const basePrice = calculateBasePrice(order)
  const additionalServicesTotal = calculateAdditionalServicesTotal(order)

  return `
    BOARDING RECEIPT
    ----------------
    Receipt ID: REC-${order.id}
    Date: ${formatDate(new Date().toISOString())}
    
    Pet: ${order.petName} (${order.petBreed})
    Owner: ${order.ownerName}
    
    Boarding Type: ${order.boardingType}
    Duration: ${duration}
    From: ${formatDate(order.boardingStart)}
    To: ${formatDate(order.boardingEnd)}
    
    Base Amount: ${formatCurrency(basePrice)}
    Additional Services: ${formatCurrency(additionalServicesTotal)}
    Total Amount: ${formattedPrice}
    Payment Status: ${order.paymentStatus}
    
    Released on: ${order.releasedAt ? formatDate(order.releasedAt) : "N/A"}
    
    Thank you for choosing our services!
  `
}

/**
 * Get boarding type description
 * @param type Boarding type string
 * @returns Human-readable description
 */
export const getBoardingTypeDescription = (type: string): string => {
  switch (type) {
    case "Daycare":
      return "Hourly service (less than 24 hours)"
    case "LongStay":
      return "Extended stay (overnight or longer)"
    case "CatHotel":
      return "Cat Hotel accommodation"
    default:
      return type
  }
}

/**
 * Calculate new end date based on extension duration
 * @param currentEndDate Current end date string
 * @param duration Duration to extend
 * @param unit Unit of duration (hours, days, weeks)
 * @returns New end date
 *
 * @dev This function should match your business logic for extending stays
 */
export const calculateNewEndDate = (currentEndDate: string, duration: string, unit: string): Date => {
  const endDate = new Date(currentEndDate)
  const durationNum = Number.parseInt(duration, 10)

  if (unit === "hours") {
    endDate.setHours(endDate.getHours() + durationNum)
  } else if (unit === "days") {
    endDate.setDate(endDate.getDate() + durationNum)
  } else if (unit === "weeks") {
    endDate.setDate(endDate.getDate() + durationNum * 7)
  }

  return endDate
}

// Add the logAdminActivity helper function at the end of the file
interface LogActivityParams {
  module: string
  action: string
  description: string
  status: string
  entityId: string
  relatedEntityId?: string
  metadata?: Record<string, any>
}

function logAdminActivity(params: LogActivityParams): void {
  // In a real implementation, this would send a POST request to your API
  // Example:
  // fetch('/api/admin/activity-log', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     ...params,
  //     timestamp: new Date().toISOString(),
  //     performedBy: "Current Admin User", // This would come from auth context
  //   })
  // });

  // For now, just log to console
  console.log("Admin Activity Log:", {
    ...params,
    timestamp: new Date().toISOString(),
    performedBy: "Current Admin User", // This would come from auth context
  })
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-600 hover:bg-green-600 text-white min-w-[100px] flex justify-center"
    case "Pending":
      return "bg-yellow-600 hover:bg-yellow-600 text-white min-w-[100px] flex justify-center"
    default:
      return "bg-gray-600 hover:bg-gray-600 text-white min-w-[100px] flex justify-center"
  }
}
