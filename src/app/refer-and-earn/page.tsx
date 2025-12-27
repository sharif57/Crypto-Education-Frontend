/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { useAffiliateDetailsQuery, useReferralWithdrawalRequestMutation } from "@/Redux/feature/referralSlice"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ReferEarnCard() {

    const { data } = useAffiliateDetailsQuery(undefined);
    const datas = data?.data || {}
    const link = `https://main.theclue.io/signup?reff_id=${datas?.referral_id || ""}`

    const [amount, setAmount] = useState<number>();

    const [referralWithdrawalRequest, { isLoading }] = useReferralWithdrawalRequestMutation();

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await referralWithdrawalRequest({ amount }).unwrap();
            toast.success(response?.message || "Withdrawal request submitted successfully");

        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to submit withdrawal request");
        }
    };

    const [copied, setCopied] = useState(false)
    const referralCode = link
    const successfulSignups = datas?.total_affiliate_count || 0
    const bonusEarned = datas?.total_commission_earned || 0
    const withdrawableBonus = datas?.withdrawable_amount || 0

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xl h-[530px] p-4">
                <div className="rounded-3xl bg-gradient-to-b border border-[#62C1BF]  from-[#161616] via-[#2c2c2c] to-[#3f3d3d] p-6 sm:p-8 shadow-2xl">
                    {/* Header */}
                    <h1 className="text-center text-3xl sm:text-5xl font-medium text-[#EFF9F9] mb-6 sm:mb-8 tracking-tight">
                        Refer & Earn
                    </h1>

                    {/* Referral Code Section */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-lg font-semibold text-[#F3F3F3] mb-3  tracking-wider">Your Referral Code</h2>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={referralCode}
                                readOnly
                                className="flex-1 rounded-lg bg-[#535353] px-4 py-3 sm:py-3.5 text-center text-sm sm:text-base font-mono text-gray-200 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                            <button
                                onClick={handleCopy}
                                className="flex items-center justify-center rounded-lg bg-[#535353] hover:bg-slate-600 p-2.5 sm:p-3 text-[#62C1BF] transition-all duration-200 hover:scale-105 active:scale-95"
                                aria-label="Copy referral code"
                            >
                                {copied ? <Check size={20} className="sm:w-6 sm:h-6" /> : <Copy size={20} className="sm:w-6 sm:h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        {/* Successful Signups */}
                        <div className="rounded-lg bg-[#535353] p-4 sm:p-5 text-center hover:bg-[#535353]/90 cursor-pointer transition-colors">
                            <div className="text-2xl sm:text-3xl font-normal text-white mb-1">{successfulSignups}</div>
                            <p className="text-xs sm:text-sm text-[#FFFFFF] font-medium">Successful Signups</p>
                        </div>

                        {/* Bonus Earned */}
                        <div className="rounded-lg bg-[#535353] p-4 sm:p-5 text-center hover:bg-[#535353]/90 cursor-pointer transition-colors">
                            <div className="text-2xl sm:text-3xl font-normal text-white mb-1">${bonusEarned}</div>
                            <p className="text-xs sm:text-sm text-[#FFFFFF] font-medium">Bonus Earned</p>
                        </div>
                    </div>

                    {/* Withdrawable Bonus */}
                    <div className="rounded-lg bg-[#535353] p-4 sm:p-6 mb-6 sm:mb-8 text-center hover:bg-[#535353]/90 cursor-pointer transition-colors">
                        <div className="text-3xl sm:text-3xl font-normal text-white mb-1">${withdrawableBonus}</div>
                        <p className="text-xs sm:text-sm text-[#FFFFFF] font-medium">Withdrawable Bonus</p>
                    </div>

                    {/* Withdraw Button */}

                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="w-full rounded-full bg-[#62C1BF] px-6 py-3 sm:py-3 font-medium text-[#224443] text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/50 hover:scale-105 active:scale-95">
                                Withdraw
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-white">Withdraw</DialogTitle>
                                <DialogDescription>
                                    Minimum withdrawal amount is $100
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Enter Amount
                                    </Label>
                                    <Input
                                        id="number"
                                        type="number"
                                        min={1}

                                        placeholder="Enter your amount"
                                        className="text-white"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button onClick={handleWithdraw} className="text-black" type="submit">{isLoading ? "Withdrawing..." : "Withdraw"}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Responsive Info Text */}
                <p className="text-center text-[#FFFFFF] text-xs sm:text-sm mt-6 px-2">
                    Share your code and earn rewards on every successful signup
                </p>
            </div>
        </div>
    )
}
