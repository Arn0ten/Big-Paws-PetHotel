"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutUs() {
  return (
    <section className="py-16 bg-background relative overflow-hidden" id="about">
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
              ABOUT US
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text Content in Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 75% 85%, 85% 100%, 50% 85%, 0% 85%)",
              }}
            >
              <p className="text-lg mb-8">
                At Big Paws Petsupplies, we&apos;re passionate about providing exceptional care for your furry family
                members. Located in the heart of Lapu-lapu St., Tagum City, we offer a one-stop destination for all your
                pet&apos;s needs – from professional grooming and a cozy pet hotel to premium pet food and accessories.
              </p>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -left-4 text-[#FFA500]"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                ✦
              </motion.div>
              <div className="absolute bottom-16 right-8 text-2xl">📌</div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481136849_661194236377249_6979131424152356883_n.jpg-Q1N9OkX81u6ptG8oGAinW2uid7M2LW.jpeg"
                alt="Happy dog at Big Paws"
                width={500}
                height={500}
                className="rounded-2xl"
              />
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 right-4 text-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                🖤
              </motion.div>
              <motion.div
                className="absolute -bottom-4 right-8 text-[#FFA500]"
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                ✦
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

