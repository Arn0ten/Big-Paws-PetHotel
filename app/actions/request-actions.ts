"use server"

import { revalidatePath } from "next/cache"
import { getEmailTemplate, sendEmail } from "@/lib/email"
import type { RequestType, RequestStatus } from "@/types"

// Types definition (assumed to be in your types folder)
interface Request {
  id: string
  petName: string
  petOwner: {
    name: string
    email: string
  }
  type: RequestType
  status: RequestStatus
  details: string
  submittedAt: Date
  completedAt?: Date
  mediaUrl?: string
  extensionDays?: number
  groomingDate?: string
  isNewlyCompleted?: boolean
}

// This is a mock function that simulates DB operation
// Replace with your actual database operations
async function updateRequestInDatabase(requestId: string, data: Partial<Request>): Promise<Request> {
  // Simulate database update
  console.log(`Updating request ${requestId} with data:`, data)

  // Simulate fetching the updated request
  const updatedRequest: Request = {
    id: requestId,
    petName: "Buddy",
    petOwner: {
      name: "John Smith",
      email: "pet.owner@example.com",
    },
    type: "photo" as RequestType,
    status: "completed" as RequestStatus,
    details: "Weekly photo update",
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    completedAt: new Date(),
    ...data,
    isNewlyCompleted: true,
  }

  return updatedRequest
}

export async function completeRequest(
  requestId: string,
  completionData: {
    details: string
    mediaUrl?: string
    extensionDays?: number
    groomingDate?: string
  },
) {
  try {
    // Update the request status in the database
    const updatedRequest = await updateRequestInDatabase(requestId, {
      status: "completed",
      completedAt: new Date(),
      ...completionData,
      isNewlyCompleted: true,
    })

    // Determine email template based on request type
    let emailTemplate: "request-processed" | "boarding-extended" | "grooming-scheduled" | "media-ready"

    switch (updatedRequest.type) {
      case "extend-stay":
        emailTemplate = "boarding-extended"
        break
      case "grooming":
        emailTemplate = "grooming-scheduled"
        break
      case "photo":
      case "video":
        emailTemplate = "media-ready"
        break
      default:
        emailTemplate = "request-processed"
    }

    // Prepare and send email notification
    const emailHtml = getEmailTemplate(emailTemplate, {
      to: updatedRequest.petOwner.email,
      subject: `Request for ${updatedRequest.petName} Processed`,
      html: "", // Will be populated by the template
      from: "pet.boarding@example.com",
      petName: updatedRequest.petName,
      ownerName: updatedRequest.petOwner.name,
      requestType: updatedRequest.type,
      completionDetails: completionData.details,
      mediaUrl: completionData.mediaUrl,
      extensionDays: completionData.extensionDays,
      groomingDate: completionData.groomingDate,
    })

    // Send the email
    const emailResult = await sendEmail({
      to: updatedRequest.petOwner.email,
      subject: `Request for ${updatedRequest.petName} Processed`,
      html: emailHtml,
      from: "pet.boarding@example.com",
      petName: updatedRequest.petName,
      ownerName: updatedRequest.petOwner.name,
    })

    // Revalidate the page to show updated data
    revalidatePath("/requests")

    return {
      success: true,
      request: updatedRequest,
      emailSent: emailResult.success,
      emailMessage: emailResult.message,
    }
  } catch (error) {
    console.error("Error completing request:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to complete request",
      emailSent: false,
    }
  }
}

