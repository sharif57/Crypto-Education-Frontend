"use client";
import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname === "/chat" ||
    pathname === "/auth/create-pass" ||
    pathname === "/auth/forgot-otp" ||
    pathname === "/auth/forgot-pass" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/login" ||
    pathname === "/auth/verify-email"
  ) {
    return null;
  }

  return (
    <footer className="bg-[#1B1B1B] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {/* Logo Icon */}
              <Image
                src="/images/footer.png"
                alt="Logo"
                width={400}
                height={500}
                className="object-cover w-[250px] h-[190px]  object-center"
              />
            </div>
            <p className="text-white text-sm leading-relaxed">
              Your Ultimate 360°
              <br />
              Cryptolearning Experience.
            </p>
          </div>

          {/* Site Navigation */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Site Navigation</h3>
            <nav className="space-y-4">
              <Link
                href="/"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Home
              </Link>
              <Link
                href="/master-class"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Masterclass
              </Link>
              <Link
                href="/chat"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                AI Assistance
              </Link>
              <Link
                href="#features"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Features
              </Link>
              <Link
                href="#prices"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Testimonials
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <nav className="space-y-4">
              <Link
                href="/about-us"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/about-us"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/about-us"
                className="block text-gray-300 hover:text-[#4ade80] transition-colors duration-200 text-sm"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Socials */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Socials</h3>
            <nav className="space-y-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm group"
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.73206 5.89657L14.5867 0.704102H12.7428L8.9322 4.77941L6.015 0.704102H0.973145L6.07642 7.83406L0.973145 13.2927H2.81705L6.87773 8.94976L9.98649 13.2927H15.0283L9.73352 5.89657H9.73206ZM3.57157 2.03914H5.3292L12.4299 11.9576H10.6723L3.57011 2.0406L3.57157 2.03914Z"
                    fill="white"
                  />
                </svg>
                X
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-5 h-5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded flex items-center justify-center group-hover:opacity-80 transition-opacity duration-200">
                  <Instagram className="w-3 h-3 text-white" />
                </div>
                Instagram
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-5 h-5 bg-[#0077b5] rounded flex items-center justify-center group-hover:bg-[#005885] transition-colors duration-200">
                  <Linkedin className="w-3 h-3 text-white" />
                </div>
                LinkedIn
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 text-sm group"
              >
                <div className="w-5 h-5 bg-[#ff0000] rounded flex items-center justify-center group-hover:bg-[#cc0000] transition-colors duration-200">
                  <Youtube className="w-3 h-3 text-white" />
                </div>
                YouTube
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
