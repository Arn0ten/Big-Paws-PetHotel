"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface EmailSentAnimationProps {
  email?: string;
}

export default function EmailSentAnimation({ email }: EmailSentAnimationProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheckmark(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Mask email for privacy if provided
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, "$1****$3")
    : "your email";

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative mb-4">
        <motion.div
          initial={{ scale: 0.8, y: 0 }}
          animate={{
            scale: [0.8, 1.1, 0.9, 1],
            y: [0, -15, 0, -10, 0],
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: showCheckmark ? 0 : Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="bg-primary/10 rounded-xl p-6"
        >
          <Mail size={48} className="text-primary" />
        </motion.div>

        {showCheckmark && (
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
          We've sent instructions to {maskedEmail}
        </p>
      </motion.div>
    </div>
  );
}
