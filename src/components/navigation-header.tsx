
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateSessionMutation } from "@/Redux/feature/chatSlice";
import { logout } from "@/service/authService";
import GoogleTranslate from "./GoogleTranslate";

export default function Header() {
  // 1. Hooks at top, unconditionally
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("Home");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  const { data, refetch } = useUserProfileQuery({
    pollingInterval: 500,
  });
  const user = data?.data;

  const [createSession] = useCreateSessionMutation();

  // 2. Conditional return/hide logic
  const hideHeaderRoutes = useMemo(
    () => [
      "/chat",
      "/chat/:id", // Dynamic route pattern
      "/auth/create-pass",
      "/auth/forgot-otp",
      "/auth/forgot-pass",
      "/auth/signup",
      "/auth/login",
      "/auth/verify-email",
    ],
    []
  );

  // Check if the current pathname matches any of the hideHeaderRoutes or the dynamic /chat/:id pattern
  const hideLayout = useMemo(() => {
    if (hideHeaderRoutes.includes(pathname)) return true;
    return /^\/chat\/[^/]+$/.test(pathname);
  }, [pathname, hideHeaderRoutes]);

  const handleLOut = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("language");
    localStorage.removeItem("session_id");
    localStorage.removeItem("video_session");
    await logout()
    await refetch();
    window.location.href = "/";
  };

  // 3. Define navigation items (memoized for stable reference)
  const navigationItems = useMemo<{ name: string; href: string }[]>(
    () => [
      { name: "Home", href: "/" },
      { name: "Courses", href: "/courses" },
      { name: "AI Assistance", href: "/chat" },
      // { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      // { name: "Testimonials", href: "/#testimonials" },
      { name: "Refer & Earn", href: "/refer-and-earn" },
      { name: "Withdraw History", href: "/withdrawal-history" },
    ],
    []
  );
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // adjust trigger point
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper: derive name from hash
  const getNameFromHash = useCallback(
    (hash: string): string | null => {
      if (!hash.startsWith("#")) return null;
      const section = hash.slice(1).toLowerCase();
      const match = navigationItems.find(
        (item) => item.href.toLowerCase() === `/#${section}`
      );
      return match ? match.name : null;
    },
    [navigationItems]
  );

  // 4. Update activeItem when pathname (or hash) changes
  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/") {
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
      const match = navigationItems.find(
        (item) =>
          item.href === pathname ||
          (item.href !== "/"  && pathname.startsWith(item.href))
      ); 
      if (match) {
        setActiveItem(match.name);
      } else {
        setActiveItem("");
      }
    }
  }, [pathname, getNameFromHash, navigationItems]);

  // Early return if header should be hidden
  if (hideLayout) {
    return null;
  }

  // 5. Click handler for links: handle session creation for AI Assistance and subscription-based access
  const handleNavigationClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    itemName: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Check if user has a valid subscription for Courses or AI Assistance
    const isSubscribed = user?.subscription && ["basic", "pro", "elite"].includes(user.subscription);

    if (itemName === "Courses" || itemName === "AI Assistance") {
      if (!isSubscribed) {
        // Redirect to pricing page if not subscribed
        if (pathname === "/") {
          const element = document.getElementById("prices");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          setActiveItem("Pricing");
        } else {
          router.push("/#prices");
        }
        return;
      }
    }

    if (itemName === "AI Assistance") {
      try {
        const res = await createSession({}).unwrap();
        localStorage.setItem("session_id", res?.object_id);
        router.push(href); // Navigate to /chat after session creation
      } catch (error) {
        console.error("Failed to create session:", error);
        router.push("/#prices"); // Redirect to pricing on error
      }
    } else if (href.startsWith("/#")) {
      if (pathname === "/") {
        const sectionId = href.slice(2);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setActiveItem(itemName);
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  // 6. JSX
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${scrolled
          ? "bg-gray-500/15 backdrop-blur-xl "
          : "bg-transparent"
        }
  `}
    >
      <div className="relative z-10  mx-auto px-4 sm:px-6 py-4 lg:px-8">
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
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${isActive
                    ? "bg-[#373737] text-white px-6 py-2 text-lg font-normal rounded-full"
                    : "text-[#999999] hover:text-white hover:bg-gray-800/50"
                    }`}
                  onClick={(e) => handleNavigationClick(e, item.href, item.name)}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full animate-pulse" />
                  )}
                </a>
              );
            })}

            <GoogleTranslate />
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="cursor-pointer border rounded-full"
                  title={user?.full_name}
                >
                  <Image
                    src={user?.image}
                    alt="Profile"
                    width={400}
                    height={400}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile/my-profile" className="cursor-pointer">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>{user?.full_name}</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLOut()}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="bg-transparent border-text cursor-pointer text-white hover:bg-text hover:border-gray-500 px-6 py-5 rounded-full text-sm font-medium"
                >
                  Log In
                </Button>
              </Link>
            )}
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
                    className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg ${isActive
                      ? "text-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border-l-4 border-cyan-400 shadow-lg shadow-cyan-400/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/70 hover:border-l-4 hover:border-gray-600"
                      }`}
                    onClick={(e) => handleNavigationClick(e, item.href, item.name)}
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
              <GoogleTranslate />
              <div className="pt-4 pb-2">

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="cursor-pointer border"
                      title={user?.full_name}
                    >
                      <Image
                        src={user?.image}
                        alt="Profile"
                        width={400}
                        height={400}
                        className="w-[40px] h-[40px] rounded-full"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link href="/profile/my-profile" className="cursor-pointer">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>{user?.full_name}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleLOut()}>
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/auth/login" className="cursor-pointer">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-full text-sm font-medium"
                    >
                      Log In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}