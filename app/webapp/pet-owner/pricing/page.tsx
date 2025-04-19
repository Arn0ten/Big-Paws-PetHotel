"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scissors, Clock, Calendar, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { petSizes } from "@/app/webapp/data/sample-data"
import { PRICING } from "@/app/webapp/admin/request-management/data/pricing-data"

// Add these interfaces at the top of the file, before the component

interface PricingData {
  grooming: {
    [key: string]: {
      Small: number
      Medium: number
      Large: number
      XLarge: number
    }
  }
  boarding: {
    hourly: {
      Small: number
      Medium: number
      Large: number
      XLarge: number
    }
    daily: {
      Small: number
      Medium: number
      Large: number
      XLarge: number
    }
  }
  catHotel: {
    standard: {
      Kitten: number
      Adult: number
    }
    extraGuest: {
      SmallToMedium: number
      Large: number
    }
  }
}

export default function PricingPage() {
  // Update the useState declaration with proper type
  const [activeTab, setActiveTab] = useState<"boarding" | "grooming">("boarding")
  const pricing = PRICING

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" asChild className="text-foreground dark:text-foreground">
          <Link href="/webapp/pet-owner">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-foreground">Pricing</h1>
          <p className="text-muted-foreground">View our rates for boarding and other services</p>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Tabs defaultValue={activeTab} value={activeTab} onVolumeChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="boarding" className="text-foreground dark:text-foreground">
              Boarding
            </TabsTrigger>
            <TabsTrigger value="grooming" className="text-foreground dark:text-foreground">
              Grooming
            </TabsTrigger>
          </TabsList>

          <TabsContent value="boarding" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground dark:text-foreground">Dog Boarding</CardTitle>
                </div>
                <CardDescription>Rates are per day (24 hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(petSizes).map(([size, description], index) => (
                    <div key={size} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground capitalize">{size}</span>
                        <Badge className="bg-blue-600 text-white">{description}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Standard</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            ₱{(400 + index * 100).toLocaleString()}
                          </span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Premium</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            ₱{(600 + index * 150).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Service Details</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Standard:</strong> Includes comfortable accommodation, regular feeding, and daily walks.
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Premium:</strong> Includes all standard features plus premium food, extra playtime,
                        daily grooming, and photo updates.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground dark:text-foreground">Cat Boarding</CardTitle>
                </div>
                <CardDescription>Rates are per day (24 hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Kitten</span>
                        <Badge className="bg-blue-600 text-white">Under 1 year</Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Room</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱300.00</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Adult Cat</span>
                        <Badge className="bg-blue-600 text-white">1+ years</Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Room</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱400.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground dark:text-foreground">Extra Guest (Same Room)</span>
                      <div className="text-right">
                        <div className="text-sm text-foreground dark:text-foreground">
                          Small to Medium:{" "}
                          <span className="font-medium text-green-600 dark:text-green-400">₱200.00</span>
                        </div>
                        <div className="text-sm text-foreground dark:text-foreground">
                          Large Breed: <span className="font-medium text-green-600 dark:text-green-400">₱300.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Cat Boarding Details</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        All cat boarding includes comfortable accommodation, regular feeding, litter box maintenance,
                        and playtime.
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Cats from the same household can share a room for an additional fee.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground dark:text-foreground">Day Care</CardTitle>
                </div>
                <CardDescription>For pets not staying overnight</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Small</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱25/hr</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Medium</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱30/hr</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Large</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱40/hr</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Extra Large</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱50/hr</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Day Care Hours</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Day care is available from 8:00 AM to 7:00 PM daily. All pets must be fully vaccinated and have
                        anti-rabies shots.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grooming" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground dark:text-foreground">Grooming Services</CardTitle>
                </div>
                <CardDescription>Select your pet size to view pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(petSizes).map(([size, description], index) => {
                    // Safely get prices with fallbacks
                    const basicWashPrice =
                      PRICING.grooming["basic-wash"]?.[size as keyof typeof petSizes] || 180 + index * 40

                    const premiumWashAndCutPrice =
                      PRICING.grooming["premium-wash-and-cut"]?.[size as keyof typeof petSizes] || 450 + index * 50

                    return (
                      <div key={size} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-foreground dark:text-foreground capitalize">{size}</h3>
                          <Badge className="bg-blue-600 text-white">{description}</Badge>
                        </div>
                        <div className="grid gap-2">
                          <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-foreground dark:text-foreground">Basic Wash</span>
                                <p className="text-xs text-muted-foreground">Bath, Blow Dry, Brush</p>
                              </div>
                              <span className="font-medium text-green-600 dark:text-green-400">
                                ₱{basicWashPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-foreground dark:text-foreground">
                                  Premium Wash & Cut
                                </span>
                                <p className="text-xs text-muted-foreground">Full Service Grooming</p>
                              </div>
                              <span className="font-medium text-green-600 dark:text-green-400">
                                ₱{premiumWashAndCutPrice.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:static">
        <Button className="w-full md:w-auto" asChild>
          <Link href="/webapp/pet-owner/requests/new">Make a Request</Link>
        </Button>
      </div>
    </div>
  )
}
