export type RequestStatus = "pending" | "in-progress" | "completed" | "cancelled"
export type RequestType = "photo" | "video" | "grooming" | "extend-stay" | "other"

export interface Request {
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

