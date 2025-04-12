// "use client";

// import type React from "react";

// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Save,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   FileText,
//   Upload,
//   Users,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Separator } from "@/components/ui/separator";
// import type { PetOwner } from "../utils/types";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface PetOwnerFormViewProps {
//   owner?: PetOwner | null;
//   onBack: () => void;
//   onSubmit: (data: Partial<PetOwner>) => Promise<boolean>;
//   isSubmitting: boolean;
// }

// export default function PetOwnerFormView({
//   owner,
//   onBack,
//   onSubmit,
//   isSubmitting,
// }: PetOwnerFormViewProps) {
//   // Form state
//   const [formData, setFormData] = useState<Partial<PetOwner>>(
//     owner
//       ? {
//           name: owner.name,
//           email: owner.email,
//           phone: owner.phone,
//           address: {
//             street: owner.address?.street || "",
//             city: owner.address?.city || "",
//             state: owner.address?.state || "",
//             zipCode: owner.address?.zipCode || "",
//           },
//           notes: owner.notes || "",
//           avatar: owner.avatar || "",
//         }
//       : {
//           name: "",
//           email: "",
//           phone: "",
//           address: {
//             street: "",
//             city: "",
//             state: "",
//             zipCode: "",
//           },
//           notes: "",
//           avatar: "",
//         },
//   );

//   // Form validation
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Add after the errors state
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle form input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;

//     // Handle nested address fields
//     if (name.startsWith("address.")) {
//       const addressField = name.split(".")[1];
//       setFormData({
//         ...formData,
//         address: {
//           ...formData.address,
//           [addressField]: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }

//     // Clear error for this field if it exists
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   // Add handleImageUpload function after handleChange
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type
//     const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//     if (!validTypes.includes(file.type)) {
//       setErrors({
//         ...errors,
//         avatar: "Please upload a valid image file (JPEG, PNG, GIF, WEBP)",
//       });
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setErrors({
//         ...errors,
//         avatar: "Image size should be less than 5MB",
//       });
//       return;
//     }

//     // Mock implementation - replace with actual upload
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         const imageUrl = event.target.result.toString();
//         setFormData((prev) => ({ ...prev, avatar: imageUrl }));

//         // Clear error if it exists
//         if (errors.avatar) {
//           setErrors({
//             ...errors,
//             avatar: "",
//           });
//         }
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     // Required fields
//     if (!formData.name?.trim()) {
//       newErrors.name = "Name is required";
//     }

//     if (!formData.email?.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.phone?.trim()) {
//       newErrors.phone = "Phone number is required";
//     }

//     // Address validation - only validate if any address field is filled
//     const hasAddressData =
//       formData.address?.street?.trim() ||
//       formData.address?.city?.trim() ||
//       formData.address?.state?.trim() ||
//       formData.address?.zipCode?.trim();

//     if (hasAddressData) {
//       if (!formData.address?.street?.trim()) {
//         newErrors["address.street"] = "Street address is required";
//       }
//       if (!formData.address?.city?.trim()) {
//         newErrors["address.city"] = "City is required";
//       }
//       if (!formData.address?.state?.trim()) {
//         newErrors["address.state"] = "State is required";
//       }
//       if (!formData.address?.zipCode?.trim()) {
//         newErrors["address.zipCode"] = "ZIP code is required";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const success = await onSubmit(formData);
//     if (success) {
//       // Form was submitted successfully, navigation will be handled by the parent component
//     }
//   };

//   return (
//     <motion.div
//       className="space-y-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Header with back button */}
//       <div className="flex items-center gap-4">
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={onBack}
//           className="h-8 w-auto px-3"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back
//         </Button>
//         <h1 className="text-2xl font-bold tracking-tight">
//           {owner ? "Edit Pet Owner" : "Add New Pet Owner"}
//         </h1>
//       </div>

//       <Card>
//         <form onSubmit={handleSubmit}>
//           <CardHeader>
//             <div className="flex items-center">
//               <User className="mr-2 h-5 w-5 text-primary" />
//               <CardTitle>
//                 {owner
//                   ? "Edit Pet Owner Information"
//                   : "New Pet Owner Information"}
//               </CardTitle>
//             </div>
//             <CardDescription>
//               {owner
//                 ? "Update the pet owner's information below."
//                 : "Enter the new pet owner's information below."}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Avatar Upload */}
//             <div className="flex flex-col items-center mb-4">
//               <Avatar className="h-24 w-24 mb-2">
//                 <AvatarImage
//                   src={formData.avatar || "/default-images/default-user.png"}
//                   alt="Owner Profile"
//                 />
//                 <AvatarFallback>
//                   <Users className="h-12 w-12" />
//                 </AvatarFallback>
//               </Avatar>

//               <Label htmlFor="avatar-upload" className="cursor-pointer">
//                 <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
//                   <Upload className="h-3 w-3" />
//                   <span>Upload Photo</span>
//                 </div>
//                 <Input
//                   id="avatar-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleImageUpload}
//                   ref={fileInputRef}
//                 />
//               </Label>
//               <p className="text-xs text-muted-foreground mt-1">
//                 Optional: Upload a profile picture
//               </p>
//               {errors.avatar && (
//                 <p className="text-xs text-destructive">{errors.avatar}</p>
//               )}
//             </div>

//             {/* Basic Information */}
//             <div className="space-y-4">
//               <h3 className="text-sm font-medium text-muted-foreground">
//                 Basic Information
//               </h3>
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="flex items-center">
//                     <User className="mr-1 h-3 w-3" />
//                     Full Name <span className="text-destructive ml-1">*</span>
//                   </Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter full name"
//                     className={errors.name ? "border-destructive" : ""}
//                   />
//                   {errors.name && (
//                     <p className="text-xs text-destructive">{errors.name}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email" className="flex items-center">
//                     <Mail className="mr-1 h-3 w-3" />
//                     Email Address{" "}
//                     <span className="text-destructive ml-1">*</span>
//                   </Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     className={errors.email ? "border-destructive" : ""}
//                   />
//                   {errors.email && (
//                     <p className="text-xs text-destructive">{errors.email}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="phone" className="flex items-center">
//                     <Phone className="mr-1 h-3 w-3" />
//                     Phone Number{" "}
//                     <span className="text-destructive ml-1">*</span>
//                   </Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Enter phone number"
//                     className={errors.phone ? "border-destructive" : ""}
//                   />
//                   {errors.phone && (
//                     <p className="text-xs text-destructive">{errors.phone}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             {/* Address Information */}
//             <div className="space-y-4">
//               <h3 className="text-sm font-medium text-muted-foreground">
//                 Address Information
//               </h3>
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2 md:col-span-2">
//                   <Label htmlFor="street" className="flex items-center">
//                     <MapPin className="mr-1 h-3 w-3" />
//                     Street Address
//                   </Label>
//                   <Input
//                     id="street"
//                     name="address.street"
//                     value={formData.address?.street || ""}
//                     onChange={handleChange}
//                     placeholder="Enter street address"
//                     className={
//                       errors["address.street"] ? "border-destructive" : ""
//                     }
//                   />
//                   {errors["address.street"] && (
//                     <p className="text-xs text-destructive">
//                       {errors["address.street"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="city">City</Label>
//                   <Input
//                     id="city"
//                     name="address.city"
//                     value={formData.address?.city || ""}
//                     onChange={handleChange}
//                     placeholder="Enter city"
//                     className={
//                       errors["address.city"] ? "border-destructive" : ""
//                     }
//                   />
//                   {errors["address.city"] && (
//                     <p className="text-xs text-destructive">
//                       {errors["address.city"]}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="state">State</Label>
//                   <Input
//                     id="state"
//                     name="address.state"
//                     value={formData.address?.state || ""}
//                     onChange={handleChange}
//                     placeholder="Enter state"
//                     className={
//                       errors["address.state"] ? "border-destructive" : ""
//                     }
//                   />
//                   {errors["address.state"] && (
//                     <p className="text-xs text-destructive">
//                       {errors["address.state"]}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             {/* Additional Information */}
//             <div className="space-y-4">
//               <h3 className="text-sm font-medium text-muted-foreground">
//                 Additional Information
//               </h3>
//               <div className="space-y-2">
//                 <Label htmlFor="notes" className="flex items-center">
//                   <FileText className="mr-1 h-3 w-3" />
//                   Notes
//                 </Label>
//                 <Textarea
//                   id="notes"
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   placeholder="Enter any additional notes about this pet owner"
//                   rows={4}
//                 />
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button type="button" variant="outline" onClick={onBack}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : (
//                 <>Save</>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </motion.div>
//   );
// }
