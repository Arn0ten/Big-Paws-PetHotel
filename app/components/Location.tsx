"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

export default function Location() {
  return (
    <div className="py-16 bg-background" id="location">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Visit Our Location</h2>
          <p className="mt-4 text-lg text-muted-foreground">We're conveniently located in the heart of Tagum City</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-lg shadow-lg p-6 space-y-6"
          >
            {/* Address (Google Maps) */}
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-foreground">Address</h3>
                <p className="text-muted-foreground">
                  <a
                    href="https://www.google.com/maps/@7.4460297,125.8037527,0a,81.7y,20.93h,88.06t/data=!3m4!1e1!3m2!1syoMuKL9gYTS0UI7oEBSs2w!2e0?source=apiv3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Bonifacio St., in front of Philhealth,
                    <br />
                    Tagum City, Philippines, 8100
                  </a>
                </p>
              </div>
            </div>

            {/* Phone (WhatsApp) */}
            <div className="flex items-start space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-6 h-6 flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-medium text-foreground">Phone</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+639501890933" className="hover:text-primary transition-colors">
                    +63 950 189 0933
                  </a>
                </p>
              </div>
            </div>

            {/* Email (Gmail) */}
            <div className="flex items-start space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_(2020).svg"
                alt="Gmail"
                className="w-6 h-6 flex-shrink-0 mt-1"
              />
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:galojanlloyn18@gmail.com" className="hover:text-primary transition-colors">
                    galojanlloyn18@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Business Hours (Clock) */}
            <div className="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 flex-shrink-0 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <h3 className="font-medium text-foreground">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Sunday
                  <br />
                  8:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!4v1698765432100!6m8!1m7!1syoMuKL9gYTS0UI7oEBSs2w!2m2!1d7.4460297!2d125.8037527!3f22!4f0!5f0.7820865974627469`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Big Paws Pet Hotel Location"
              ></iframe>
            </div>
            <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.0374095485396!2d125.8037527!3d7.4460297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjYnNDYuMSJOIDEyNcKwNDgnMTQuNCJF!5e0!3m2!1sen!2sph!4v1645510615000!5m2!1sen!2sph`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Big Paws Pet Hotel Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

