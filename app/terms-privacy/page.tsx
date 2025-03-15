"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"

export default function TermsPrivacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8 text-center">Terms & Privacy Policy</h1>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Terms of Service</h2>

              <h3 className="text-xl font-semibold mb-4">1. Service Agreement</h3>
              <p className="mb-4">
                By using Big Paws Pet Hotel services, you agree to comply with and be bound by the following terms and
                conditions. We reserve the right to modify these terms at any time.
              </p>

              <h3 className="text-xl font-semibold mb-4">2. Pet Care Services</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>All pets must be up-to-date with vaccinations</li>
                <li>Owners must disclose any known health conditions</li>
                <li>We reserve the right to refuse service to aggressive pets</li>
                <li>24-hour notice is required for cancellations</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Payment Terms</h3>
              <p className="mb-4">
                Payment is required at the time of service. We accept cash, credit cards, and digital payments.
              </p>
            </section>

            <section className="mb-12 bg-card rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>

              <h3 className="text-xl font-semibold mb-4">1. Information Collection</h3>
              <p className="mb-4">We collect information necessary to provide pet care services, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Owner contact information</li>
                <li>Pet health records and medical history</li>
                <li>Emergency contact details</li>
                <li>Service preferences and special instructions</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">2. Information Usage</h3>
              <p className="mb-4">
                Your information is used solely for providing pet care services and will never be sold to third parties.
                We may use your contact information to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Confirm appointments</li>
                <li>Send service reminders</li>
                <li>Share important updates about your pet's care</li>
                <li>Provide emergency notifications</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">3. Data Security</h3>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information and maintain
                confidentiality.
              </p>
            </section>

            <section className="bg-card rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our Terms of Service or Privacy Policy, please contact us:
              </p>
              <ul className="list-none pl-6 mb-4">
                <li>📞 Phone: +63 950 189 0933</li>
                <li>📧 Email: galojanlloyn18@gmail.com</li>
                <li>📍 Address: Bonifacio St., Tagum City, Philippines</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

