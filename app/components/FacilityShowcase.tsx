"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Clock } from "lucide-react";
import FloatingImageModal from "./FloatingImageModal";

const facilities = [
  {
    image: "/pet-hotel-5.jpg",
    title: "Professional Grooming",
    description: "Expert grooming services by certified professionals",
    icon: Heart,
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481149149_950082960543434_4845496105170679515_n.jpg-rmRdzSRxpZVTfPzE5BKqVb8zgO6kW1.jpeg",
    title: "Cat Boarding",
    description: "Comfortable and secure spaces for feline friends",
    icon: Shield,
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480941138_9561568810604763_2623819671861048988_n.jpg-YmlSZbIWJSpCAuuHnDU90P03cGdiW8.jpeg",
    title: "Modern Facilities",
    description: "State-of-the-art boarding kennels with proper ventilation",
    icon: Users,
  },
  {
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480482738_1313694739908622_3258219043748175422_n.jpg-NmbKKD1wgvClkg6LxoClLnpeMc9q1p.jpeg",
    title: "24/7 Care",
    description: "Round-the-clock supervision for your pets",
    icon: Clock,
  },
];

export default function FacilityShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");

  const handleImageClick = (facility: (typeof facilities)[0]) => {
    setSelectedImage(facility.image);
    setSelectedTitle(facility.title);
    setSelectedDescription(facility.description);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Our World-Class Facilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience our state-of-the-art pet care facilities designed with
            your pets' comfort and safety in mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className="overflow-hidden h-full cursor-pointer"
                onClick={() => handleImageClick(facility)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                  <Badge
                    className="absolute top-4 right-4 bg-primary text-primary-foreground"
                    variant="secondary"
                  >
                    <facility.icon className="w-4 h-4 mr-1" />
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {facility.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div
            className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
            onClick={() =>
              handleImageClick({
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-qdPkAESKW0ppJDAeBKGbpCwthU8aVT.jpeg",
                title: "Comfortable Accommodations",
                description:
                  "Spacious and cozy spaces designed for your pet's comfort",
                icon: Heart,
              })
            }
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480899995_642061011656747_972779387843409689_n.jpg-qdPkAESKW0ppJDAeBKGbpCwthU8aVT.jpeg"
              alt="Comfortable Pet Accommodation"
              fill
              className="object-cover"
            />
          </div>
          <div
            className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
            onClick={() =>
              handleImageClick({
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480337857_1160308045475973_2711174277454434026_n.jpg-FwpY8D1sDEBabby5EQpjgrv7LqV9EW.jpeg",
                title: "Social Environment",
                description:
                  "Safe and supervised socialization opportunities for compatible pets",
                icon: Users,
              })
            }
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480337857_1160308045475973_2711174277454434026_n.jpg-FwpY8D1sDEBabby5EQpjgrv7LqV9EW.jpeg"
              alt="Social Environment"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      <FloatingImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage || ""}
        alt={selectedTitle}
        description={selectedDescription}
      />
    </section>
  );
}
