"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Pencil, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lock, ChevronRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/default-pic-TTy4UvlTr4nVP0etctSbFI1CUrupvH.png?height=200&width=200",
  });

  // BACKEND INTEGRATION POINT:
  // Fetch pet data from the API
  // This data should be read-only for pet owners
  // Only administrators can modify pet information
  const [pets, setPets] = useState([
    {
      id: "pet-1",
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "65 lbs",
      gender: "Male",
      microchip: "123456789012345",
      avatar: "/placeholder.svg?height=100&width=100",
      boarding: {
        status: "active",
        startDate: "2025-03-05T10:00:00Z",
        endDate: "2025-03-15T18:00:00Z",
      },
      size: "Large",
      medicalInfo: "Allergic to chicken. Takes thyroid medication daily.",
      vaccinations: [
        { name: "Rabies", date: "2024-01-15", expiry: "2025-01-15" },
        { name: "DHPP", date: "2024-02-10", expiry: "2025-02-10" },
        { name: "Bordetella", date: "2024-03-05", expiry: "2024-09-05" },
      ],
      emergencyContact: {
        name: "John Johnson",
        phone: "+1 (555) 987-6543",
        relationship: "Spouse",
      },
      dietaryRestrictions: "Grain-free diet recommended",
      behavioralNotes:
        "Friendly with other dogs. Anxious during thunderstorms.",
    },
    {
      id: "pet-2",
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "2 years",
      weight: "8 lbs",
      gender: "Female",
      microchip: "987654321098765",
      avatar: "/placeholder.svg?height=100&width=100",
      boarding: null,
      size: "Small",
      medicalInfo: "No known medical issues",
      vaccinations: [
        { name: "Rabies", date: "2024-02-20", expiry: "2025-02-20" },
        { name: "FVRCP", date: "2024-02-20", expiry: "2025-02-20" },
      ],
      emergencyContact: {
        name: "John Johnson",
        phone: "+1 (555) 987-6543",
        relationship: "Spouse",
      },
      dietaryRestrictions: "None",
      behavioralNotes: "Shy with strangers. Prefers quiet environments.",
    },
  ]);

  // Form state for editing
  const [formData, setFormData] = useState({ ...profile });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const router = useRouter();

  // Add this function to handle logout
  const handleLogout = () => {
    // In a real app, you would call your auth service to sign out
    // For example: await authService.signOut();

    // For demo purposes, we'll just redirect to the login page
    // You might want to clear local storage, cookies, etc.
    localStorage.removeItem("auth_token"); // Remove any stored tokens
    sessionStorage.clear(); // Clear session storage

    // Redirect to login page
    router.push("/webapp/auth/login");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and view your pets
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="pets">My Pets</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Personal Information</CardTitle>
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
                <CardDescription>
                  {isEditing
                    ? "Update your personal information"
                    : "Your personal information"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Full Name
                          </p>
                          <p className="font-medium">{profile.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{profile.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{profile.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Address
                          </p>
                          <p className="font-medium">{profile.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {isEditing && (
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleSubmit}>
                      Save Changes
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>

              <CardContent>
                {/* 
                  BACKEND INTEGRATION POINT:
                  1. When the user clicks "Change Password", they should be redirected to the change password page
                  2. The user's email should be pre-filled in the change password form
                  3. After successful password change, redirect back to this profile page
                  
                  API Integration:
                  - GET /api/user/profile - To fetch current user data
                  - POST /api/auth/change-password - To submit password change request
                  
                  Authentication:
                  - Ensure the user is authenticated before accessing this page
                  - Pass authentication token in API requests
                */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Change Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your account password
                      </p>
                    </div>
                    <Link
                      href="/webapp/auth/change-password?from=pet-owner"
                      className="flex items-center justify-between rounded-md p-3 text-sm transition-colors hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <div>Change Password</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="destructive"
              className="w-full mt-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </TabsContent>

          <TabsContent value="pets" className="mt-4 space-y-4">
            <TooltipProvider>
              {pets.map((pet) => (
                <Card key={pet.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={pet.avatar} alt={pet.name} />
                        <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {pet.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {pet.breed} • {pet.age}
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Info className="h-4 w-4" />
                                <span className="sr-only">Pet Details</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <div className="text-xs space-y-1">
                                <p>
                                  <span className="font-semibold">
                                    Medical Info:
                                  </span>{" "}
                                  {pet.medicalInfo}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Dietary Restrictions:
                                  </span>{" "}
                                  {pet.dietaryRestrictions}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Behavioral Notes:
                                  </span>{" "}
                                  {pet.behavioralNotes}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Emergency Contact:
                                  </span>{" "}
                                  {pet.emergencyContact.name} (
                                  {pet.emergencyContact.relationship}) -{" "}
                                  {pet.emergencyContact.phone}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Type
                            </p>
                            <p className="text-sm">{pet.type}</p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Gender
                            </p>
                            <p className="text-sm">{pet.gender}</p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Size
                            </p>
                            <p className="text-sm">{pet.size}</p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Status
                            </p>
                            <p className="text-sm">
                              {pet.boarding ? (
                                <span className="text-amber-600 dark:text-amber-400">
                                  Currently Boarding
                                </span>
                              ) : (
                                <span className="text-green-600 dark:text-green-400">
                                  Available
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        {pet.vaccinations && pet.vaccinations.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs text-muted-foreground mb-1">
                              Vaccinations
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {pet.vaccinations.map((vax, index) => (
                                <div
                                  key={index}
                                  className="text-xs bg-muted px-2 py-1 rounded-full"
                                >
                                  {vax.name} (Exp:{" "}
                                  {new Date(vax.expiry).toLocaleDateString()})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TooltipProvider>

            <div className="text-center text-muted-foreground p-4 border border-dashed rounded-md">
              Please contact the administrator to add or modify pets
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
