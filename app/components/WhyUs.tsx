"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const reasons = [
  {
    title: "Expert Care for Every Pet",
    description:
      "Our team consists of experienced and passionate professionals who treat each pet as if they were our own. Whether it's a delicate grooming session or a stay at our pet hotel, we ensure that every pet is treated with love, care, and attention to detail.",
  },
  {
    title: "A Safe and Stress-Free Environment",
    description:
      "We understand that pets are family, and their safety and comfort come first. Our facilities are designed to create a safe, clean, and stress-free environment where your pet can relax, enjoy, and thrive — whether they're getting pampered or staying overnight.",
  },
]

export default function WhyUs() {
  return (
    <section className="py-16 bg-background relative overflow-hidden" id="why-us">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Yellow brush stroke header */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-[#FFA500] transform origin-left"
              style={{ clipPath: "polygon(0 0, 100% 20%, 95% 100%, 0% 80%)" }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold relative z-10 p-4"
            >
              WHY US
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/479995031_9243384815698506_8733496565683610346_n.jpg-SlGOmWPiPqLPamId12H3qTNFHxxyJf.jpeg"
                alt="Curious dog at Big Paws"
                width={500}
                height={500}
                className="rounded-2xl"
              />
              {/* Question mark decorations */}
              <motion.div
                className="absolute -top-8 right-8 text-2xl"
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                ?
              </motion.div>
              <motion.div
                className="absolute top-8 -right-8 text-2xl"
                animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              >
                ?
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground mb-8">
                At Big Paws, we believe in providing more than just grooming and boarding — we offer a full-service
                experience that prioritizes your pet's happiness, health, and comfort. Here's why you can trust us with
                your furry family members:
              </p>

              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{`${index + 1}. ${reason.title}`}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

