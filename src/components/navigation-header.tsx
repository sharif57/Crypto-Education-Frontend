// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState("Home");
//   const pathname = usePathname();

//   if (pathname === "/chat") {
//     return null;
//   }

//   const navigationItems = [
//     { name: "Home", href: "/", active: activeItem === "Home" },
//     {
//       name: "Masterclass",
//       href: "/master-class",
//       active: activeItem === "Masterclass",
//     },
//     {
//       name: "AI Assistance",
//       href: "/chat",
//       active: activeItem === "AI Assistance",
//     },
//     { name: "Features", href: "#", active: activeItem === "Features" },
//     { name: "Pricing", href: "#", active: activeItem === "Pricing" },
//     { name: "Testimonials", href: "#", active: activeItem === "Testimonials" },
//   ];

//   return (
//     <header className="relative  ">
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center space-x-2">
//               <Image
//                 src="/images/logo.png"
//                 alt="Logo"
//                 width={400}
//                 height={400}
//                 className="w-[110px]"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navigationItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
//                   item.active
//                     ? "bg-[#373737] text-white px-6 py-2 text-lg font-normal rounded-full"
//                     : "text-[#999999] hover:text-white hover:bg-gray-800/50"
//                 }`}
//                 onClick={() => setActiveItem(item.name)}
//               >
//                 {item.name}
//                 {item.active && (
//                   <div className="absolute inset-0 rounded-full  animate-pulse"></div>
//                 )}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Login Button */}
//           <div className="hidden md:flex items-center">
//             <Button
//               variant="outline"
//               className="bg-transparent border-text  text-white hover:bg-text    hover:border-gray-500 px-6 py-5 rounded-full text-sm font-medium"
//             >
//               Log In
//             </Button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-white hover:bg-gray-800"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a1a1a] border-t border-gray-800">
//               {navigationItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
//                     item.active
//                       ? "text-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-l-4 border-cyan-400 shadow-lg shadow-cyan-400/10"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/70 hover:border-l-4 hover:border-gray-600"
//                   }`}
//                   onClick={() => {
//                     setActiveItem(item.name);
//                     setIsMobileMenuOpen(false);
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{item.name}</span>
//                     {item.active && (
//                       <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//               <div className="pt-4 pb-2">
//                 <Button
//                   variant="outline"
//                   className="w-full bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-full text-sm font-medium"
//                 >
//                   Log In
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState("Home");
//   const pathname = usePathname();

//   if (
//     pathname === "/chat" ||
//     pathname === "/auth/create-pass" ||
//     pathname === "/auth/forgot-otp" ||
//     pathname === "/auth/forgot-pass" ||
//     pathname === "/auth/signup" ||
//     pathname === "/auth/login" ||
//     pathname === "/auth/verify-email"
//   ) {
//     return null;
//   }

//   // Function to handle smooth scrolling
//   const handleScroll = (
//     e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//     href: string,
//     itemName: string
//   ) => {
//     e.preventDefault(); // Prevent default Link navigation
//     setActiveItem(itemName); // Set active item
//     setIsMobileMenuOpen(false); // Close mobile menu if open

//     // If the href is an anchor link (starts with #) or matches the current page
//     if (href.startsWith("#") || pathname === href) {
//       const sectionId = href.startsWith("#")
//         ? href.slice(1)
//         : href.replace("/", "");
//       const section = document.getElementById(sectionId);
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     } else {
//       // Navigate to the page if it's a different route
//       window.location.href = href;
//     }
//   };

//   const navigationItems = [
//     { name: "Home", href: "/", active: activeItem === "Home" },
//     {
//       name: "Masterclass",
//       href: "master-class", // Use anchor link for same-page scrolling
//       active: activeItem === "Masterclass",
//     },
//     {
//       name: "AI Assistance",
//       href: "chat", // Use anchor link for same-page scrolling
//       active: activeItem === "AI Assistance",
//     },
//     { name: "Features", href: "#Features", active: activeItem === "Features" },
//     { name: "Pricing", href: "#prices", active: activeItem === "Pricing" },
//     {
//       name: "Testimonials",
//       href: "#testimonials",
//       active: activeItem === "Testimonials",
//     },
//   ];

//   return (
//     <header className="relative">
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center space-x-2">
//               <Image
//                 src="/images/logo.png"
//                 alt="Logo"
//                 width={400}
//                 height={400}
//                 className="w-[110px]"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navigationItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
//                   item.active
//                     ? "bg-[#373737] text-white px-6 py-2 text-lg font-normal rounded-full"
//                     : "text-[#999999] hover:text-white hover:bg-gray-800/50"
//                 }`}
//                 onClick={(e) => handleScroll(e, item.href, item.name)}
//               >
//                 {item.name}
//                 {item.active && (
//                   <div className="absolute inset-0 rounded-full animate-pulse"></div>
//                 )}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Login Button */}
//           <div className="hidden md:flex items-center">
//             <Link href={"/auth/login"}>
//               <Button
//                 variant="outline"
//                 className="bg-transparent border-text cursor-pointer text-white hover:bg-text hover:border-gray-500 px-6 py-5 rounded-full text-sm font-medium"
//               >
//                 Log In
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-white hover:bg-gray-800"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a1a1a] border-t border-gray-800">
//               {navigationItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
//                     item.active
//                       ? "text-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-l-4 border-cyan-400 shadow-lg shadow-cyan-400/10"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/70 hover:border-l-4 hover:border-gray-600"
//                   }`}
//                   onClick={(e) => handleScroll(e, item.href, item.name)}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{item.name}</span>
//                     {item.active && (
//                       <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
//                     )}
//                   </div>
//                 </Link>
//               ))}
//               <div className="pt-4 pb-2">
//                 <Link href={"/auth/login"} className="cursor-pointer">
//                   <Button
//                     variant="outline"
//                     className="w-full cursor-pointer bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-full text-sm font-medium"
//                   >
//                     Log In
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  // 1. Hooks at top, unconditionally:
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("Home");
  const pathname = usePathname();  // Next.js client hook
  const router = useRouter();

  // 2. Now conditional return/hide logic:
  const hideHeaderRoutes = [
    "/chat",
    "/auth/create-pass",
    "/auth/forgot-otp",
    "/auth/forgot-pass",
    "/auth/signup",
    "/auth/login",
    "/auth/verify-email",
  ];
  // 3. Define navigation items (they do not use hooks)
  const navigationItems: { name: string; href: string }[] = [
    { name: "Home", href: "/" },
    { name: "Masterclass", href: "/master-class" },
    { name: "AI Assistance", href: "/chat" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#prices" },
    { name: "Testimonials", href: "/#testimonials" },
  ];

  // Helper: derive name from hash
  const getNameFromHash = (hash: string): string | null => {
    if (!hash.startsWith("#")) return null;
    const section = hash.slice(1).toLowerCase();
    const match = navigationItems.find(
      (item) => item.href.toLowerCase() === `/#${section}`
    );
    return match ? match.name : null;
  };

  // 4. Update activeItem when pathname (or hash) changes
  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/") {
      // On homepage: check window.location.hash
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash) {
        const name = getNameFromHash(hash);
        if (name) {
          setActiveItem(name);
          return;
        }
      }
      setActiveItem("Home");
    } else {
      // Not homepage: match route-based items
      const match = navigationItems.find(
        (item) =>
          item.href === pathname ||
          (item.href !== "/" && pathname.startsWith(item.href))
      );
      if (match) {
        setActiveItem(match.name);
      } else {
        setActiveItem(""); // or leave previous, as you prefer
      }
    }
  }, [pathname]);

  if (pathname && hideHeaderRoutes.includes(pathname)) {
    // We check pathname for existence to avoid issues if it's initially undefined/null
    return null;
  }

  // 5. Click handler for links: smooth scroll on homepage hashes, router.push otherwise
  const handleNavigationClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    itemName: string
  ) => {
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        const sectionId = href.slice(2); // "#section" minus "/#"
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setActiveItem(itemName);
        setIsMobileMenuOpen(false);
      } else {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        router.push(href);
      }
    } else if (href.startsWith("/")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      router.push(href);
    }
    // else: let default (rare in this setup)
  };

  // 6. JSX
  return (
    <header className="fixed top-0 left-0 right-0 z-50 ">
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
            {navigationItems.map((item) => {
              const isActive = item.name === activeItem;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive
                      ? "bg-[#373737] text-white px-6 py-2 text-lg font-normal rounded-full"
                      : "text-[#999999] hover:text-white hover:bg-gray-800/50"
                  }`}
                  onClick={(e) =>
                    handleNavigationClick(e, item.href, item.name)
                  }
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <Link href={"/auth/login"}>
              <Button
                variant="outline"
                className="bg-transparent border-text cursor-pointer text-white hover:bg-text hover:border-gray-500 px-6 py-5 rounded-full text-sm font-medium"
              >
                Log In
              </Button>
            </Link>
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
              {navigationItems.map((item) => {
                const isActive = item.name === activeItem;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${
                      isActive
                        ? "text-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-l-4 border-cyan-400 shadow-lg shadow-cyan-400/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/70 hover:border-l-4 hover:border-gray-600"
                    }`}
                    onClick={(e) =>
                      handleNavigationClick(e, item.href, item.name)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </a>
                );
              })}
              <div className="pt-4 pb-2">
                <Link href={"/auth/login"} className="cursor-pointer">
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-full text-sm font-medium"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
