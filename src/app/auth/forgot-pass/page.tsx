
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/Redux/feature/authSlice";
import { useState } from "react";
import { toast } from "sonner";


export default function ForgotPass() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate email
    if (!email) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "OTP sent successfully!");
      router.push(`/auth/forgot-otp?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error && typeof error === "object" && "data" in error && error.data && typeof error.data === "object" && "error" in error.data) {
        errorMessage = (error.data as { error?: string }).error || errorMessage;
      }
      toast.error(errorMessage);
      console.error("Failed to send OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url(/images/login.png)" }}
    >
      <Card className="w-full max-w-md bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border-text backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center">
            <CardTitle className="text-2xl lg:text-4xl text-center font-medium text-white">
              Forgot Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="forgot-email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </Label>
              <p className="text-sm text-gray-400">
                Enter your email to receive a password reset OTP.
              </p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="forgot-email"
                type="email"
                required
                placeholder="Enter your email"
                className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-text hover:bg-text rounded-full text-black font-medium py-2.5 transition-colors"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}