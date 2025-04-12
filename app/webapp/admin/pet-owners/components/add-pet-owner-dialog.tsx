// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/hooks/use-toast"
// import { PlusCircle, Loader2, User, Mail, Phone, MapPin, Upload } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { DEFAULT_IMAGES } from "@/app/webapp/constants/image-constants"

// export function AddPetOwnerDialog({ isOpen, onOpenChange, onSubmit }) {
//   const { toast } = useToast()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     notes: "",
//     avatar: DEFAULT_IMAGES.USER_AVATAR, // Default avatar
//   })

//   const [formErrors, setFormErrors] = useState({})

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))

//     // Clear error for this field if it exists
//     if (formErrors[name]) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   // Handle avatar upload
//   const handleAvatarUpload = (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // BACKEND INTEGRATION POINT:
//     // This should upload the file to your server/storage
//     // Example implementation:
//     // const formData = new FormData()
//     // formData.append('avatar', file)
//     // const response = await fetch('/api/admin/upload-avatar', {
//     //   method: 'POST',
//     //   body: formData
//     // })
//     // const data = await response.json()
//     // if (response.ok) {
//     //   setFormData(prev => ({ ...prev, avatar: data.url }))
//     // }

//     // Mock implementation - replace with actual upload
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         const avatarUrl = event.target.result.toString()
//         setFormData((prev) => ({ ...prev, avatar: avatarUrl }))

//         toast({
//           title: "Avatar uploaded",
//           description: "Profile picture has been updated.",
//         })
//       }
//     }
//     reader.readAsDataURL(file)
//   }

//   // Validate form
//   const validateForm = () => {
//     const errors = {}
//     const requiredFields = ["name", "email", "phone"]

//     requiredFields.forEach((field) => {
//       if (!formData[field]) {
//         errors[field] = "This field is required"
//       }
//     })

//     // Email validation
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Please enter a valid email address"
//     }

//     setFormErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) return

//     setIsSubmitting(true)

//     try {
//       // BACKEND INTEGRATION POINT:
//       // This should call your API to create a new pet owner
//       // Example API call:
//       // const response = await fetch('/api/admin/pet-owners', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     'Authorization': `Bearer ${localStorage.getItem('token')}`
//       //   },
//       //   body: JSON.stringify(formData)
//       // })
//       // if (!response.ok) throw new Error('Failed to create pet owner')
//       // const data = await response.json()

//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       // Generate a mock ID for the new pet owner
//       const newPetOwner = {
//         ...formData,
//         id: `owner-${Date.now()}`,
//         createdAt: new Date().toISOString(),
//         pets: [],
//       }

//       await onSubmit(newPetOwner)

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         notes: "",
//         avatar: DEFAULT_IMAGES.USER_AVATAR,
//       })

//       onOpenChange(false)

//       toast({
//         title: "Pet owner added",
//         description: "The pet owner has been added successfully.",
//       })
//     } catch (error) {
//       console.error("Failed to add pet owner:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add pet owner. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Reset form when dialog closes
//   const handleOpenChange = (open) => {
//     if (!open) {
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         notes: "",
//         avatar: DEFAULT_IMAGES.USER_AVATAR,
//       })
//       setFormErrors({})
//     }
//     onOpenChange(open)
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2 text-primary">
//             <PlusCircle className="h-5 w-5" />
//             Add New Pet Owner
//           </DialogTitle>
//           <DialogDescription>Register a new pet owner in the system</DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="flex flex-col items-center mb-4">
//             <Avatar className="h-24 w-24 mb-2">
//               <AvatarImage src={formData.avatar} alt="Profile" />
//               <AvatarFallback>{formData.name ? formData.name.charAt(0) : "U"}</AvatarFallback>
//             </Avatar>

//             <Label htmlFor="avatar-upload" className="cursor-pointer">
//               <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
//                 <Upload className="h-3 w-3" />
//                 <span>Upload Photo</span>
//               </div>
//               <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
//             </Label>
//             <p className="text-xs text-muted-foreground mt-1">Optional: Upload a profile picture or use the default</p>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="name" className="text-sm font-medium flex items-center">
//               Full Name <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="Enter full name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className={`pl-9 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
//               />
//             </div>
//             {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-sm font-medium flex items-center">
//               Email <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter email address"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className={`pl-9 ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
//               />
//             </div>
//             {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="phone" className="text-sm font-medium flex items-center">
//               Phone <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="phone"
//                 name="phone"
//                 placeholder="Enter phone number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className={`pl-9 ${formErrors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
//               />
//             </div>
//             {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="address" className="text-sm font-medium">
//               Address <span className="text-xs text-muted-foreground">(optional)</span>
//             </Label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="address"
//                 name="address"
//                 placeholder="Enter address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="pl-9"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="notes" className="text-sm font-medium">
//               Notes <span className="text-xs text-muted-foreground">(optional)</span>
//             </Label>
//             <Textarea
//               id="notes"
//               name="notes"
//               placeholder="Enter any additional notes"
//               value={formData.notes}
//               onChange={handleInputChange}
//               className="min-h-[80px]"
//             />
//           </div>
//         </div>

//         <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
//           <Button variant="outline" onClick={() => handleOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Adding...
//               </>
//             ) : (
//               <>
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 Add Pet Owner
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

