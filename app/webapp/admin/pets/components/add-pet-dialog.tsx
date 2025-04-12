// "use client"

// import { useState, useCallback } from "react"
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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { PlusCircle, Loader2, Dog, Cat, User, Upload } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useToast } from "@/hooks/use-toast"
// import { DEFAULT_IMAGES, getPetImageByType } from "@/app/webapp/constants/image-constants"

// // Import these from your types file
// const DOG_BREEDS = [
//   "Golden Retriever",
//   "Labrador",
//   "German Shepherd",
//   "Bulldog",
//   "Poodle",
//   "Beagle",
//   "Rottweiler",
//   "Boxer",
//   "Dachshund",
//   "Siberian Husky",
// ]
// const CAT_BREEDS = [
//   "Siamese",
//   "Persian",
//   "Maine Coon",
//   "Ragdoll",
//   "Bengal",
//   "Sphynx",
//   "British Shorthair",
//   "Abyssinian",
//   "Scottish Fold",
//   "Birman",
// ]

// export function AddPetDialog({ isOpen, onOpenChange, onSubmit, isSubmitting, petOwners }) {
//   const { toast } = useToast()
//   const [formState, setFormState] = useState({
//     name: "",
//     type: "Dog",
//     breed: "",
//     age: "",
//     size: "Medium",
//     notes: "",
//     ownerId: "",
//     image: null,
//   })

//   const [formErrors, setFormErrors] = useState({})

//   // Handle avatar upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // BACKEND INTEGRATION POINT:
//     // This should upload the file to your server/storage
//     // Example implementation:
//     // const formData = new FormData()
//     // formData.append('image', file)
//     // const response = await fetch('/api/admin/upload-pet-image', {
//     //   method: 'POST',
//     //   body: formData
//     // })
//     // const data = await response.json()
//     // if (response.ok) {
//     //   setFormState(prev => ({ ...prev, image: data.url }))
//     // }

//     // Mock implementation - replace with actual upload
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         const imageUrl = event.target.result.toString()
//         setFormState((prev) => ({ ...prev, image: imageUrl }))

//         toast({
//           title: "Image uploaded",
//           description: "Pet image has been updated.",
//         })
//       }
//     }
//     reader.readAsDataURL(file)
//   }

//   const updateField = useCallback(
//     (field, value) => {
//       setFormState((prev) => ({
//         ...prev,
//         [field]: value,
//         // Reset breed if pet type changes
//         ...(field === "type" && { breed: "", image: null }),
//       }))

//       // Clear error for this field if it exists
//       if (formErrors[field]) {
//         setFormErrors((prev) => {
//           const newErrors = { ...prev }
//           delete newErrors[field]
//           return newErrors
//         })
//       }
//     },
//     [formErrors],
//   )

//   const validateForm = useCallback(() => {
//     const errors = {}
//     const requiredFields = ["name", "type", "breed", "age", "size", "ownerId"]

//     requiredFields.forEach((field) => {
//       if (!formState[field]) {
//         errors[field] = true
//       }
//     })

//     // Validate age is a number
//     if (formState.age && isNaN(Number(formState.age))) {
//       errors.age = "Age must be a number"
//     }

//     setFormErrors(errors)
//     return Object.keys(errors).length === 0
//   }, [formState])

//   const handleSubmit = async () => {
//     if (!validateForm()) return

//     // If no custom image was uploaded, use the default image based on pet type
//     const petData = {
//       ...formState,
//       image: formState.image || getPetImageByType(formState.type),
//     }

//     await onSubmit(petData, formState.ownerId)
//   }

//   // Reset form when dialog closes
//   const handleOpenChange = (open) => {
//     if (!open) {
//       setFormState({
//         name: "",
//         type: "Dog",
//         breed: "",
//         age: "",
//         size: "Medium",
//         notes: "",
//         ownerId: "",
//         image: null,
//       })
//       setFormErrors({})
//     }
//     onOpenChange(open)
//   }

//   // Get the current pet image to display
//   const currentPetImage =
//     formState.image || (formState.type ? getPetImageByType(formState.type) : DEFAULT_IMAGES.PLACEHOLDER)

//   return (
//     <Dialog open={isOpen} onOpenChange={handleOpenChange}>
//       <DialogContent className="w-full max-w-md md:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[80vh]">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2 text-primary">
//             <PlusCircle className="h-5 w-5" />
//             Add New Pet
//           </DialogTitle>
//           <DialogDescription>Register a new pet in the system</DialogDescription>
//         </DialogHeader>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
//           <div className="md:col-span-2 flex flex-col items-center mb-2">
//             <Avatar className="h-24 w-24 mb-2">
//               <AvatarImage src={currentPetImage} alt="Pet" />
//               <AvatarFallback>{formState.name ? formState.name.charAt(0) : "P"}</AvatarFallback>
//             </Avatar>

//             <Label htmlFor="pet-image-upload" className="cursor-pointer">
//               <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
//                 <Upload className="h-3 w-3" />
//                 <span>Upload Photo</span>
//               </div>
//               <Input
//                 id="pet-image-upload"
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />
//             </Label>
//             <p className="text-xs text-muted-foreground mt-1">Optional: Upload a pet photo or use the default</p>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="pet-name" className="text-sm font-medium flex items-center">
//               Pet Name <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Input
//               id="pet-name"
//               placeholder="Enter pet name"
//               value={formState.name}
//               onChange={(e) => updateField("name", e.target.value)}
//               className={`focus-visible:ring-primary ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
//             />
//             {formErrors.name && <p className="text-xs text-red-500">Pet name is required</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="pet-owner" className="text-sm font-medium flex items-center">
//               Pet Owner <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formState.ownerId} onValueChange={(value) => updateField("ownerId", value)}>
//               <SelectTrigger
//                 id="pet-owner"
//                 className={`${formErrors.ownerId ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
//               >
//                 <SelectValue placeholder="Select pet owner" />
//               </SelectTrigger>
//               <SelectContent>
//                 {petOwners.map((owner) => (
//                   <SelectItem key={owner.id} value={owner.id}>
//                     <div className="flex items-center">
//                       <User className="mr-2 h-4 w-4 text-muted-foreground" />
//                       {owner.name}
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {formErrors.ownerId && <p className="text-xs text-red-500">Pet owner is required</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="pet-type" className="text-sm font-medium flex items-center">
//               Pet Type <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formState.type} onValueChange={(value) => updateField("type", value)}>
//               <SelectTrigger
//                 id="pet-type"
//                 className={`${formErrors.type ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
//               >
//                 <SelectValue placeholder="Select pet type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Dog">
//                   <div className="flex items-center">
//                     <Dog className="mr-2 h-4 w-4 text-blue-500" />
//                     Dog
//                   </div>
//                 </SelectItem>
//                 <SelectItem value="Cat">
//                   <div className="flex items-center">
//                     <Cat className="mr-2 h-4 w-4 text-purple-500" />
//                     Cat
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//             {formErrors.type && <p className="text-xs text-red-500">Pet type is required</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="pet-breed" className="text-sm font-medium flex items-center">
//               Breed <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formState.breed} onValueChange={(value) => updateField("breed", value)}>
//               <SelectTrigger
//                 id="pet-breed"
//                 className={`${formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
//               >
//                 <SelectValue placeholder="Select breed" />
//               </SelectTrigger>
//               <SelectContent>
//                 {(formState.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map((breed) => (
//                   <SelectItem key={breed} value={breed}>
//                     {breed}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {formErrors.breed && <p className="text-xs text-red-500">Breed is required</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="pet-age" className="text-sm font-medium flex items-center">
//               Age (years) <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Input
//               id="pet-age"
//               type="number"
//               min="0"
//               max="30"
//               placeholder="Enter age"
//               value={formState.age}
//               onChange={(e) => updateField("age", Number.parseInt(e.target.value))}
//               className={`focus-visible:ring-primary ${formErrors.age ? "border-red-500 focus-visible:ring-red-500" : "border-input"}`}
//             />
//             {formErrors.age && <p className="text-xs text-red-500">Age is required</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="pet-size" className="text-sm font-medium flex items-center">
//               Size <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formState.size} onValueChange={(value) => updateField("size", value)}>
//               <SelectTrigger
//                 id="pet-size"
//                 className={`${formErrors.size ? "border-red-500 focus-visible:ring-red-500" : "border-input"} focus-visible:ring-primary`}
//               >
//                 <SelectValue placeholder="Select size" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Small">Small</SelectItem>
//                 <SelectItem value="Medium">Medium</SelectItem>
//                 <SelectItem value="Large">Large</SelectItem>
//                 <SelectItem value="XL">XL</SelectItem>
//               </SelectContent>
//             </Select>
//             {formErrors.size && <p className="text-xs text-red-500">Size is required</p>}
//           </div>

//           <div className="space-y-2 md:col-span-2">
//             <Label htmlFor="pet-notes" className="text-sm font-medium">
//               Additional Notes <span className="text-xs text-muted-foreground">(optional)</span>
//             </Label>
//             <Textarea
//               id="pet-notes"
//               placeholder="Enter any additional information about the pet"
//               value={formState.notes}
//               onChange={(e) => updateField("notes", e.target.value)}
//               className="min-h-[80px] focus-visible:ring-primary"
//             />
//           </div>
//         </div>

//         <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={isSubmitting}>
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Adding Pet...
//               </>
//             ) : (
//               <>
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 Add Pet
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

