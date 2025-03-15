import type { FC } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const CompanyPage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Company</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p>Learn about our company's history, mission, and values.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Blog</h2>
          <p>Read our latest news, updates, and articles.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
          <p>Explore career opportunities at our company.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Press</h2>
          <p>Find press releases and media resources.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CompanyPage

