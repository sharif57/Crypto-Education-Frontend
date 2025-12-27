"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleLoginMutation, useLoginMutation } from "@/Redux/feature/authSlice";
import { toast } from "sonner";
import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import { saveTokens } from "@/service/authService";


export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [login] = useLoginMutation();
    const { data, refetch } = useUserProfileQuery(undefined)
    console.log(data?.data, 'data------------------');
    const [googleLogin] = useGoogleLoginMutation()


    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate inputs
        if (!email || !password) {
            toast.error("Email and password are required.");
            setLoading(false);
            return;
        }

        try {
            const res = await login({
                email,
                password,
            }).unwrap();

            toast.success(res.message || "Login successful!");
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem('subscription', res?.data?.subscription);
            localStorage.setItem("language", res?.data?.language);
            // await saveTokens(res.access_token);
            await saveTokens(
                res.access_token,
            );

            window.location.href = "/courses";

            await refetch();

            if (res?.data?.subscription === "basic" || res?.data?.subscription === "pro" || res?.data?.subscription === "elite") {
                return window.location.href = ("/courses");
            }
            else {
                return router.push("/#pricing");
            }

            // router.push("/courses");

            // window.location.href = "/courses";

        } catch (error) {
            const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
            console.error("Sign in failed:", error);
        } finally {
            setLoading(false);
            refetch();
        }
    };

    const handleGoogleSuccess = async (credentialResponse: {
        credential?: string;
    }) => {
        try {
            if (!credentialResponse.credential) {
                throw new Error("No credential received from Google");
            }

            // Decode the JWT to get user info
            const GoogleJwtPayload = credentialResponse.credential;
            console.log("Google user info:", GoogleJwtPayload);

            // Send to backend
            const response = await googleLogin({
                id_token: credentialResponse.credential,
            }).unwrap();

            localStorage.setItem("access_token", response?.access);
            localStorage.setItem("language", response?.user?.language);
            await saveTokens(
                response.access_token,
            );

            console.log(response?.user?.subscription);
            toast.success("Google login successful!");

            if (response?.user?.subscription === "basic" || response?.user?.subscription === "pro" || response?.user?.subscription === "elite") {
                return window.location.href = ("/courses");
            }
            else {
                return router.push("/#pricing");
            }

            // await refetch();
            // window.location.href = ("/courses");

        } catch (error: unknown) {
            console.error("Google login error:", error);
            toast.error(
                error &&
                    typeof error === "object" &&
                    "data" in error &&
                    typeof error.data === "object" &&
                    error.data &&
                    "message" in error.data
                    ? (error.data as { message: string }).message
                    : error instanceof Error
                        ? error.message
                        : "Google login failed. Please try again."
            );
        } finally {
        }
    };

    const handleGoogleError = () => {
        console.log("Google login failed");
        toast.error("Google login failed. Please try again.");
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
            style={{ backgroundImage: "url(/images/login.png)" }}
        >
            <Card className="w-full max-w-md bg-gradient-to-b from-[#161616] via-[#2c2c2c] to-[#3f3d3d] border-text backdrop-blur-sm">
                <CardHeader className="space-y-1 pb-6">
                    <div className="flex items-center justify-center">
                        <CardTitle className="text-2xl lg:text-5xl text-center font-medium text-white">
                            Sign In
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="signin-email"
                                className="text-sm font-medium text-gray-300"
                            >
                                Email
                            </Label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="signin-email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[#535353] border-gray-600 text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="signin-password"
                                className="text-sm font-medium text-gray-300"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="signin-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
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
                        <div className="text-right">
                            <Link
                                href="/auth/forgot-pass"
                                className="text-sm text-teal-400 hover:text-teal-300 font-normal transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-text hover:bg-text rounded-full text-black font-medium py-2.5 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full bg-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-gray-900 px-2 text-gray-400">OR</span>
                        </div>
                    </div>



                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap

                        shape="pill"
                        theme="outline"
                        size="large"
                        text="continue_with"
                    // width="400"
                    />

                    <div className="text-center">
                        <span className="text-sm text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                            >
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}