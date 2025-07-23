
"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmailMutation } from "@/Redux/feature/authSlice";
import { Suspense, useState } from "react";
import { toast } from "sonner";



 function VerifyOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyEmail] = useVerifyEmailMutation();
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email and OTP
    if (!email) {
      toast.error("Email is missing. Please try signing up again.");
      setLoading(false);
      return;
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const res = await verifyEmail({
        email,
        otp,
      }).unwrap();

      console.log("Verification response:", res);

      toast.success(res.message || "Verification successful!");
      localStorage.setItem("access_token", res.access_token);
      router.push("/");
    } catch (error: unknown) {
      let errorMessage = "Verification failed. Please try again.";
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "error" in (error as { data: { error?: unknown } }).data
      ) {
        errorMessage =
          ((error as { data: { error?: string } }).data.error) || errorMessage;
      }
      toast.error(errorMessage);
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url(/images/login.png)" }}
    >
      <Card className="w-full max-w-md mx-auto bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border-gray-600 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl lg:text-5xl text-center font-medium text-white">
            Verify Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-sm text-gray-400">
                Enter the 6-digit OTP sent to {email || "your email"}
              </p>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-12 lg:w-12 lg:h-12 mr-2 text-lg lg:text-xl bg-[#535353] text-white border-gray-600 rounded-lg"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-12 lg:w-12 lg:h-12 mr-2 text-lg lg:text-xl bg-[#535353] text-white border-gray-600 rounded-lg"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-12 lg:w-12 lg:h-12 mr-2 text-lg lg:text-xl bg-[#535353] text-white border-gray-600 rounded-lg"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-12 lg:w-12 mr-2 lg:h-12 text-lg lg:text-xl bg-[#535353] text-white border-gray-600 rounded-lg"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-12 lg:w-12 mr-2 lg:h-12 text-lg lg:text-xl bg-[#535353] text-white border-gray-600 rounded-lg"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-12 lg:w-12 lg:h-12 text-lg lg:text-xl bg-[#535353] text-white border-gray-600 rounded-lg"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              type="submit"
              className="w-full bg-text hover:bg-text text-black font-medium py-3 rounded-full transition-colors"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTP />
    </Suspense>
  );
}