"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

interface PhoneSentAnimationProps {
  phoneNumber?: string;
}

export default function PhoneSentAnimation({
  phoneNumber,
}: PhoneSentAnimationProps) {
  const [isRinging, setIsRinging] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRinging(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Mask phone number for privacy if provided
  const maskedPhone = phoneNumber
    ? phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3")
    : "your phone";

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative mb-4">
        <motion.div
          initial={{ rotate: 0 }}
          animate={
            isRinging
              ? {
                  rotate: [-5, 5, -5, 5, -5, 5, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1, 1.05, 1],
                }
              : { rotate: 0 }
          }
          transition={{
            duration: 1.5,
            repeat: isRinging ? Number.POSITIVE_INFINITY : 0,
            repeatType: "loop",
            repeatDelay: 0.5,
          }}
          className="bg-primary/10 rounded-xl p-6"
        >
          <Phone size={48} className="text-primary" />
        </motion.div>

        {isRinging && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="absolute inset-0 rounded-xl border-2 border-primary/30"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: 0.3,
              }}
              className="absolute inset-0 rounded-xl border-2 border-primary/20"
            />
          </>
        )}

        {!isRinging && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h3 className="text-lg font-medium mb-1">Instructions Sent!</h3>
        <p className="text-sm text-muted-foreground">
          We've sent instructions to {maskedPhone}
        </p>
      </motion.div>
    </div>
  );
}
