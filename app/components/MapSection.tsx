"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Navigation, Compass } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="flex flex-col items-center text-center p-4">
      {icon}
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </Card>
  );
};

export default function MapSection() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push("/map");
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Find Your Way to Big Paws Pet Hotel
              </CardTitle>
              <CardDescription className="text-center text-lg mt-2">
                Experience our interactive map feature for personalized
                directions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
                <FeatureCard
                  icon={<MapPin className="w-8 h-8 text-primary" />}
                  title="Precise Location"
                  description="Get accurate directions to our pet hotel from your current location"
                />
                <FeatureCard
                  icon={<Navigation className="w-8 h-8 text-primary" />}
                  title="Real-time Navigation"
                  description="Follow turn-by-turn directions for a stress-free journey"
                />
                <FeatureCard
                  icon={<Compass className="w-8 h-8 text-primary" />}
                  title="Explore Surroundings"
                  description="Discover nearby pet-friendly locations and amenities"
                />
              </div>
              <Button
                size="lg"
                className="flex items-center gap-2"
                onClick={handleClick}
              >
                <MapPin className="w-5 h-5" />
                Open Interactive Map
                {isLoading && (
                  <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                )}
              </Button>
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Click to access our custom map and find the best route to Big
                Paws Pet Hotel
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
