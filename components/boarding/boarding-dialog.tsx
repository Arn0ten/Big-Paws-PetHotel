// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Textarea } from "@/components/ui/textarea"
// import { PricingTiers } from "./pricing-tiers"
// import { CalendarIcon } from "lucide-react"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { cn } from "@/lib/utils"
// import { format } from "date-fns"
// import { BoardingSuccessDialog } from "./boarding-success-dialog"
// import { sendEmail } from "@/lib/email-service"
// import { generateBoardingConfirmationEmail } from "@/lib/email-templates"

// interface BoardingDialogProps {
//   open: boolean
//   onClose: () => void
//   onSubmit: (data: BoardingFormData) => void
//   pet: {
//     id: string
//     name: string
//     type: string
//     size: string
//   }
//   owner: {
//     name: string
//     email: string
//   }
// }

// interface BoardingFormData {
//   startDate: Date
//   endDate: Date
//   boardingType: "daycare" | "accommodation" | "cathotel"
//   notes: string
// }

// export function BoardingDialog({ open, onClose, onSubmit, pet, owner }: BoardingDialogProps) {
//   const [formData, setFormData] = useState<BoardingFormData>({
//     startDate: new Date(),
//     endDate: new Date(),
//     boardingType: "daycare",
//     notes: "",
//   })

//   const [showSuccessDialog, setShowSuccessDialog] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       // Send confirmation email
//       const { subject, html, text } = generateBoardingConfirmationEmail(pet, formData, owner)

//       await sendEmail({
//         to: owner.email,
//         subject,
//         html,
//         text,
//       })

//       // Call the onSubmit callback
//       onSubmit(formData)

//       // Show success dialog
//       setShowSuccessDialog(true)
//     } catch (error) {
//       console.error("Failed to send confirmation email:", error)
//       // Still call onSubmit even if email fails
//       onSubmit(formData)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>Book Boarding for {pet.name}</DialogTitle>
//         </DialogHeader>

//         <div className="grid gap-6 md:grid-cols-[1fr,2fr]">
//           <div className="space-y-4">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Boarding Type</Label>
//                 <RadioGroup
//                   value={formData.boardingType}
//                   onValueChange={(value: "daycare" | "accommodation" | "cathotel") =>
//                     setFormData({ ...formData, boardingType: value })
//                   }
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="daycare" id="daycare" />
//                     <Label htmlFor="daycare">Day Care</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="accommodation" id="accommodation" />
//                     <Label htmlFor="accommodation">24Hrs Accommodation</Label>
//                   </div>
//                   {pet.type === "cat" && (
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="cathotel" id="cathotel" />
//                       <Label htmlFor="cathotel">Cat Hotel</Label>
//                     </div>
//                   )}
//                 </RadioGroup>
//               </div>

//               <div className="space-y-2">
//                 <Label>Start Date</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !formData.startDate && "text-muted-foreground",
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       selected={formData.startDate}
//                       onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               <div className="space-y-2">
//                 <Label>End Date</Label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className={cn(
//                         "w-full justify-start text-left font-normal",
//                         !formData.endDate && "text-muted-foreground",
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       selected={formData.endDate}
//                       onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               <div className="space-y-2">
//                 <Label>Additional Notes</Label>
//                 <Textarea
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   placeholder="Any special requirements or instructions..."
//                 />
//               </div>

//               <div className="flex justify-end space-x-2">
//                 <Button variant="destructive" onClick={onClose}>
//                   Cancel
//                 </Button>
//                 <Button type="submit">Book Now</Button>
//               </div>
//             </form>
//           </div>

//           <div className="order-first md:order-last">
//             <PricingTiers />
//           </div>
//         </div>
//       </DialogContent>
//       {showSuccessDialog && (
//         <BoardingSuccessDialog
//           open={showSuccessDialog}
//           onClose={() => {
//             setShowSuccessDialog(false)
//             onClose()
//           }}
//           petName={pet.name}
//         />
//       )}
//     </Dialog>
//   )
// }

