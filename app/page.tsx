"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import WhyUs from "./components/WhyUs";
import Marketing from "./components/Marketing";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import ServicesMenu from "./components/ServicesMenu";
import ServiceInfo from "./components/ServiceInfo";
import VideoSection from "./components/VideoSection";
import Location from "./components/Location";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import HomeService from "./components/HomeService";
import PetSupplies from "./components/PetSupplies";
import FacilityShowcase from "./components/FacilityShowcase";
import MapSection from "./components/MapSection";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {isClient && (
          <>
            <Hero />
            <Features />
            <FacilityShowcase />
            <AboutUs />
            <WhyUs />
            <ServicesMenu />
            <ServiceInfo />
            <HomeService />
            <PetSupplies />
            <VideoSection />
            <Marketing />
            <Gallery />
            <Testimonials />
            <Location />
            <MapSection />
            <ContactForm />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
