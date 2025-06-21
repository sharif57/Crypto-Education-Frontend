"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";

export default function ForgotPass() {
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle sign-in logic
      console.log("Signing in...");
      router.push("/auth/forgot-otp");
      // Example: await signIn(email, password);
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: "url(/images/login.png)" }}
    >
      <Card className="w-full max-w-md bg-gradient-to-b   from-[#161616] via-[#2c2c2c] to-[#3f3d3d]  border-text backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center justify-center ">
            <CardTitle className="text-2xl lg:text-4xl text-center font-medium text-white">
              Forgot Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="signup-email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            <Button className="w-full bg-text hover:bg-text rounded-full text-black font-medium py-2.5 transition-colors">
              Send OTP
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
