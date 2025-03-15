"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scissors, Box, DogIcon as DogBowl, DogIcon as LeashIcon, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import FloatingImageModal from "./FloatingImageModal"

const categories = [
  {
    id: "grooming",
    name: "Grooming Supplies",
    icon: Scissors,
    description: "Professional grooming tools for your pets",
    products: [
      {
        name: "Pet Grooming Brush Set",
        description: "Professional deshedding and grooming tools",
        price: "₱299.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480651967_1749158292311303_5993688682836237963_n.jpg-Rjc9oZLj2V1LM3xCh62tBRhtLoprYm.jpeg",
        additionalInfo: "Includes a slicker brush, deshedding tool, and nail clippers. Suitable for all coat types.",
      },
      {
        name: "Pet Care Tools",
        description: "Essential grooming accessories",
        price: "₱199.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480651967_1749158292311303_5993688682836237963_n.jpg-Rjc9oZLj2V1LM3xCh62tBRhtLoprYm.jpeg",
        additionalInfo:
          "Set includes nail file, ear cleaner, and toothbrush. Perfect for maintaining your pet's hygiene between grooming sessions.",
      },
    ],
  },
  {
    id: "carriers",
    name: "Pet Carriers",
    icon: Box,
    description: "Stylish and comfortable carriers for your pets",
    products: [
      {
        name: "Designer Pet Backpack",
        description: "Trendy and comfortable pet carrier",
        price: "₱1,499.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480597450_613380214797681_5459227510624089817_n.jpg-XH3jlRyHT64R13TRt2vFbwOSm9bpYd.jpeg",
        additionalInfo:
          "Spacious and well-ventilated backpack for small pets. Features padded straps and multiple pockets for storage.",
      },
      {
        name: "Spacious Pet Carrier",
        description: "Large capacity pet transport bag",
        price: "₱1,299.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480460675_1320460469201764_4977886955218356251_n.jpg-9oq6mFUc3bi6IKEM28ZmZLBTX8utj5.jpeg",
        additionalInfo: "Airline-approved carrier with expandable sides. Suitable for medium-sized pets up to 18 lbs.",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480196086_9948273031852895_5920632034308718463_n.jpg-nNmqZFgek6wfZDz1OjhAY3caVkoEaq.jpeg",
        name: "Premium Cat Condo",
        description: "Spacious multi-level cat cage with platforms",
        price: "₱2,999",
      },
    ],
  },
  {
    id: "accessories",
    name: "Pet Accessories",
    icon: LeashIcon,
    description: "High-quality leashes, collars, and more",
    products: [
      {
        name: "Premium Pet Leash",
        description: "Durable and stylish pet leashes",
        price: "₱399.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/482045664_1180160020193361_5600336283823124444_n.jpg-kZDTOXXxBeA2GdQgDIkBzcPKcJTJJO.jpeg",
        additionalInfo:
          "Made from high-quality nylon with reflective stitching for night visibility. Available in multiple colors and sizes.",
      },
      {
        name: "Bird Cages",
        description: "Colorful and spacious bird homes",
        price: "₱899.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480182713_1544947842810595_4423080990574973435_n%20-%20Copy.jpg-9fboeMeqHQ9XpBKV8kEtoGipvRImTN.jpeg",
        additionalInfo:
          "Large, multi-level cage with removable bottom tray for easy cleaning. Includes perches, food bowls, and toys.",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480568649_1310436750234027_8130811062849302975_n.jpg-kAfRsvjnHn8rMkmPO0kpgzHkWcUeif.jpeg",
        name: "Luxury Pet Beds",
        description: "Comfortable and stylish beds for your pets",
        price: "Starting from ₱500",
      },
    ],
  },
  {
    id: "feeding",
    name: "Feeding Supplies",
    icon: DogBowl,
    description: "Food and water bowls, feeders, and accessories",
    products: [
      {
        name: "Automatic Pet Feeder",
        description: "Smart feeding solution for your pets",
        price: "₱799.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481170612_1316734796113767_2651843019774642664_n%20-%20Copy.jpg-uVQE1DCksQFwRY3yRf0sOBzZDWL3D1.jpeg",
        additionalInfo:
          "Programmable feeder with up to 4 meals per day. Features voice recording to call your pet at meal times.",
      },
      {
        name: "Pet Bowls Collection",
        description: "Stylish and practical feeding bowls",
        price: "₱299.00",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481365869_23872383532349702_5443414320908630679_n.jpg-zVB9mRIFVqp3z5w24m31eq91crCRFp.jpeg",
        additionalInfo:
          "Set of 2 stainless steel bowls with non-slip silicone base. Dishwasher safe and suitable for both food and water.",
      },
      {
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481378020_929658752706947_1466774855061503721_n.jpg-lEIkFz1kwvgg3sR7pD3NcoXVQrHRsm.jpeg",
        name: "Premium Pet Food Selection",
        description: "Wide variety of high-quality dog and cat food brands",
        price: "Starting from ₱100",
      },
    ],
  },
]

export default function PetSupplies() {
  const [selectedProduct, setSelectedProduct] = useState<{
    image: string
    name: string
    description: string
    additionalInfo?: string
    price: string
  } | null>(null)

  return (
    <section className="py-16 bg-background" id="pet-supplies">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Pet Supplies Shop</h2>
          <p className="text-xl text-muted-foreground">Everything your pet needs, all in one place</p>
        </motion.div>

        <Tabs defaultValue="grooming" className="w-full">
          <TabsList className="h-auto items-center justify-center text-muted-foreground grid w-full grid-cols-2 sm:grid-cols-4 mb-8 gap-4 bg-primary/5 p-2 rounded-lg">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-sm sm:text-base flex items-center gap-2 p-2 sm:p-4"
              >
                <category.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.products.map((product, index) => (
                  <motion.div
                    key={`${category.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden">
                      <div className="relative h-48 sm:h-56 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                        <p className="text-sm text-muted-foreground flex-grow">{product.description}</p>
                        <p className="text-lg font-bold text-primary mt-4">{product.price}</p>
                        <Button
                          className="mt-4 flex items-center justify-center gap-2"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This shop section is for informational purposes only. We currently do not have
            an online ordering system. The products displayed here represent items available in our physical store.
            Please visit us or contact us for current availability and pricing.
          </p>
        </div>
      </div>

      {/* Floating Image Modal */}
      <FloatingImageModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        imageSrc={selectedProduct?.image || ""}
        alt={selectedProduct?.name || ""}
        description={selectedProduct?.description || ""}
        additionalInfo={selectedProduct?.additionalInfo}
        price={selectedProduct?.price}
      />
    </section>
  )
}

