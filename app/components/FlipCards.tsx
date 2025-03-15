"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface CardData {
  id: number
  frontImage: string
  title: string
  description: string
  alt: string
}

const cards: CardData[] = [
  {
    id: 1,
    frontImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480491302_9250055781727301_8238070743716968783_n.jpg-KARP6OGNb3KTMtvoDN7Bt8kqwzu7Y2.jpeg",
    title: "Professional Grooming",
    description:
      "Our experienced groomers provide top-quality grooming services with attention to detail and care for your pet's comfort.",
    alt: "Professional pet grooming service",
  },
  {
    id: 2,
    frontImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/475682535_431128586688797_3889418399224811858_n.jpg-0dhtzgdXeoHfUQkkaJlfQEgk42quFX.jpeg",
    title: "Modern Boarding Facilities",
    description:
      "State-of-the-art boarding facilities with comfortable, climate-controlled spaces for your pets' comfort and safety.",
    alt: "Modern pet boarding facilities",
  },
  {
    id: 3,
    frontImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/481266669_619546497482268_7852519735591331140_n.jpg-D8OzlF1s2jCKTDw5JeGw0vYZaP25lG.jpeg",
    title: "Comfortable Stays",
    description:
      "Each pet gets their own space with comfortable bedding, toys, and regular playtime to ensure a happy stay.",
    alt: "Pet in comfortable boarding space",
  },
  {
    id: 4,
    frontImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/480064874_3971175603130199_8445389685285733814_n.jpg-29Q4fg1oUXATRcruRlRvtyqiPaoFps.jpeg",
    title: "Expert Care",
    description: "Our trained staff provides loving attention and professional care to ensure your pet feels at home.",
    alt: "Well-groomed pet after service",
  },
]

export default function FlipCards() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative h-[400px] cursor-pointer"
          style={{
            perspective: "1000px",
          }}
          onClick={() => setFlipped(flipped === card.id ? null : card.id)}
        >
          <motion.div
            className="w-full h-full"
            initial={false}
            animate={{ rotateY: flipped === card.id ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
              <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src={card.frontImage || "/placeholder.svg"}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-white/80 text-sm">Click to learn more</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 w-full h-full bg-primary text-primary-foreground rounded-xl p-6 flex flex-col justify-center items-center text-center backface-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-lg leading-relaxed">{card.description}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

