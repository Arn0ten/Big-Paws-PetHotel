import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, PawPrintIcon as Paw } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 px-4">
      <div className="max-w-3xl w-full text-center space-y-8 relative">
        {/* Floating paw prints */}
        <div className="absolute -top-20 -left-10 opacity-20 animate-bounce delay-300">
          <Paw size={40} className="text-primary" />
        </div>
        <div className="absolute top-10 right-10 opacity-20 animate-bounce delay-700">
          <Paw size={30} className="text-primary" />
        </div>
        <div className="absolute bottom-0 left-20 opacity-20 animate-bounce delay-500">
          <Paw size={35} className="text-primary" />
        </div>
        <div className="absolute -bottom-20 right-0 opacity-20 animate-bounce delay-200">
          <Paw size={45} className="text-primary" />
        </div>

        {/* Main content */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg border border-border">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <Paw size={48} className="text-primary" />
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full animate-spin-slow">
                  <div className="w-6 h-6 bg-primary/20 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Oops! Page Not Found</h2>
              <p className="text-muted-foreground mb-6">
                It seems this page has wandered off like a curious pet!
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-32">
          <p className="text-lg">
            Don't worry, we'll help you find your way back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild variant="default" size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/pets">
                <Paw className="h-4 w-4" />
                Explore Services
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="gap-2">
              <Link href="/map">
                <Search className="h-4 w-4" />
                Find Location
              </Link>
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            <p>
              If you believe this is an error, please{" "}
              <Link href="/support" className="text-primary hover:underline">
                contact our support team
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Interactive pet animation */}
      <div className="mt-16 relative w-full max-w-md h-24">
        <div className="absolute left-0 animate-pet-walk">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Paw size={24} className="text-primary" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
