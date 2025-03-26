"use client";

import type React from "react";
import { Shield, FileText, Lock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Github,
  Mail,
  MessageCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export default function Footer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{
    title: string;
    content: React.ReactNode;
  }>({ title: "", content: null });

  const openDialog = (title: string, content: React.ReactNode) => {
    setDialogContent({ title, content });
    setDialogOpen(true);
  };

  const servicesContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Pet Boarding</h3>
        <p className="text-muted-foreground">
          Luxury accommodations for your pets while you're away. We provide
          comfortable kennels, regular exercise, and personalized care.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Grooming</h3>
        <p className="text-muted-foreground">
          Professional grooming services including bathing, haircuts, nail
          trimming, and more to keep your pet looking and feeling their best.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Day Care</h3>
        <p className="text-muted-foreground">
          Supervised play and socialization for your pet during the day. Perfect
          for busy pet owners who want their pets to have company.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Home Services</h3>
        <p className="text-muted-foreground">
          In-home pet care services including feeding, walking, medication
          administration, and more for pets who prefer staying at home.
        </p>
      </div>
    </div>
  );

  const supportContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Pricing</h3>
        <p className="text-muted-foreground">
          Detailed information about our pricing plans and options for all
          services.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Documentation</h3>
        <p className="text-muted-foreground">
          Comprehensive guides and documentation for pet owners about our
          services and facilities.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Guides</h3>
        <p className="text-muted-foreground">
          Step-by-step guides for preparing your pet for boarding, grooming, and
          other services.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">FAQ</h3>
        <p className="text-muted-foreground">
          Answers to frequently asked questions about our services, policies,
          and procedures.
        </p>
      </div>
    </div>
  );

  const companyContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">About</h3>
        <p className="text-muted-foreground">
          Learn about our company's history, mission, and values. Big Paws Pet
          Hotel has been providing exceptional pet care since 2020.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Blog</h3>
        <p className="text-muted-foreground">
          Read our latest articles on pet care, health tips, and industry news
          to keep your furry friends happy and healthy.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Careers</h3>
        <p className="text-muted-foreground">
          Join our team of passionate pet care professionals. View current job
          openings and application information.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Press</h3>
        <p className="text-muted-foreground">
          Media resources, press releases, and news about Big Paws Pet Hotel's
          growth and achievements.
        </p>
      </div>
    </div>
  );

  const legalContent = (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-center">
              Terms & Privacy Policy
            </h1>
            <p className="text-center mb-8 text-muted-foreground">
              Last Updated: January 15, 2025 | Effective Date: February 1, 2025
            </p>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-8 border border-blue-200 dark:border-blue-800">
              <p className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <span>
                  This document is governed by the laws of the Republic of the
                  Philippines, including but not limited to the Data Privacy Act
                  of 2012 (Republic Act No. 10173), the Consumer Act of the
                  Philippines (Republic Act No. 7394), and the E-Commerce Act
                  (Republic Act No. 8792), as amended by subsequent legislation
                  through 2025.
                </span>
              </p>
            </div>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Terms of Service</h2>
              </div>

              <h3 className="text-xl font-semibold mb-4">
                1. Service Agreement
              </h3>
              <p className="mb-4">
                By using Big Paws Pet Hotel services, you agree to comply with
                and be bound by the following terms and conditions. We reserve
                the right to modify these terms at any time, with changes taking
                effect upon posting to this site. Your continued use of our
                services constitutes acceptance of these terms.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                2. Pet Care Services
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  All pets must be up-to-date with vaccinations as required by
                  the Philippine Veterinary Medical Association and the Bureau
                  of Animal Industry
                </li>
                <li>
                  Owners must disclose any known health conditions, with
                  liability for non-disclosure as stipulated under Philippine
                  Civil Code Article 1170
                </li>
                <li>
                  We reserve the right to refuse service to aggressive pets in
                  accordance with the Animal Welfare Act of the Philippines
                  (Republic Act No. 8485 as amended by RA 10631)
                </li>
                <li>
                  24-hour notice is required for cancellations, with applicable
                  fees as detailed in our service contract
                </li>
                <li>
                  Emergency veterinary care may be sought at our discretion,
                  with costs billed to the pet owner as permitted by Philippine
                  law
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Payment Terms</h3>
              <p className="mb-4">
                Payment is required at the time of service. We accept cash,
                credit cards, and digital payments including GCash, Maya, and
                other Philippine electronic payment systems. All prices are in
                Philippine Pesos (PHP) and include applicable Value Added Tax
                (VAT) as required by the National Internal Revenue Code, as
                amended by the CREATE Act of 2021 and subsequent tax regulations
                through 2025.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                4. Limitation of Liability
              </h3>
              <p className="mb-4">
                In accordance with Philippine Civil Code Articles 1170-1174, our
                liability is limited to cases of willful misconduct or gross
                negligence. We are not liable for force majeure events including
                but not limited to natural disasters, as recognized under
                Philippine jurisprudence and the Civil Code.
              </p>
            </section>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">Privacy Policy</h2>
              </div>

              <p className="mb-4">
                This Privacy Policy complies with the Data Privacy Act of 2012
                (Republic Act No. 10173) and its Implementing Rules and
                Regulations, as well as all applicable National Privacy
                Commission (NPC) Circulars and Guidelines through 2025.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                1. Information Collection
              </h3>
              <p className="mb-4">
                We collect information necessary to provide pet care services,
                including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Owner contact information (name, address, phone number, email)
                </li>
                <li>Pet health records and medical history</li>
                <li>Emergency contact details</li>
                <li>Service preferences and special instructions</li>
                <li>
                  Payment information processed in compliance with Bangko
                  Sentral ng Pilipinas (BSP) Circular No. 1048 and subsequent
                  regulations
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">
                2. Information Usage
              </h3>
              <p className="mb-4">
                Your information is used solely for providing pet care services
                and will never be sold to third parties. As the data controller
                and processor under the Data Privacy Act, we may use your
                contact information to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Confirm appointments and service bookings</li>
                <li>Send service reminders and follow-ups</li>
                <li>Share important updates about your pet's care</li>
                <li>Provide emergency notifications</li>
                <li>Process payments and generate receipts</li>
                <li>
                  Comply with legal requirements and government regulations
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Data Security</h3>
              <p className="mb-4">
                We implement appropriate security measures to protect your
                personal information and maintain confidentiality in accordance
                with NPC Circular No. 16-01 on Security of Personal Data in
                Government Processing and subsequent security guidelines. These
                measures include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments and updates</li>
                <li>Staff training on data protection</li>
                <li>Access controls and authentication procedures</li>
                <li>
                  Data breach notification protocols as required by NPC Circular
                  No. 16-03
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">
                4. Data Subject Rights
              </h3>
              <p className="mb-4">
                Under the Data Privacy Act of 2012, you have the following
                rights regarding your personal information:
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
                To exercise these rights, please contact our Data Protection
                Officer using the contact information below.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                5. Cookies and Tracking
              </h3>
              <p className="mb-4">
                Our website uses cookies and similar technologies to enhance
                user experience and collect usage data. You may manage cookie
                preferences through your browser settings. Our cookie usage
                complies with the NPC's guidelines on online privacy and the
                E-Commerce Act.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                6. Third-Party Services
              </h3>
              <p className="mb-4">
                We may use third-party services for payment processing, email
                communication, and other business functions. These service
                providers are required to maintain the confidentiality of your
                information and comply with Philippine data protection laws.
              </p>
            </section>

            <section className="bg-card rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold m-0">
                  Contact Information
                </h2>
              </div>
              <p className="mb-4">
                If you have any questions about our Terms of Service or Privacy
                Policy, please contact us:
              </p>
              <ul className="list-none pl-6 mb-4">
                <li className="mb-2">📞 Phone: +63 950 189 0933</li>
                <li className="mb-2">📧 Email: galojanlloyn18@gmail.com</li>
                <li className="mb-2">
                  📍 Address: Bonifacio St., Tagum City, Davao del Norte,
                  Philippines 8100
                </li>
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
                  For complaints not resolved by our DPO, you may contact the
                  National Privacy Commission:
                  <br />
                  5th Floor, Delegation Building, PICC Complex, Roxas Boulevard,
                  Pasay City, Metro Manila
                  <br />
                  Email: info@privacy.gov.ph
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  © 2025 Big Paws Pet Hotel. All rights reserved.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );

  const helpContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Contact Support</h3>
        <p className="text-muted-foreground">
          Our support team is available 7 days a week from 8am to 8pm. Contact
          us by phone at +63 950 189 0933 or email at
          support@bigpawspethotel.com.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Emergency Services</h3>
        <p className="text-muted-foreground">
          For pet emergencies outside of business hours, please call our 24/7
          emergency line at +63 950 189 0934.
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Feedback</h3>
        <p className="text-muted-foreground">
          We value your feedback! Let us know how we can improve our services to
          better serve you and your pets.
        </p>
      </div>
    </div>
  );

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-tgQYrArFSfOX9irwlrG1D93gEjB9yr.png"
              alt="Big Paws Pet Hotel"
              width={120}
              height={120}
              className="w-auto h-12"
            />
            <p className="text-base text-muted-foreground">
              Providing luxury pet care services with love and dedication since
              2020.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/p/Big-Paws-Petsupplies-100092201454911/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/bigpawspethotel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/Arn0ten"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@bigpawspethotel.com"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/p/Big-Paws-Petsupplies-100092201454911/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Messenger</span>
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Pet Hotel Services", servicesContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Pet Hotel
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Grooming Services", servicesContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Grooming
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Day Care Services", servicesContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Day Care
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Home Services", servicesContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Home Services
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Pricing Information", supportContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Documentation", supportContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openDialog("Guides", supportContent)}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Guides
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openDialog("Help & Support", helpContent)}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Help & Support
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <button
                      onClick={() =>
                        openDialog("About Big Paws Pet Hotel", companyContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openDialog("Blog", companyContent)}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openDialog("Careers", companyContent)}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Jobs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openDialog("Press", companyContent)}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Press
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <button
                      onClick={() => openDialog("Privacy Policy", legalContent)}
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        openDialog("Terms of Service", legalContent)
                      }
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-muted-foreground xl:text-center">
            &copy; {new Date().getFullYear()} Big Paws Pet Hotel. All rights
            reserved.
          </p>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{dialogContent.title}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {dialogContent.content}
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
