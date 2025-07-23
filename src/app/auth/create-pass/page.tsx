// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Eye, EyeOff } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useResetPasswordMutation } from "@/Redux/feature/authSlice";

// export default function CreatePass() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetPassword]= useResetPasswordMutation();

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await resetPassword({
//         new_password: password,
//         confirm_password: confirmPassword
//       })
//       console.log(res,'res')
//       // Handle sign-up logic
//       console.log("Signing up...");
//       router.push("/auth/login");
//       // Example: await signUp(email, password);
//     } catch (error) {
//       console.error("Sign up failed:", error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
//       style={{ backgroundImage: "url(/images/login.png)" }}
//     >
//       <Card className="w-full max-w-md bg-gradient-to-b   from-[#161616] via-[#2c2c2c] to-[#3f3d3d]  border-text backdrop-blur-sm">
//         <CardHeader className="space-y-1 pb-6">
//           <div className="flex items-center justify-center ">
//             <CardTitle className="text-2xl lg:text-5xl text-center font-medium text-white">
//           Reset Password
//             </CardTitle>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <form onSubmit={handleSignUp} className="space-y-4">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="signup-password"
//                 className="text-sm font-medium text-gray-300"
//               >
//                 New Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   id="signup-password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a password"
//                   className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 pr-10"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label
//                 htmlFor="confirm-password"
//                 className="text-sm font-medium text-gray-300"
//               >
//                 Confirm Password
//               </Label>
//               <div className="relative">
//                 <Input
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   id="confirm-password"
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Confirm your password"
//                   className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 pr-10"
//                 />
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   size="sm"
//                   className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             <Button className="w-full bg-text hover:bg-text rounded-full text-black font-medium py-2.5 transition-colors">
//               Confirm
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/Redux/feature/authSlice";
import { toast } from "sonner";


export default function CreatePass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

   

   

    try {
      const res = await resetPassword({
        email,
        new_password: password,
        confirm_password: confirmPassword,
      }).unwrap();

      toast.success(res.message || "Password reset successfully!");
      localStorage.removeItem('verify')
      router.push("/auth/login");
    } catch (error: unknown) {
      type ErrorWithDetail = { data?: { detail?: string } };
      const errorObj = error as ErrorWithDetail;
      const errorMessage =
        typeof error === "object" && error !== null && "data" in error && typeof errorObj.data?.detail === "string"
          ? errorObj.data!.detail
          : "Failed to reset password. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to reset password:", error);
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
              Reset Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Enter a new password for {email || "your account"}.
              </p>
              <Label
                htmlFor="reset-password"
                className="text-sm font-medium text-gray-300"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a new password"
                  className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-300"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-text hover:bg-text rounded-full text-black font-medium py-2.5 transition-colors"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Confirm"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}