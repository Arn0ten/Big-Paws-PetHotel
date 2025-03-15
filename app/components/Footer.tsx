import Link from "next/link"
import { Facebook, Instagram, Github, Mail, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function Footer() {
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
              Providing luxury pet care services with love and dedication since 2020.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/bigpawspethotel"
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
                href="https://github.com/bigpawspethotel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="mailto:contact@bigpawspethotel.com" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://m.me/bigpawspethotel"
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
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Services</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/#pet-hotel" className="text-base text-muted-foreground hover:text-foreground">
                      Pet Hotel
                    </Link>
                  </li>
                  <li>
                    <Link href="/#grooming" className="text-base text-muted-foreground hover:text-foreground">
                      Grooming
                    </Link>
                  </li>
                  <li>
                    <Link href="/#day-care" className="text-base text-muted-foreground hover:text-foreground">
                      Day Care
                    </Link>
                  </li>
                  <li>
                    <Link href="/#home-services" className="text-base text-muted-foreground hover:text-foreground">
                      Home Services
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/support" className="text-base text-muted-foreground hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-base text-muted-foreground hover:text-foreground">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-base text-muted-foreground hover:text-foreground">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-base text-muted-foreground hover:text-foreground">
                      API Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/company" className="text-base text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/company" className="text-base text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/company" className="text-base text-muted-foreground hover:text-foreground">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/company" className="text-base text-muted-foreground hover:text-foreground">
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/legal" className="text-base text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal" className="text-base text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-muted-foreground xl:text-center">
            &copy; {new Date().getFullYear()} Big Paws Pet Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

