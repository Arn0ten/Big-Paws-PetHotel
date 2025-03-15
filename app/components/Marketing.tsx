"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Marketing() {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">Professional pet care services at affordable rates</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480407176_1121443359729152_6423333213741941472_n.jpg-Oj2rahWZSTrYfVu9KdPsvLhSpxUny6.jpeg"
            alt="Big Paws Pet Hotel Services"
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  )
}

