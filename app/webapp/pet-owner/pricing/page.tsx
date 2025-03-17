"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Scissors, Clock, Calendar, DollarSign, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("boarding")

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
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="boarding" className="text-foreground dark:text-foreground">
              Boarding
            </TabsTrigger>
            <TabsTrigger value="grooming" className="text-foreground dark:text-foreground">
              Grooming
            </TabsTrigger>
            <TabsTrigger value="additional" className="text-foreground dark:text-foreground">
              Additional Services
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Small</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          Up to 10kg
                        </Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱320.00</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Premium Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱450.00</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Medium</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          10-25kg
                        </Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱400.00</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Premium Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱550.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Large</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          25-40kg
                        </Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱480.00</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Premium Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱650.00</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Extra Large</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          Over 40kg
                        </Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱550.00</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Premium Package</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱750.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Package Details</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Standard Package:</strong> Includes comfortable accommodation, regular feeding, and
                        daily walks.
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Premium Package:</strong> Includes all standard features plus premium food, extra
                        playtime, daily grooming, and photo updates.
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
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          Under 1 year
                        </Badge>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Standard Room</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱300.00</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Adult Cat</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          1+ years
                        </Badge>
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
                  <CardTitle className="text-foreground dark:text-foreground">Dog Grooming</CardTitle>
                </div>
                <CardDescription>Prices vary by size and service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border dark:border-border/50">
                        <th className="text-left py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Service
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Small
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Medium
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Large
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          XL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 dark:border-border/30">
                        <td className="py-3 px-3 text-sm text-foreground dark:text-foreground">
                          <div className="font-medium">Basic Wash</div>
                          <div className="text-xs text-muted-foreground">Bath & Blow Dry with Cologne</div>
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱180
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱220
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱280
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱320
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 dark:border-border/30">
                        <td className="py-3 px-3 text-sm text-foreground dark:text-foreground">
                          <div className="font-medium">Premium Wash</div>
                          <div className="text-xs text-muted-foreground">
                            Bath, Brush, Sanitary, Ear Care & Hydration Mask
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱300
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱350
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱450
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱550
                        </td>
                      </tr>
                      <tr className="border-b border-border/50 dark:border-border/30">
                        <td className="py-3 px-3 text-sm text-foreground dark:text-foreground">
                          <div className="font-medium">Premium Wash & Cut</div>
                          <div className="text-xs text-muted-foreground">
                            Bath, Brush, Sanitary, Ear Care & Trim around the Paws/Face/Tail
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱450
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱500
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱600
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱650
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 text-sm text-foreground dark:text-foreground">
                          <div className="font-medium">Full Grooming</div>
                          <div className="text-xs text-muted-foreground">
                            Bath, Brush, Sanitary, Ear Care & Full Groom, Cut with Style & Cologne
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱500
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱550
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱700
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱800
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Dog Size Classification</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Small:</strong> Up to 10kg (Shih Tzu, Pomeranian, etc.)
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Medium:</strong> 10-25kg (Beagle, Cocker Spaniel, etc.)
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Large:</strong> 25-40kg (Labrador, Golden Retriever, etc.)
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        <strong>Extra Large:</strong> Over 40kg (Great Dane, Saint Bernard, etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground dark:text-foreground">Cat Grooming</CardTitle>
                </div>
                <CardDescription>Prices vary by size and service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border dark:border-border/50">
                        <th className="text-left py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Service
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Small
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Medium
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          Large
                        </th>
                        <th className="text-center py-2 px-3 text-sm font-medium text-foreground dark:text-foreground">
                          XL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 dark:border-border/30">
                        <td className="py-3 px-3 text-sm text-foreground dark:text-foreground">
                          <div className="font-medium">Basic Wash</div>
                          <div className="text-xs text-muted-foreground">Bath & Blow Dry</div>
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱150
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱200
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱250
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱280
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 text-sm text-foreground dark:text-foreground">
                          <div className="font-medium">Premium Wash</div>
                          <div className="text-xs text-muted-foreground">
                            Bath, Brush, Sanitary, Ear Care, Trim around the face with Cologne
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱200
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱250
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱300
                        </td>
                        <td className="py-3 px-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                          ₱350
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Cat Grooming Notes</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Cat grooming services are performed with special care to minimize stress. We recommend
                        scheduling cat grooming during less busy hours.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="additional" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle className="text-foreground dark:text-foreground">Additional Services</CardTitle>
                </div>
                <CardDescription>Extra services available during boarding or separately</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Tick and Flea Removal</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱150</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Treatment to remove ticks and fleas</p>
                    </div>

                    <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Nail Cut</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱100</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Trimming of nails for dogs or cats</p>
                    </div>

                    <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Ear Cleaning</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱80</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Thorough cleaning of ears</p>
                    </div>

                    <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Anal Sac Cleaning</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱100</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Expression of anal glands</p>
                    </div>

                    <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Blow Dry</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱80</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Full blow dry after bath</p>
                    </div>

                    <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground dark:text-foreground">Wound Treatment</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱90</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Basic cleaning and treatment of minor wounds</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-foreground dark:text-foreground mb-3">Boarding Extensions</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground dark:text-foreground mb-2">
                        Dogs (Hourly Rate)
                      </h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Small</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱50/hour</span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Medium</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱60/hour</span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Large</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱70/hour</span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Extra Large</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱75/hour</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-foreground dark:text-foreground mb-2">
                        Dogs (Daily Rate)
                      </h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Small</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱500/day</span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Medium</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱600/day</span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Large</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱700/day</span>
                        </div>
                        <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                          <span className="text-sm text-foreground dark:text-foreground">Extra Large</span>
                          <span className="font-medium text-green-600 dark:text-green-400">₱750/day</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-foreground dark:text-foreground mb-2">Cats</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Hourly Rate</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱40/hour</span>
                      </div>
                      <div className="p-3 bg-muted/30 dark:bg-muted/10 rounded-md flex justify-between items-center">
                        <span className="text-sm text-foreground dark:text-foreground">Daily Rate</span>
                        <span className="font-medium text-green-600 dark:text-green-400">₱400/day</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Payment Information</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        All charges will be collected during pet pickup. No online payment is required.
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        For boarding extensions, please notify us at least 12 hours in advance to ensure availability.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Suggested next steps:</h4>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Review our pricing information to plan your pet's stay or services. If you have any questions or need a
              custom quote, please contact our staff.
            </p>
            <div className="mt-2">
              <Link href="/webapp/pet-owner/requests/new">
                <Button size="sm" className="text-xs">
                  Make a Request
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

