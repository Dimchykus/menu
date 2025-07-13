"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      data-testid="home-header"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              MenuMaker
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link
              href="/restaurants"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Restaurants
            </Link>
            {!session && (
              <Link
                href="/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                Login
              </Link>
            )}
            {session && (
              <Link
                href="/profile"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
              >
                Profile
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
