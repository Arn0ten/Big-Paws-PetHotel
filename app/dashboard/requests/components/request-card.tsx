"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

interface RequestCardProps {
  request: any
  onClick: () => void
  isNew?: boolean // Add isNew prop to indicate new or updated requests
}

export function RequestCard({ request, onClick, isNew = false }: RequestCardProps) {
  const getStatusIcon = () => {
    switch (request.status) {
      case "new":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "in-progress":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (request.status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-amber-100 text-amber-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow relative" onClick={onClick}>
      {isNew && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white" variant="destructive">
          New
        </Badge>
      )}
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor()}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
          <div className="text-xs text-gray-500">ID: #{request.id}</div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700">Pet Owner</span>
            <span className="text-base">{request.petOwner}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700">Pet Name</span>
            <span className="text-base">{request.petName}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700">Service</span>
            <span className="text-base">{request.service}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700">Dates</span>
            <span className="text-base">
              {formatDate(request.startDate)} - {formatDate(request.endDate)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-gray-50 px-4 py-2 border-t">
        <div className="flex flex-col w-full">
          <span className="text-sm font-bold text-gray-700">Total Amount</span>
          <span className="text-base font-semibold">${request.totalAmount.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

