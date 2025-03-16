"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dog,
  Cat,
  Scissors,
  Hotel,
  Sun,
  PawPrint,
  Home,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const hotelServices = {
  dayCare: {
    hours: "8:00 AM to 7:00 PM",
    rates: [
      { size: "Small", price: "25", unit: "hr" },
      { size: "Medium", price: "30", unit: "hr" },
      { size: "Large", price: "40", unit: "hr" },
      { size: "XLarge", price: "50", unit: "hr" },
    ],
    requirements: "Need Fully Vaccine & Anti-Rabies",
  },
  accommodation: {
    title: "24Hrs Accommodation",
    subtitle: "Flexible Booking",
    rates: [
      { size: "Small", price: "320.00" },
      { size: "Medium", price: "400.00" },
      { size: "Large", price: "480.00" },
      { size: "XLarge", price: "550.00" },
    ],
  },
  catHotel: {
    standardRoom: [
      { type: "Kitten", price: "300.00" },
      { type: "Adult", price: "400.00" },
    ],
    extraGuest: [
      { type: "Small to Medium", price: "200" },
      { type: "Large Breed", price: "300" },
    ],
  },
};

const groomingServices = {
  forDogs: {
    basicWash: {
      description: "Bath & Blow Dry with Cologne",
      prices: {
        small: "180.00",
        medium: "220.00",
        large: "280.00",
        extraLarge: "320.00",
      },
    },
    premiumWash: {
      description:
        "Bath, Brush, Shampoo, Ear Clean, Nail Cut & Trim around the Face/Facial Area",
      prices: {
        small: "300.00",
        medium: "450.00",
        large: "550.00",
        extraLarge: "850.00",
      },
    },
    premiumWashAndCut: {
      description:
        "Bath, Brush, BlowDry, Ear Clean, Nail Cut & Trim around the Face/Facial Area",
      prices: {
        small: "450.00",
        medium: "600.00",
        large: "850.00",
        extraLarge: "880.00",
      },
    },
    fullGrooming: {
      description:
        "Bath, Brush, BlowDry, Ear Clean, Nail Cut & Full Body Cleaning, Cut with Style & Cologne",
      prices: {
        small: "500.00",
        medium: "650.00",
        large: "700.00",
        extraLarge: "800.00",
      },
    },
  },
  forCats: {
    basicWash: {
      description: "Bath & Blow Dry",
      prices: {
        small: "150.00",
        medium: "200.00",
        large: "250.00",
        extraLarge: "280.00",
      },
    },
    premiumWash: {
      description:
        "Bath with Nail Cut, Ear Clean, Trim around the Face with Cologne",
      prices: {
        small: "200.00",
        medium: "250.00",
        large: "300.00",
        extraLarge: "350.00",
      },
    },
  },
  additionalServices: {
    teethClean: "80",
    tickAndFleaRemoval: "150",
    blowDry: "80",
    woundTreatment: "50",
    nailCut: "100",
    analSacCleaning: "100",
    earCleaning: "80",
  },
};

const homeServices = {
  basicWash: {
    description: "Bath & Blow Dry with Cologne",
    prices: {
      small: "430",
      medium: "470",
      large: "530",
      extraLarge: "570",
    },
  },
  premiumWash: {
    description:
      "Bath, Brush, Shampoo, Ear Clean, Nail Cut & Trim around the Face/Facial Area",
    prices: {
      small: "550",
      medium: "700",
      large: "800",
      extraLarge: "900",
    },
  },
  premiumWashAndCut: {
    description:
      "Bath, Brush, BlowDry, Ear Clean, Nail Cut & Trim around the Face/Facial Area",
    prices: {
      small: "700",
      medium: "850",
      large: "900",
      extraLarge: "950",
    },
  },
  fullGrooming: {
    description:
      "Bath, Brush, BlowDry, Ear Clean, Nail Cut & Full Body Cleaning, Cut with Style & Cologne",
    prices: {
      small: "750",
      medium: "900",
      large: "950",
      extraLarge: "1000",
      xxl: "1100",
    },
  },
};

const serviceColors = {
  basicWash: "bg-blue-500 text-white",
  premiumWash: "bg-red-500 text-white",
  premiumWashAndCut: "bg-green-500 text-white",
  fullGrooming: "bg-purple-500 text-white",
};

const sizeColors = {
  small: "bg-purple-500 text-white",
  medium: "bg-pink-500 text-white",
  large: "bg-red-500 text-white",
  extraLarge: "bg-pink-400 text-white",
};

const serviceBackgroundColors = {
  basicWash: "bg-blue-100 dark:bg-blue-900/20",
  premiumWash: "bg-orange-100 dark:bg-orange-900/20",
  premiumWashAndCut: "bg-green-100 dark:bg-green-900/20",
  fullGrooming: "bg-gray-100 dark:bg-gray-800/20",
};

export default function ServicesMenu() {
  return (
    <section
      className="py-16 bg-background relative overflow-hidden"
      id="services"
    >
      <div className="container mx-auto px-4">
        {/* Promotional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 relative"
        >
          <div className="bg-[#FFF5E6] rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
              <div className="space-y-4 md:space-y-6">
                {/* Logo and Title */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
                    alt="Big Paws Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <h3 className="text-[#8B4513] text-lg sm:text-xl font-bold">
                    BIG PAWS PET SUPPLIES
                  </h3>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#5C3D2E] relative pr-20 sm:pr-0">
                  WE LOVE YOUR PETS
                  {/* Discount Badge - Responsive positioning */}
                  <div className="absolute top-0 right-0 sm:relative sm:inline-block sm:ml-4 w-14 h-14 sm:w-16 sm:h-16 bg-[#D2691E] rounded-full flex items-center justify-center text-white font-bold transform rotate-12">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl">10%</div>
                      <div className="text-xs">Discount</div>
                    </div>
                  </div>
                </h2>

                {/* Services Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#8B4513] mt-4 sm:mt-8">
                  GROOMING SERVICES
                </h3>

                {/* Description */}
                <p className="text-[#5C3D2E] text-base md:text-lg">
                  Give your furry friends the special treatment they deserve
                  with our premier pet care service.
                </p>

                {/* Services Grid - Responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "Pet Hotel",
                    "Organic Food",
                    "Pet Wellness",
                    "Pet Inspection",
                    "Pet Stuff And Toy",
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 md:w-5 md:h-5 text-[#D2691E]" />
                      <span className="text-sm md:text-base text-[#5C3D2E]">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact Information - Improved and clickable */}
                <div className="space-y-2">
                  <Link
                    href="tel:+639501890933"
                    className="flex items-center gap-2 text-[#5C3D2E] hover:text-[#D2691E] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-bold">09501890933</span>
                  </Link>
                  <Link
                    href="mailto:contact@bigpawspetsupplies.com"
                    className="flex items-center gap-2 text-[#5C3D2E] hover:text-[#D2691E] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>contact@bigpawspetsupplies.com</span>
                  </Link>
                </div>
              </div>

              {/* Images Section - Responsive sizing and positioning */}
              <div className="relative h-48 sm:h-64 md:h-full">
                <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden top-0 right-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475363983_611168945131262_1105736367780556279_n.jpg-NKVsnoviGbpBU92nFYNpv0nHDDgc1b.jpeg"
                    alt="White cat being groomed"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bottom-0 left-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475363983_611168945131262_1105736367780556279_n.jpg-NKVsnoviGbpBU92nFYNpv0nHDDgc1b.jpeg"
                    alt="Brown dog being groomed"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
          id="rates"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services & Rates
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional pet care services at competitive prices
          </p>
        </motion.div>

        <Tabs defaultValue="hotel" className="max-w-4xl mx-auto">
          <TabsList className="h-auto items-center justify-center text-muted-foreground grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8 gap-4 bg-primary/5 p-2 rounded-lg">
            <TabsTrigger
              value="hotel"
              className="text-lg flex items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-900/20"
            >
              <Hotel className="mr-2 h-5 w-5" />
              <span>Hotel Services</span>
            </TabsTrigger>
            <TabsTrigger
              value="grooming"
              className="text-lg flex items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <Scissors className="mr-2 h-5 w-5" />
              <span>Grooming Services</span>
            </TabsTrigger>
            <TabsTrigger
              value="home"
              className="text-lg flex items-center justify-center p-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-100 dark:hover:bg-green-900/20"
            >
              <Home className="mr-2 h-5 w-5" />
              <span>Home Services</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotel">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6"
            >
              <Card className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png"
                    alt="Big Paws Logo"
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Day Care */}
                  <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border flex flex-col">
                    <h3 className="text-xl font-semibold bg-blue-500 text-white p-3 rounded-t-lg flex items-center">
                      <Dog className="mr-2" /> Day Care
                    </h3>
                    <div className="p-4 space-y-4 flex-grow">
                      {/* Price */}
                      {/* Hours */}
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Hours:</span>
                        <span>{hotelServices.dayCare.hours}</span>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Rates:</p>
                        {hotelServices.dayCare.rates.map((rate, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center border-b pb-2"
                          >
                            <span className="font-medium">{rate.size}:</span>
                            <span className="text-2xl font-bold text-primary">
                              ₱{rate.price}/{rate.unit}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Requirements note - now at bottom */}
                      <div className="mt-auto p-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-3 rounded text-sm">
                          <span className="font-bold">Note:</span>{" "}
                          {hotelServices.dayCare.requirements}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Day Hotel */}
                  <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border flex flex-col">
                    <h3 className="text-xl font-semibold bg-red-500 text-white p-3 rounded-t-lg flex items-center">
                      <Sun className="mr-2" /> 24Hrs Accommodation
                    </h3>
                    <div className="p-4 space-y-4 flex-grow">
                      {/* Main price */}
                      <div>
                        <p className="font-medium mb-2">Rates:</p>
                        {hotelServices.accommodation.rates.map(
                          (rate, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center border-b pb-2"
                            >
                              <span className="font-medium">{rate.size}:</span>
                              <span className="text-2xl font-bold text-primary">
                                ₱{rate.price}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                      {/* Requirements note - now at bottom */}
                      <div className="mt-auto p-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-3 rounded text-sm">
                          <span className="font-bold">Note:</span>{" "}
                          {hotelServices.dayCare.requirements}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cat Hotel */}
                  <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border flex flex-col">
                    <h3 className="text-xl font-semibold bg-orange-500 text-white p-3 rounded-t-lg flex items-center">
                      <Cat className="mr-2" /> Cat Hotel
                    </h3>
                    <div className="p-4 space-y-4 flex-grow">
                      {/* Price */}
                      <div>
                        <p className="font-medium mb-2">Standard Room:</p>
                        {hotelServices.catHotel.standardRoom.map(
                          (room, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center border-b pb-2"
                            >
                              <span className="font-medium">{room.type}:</span>
                              <span className="text-2xl font-bold text-primary">
                                ₱{room.price}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                      <div>
                        <p className="font-medium mb-2">Extra Guest:</p>
                        {hotelServices.catHotel.extraGuest.map(
                          (guest, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center border-b pb-2"
                            >
                              <span className="font-medium">{guest.type}:</span>
                              <span className="text-2xl font-bold text-primary">
                                ₱{guest.price}
                              </span>
                            </div>
                          ),
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Peaceful environment specifically designed for cats
                      </div>
                    </div>

                    {/* Requirements note - now at bottom */}
                    <div className="mt-auto p-4">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-3 rounded text-sm">
                        <span className="font-bold">Note:</span>{" "}
                        {hotelServices.dayCare.requirements}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="grooming">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6"
            >
              <Card className="p-6">
                {/* For Dogs */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
                    <Dog className="mr-2" /> For Dogs
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      {/* Size Badges Row */}
                      <div className="hidden sm:grid grid-cols-5 gap-2 sm:gap-4 mb-4">
                        <div className="invisible">Service Type</div>
                        {["small", "medium", "large", "extraLarge"].map(
                          (size) => (
                            <div
                              key={size}
                              className={`text-center p-1 sm:p-2 rounded-lg sm:rounded-full ${sizeColors[size as keyof typeof sizeColors]}`}
                            >
                              <div className="text-xs sm:text-sm font-medium">
                                {size
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()
                                  .toUpperCase()}
                              </div>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Responsive Services */}
                      <div className="space-y-4">
                        {Object.entries(groomingServices.forDogs).map(
                          ([service, details]) => (
                            <div
                              key={service}
                              className={`rounded-lg p-2 ${serviceBackgroundColors[service as keyof typeof serviceBackgroundColors]}`}
                            >
                              {/* Grid Layout for Large Screens */}
                              <div className="hidden sm:grid grid-cols-5 gap-4 items-center">
                                <div
                                  className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-lg sm:rounded-full text-center ${
                                    serviceColors[
                                      service as keyof typeof serviceColors
                                    ]
                                  }`}
                                >
                                  {service
                                    .replace(/And/g, " &")
                                    .replace(/([A-Z])/g, " $1")
                                    .trim()
                                    .toUpperCase()}
                                </div>

                                {Object.values(details.prices).map(
                                  (price, index) => (
                                    <div
                                      key={index}
                                      className="text-center font-semibold"
                                    >
                                      ₱{price}
                                    </div>
                                  ),
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 col-span-4">
                                {details.description}
                              </p>

                              {/* Stacked Layout for Mobile */}
                              <div className="sm:hidden space-y-2">
                                <div className="bg-white/80 dark:bg-slate-950 p-2 rounded-lg mb-2 w-full">
                                  <div
                                    className={`text-sm font-medium px-3 py-1 rounded-full w-full text-center ${
                                      serviceColors[
                                        service as keyof typeof serviceColors
                                      ]
                                    }`}
                                  >
                                    {service
                                      .replace(/([A-Z])/g, " $1")
                                      .trim()
                                      .toUpperCase()}
                                  </div>
                                </div>
                                {Object.entries(details.prices).map(
                                  ([size, price]) => (
                                    <div
                                      key={size}
                                      className="flex justify-between bg-white/80 dark:bg-slate-950 p-2 rounded-lg"
                                    >
                                      <span className="text-sm font-medium">
                                        {size.toUpperCase()}
                                      </span>
                                      <span className="font-semibold">
                                        ₱{price}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* For Cats */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
                    <Cat className="mr-2" /> For Cats
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      {/* Size Badges Row */}
                      <div className="hidden sm:grid grid-cols-5 gap-2 sm:gap-4 mb-4">
                        <div className="invisible">Service Type</div>
                        {["small", "medium", "large", "extraLarge"].map(
                          (size) => (
                            <div
                              key={size}
                              className={`text-center p-1 sm:p-2 rounded-lg sm:rounded-full ${sizeColors[size as keyof typeof sizeColors]}`}
                            >
                              <div className="text-xs sm:text-sm font-medium">
                                {size
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()
                                  .toUpperCase()}
                              </div>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Responsive Services */}
                      <div className="space-y-4">
                        {Object.entries(groomingServices.forCats).map(
                          ([service, details]) => (
                            <div
                              key={service}
                              className={`rounded-lg p-2 ${serviceBackgroundColors[service as keyof typeof serviceBackgroundColors]}`}
                            >
                              {/* Grid Layout for Large Screens */}
                              <div className="hidden sm:grid grid-cols-5 gap-4 items-center">
                                <div
                                  className={`text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-lg sm:rounded-full text-center w-full ${
                                    serviceColors[
                                      service as keyof typeof serviceColors
                                    ]
                                  }`}
                                >
                                  {service
                                    .replace(/([A-Z])/g, " $1")
                                    .trim()
                                    .toUpperCase()}
                                </div>

                                {Object.values(details.prices).map(
                                  (price, index) => (
                                    <div
                                      key={index}
                                      className="text-center font-semibold"
                                    >
                                      ₱{price}
                                    </div>
                                  ),
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 col-span-4">
                                {details.description}
                              </p>

                              {/* Stacked Layout for Mobile */}
                              <div className="sm:hidden space-y-2">
                                <div className="bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg mb-2 w-full">
                                  <div
                                    className={`text-sm font-medium px-3 py-1 rounded-full w-full text-center ${
                                      serviceColors[
                                        service as keyof typeof serviceColors
                                      ]
                                    }`}
                                  >
                                    {service
                                      .replace(/([A-Z])/g, " $1")
                                      .trim()
                                      .toUpperCase()}
                                  </div>
                                </div>
                                {Object.entries(details.prices).map(
                                  ([size, price]) => (
                                    <div
                                      key={size}
                                      className="flex justify-between bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg"
                                    >
                                      <span className="text-sm font-medium">
                                        {size.toUpperCase()}
                                      </span>
                                      <span className="font-semibold">
                                        ₱{price}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Services */}
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-4 ">
                    Additional Services
                  </h3>
                  <div className="bg-primary/5 p-4 rounded-lg border border-red-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(groomingServices.additionalServices).map(
                        ([service, price]) => (
                          <div
                            key={service}
                            className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <span className="text-sm font-medium uppercase">
                              {service.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="font-semibold">₱{price}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="home">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6"
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
                  <Home className="mr-2" /> Home Services
                </h3>
                <div className="space-y-6">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    {/* Size Badges Row */}
                    <div className="hidden sm:grid grid-cols-6 gap-4 mb-4">
                      <div className="invisible">Service Type</div>
                      {["small", "medium", "large", "extraLarge", "xxl"].map(
                        (size) => (
                          <div
                            key={size}
                            className={`text-center p-2 rounded-full ${sizeColors[size as keyof typeof sizeColors] || "bg-blue-500 text-white"}`}
                          >
                            <div className="text-sm font-medium">
                              {size
                                .replace(/([A-Z])/g, " $1")
                                .trim()
                                .toUpperCase()}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    {/* Responsive Services */}
                    <div className="space-y-4">
                      {Object.entries(homeServices).map(
                        ([service, details]) => (
                          <div
                            key={service}
                            className={`rounded-lg p-2 ${serviceBackgroundColors[service as keyof typeof serviceBackgroundColors]}`}
                          >
                            {/* Grid Layout for Large Screens */}
                            <div className="hidden sm:grid grid-cols-6 gap-4 items-center">
                              <div
                                className={`text-sm font-medium px-3 py-1 rounded-full text-center ${
                                  serviceColors[
                                    service as keyof typeof serviceColors
                                  ]
                                }`}
                              >
                                {service
                                  .replace(/And/g, " &")
                                  .replace(/([A-Z])/g, " $1")
                                  .trim()
                                  .toUpperCase()}
                              </div>
                              {Object.entries(details.prices).map(
                                ([size, price]) => (
                                  <div
                                    key={size}
                                    className="text-center font-semibold"
                                  >
                                    {size === "xxl"
                                      ? price
                                        ? `₱${price}`
                                        : "-"
                                      : `₱${price}`}
                                  </div>
                                ),
                              )}
                            </div>

                            {/* Stacked Layout for Mobile */}
                            <div className="sm:hidden space-y-2">
                              <div className="bg-white/80 dark:bg-slate-950 p-2 rounded-lg mb-2 w-full">
                                <div
                                  className={`text-sm font-medium px-3 py-1 rounded-full w-full text-center ${
                                    serviceColors[
                                      service as keyof typeof serviceColors
                                    ]
                                  }`}
                                >
                                  {service
                                    .replace(/([A-Z])/g, " $1")
                                    .trim()
                                    .toUpperCase()}
                                </div>
                              </div>
                              {Object.entries(details.prices).map(
                                ([size, price]) => (
                                  <div
                                    key={size}
                                    className="flex justify-between bg-white/80 dark:bg-slate-950 p-2 rounded-lg"
                                  >
                                    <span className="text-sm font-medium">
                                      {size.toUpperCase()}
                                    </span>
                                    <span className="font-semibold">
                                      ₱{price}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
