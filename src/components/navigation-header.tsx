"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {

  const pathname = usePathname();

  if(pathname === "/chat"){
    return null;
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const navigationItems = [
    { name: "Home", href: "/", active: activeItem === "Home" },
    {
      name: "Masterclass",
      href: "/master-class",
      active: activeItem === "Masterclass",
    },
    {
      name: "AI Assistance",
      href: "#",
      active: activeItem === "AI Assistance",
    },
    { name: "Features", href: "#", active: activeItem === "Features" },
    { name: "Pricing", href: "#", active: activeItem === "Pricing" },
    { name: "Testimonials", href: "#", active: activeItem === "Testimonials" },
  ];

  return (
    <header className="relative  ">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={400}
                height={400}
                className="w-[110px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  item.active
                    ? "bg-[#373737] text-white px-6 py-2 text-lg font-normal rounded-full"
                    : "text-[#999999] hover:text-white hover:bg-gray-800/50"
                }`}
                onClick={() => setActiveItem(item.name)}
              >
                {item.name}
                {item.active && (
                  <div className="absolute inset-0 rounded-full  animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <Button
              variant="outline"
              className="bg-transparent border-text  text-white hover:bg-text    hover:border-gray-500 px-6 py-5 rounded-full text-sm font-medium"
            >
              Log In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a1a1a] border-t border-gray-800">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                    item.active
                      ? "text-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-l-4 border-cyan-400 shadow-lg shadow-cyan-400/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/70 hover:border-l-4 hover:border-gray-600"
                  }`}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.active && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </Link>
              ))}
              <div className="pt-4 pb-2">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-full text-sm font-medium"
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
