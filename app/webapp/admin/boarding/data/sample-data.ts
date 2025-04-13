import { sampleBoardingOrders } from "../../data/boarding-sample-data";
import type { BoardingOrder } from "../types";

// Re-export the sample data
export { sampleBoardingOrders };

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
    paymentStatus: paymentStatus as any,
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
