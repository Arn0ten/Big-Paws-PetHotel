import type { FC } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const SupportPage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Support</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <p>Information about our pricing plans and options.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
          <p>Detailed documentation for our services and APIs.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Guides</h2>
          <p>Step-by-step guides for using our services effectively.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">API Status</h2>
          <p>Current status and performance of our APIs.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default SupportPage

