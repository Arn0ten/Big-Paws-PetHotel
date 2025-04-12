// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { PawPrint, Dog, Cat, Upload, Loader2, PlusCircle } from "lucide-react"
// import type { Pet } from "../utils/types"
// import PageLayout from "@/app/webapp/components/PageLayout"

// // Define the FormErrors type
// interface FormErrors {
//   name?: boolean
//   type?: boolean
//   breed?: boolean
//   age?: boolean
//   size?: boolean
//   image?: boolean
// }

// const DOG_BREEDS = [
//   "Labrador Retriever",
//   "German Shepherd",
//   "Golden Retriever",
//   "French Bulldog",
//   "Bulldog",
//   "Poodle",
//   "Rottweiler",
//   "Beagle",
//   "Dachshund",
//   "German Shorthaired Pointer",
//   "Yorkshire Terrier",
//   "Boxer",
//   "Siberian Husky",
//   "Doberman Pinscher",
//   "Australian Shepherd",
//   "Great Dane",
//   "Miniature Schnauzer",
//   "Shih Tzu",
//   "Bernese Mountain Dog",
//   "Pomeranian",
// ]

// const CAT_BREEDS = [
//   "Maine Coon",
//   "Ragdoll",
//   "British Shorthair",
//   "Persian",
//   "Siamese",
//   "Bengal",
//   "Sphynx",
//   "Abyssinian",
//   "Russian Blue",
//   "Norwegian Forest Cat",
//   "American Shorthair",
//   "Scottish Fold",
//   "Burmese",
//   "Oriental Shorthair",
//   "Himalayan",
//   "Egyptian Mau",
//   "Tonkinese",
//   "Cornish Rex",
//   "Devon Rex",
//   "Ocicat",
// ]

// interface PetFormViewProps {
//   pet?: Pet | null
//   ownerId: string | null
//   ownerName?: string
//   onBack: () => void
//   onSubmit: (data: Partial<Pet>) => Promise<boolean>
//   isSubmitting: boolean
// }

// export default function PetFormView({ pet, ownerId, ownerName, onBack, onSubmit, isSubmitting }: PetFormViewProps) {
//   const isEditMode = !!pet

//   // Form state
//   const [formData, setFormData] = useState<Partial<Pet>>(
//     pet
//       ? {
//           id: pet.id,
//           name: pet.name,
//           type: pet.type,
//           breed: pet.breed,
//           age: pet.age,
//           size: pet.size,
//           notes: pet.notes || "",
//           image: pet.image || "",
//         }
//       : {
//           name: "",
//           type: "Dog",
//           breed: "",
//           age: undefined,
//           size: "Medium",
//           notes: "",
//           image: "",
//         },
//   )

//   // Form validation
//   const [formErrors, setFormErrors] = useState<FormErrors>({})
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   // Handle form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: name === "age" ? Number(value) : value,
//     })

//     // Clear error for this field if it exists
//     if (formErrors[name as keyof FormErrors]) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name as keyof FormErrors]
//         return newErrors
//       })
//     }
//   }

//   // Handle select changes
//   const handleSelectChange = (name: string, value: string) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     })

//     // Reset breed if pet type changes
//     if (name === "type") {
//       setFormData((prev) => ({ ...prev, breed: "" }))
//     }

//     // Clear error for this field if it exists
//     if (formErrors[name as keyof FormErrors]) {
//       setFormErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name as keyof FormErrors]
//         return newErrors
//       })
//     }
//   }

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     // Validate file type
//     const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
//     if (!validTypes.includes(file.type)) {
//       setFormErrors((prev) => ({
//         ...prev,
//         image: true,
//       }))
//       return
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setFormErrors((prev) => ({
//         ...prev,
//         image: true,
//       }))
//       return
//     }

//     // Mock implementation - replace with actual upload
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         const imageUrl = event.target.result.toString()
//         setFormData((prev) => ({ ...prev, image: imageUrl }))
//         setFormErrors((prev) => {
//           const newErrors = { ...prev }
//           delete newErrors.image
//           return newErrors
//         })
//       }
//     }
//     reader.readAsDataURL(file)
//   }

//   // Validate form
//   const validateForm = () => {
//     const errors: FormErrors = {}
//     const requiredFields: (keyof Pet)[] = ["name", "type", "breed", "age", "size"]

//     requiredFields.forEach((field) => {
//       if (!formData[field]) {
//         errors[field] = true
//       }
//     })

//     if (formData.age !== undefined) {
//       if (isNaN(Number(formData.age)) || Number(formData.age) < 0) {
//         errors.age = true
//       }
//     }

//     setFormErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return
//     }

//     // Set default image based on pet type if no image is provided
//     if (!formData.image) {
//       const defaultImage = formData.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
//       formData.image = defaultImage
//     }

//     // Add owner ID to form data
//     const petData = {
//       ...formData,
//       ownerId: ownerId || undefined,
//     }

//     await onSubmit(petData)
//   }

//   // Get default image based on pet type
//   const getDefaultImage = () => {
//     return formData.type === "Dog" ? "/default-images/dog.png" : "/default-images/cat.png"
//   }

//   return (
//     <PageLayout title={isEditMode ? `Edit Pet: ${pet?.name}` : `Add New Pet for ${ownerName}`} onBack={onBack}>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="md:col-span-2 flex flex-col items-center mb-4">
//           <Avatar className="h-24 w-24 mb-2">
//             <AvatarImage src={formData.image || getDefaultImage()} alt="Pet Profile" />
//             <AvatarFallback>
//               {formData.type === "Dog" ? <Dog className="h-12 w-12" /> : <Cat className="h-12 w-12" />}
//             </AvatarFallback>
//           </Avatar>

//           <Label htmlFor="image-upload" className="cursor-pointer">
//             <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
//               <Upload className="h-3 w-3" />
//               <span>Upload Photo</span>
//             </div>
//             <Input
//               id="image-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageUpload}
//               ref={fileInputRef}
//             />
//           </Label>
//           <p className="text-xs text-muted-foreground mt-1">Optional: Upload a profile picture</p>
//           {formErrors.image && <p className="text-xs text-red-500 mt-1">Please upload a valid image (max 5MB)</p>}
//         </div>

//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name" className="text-sm font-medium flex items-center">
//               Pet Name <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               placeholder="Enter pet name"
//               value={formData.name || ""}
//               onChange={handleInputChange}
//               className={formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
//             />
//             {formErrors.name && <p className="text-xs text-red-500">Pet name is required</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="type" className="text-sm font-medium flex items-center">
//               Pet Type <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formData.type || "Dog"} onValueChange={(value) => handleSelectChange("type", value)}>
//               <SelectTrigger id="type" className={formErrors.type ? "border-red-500 focus-visible:ring-red-500" : ""}>
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
//             <Label htmlFor="breed" className="text-sm font-medium flex items-center">
//               Breed <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formData.breed || ""} onValueChange={(value) => handleSelectChange("breed", value)}>
//               <SelectTrigger id="breed" className={formErrors.breed ? "border-red-500 focus-visible:ring-red-500" : ""}>
//                 <SelectValue placeholder="Select breed" />
//               </SelectTrigger>
//               <SelectContent>
//                 {(formData.type === "Dog" ? DOG_BREEDS : CAT_BREEDS).map((breed) => (
//                   <SelectItem key={breed} value={breed}>
//                     {breed}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             {formErrors.breed && <p className="text-xs text-red-500">Breed is required</p>}
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="age" className="text-sm font-medium flex items-center">
//               Age (years) <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Input
//               id="age"
//               name="age"
//               type="number"
//               min="0"
//               max="30"
//               placeholder="Enter age"
//               value={formData.age === undefined ? "" : formData.age}
//               onChange={handleInputChange}
//               className={formErrors.age ? "border-red-500 focus-visible:ring-red-500" : ""}
//             />
//             {formErrors.age && <p className="text-xs text-red-500">Age is required and must be a valid number</p>}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="size" className="text-sm font-medium flex items-center">
//               Size <span className="text-red-500 ml-1">*</span>
//             </Label>
//             <Select value={formData.size || "Medium"} onValueChange={(value) => handleSelectChange("size", value)}>
//               <SelectTrigger id="size" className={formErrors.size ? "border-red-500 focus-visible:ring-red-500" : ""}>
//                 <SelectValue placeholder="Select size" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Small">Small</SelectItem>
//                 <SelectItem value="Medium">Medium</SelectItem>
//                 <SelectItem value="Large">Large</SelectItem>
//                 <SelectItem value="XL">Extra Large</SelectItem>
//               </SelectContent>
//             </Select>
//             {formErrors.size && <p className="text-xs text-red-500">Size is required</p>}
//           </div>
//         </div>

//         <div className="md:col-span-2 space-y-2">
//           <Label htmlFor="notes" className="text-sm font-medium">
//             Notes <span className="text-xs text-muted-foreground">(optional)</span>
//           </Label>
//           <Textarea
//             id="notes"
//             name="notes"
//             placeholder="Enter any additional notes about this pet"
//             value={formData.notes || ""}
//             onChange={handleInputChange}
//             className="min-h-[80px]"
//           />
//         </div>

//         <div className="md:col-span-2 pt-4 border-t flex justify-end gap-2">
//           <Button variant="outline" onClick={onBack}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 text-white">
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 {isEditMode ? "Updating..." : "Adding..."}
//               </>
//             ) : (
//               <>
//                 {isEditMode ? (
//                   <>

//                     Update Pet
//                   </>
//                 ) : (
//                   <>

//                     Add Pet
//                   </>
//                 )}
//               </>
//             )}
//           </Button>
//         </div>
//       </div>
//     </PageLayout>
//   )
// }
