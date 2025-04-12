// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { format } from "date-fns"
// import {
//   CalendarIcon,
//   Clock,
//   Hotel,
//   CheckCircle,
//   ChevronRight,
//   ChevronLeft,
//   Dog,
//   Cat,
//   Loader2,
//   CalendarDays,
//   CalendarClock,
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// // Types
// import type { Pet } from "../utils/types"

// /**
//  * BACKEND INTEGRATION NOTES:
//  *
//  * This component handles the boarding process for individual pets.
//  *
//  * Integration points:
//  * 1. Replace the mock data with actual API calls to your boarding service
//  * 2. Implement proper validation against available kennel space
//  * 3. Connect to payment processing if applicable
//  * 4. Update the pet's boarding status in the database
//  *
//  * Expected response format:
//  * {
//  *   success: boolean,
//  *   message: string,
//  *   boardingId?: string,
//  *   startDate: string,
//  *   endDate: string,
//  *   totalCost: number
//  * }
//  */

// // Custom time picker component
// const TimePicker = ({ value, onChange }: { value: string; onChange: (time: string) => void }) => {
//   const hours = Array.from({ length: 24 }, (_, i) => i)
//   const minutes = ["00", "15", "30", "45"]

//   const [selectedHour, selectedMinute] = value.split(":").map((v, i) => (i === 0 ? Number.parseInt(v) : v))

//   return (
//     <PopoverContent className="w-auto p-0" align="start">
//       <div className="flex h-[300px]">
//         <div className="border-r overflow-y-auto p-2 w-16">
//           {hours.map((hour) => (
//             <div
//               key={hour}
//               className={cn(
//                 "cursor-pointer rounded-md p-2 text-center text-sm hover:bg-muted",
//                 selectedHour === hour && "bg-primary text-primary-foreground hover:bg-primary/90",
//               )}
//               onClick={() => {
//                 onChange(`${hour.toString().padStart(2, "0")}:${selectedMinute}`)
//               }}
//             >
//               {hour.toString().padStart(2, "0")}
//             </div>
//           ))}
//         </div>
//         <div className="overflow-y-auto p-2 w-16">
//           {minutes.map((minute) => (
//             <div
//               key={minute}
//               className={cn(
//                 "cursor-pointer rounded-md p-2 text-center text-sm hover:bg-muted",
//                 selectedMinute === minute && "bg-primary text-primary-foreground hover:bg-primary/90",
//               )}
//               onClick={() => {
//                 onChange(`${selectedHour.toString().padStart(2, "0")}:${minute}`)
//               }}
//             >
//               {minute}
//             </div>
//           ))}
//         </div>
//       </div>
//     </PopoverContent>
//   )
// }

// // Pricing utility function
// const calculateBoardingPrice = (
//   pet: Pet,
//   type: BoardingType,
//   startDate: Date,
//   endDate: Date,
//   startTime?: string,
//   endTime?: string,
// ): number => {
//   // Pricing tiers based on pet size
//   const dogDaycarePricing = {
//     Small: 25,
//     Medium: 30,
//     Large: 40,
//     XL: 50,
//   }

//   const dogAccommodationPricing = {
//     Small: 320,
//     Medium: 400,
//     Large: 480,
//     XL: 550,
//   }

//   const catPricing = {
//     standard: {
//       kitten: 300,
//       adult: 400,
//     },
//     extraGuest: {
//       smallToMedium: 200,
//       large: 300,
//     },
//   }

//   let price = 0

//   if (pet.type === "Dog") {
//     if (type === "Daycare") {
//       // Calculate hours for daycare
//       let hours = 8 // Default to 8 hours if times not provided

//       if (startTime && endTime) {
//         const startHour = Number.parseInt(startTime.split(":")[0])
//         const startMinute = Number.parseInt(startTime.split(":")[1])
//         const endHour = Number.parseInt(endTime.split(":")[0])
//         const endMinute = Number.parseInt(endTime.split(":")[1])

//         // Calculate total hours including partial hours
//         hours = endHour - startHour
//         if (endMinute > startMinute) hours += 0.5
//         else if (endMinute < startMinute) hours -= 0.5

//         // Minimum 1 hour
//         hours = Math.max(1, hours)
//       }

//       // Get hourly rate based on size
//       const hourlyRate = dogDaycarePricing[pet.size]
//       price = hourlyRate * hours
//     } else {
//       // For long stay, calculate number of days
//       const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
//       // Minimum 1 day
//       const stayDays = Math.max(1, days)

//       // Get daily rate based on size
//       const dailyRate = dogAccommodationPricing[pet.size]
//       price = dailyRate * stayDays
//     }
//   } else if (pet.type === "Cat") {
//     // For cats, we use a simpler pricing model
//     const isKitten = pet.age < 1
//     const isLarge = pet.size === "Large" || pet.size === "XL"

//     // Base price for standard room
//     price = isKitten ? catPricing.standard.kitten : catPricing.standard.adult

//     // For long stay, multiply by days
//     if (type === "LongStay") {
//       const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
//       const stayDays = Math.max(1, days)
//       price *= stayDays
//     }
//   }

//   // Round to 2 decimal places
//   return Math.round(price * 100) / 100
// }

// // Boarding type
// type BoardingType = "Daycare" | "LongStay"

// // Boarding details
// interface BoardingDetails {
//   type: BoardingType
//   startDate: Date
//   endDate: Date
//   startTime?: string
//   endTime?: string
//   notes?: string
//   price?: number
// }

// interface BoardPetDialogProps {
//   pet: Pet | null
//   isOpen: boolean
//   onOpenChange: (open: boolean) => void
//   onSubmit: (details: BoardingDetails) => Promise<boolean>
// }

// export function BoardPetDialog({ pet, isOpen, onOpenChange, onSubmit }: BoardPetDialogProps) {
//   const [step, setStep] = useState(1)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [boardingDetails, setBoardingDetails] = useState<BoardingDetails>({
//     type: "Daycare",
//     startDate: new Date(),
//     endDate: new Date(),
//     startTime: "09:00",
//     endTime: "17:00",
//     notes: "",
//     price: 0,
//   })

//   // Calculate pricing whenever relevant details change
//   useEffect(() => {
//     if (isOpen && pet) {
//       setStep(1)
//       const initialDetails: BoardingDetails = {
//         type: "Daycare",
//         startDate: new Date(),
//         endDate: new Date(),
//         startTime: "09:00",
//         endTime: "17:00",
//         notes: "",
//       }

//       // Calculate initial price
//       const price = calculateBoardingPrice(
//         pet,
//         initialDetails.type,
//         initialDetails.startDate,
//         initialDetails.endDate,
//         initialDetails.startTime,
//         initialDetails.endTime,
//       )

//       setBoardingDetails({
//         ...initialDetails,
//         price,
//       })
//     }
//   }, [isOpen, pet])

//   // Recalculate price when boarding details change
//   useEffect(() => {
//     if (pet && boardingDetails.type) {
//       const newPrice = calculateBoardingPrice(
//         pet,
//         boardingDetails.type,
//         boardingDetails.startDate,
//         boardingDetails.endDate,
//         boardingDetails.startTime,
//         boardingDetails.endTime,
//       )

//       // Only update if the price has actually changed
//       if (newPrice !== boardingDetails.price) {
//         setBoardingDetails((prev) => ({
//           ...prev,
//           price: newPrice,
//         }))
//       }
//     }
//   }, [
//     pet,
//     boardingDetails.type,
//     boardingDetails.startDate,
//     boardingDetails.endDate,
//     boardingDetails.startTime,
//     boardingDetails.endTime,
//   ])

//   // Handle boarding type change
//   const handleBoardingTypeChange = (type: BoardingType) => {
//     // First update the type and reset dates/times without calculating price
//     setBoardingDetails((prev) => ({
//       ...prev,
//       type,
//       // Reset dates/times based on type
//       ...(type === "Daycare"
//         ? {
//             startDate: new Date(),
//             endDate: new Date(),
//             startTime: "09:00",
//             endTime: "17:00",
//           }
//         : {
//             startDate: new Date(),
//             endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
//             startTime: undefined,
//             endTime: undefined,
//           }),
//     }))

//     // Price will be calculated by the useEffect that watches for changes to boardingDetails
//   }

//   // Handle form submission
//   const handleSubmit = async () => {
//     setIsSubmitting(true)
//     const success = await onSubmit(boardingDetails)
//     setIsSubmitting(false)

//     if (success) {
//       onOpenChange(false)
//     }
//   }

//   // Validate if can proceed to next step
//   const canProceedToStep2 = true
//   const canProceedToStep3 =
//     boardingDetails.type === "Daycare"
//       ? boardingDetails.startTime && boardingDetails.endTime
//       : boardingDetails.startDate && boardingDetails.endDate

//   // Format date for display
//   const formatDate = (date: Date) => {
//     return format(date, "PPP")
//   }

//   // Format time for display
//   const formatTime = (time: string) => {
//     const [hour, minute] = time.split(":")
//     const hourNum = Number.parseInt(hour)
//     const period = hourNum >= 12 ? "PM" : "AM"
//     const hour12 = hourNum % 12 || 12
//     return `${hour12}:${minute} ${period}`
//   }

//   if (!pet) return null

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
//         <DialogHeader className="px-6 pt-6 pb-2">
//           <DialogTitle className="text-xl flex items-center gap-2 text-primary">
//             <Hotel className="h-5 w-5" />
//             Board Pet
//           </DialogTitle>
//           <DialogDescription>Create a boarding reservation for {pet.name}</DialogDescription>
//         </DialogHeader>

//         {/* Step indicator */}
//         <div className="px-6 py-2">
//           <div className="flex items-center justify-between">
//             {[1, 2, 3].map((stepNumber) => (
//               <div key={stepNumber} className="flex flex-col items-center">
//                 <div
//                   className={cn(
//                     "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
//                     step === stepNumber
//                       ? "border-primary bg-primary text-primary-foreground"
//                       : step > stepNumber
//                         ? "border-primary bg-primary/20 text-primary"
//                         : "border-muted-foreground/30 text-muted-foreground",
//                   )}
//                 >
//                   {stepNumber}
//                 </div>
//                 <span
//                   className={cn(
//                     "text-xs mt-1",
//                     step === stepNumber
//                       ? "text-primary font-medium"
//                       : step > stepNumber
//                         ? "text-primary/70"
//                         : "text-muted-foreground",
//                   )}
//                 >
//                   {stepNumber === 1 ? "Pet Details" : stepNumber === 2 ? "Boarding Details" : "Summary"}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="relative mt-2 mb-4">
//             <Separator />
//             <div
//               className="absolute top-0 left-0 h-[1px] bg-primary transition-all"
//               style={{ width: `${((step - 1) / 2) * 100}%` }}
//             />
//           </div>
//         </div>

//         <div className="px-6">
//           <AnimatePresence mode="wait">
//             {step === 1 && (
//               <motion.div
//                 key="step1"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.2 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-base font-medium">Pet Information</h3>

//                 <div className="flex items-center space-x-4">
//                   <Avatar className="h-16 w-16 border">
//                     <AvatarImage src={pet.image} alt={pet.name} />
//                     <AvatarFallback className="bg-primary/10">
//                       {pet.type === "Dog" ? (
//                         <Dog className="h-8 w-8 text-primary" />
//                       ) : (
//                         <Cat className="h-8 w-8 text-primary" />
//                       )}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h4 className="text-lg font-medium">{pet.name}</h4>
//                     <div className="flex items-center text-sm text-muted-foreground">
//                       <Badge
//                         variant="outline"
//                         className={pet.type === "Dog" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}
//                       >
//                         {pet.type}
//                       </Badge>
//                       <span className="ml-2">{pet.breed}</span>
//                       <span className="mx-1">•</span>
//                       <span>{pet.size}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="p-3 rounded-lg border">
//                     <p className="text-sm font-medium text-muted-foreground">Age</p>
//                     <p className="text-base">
//                       {pet.age} {pet.age === 1 ? "year" : "years"}
//                     </p>
//                   </div>
//                   <div className="p-3 rounded-lg border">
//                     <p className="text-sm font-medium text-muted-foreground">Size</p>
//                     <p className="text-base">{pet.size}</p>
//                   </div>
//                 </div>

//                 {pet.notes && (
//                   <div className="p-3 rounded-lg border">
//                     <p className="text-sm font-medium text-muted-foreground">Notes</p>
//                     <p className="text-sm mt-1">{pet.notes}</p>
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             {step === 2 && (
//               <motion.div
//                 key="step2"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.2 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-base font-medium">Boarding type and details</h3>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label className="text-sm font-medium">Boarding Type</Label>
//                     <RadioGroup
//                       value={boardingDetails.type}
//                       onValueChange={(value) => handleBoardingTypeChange(value as BoardingType)}
//                       className="flex flex-col space-y-2"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <RadioGroupItem value="Daycare" id="daycare" className="text-primary" />
//                         <Label htmlFor="daycare" className="flex items-center cursor-pointer">
//                           <CalendarClock className="h-4 w-4 mr-2 text-primary" />
//                           <span>Daycare (Same Day)</span>
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <RadioGroupItem value="LongStay" id="longstay" className="text-primary" />
//                         <Label htmlFor="longstay" className="flex items-center cursor-pointer">
//                           <CalendarDays className="h-4 w-4 mr-2 text-primary" />
//                           <span>Long Stay (Multiple Days)</span>
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>

//                   {boardingDetails.type === "Daycare" ? (
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="start-time" className="text-sm font-medium">
//                             Drop-off Time
//                           </Label>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 id="start-time"
//                                 variant="outline"
//                                 className="w-full justify-start text-left font-normal"
//                               >
//                                 <Clock className="mr-2 h-4 w-4 text-primary" />
//                                 {boardingDetails.startTime ? formatTime(boardingDetails.startTime) : "Select time"}
//                               </Button>
//                             </PopoverTrigger>
//                             <TimePicker
//                               value={boardingDetails.startTime || "09:00"}
//                               onChange={(time) => setBoardingDetails((prev) => ({ ...prev, startTime: time }))}
//                             />
//                           </Popover>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="end-time" className="text-sm font-medium">
//                             Pick-up Time
//                           </Label>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 id="end-time"
//                                 variant="outline"
//                                 className="w-full justify-start text-left font-normal"
//                               >
//                                 <Clock className="mr-2 h-4 w-4 text-primary" />
//                                 {boardingDetails.endTime ? formatTime(boardingDetails.endTime) : "Select time"}
//                               </Button>
//                             </PopoverTrigger>
//                             <TimePicker
//                               value={boardingDetails.endTime || "17:00"}
//                               onChange={(time) => setBoardingDetails((prev) => ({ ...prev, endTime: time }))}
//                             />
//                           </Popover>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="daycare-date" className="text-sm font-medium">
//                           Date
//                         </Label>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               id="daycare-date"
//                               variant="outline"
//                               className="w-full justify-start text-left font-normal"
//                             >
//                               <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
//                               {formatDate(boardingDetails.startDate)}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar
//                               mode="single"
//                               selected={boardingDetails.startDate}
//                               onSelect={(date) =>
//                                 date &&
//                                 setBoardingDetails((prev) => ({
//                                   ...prev,
//                                   startDate: date,
//                                   endDate: date,
//                                 }))
//                               }
//                               initialFocus
//                               disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
//                             />
//                           </PopoverContent>
//                         </Popover>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="start-date" className="text-sm font-medium">
//                             Check-in Date
//                           </Label>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 id="start-date"
//                                 variant="outline"
//                                 className="w-full justify-start text-left font-normal"
//                               >
//                                 <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
//                                 {formatDate(boardingDetails.startDate)}
//                               </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-auto p-0" align="start">
//                               <Calendar
//                                 mode="single"
//                                 selected={boardingDetails.startDate}
//                                 onSelect={(date) => {
//                                   if (!date) return

//                                   // Ensure end date is not before start date
//                                   const newEndDate = boardingDetails.endDate < date ? date : boardingDetails.endDate

//                                   setBoardingDetails((prev) => ({
//                                     ...prev,
//                                     startDate: date,
//                                     endDate: newEndDate,
//                                   }))
//                                 }}
//                                 initialFocus
//                                 disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
//                               />
//                             </PopoverContent>
//                           </Popover>
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="end-date" className="text-sm font-medium">
//                             Check-out Date
//                           </Label>
//                           <Popover>
//                             <PopoverTrigger asChild>
//                               <Button
//                                 id="end-date"
//                                 variant="outline"
//                                 className="w-full justify-start text-left font-normal"
//                               >
//                                 <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
//                                 {formatDate(boardingDetails.endDate)}
//                               </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-auto p-0" align="start">
//                               <Calendar
//                                 mode="single"
//                                 selected={boardingDetails.endDate}
//                                 onSelect={(date) => date && setBoardingDetails((prev) => ({ ...prev, endDate: date }))}
//                                 initialFocus
//                                 disabled={(date) => date < boardingDetails.startDate}
//                               />
//                             </PopoverContent>
//                           </Popover>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="space-y-2">
//                     <Label htmlFor="notes" className="text-sm font-medium">
//                       Additional Notes (Optional)
//                     </Label>
//                     <Textarea
//                       id="notes"
//                       placeholder="Enter any special instructions or requirements..."
//                       value={boardingDetails.notes || ""}
//                       onChange={(e) => setBoardingDetails((prev) => ({ ...prev, notes: e.target.value }))}
//                       className="min-h-[100px] resize-none"
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {step === 3 && (
//               <motion.div
//                 key="step3"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.2 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-base font-medium">Boarding Summary</h3>

//                 <div className="space-y-4">
//                   <div className="bg-muted/50 rounded-lg p-4 space-y-3">
//                     <div>
//                       <h4 className="text-sm font-medium text-muted-foreground">Pet</h4>
//                       <div className="flex items-center mt-1">
//                         <Avatar className="h-8 w-8 mr-2 border">
//                           <AvatarImage src={pet.image} alt={pet.name} />
//                           <AvatarFallback className="bg-primary/10">
//                             {pet.type === "Dog" ? (
//                               <Dog className="h-4 w-4 text-primary" />
//                             ) : (
//                               <Cat className="h-4 w-4 text-primary" />
//                             )}
//                           </AvatarFallback>
//                         </Avatar>
//                         <p className="text-base font-medium">{pet.name}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-muted-foreground">Boarding Type</h4>
//                       <div className="flex items-center mt-1">
//                         {boardingDetails.type === "Daycare" ? (
//                           <Badge className="bg-primary/10 text-primary">
//                             <CalendarClock className="h-3 w-3 mr-1" />
//                             Daycare
//                           </Badge>
//                         ) : (
//                           <Badge className="bg-primary/10 text-primary">
//                             <CalendarDays className="h-3 w-3 mr-1" />
//                             Long Stay
//                           </Badge>
//                         )}
//                       </div>
//                     </div>

//                     {boardingDetails.type === "Daycare" ? (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
//                           <p className="text-base">{formatDate(boardingDetails.startDate)}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-medium text-muted-foreground">Time</h4>
//                           <p className="text-base">
//                             {boardingDetails.startTime && formatTime(boardingDetails.startTime)} -{" "}
//                             {boardingDetails.endTime && formatTime(boardingDetails.endTime)}
//                           </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="text-sm font-medium text-muted-foreground">Check-in Date</h4>
//                           <p className="text-base">{formatDate(boardingDetails.startDate)}</p>
//                         </div>
//                         <div>
//                           <h4 className="text-sm font-medium text-muted-foreground">Check-out Date</h4>
//                           <p className="text-base">{formatDate(boardingDetails.endDate)}</p>
//                         </div>
//                       </div>
//                     )}

//                     {boardingDetails.notes && (
//                       <div>
//                         <h4 className="text-sm font-medium text-muted-foreground">Additional Notes</h4>
//                         <p className="text-sm mt-1 bg-background p-2 rounded border">{boardingDetails.notes}</p>
//                       </div>
//                     )}

//                     {boardingDetails.price !== undefined && (
//                       <div>
//                         <h4 className="text-sm font-medium text-muted-foreground">Pricing</h4>
//                         <div className="flex justify-between items-center mt-2 pt-2 border-t">
//                           <span className="font-medium">Total</span>
//                           <span className="text-lg font-bold text-primary">₱{boardingDetails.price.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
//                     <div className="flex items-start">
//                       <div className="bg-primary/10 rounded-full p-2 mr-3">
//                         <CheckCircle className="h-5 w-5 text-primary" />
//                       </div>
//                       <div>
//                         <h4 className="font-medium">Ready to create boarding reservation</h4>
//                         <p className="text-sm text-muted-foreground mt-1">
//                           Please review the details above and confirm to create the boarding reservation.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <DialogFooter className="px-6 py-4 border-t flex flex-row items-center justify-between">
//           {step > 1 ? (
//             <Button variant="outline" onClick={() => setStep(step - 1)} className="flex items-center">
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Back
//             </Button>
//           ) : (
//             <Button variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//           )}

//           {step < 3 ? (
//             <Button
//               onClick={() => setStep(step + 1)}
//               disabled={(step === 1 && !canProceedToStep2) || (step === 2 && !canProceedToStep3)}
//               className="flex items-center bg-primary hover:bg-primary/90"
//             >
//               Next
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           ) : (
//             <Button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="bg-success hover:bg-success/90 text-white"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 <>
//                   <Hotel className="h-4 w-4 mr-2" />
//                   Create Boarding
//                 </>
//               )}
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

