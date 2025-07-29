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


export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [login] = useLoginMutation();
    const { refetch } = useUserProfileQuery(undefined)
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
            localStorage.setItem("language", res?.data?.language);
            await refetch();

            router.push("/");
            window.location.href = "/";

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
            console.log(response);
            toast.success("Google login successful!");

            await refetch();
            window.location.href = ("/");

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

                    {/* <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                        type="button"
                        shape="pill"
                        variant="outline"
                        className="w-full bg-transparent border-text rounded-full text-text hover:bg-[#535353] hover:text-white transition-colors"
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign in with Google
                    </GoogleLogin> */}

                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap

                        shape="pill"
                        theme="outline"
                        size="large"
                        text="continue_with"
                        width="400"
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