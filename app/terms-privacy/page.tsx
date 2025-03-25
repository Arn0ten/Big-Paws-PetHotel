"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { Shield, FileText, Lock, AlertTriangle } from "lucide-react"

export default function TermsPrivacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-center">Terms & Privacy Policy</h1>
            <p className="text-center mb-8 text-muted-foreground">
              Last Updated: January 15, 2025 | Effective Date: February 1, 2025
            </p>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <p className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <span>
                  This document is governed by the laws of the Republic of the Philippines, including but not limited to
                  the Data Privacy Act of 2012 (Republic Act No. 10173), the Consumer Act of the Philippines (Republic
                  Act No. 7394), and the E-Commerce Act (Republic Act No. 8792), as amended by subsequent legislation
                  through 2025.
                </span>
              </p>
            </div>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Terms of Service</h2>
              </div>

              <h3 className="text-xl font-semibold mb-4">1. Service Agreement</h3>
              <p className="mb-4">
                By using Big Paws Pet Hotel services, you agree to comply with and be bound by the following terms and
                conditions. We reserve the right to modify these terms at any time, with changes taking effect upon
                posting to this site. Your continued use of our services constitutes acceptance of these terms.
              </p>

              <h3 className="text-xl font-semibold mb-4">2. Pet Care Services</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  All pets must be up-to-date with vaccinations as required by the Philippine Veterinary Medical
                  Association and the Bureau of Animal Industry
                </li>
                <li>
                  Owners must disclose any known health conditions, with liability for non-disclosure as stipulated
                  under Philippine Civil Code Article 1170
                </li>
                <li>
                  We reserve the right to refuse service to aggressive pets in accordance with the Animal Welfare Act of
                  the Philippines (Republic Act No. 8485 as amended by RA 10631)
                </li>
                <li>
                  24-hour notice is required for cancellations, with applicable fees as detailed in our service contract
                </li>
                <li>
                  Emergency veterinary care may be sought at our discretion, with costs billed to the pet owner as
                  permitted by Philippine law
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Payment Terms</h3>
              <p className="mb-4">
                Payment is required at the time of service. We accept cash, credit cards, and digital payments including
                GCash, Maya, and other Philippine electronic payment systems. All prices are in Philippine Pesos (PHP)
                and include applicable Value Added Tax (VAT) as required by the National Internal Revenue Code, as
                amended by the CREATE Act of 2021 and subsequent tax regulations through 2025.
              </p>

              <h3 className="text-xl font-semibold mb-4">4. Limitation of Liability</h3>
              <p className="mb-4">
                In accordance with Philippine Civil Code Articles 1170-1174, our liability is limited to cases of
                willful misconduct or gross negligence. We are not liable for force majeure events including but not
                limited to natural disasters, as recognized under Philippine jurisprudence and the Civil Code.
              </p>
            </section>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Privacy Policy</h2>
              </div>

              <p className="mb-4">
                This Privacy Policy complies with the Data Privacy Act of 2012 (Republic Act No. 10173) and its
                Implementing Rules and Regulations, as well as all applicable National Privacy Commission (NPC)
                Circulars and Guidelines through 2025.
              </p>

              <h3 className="text-xl font-semibold mb-4">1. Information Collection</h3>
              <p className="mb-4">We collect information necessary to provide pet care services, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Owner contact information (name, address, phone number, email)</li>
                <li>Pet health records and medical history</li>
                <li>Emergency contact details</li>
                <li>Service preferences and special instructions</li>
                <li>
                  Payment information processed in compliance with Bangko Sentral ng Pilipinas (BSP) Circular No. 1048
                  and subsequent regulations
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">2. Information Usage</h3>
              <p className="mb-4">
                Your information is used solely for providing pet care services and will never be sold to third parties.
                As the data controller and processor under the Data Privacy Act, we may use your contact information to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Confirm appointments and service bookings</li>
                <li>Send service reminders and follow-ups</li>
                <li>Share important updates about your pet's care</li>
                <li>Provide emergency notifications</li>
                <li>Process payments and generate receipts</li>
                <li>Comply with legal requirements and government regulations</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Data Security</h3>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information and maintain
                confidentiality in accordance with NPC Circular No. 16-01 on Security of Personal Data in Government
                Processing and subsequent security guidelines. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments and updates</li>
                <li>Staff training on data protection</li>
                <li>Access controls and authentication procedures</li>
                <li>Data breach notification protocols as required by NPC Circular No. 16-03</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">4. Data Subject Rights</h3>
              <p className="mb-4">
                Under the Data Privacy Act of 2012, you have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Right to be informed</li>
                <li>Right to access</li>
                <li>Right to object</li>
                <li>Right to erasure or blocking</li>
                <li>Right to damages</li>
                <li>Right to file a complaint</li>
                <li>Right to rectify inaccuracies</li>
                <li>Right to data portability</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact our Data Protection Officer using the contact information
                below.
              </p>

              <h3 className="text-xl font-semibold mb-4">5. Cookies and Tracking</h3>
              <p className="mb-4">
                Our website uses cookies and similar technologies to enhance user experience and collect usage data. You
                may manage cookie preferences through your browser settings. Our cookie usage complies with the NPC's
                guidelines on online privacy and the E-Commerce Act.
              </p>

              <h3 className="text-xl font-semibold mb-4">6. Third-Party Services</h3>
              <p className="mb-4">
                We may use third-party services for payment processing, email communication, and other business
                functions. These service providers are required to maintain the confidentiality of your information and
                comply with Philippine data protection laws.
              </p>
            </section>

            <section className="bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Contact Information</h2>
              </div>
              <p className="mb-4">
                If you have any questions about our Terms of Service or Privacy Policy, please contact us:
              </p>
              <ul className="list-none pl-6 mb-4">
                <li className="mb-2">📞 Phone: +63 950 189 0933</li>
                <li className="mb-2">📧 Email: galojanlloyn18@gmail.com</li>
                <li className="mb-2">📍 Address: Bonifacio St., Tagum City, Davao del Norte, Philippines 8100</li>
              </ul>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Data Protection Officer:</strong> Lloyn Galojan
                  <br />
                  <strong>Email:</strong> dpo@bigpawspethotel.ph
                  <br />
                  <strong>Phone:</strong> +63 950 189 0933
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  For complaints not resolved by our DPO, you may contact the National Privacy Commission:
                  <br />
                  5th Floor, Delegation Building, PICC Complex, Roxas Boulevard, Pasay City, Metro Manila
                  <br />
                  Email: info@privacy.gov.ph
                </p>
                <p className="text-sm text-muted-foreground mt-4">© 2025 Big Paws Pet Hotel. All rights reserved.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

