"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ForgotOTP() {
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Verifying OTP...");
      router.push("/auth/create-pass");
    } catch (error) {
      console.error("Verification failed:", error);
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
            <div className="flex flex-col items-center  justify-center space-y-4">
              <InputOTP maxLength={6}>
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
            >
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
