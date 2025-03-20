"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-10 
      ${theme === "dark" ? "bg-black/90" : "bg-[#fdf6f0]"}`}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="relative mx-auto w-full max-w-md">
          {/* Box with cat */}
          <div className="relative mx-auto">
            {/* Box */}
            <div
              className={`w-64 h-40 rounded-md mx-auto relative z-10
              ${theme === "dark" ? "bg-amber-600" : "bg-amber-400"}`}
            >
              {/* Box top flaps */}
              <div className="absolute -top-3 left-0 w-full flex justify-between">
                <div
                  className={`w-28 h-6 rounded-t-md transform origin-bottom-left rotate-6
                  ${theme === "dark" ? "bg-amber-500" : "bg-amber-300"}`}
                ></div>
                <div
                  className={`w-28 h-6 rounded-t-md transform origin-bottom-right -rotate-6
                  ${theme === "dark" ? "bg-amber-500" : "bg-amber-300"}`}
                ></div>
              </div>

              {/* Realistic Cat */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48 h-48 z-20">
                <div className="relative w-full h-full">
                  {/* Cat body - using a more realistic approach */}
                  <div
                    className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-36 h-28 
                    ${theme === "dark" ? "bg-slate-800" : "bg-slate-700"} 
                    rounded-3xl overflow-hidden animate-cat-breathe`}
                  >
                    {/* Cat fur texture */}
                    <div className="absolute inset-0 opacity-30">
                      <div
                        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b 
                        ${theme === "dark" ? "from-slate-700 to-slate-900" : "from-slate-600 to-slate-800"}`}
                      ></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/5 to-transparent"></div>
                    </div>

                    {/* Cat face */}
                    <div
                      className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-20 
                      ${theme === "dark" ? "bg-slate-800" : "bg-slate-700"} rounded-full`}
                    >
                      {/* Cat ears */}
                      <div
                        className={`absolute -top-5 -left-2 w-10 h-10 
                        ${theme === "dark" ? "bg-slate-800" : "bg-slate-700"} rounded-md transform rotate-45`}
                      >
                        <div
                          className={`absolute inset-1 
                          ${theme === "dark" ? "bg-slate-700" : "bg-slate-600"} rounded-md transform`}
                        ></div>
                      </div>
                      <div
                        className={`absolute -top-5 -right-2 w-10 h-10 
                        ${theme === "dark" ? "bg-slate-800" : "bg-slate-700"} rounded-md transform rotate-45`}
                      >
                        <div
                          className={`absolute inset-1 
                          ${theme === "dark" ? "bg-slate-700" : "bg-slate-600"} rounded-md transform`}
                        ></div>
                      </div>

                      {/* Cat eyes - with blinking animation */}
                      <div className="absolute top-6 left-4 w-6 h-6 bg-black rounded-full overflow-hidden animate-cat-blink">
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 
                          ${theme === "dark" ? "bg-amber-400" : "bg-amber-300"} rounded-full`}
                        >
                          <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-black rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute top-6 right-4 w-6 h-6 bg-black rounded-full overflow-hidden animate-cat-blink-delayed">
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 
                          ${theme === "dark" ? "bg-amber-400" : "bg-amber-300"} rounded-full`}
                        >
                          <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-black rounded-full"></div>
                        </div>
                      </div>

                      {/* Cat nose */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-300 rounded-full"></div>

                      {/* Cat mouth */}
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-4 h-1 border-b border-slate-500"></div>

                      {/* Cat whiskers */}
                      <div className="absolute top-12 left-2 w-6 h-0.5 bg-slate-400 transform rotate-6"></div>
                      <div className="absolute top-13 left-1 w-7 h-0.5 bg-slate-400"></div>
                      <div className="absolute top-14 left-2 w-6 h-0.5 bg-slate-400 transform -rotate-6"></div>

                      <div className="absolute top-12 right-2 w-6 h-0.5 bg-slate-400 transform -rotate-6"></div>
                      <div className="absolute top-13 right-1 w-7 h-0.5 bg-slate-400"></div>
                      <div className="absolute top-14 right-2 w-6 h-0.5 bg-slate-400 transform rotate-6"></div>
                    </div>

                    {/* Cat paws */}
                    <div
                      className={`absolute bottom-2 left-4 w-8 h-4 
                      ${theme === "dark" ? "bg-slate-700" : "bg-slate-600"} rounded-full`}
                    ></div>
                    <div
                      className={`absolute bottom-2 right-4 w-8 h-4 
                      ${theme === "dark" ? "bg-slate-700" : "bg-slate-600"} rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* 404 Sign with animation */}
              <div
                className={`absolute -top-24 left-1/2 transform -translate-x-1/2 w-24 h-16 
                ${theme === "dark" ? "bg-slate-200 border-slate-700" : "bg-[#f8d7c4] border-[#4a3a5a]"} 
                border-2 rounded-md rotate-12 flex items-center justify-center z-30 animate-sign-wave`}
              >
                <span
                  className={`text-3xl font-bold 
                  ${theme === "dark" ? "text-primary" : "text-primary"}`}
                >
                  404
                </span>
              </div>

              {/* Sign stick */}
              <div
                className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-2 h-16 
                ${theme === "dark" ? "bg-slate-600" : "bg-[#8a7a9a]"} z-20 rotate-12 animate-sign-stick`}
              ></div>
            </div>
          </div>

          {/* Text */}
          <h2
            className={`text-4xl font-bold mt-8 
            ${theme === "dark" ? "text-primary" : "text-primary"}`}
          >
            Ooops...page not found
          </h2>
          <p
            className={`mt-4 mb-8 
            ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
          >
            It looks like our curious cat has wandered into this box with your
            page! Don't worry, we'll help you find your way back to where you
            need to be.
          </p>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="default"
              size="lg"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
