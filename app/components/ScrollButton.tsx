"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const pathname = usePathname();

  // Don't show scroll button in pet-owner interface
  const isPetOwnerInterface = pathname?.includes("/webapp/pet-owner");

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (isPetOwnerInterface) {
      setShowButton(false);
      return;
    } else {
      setShowButton(true);
    }

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2
      ) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isPetOwnerInterface]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton && isVisible && (
        <button
          onClick={isAtBottom ? scrollToTop : scrollToBottom}
          className="fixed bottom-5 right-5 bg-primary text-primary-foreground p-2 rounded-full shadow-lg transition-all duration-300 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 z-50"
          aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
        >
          {isAtBottom ? (
            <ArrowUp className="h-6 w-6" />
          ) : (
            <ArrowDown className="h-6 w-6" />
          )}
        </button>
      )}
    </>
  );
}
