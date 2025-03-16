"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Dog, Cat, Heart, Shield, Clock, CheckCircle } from "lucide-react";
import { Hotel } from "lucide-react";

export default function ServiceInfo() {
  const services = [
    {
      title: "Pet Hotel Services",
      icon: Hotel,
      description: "Your pet's home away from home",
      features: [
        "24/7 supervised care by trained professionals",
        "Climate-controlled, comfortable accommodations",
        "Individual spaces for each pet",
        "Regular exercise and playtime",
        "Medication administration if needed",
        "Daily updates and photos for pet parents",
        "Emergency veterinary care access",
        "Customized feeding schedules",
      ],
    },
    {
      title: "Day Care Services",
      icon: Dog,
      description: "Professional care while you're away",
      features: [
        "Flexible hours from 8 AM to 7 PM",
        "Supervised group play sessions",
        "Size-appropriate playgroups",
        "Regular potty breaks",
        "Basic training reinforcement",
        "Socialization opportunities",
        "Rest periods throughout the day",
        "Behavior monitoring and reporting",
      ],
    },
    {
      title: "Cat Hotel Services",
      icon: Cat,
      description: "Specialized care for our feline friends",
      features: [
        "Quiet, peaceful environment",
        "Individual cat condos",
        "Climbing spaces and scratching posts",
        "Daily litter box maintenance",
        "Window views for bird watching",
        "Interactive toy selection",
        "Grooming services available",
        "Special care for senior cats",
      ],
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Why Choose Our Pet Care Services?
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide comprehensive care tailored to your pet's individual
            needs
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-muted rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            Our Commitment to Your Pet's Well-being
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "24/7 monitoring and secure facilities",
              },
              {
                icon: Heart,
                title: "Loving Care",
                description: "Passionate staff who treat pets like family",
              },
              {
                icon: Clock,
                title: "Flexible Hours",
                description: "Accommodating your schedule",
              },
              {
                icon: CheckCircle,
                title: "Health Focus",
                description: "Regular health checks and clean environment",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
