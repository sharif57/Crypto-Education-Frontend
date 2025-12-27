
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/service/authService";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";

const SUBSCRIBED_PLANS = ["basic", "pro", "elite"];

export function useProtectedRoute() {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useUserProfileQuery(undefined);
  const user = data?.data;

  // ✅ 1️⃣ Auto save subscription to localStorage
  useEffect(() => {
    if (user?.subscription) {
      localStorage.setItem("subscription", user.subscription);
    }
  }, [user?.subscription]);

  useEffect(() => {
    // ✅ Wait until user data is loaded
    if (isLoading) return;

    const token = localStorage.getItem("access_token");
    const subscription = localStorage.getItem("subscription");

    const isSubscribed =
      !!subscription &&
      SUBSCRIBED_PLANS.includes(subscription.toLowerCase());

    const protectedRoutes = ["/courses", "/chat"];
    const isProtected = protectedRoutes.some(route =>
      pathname.startsWith(route)
    );

    // ❌ Not logged in → logout
    if (isProtected && !token) {
      logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("subscription");
      localStorage.removeItem("language");
      
      router.replace("/auth/login");
      return;
    }

    // ❌ Logged in but not subscribed → only redirect, don't logout
    if (isProtected && token && !isSubscribed) {
      router.replace("/#pricing");
      return;
    }
  }, [pathname, router, isLoading, user?.subscription]);
}
