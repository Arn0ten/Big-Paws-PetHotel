import type { FC } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const LegalPage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Legal</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p>Our commitment to protecting your privacy and personal information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
          <p>The terms and conditions governing the use of our services.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default LegalPage

