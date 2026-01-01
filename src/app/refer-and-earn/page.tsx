/* eslint-disable @typescript-eslint/no-unused-vars */


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Check, Clipboard, Copy } from "lucide-react"
import { useAffiliateDetailsQuery, useReferralWithdrawalRequestMutation } from "@/Redux/feature/referralSlice"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserProfileQuery } from "@/Redux/feature/userSlice";
import Bouns from "@/components/bouns";

export default function ReferEarnCard() {
    const { data: profileData, refetch: refetchProfile } = useUserProfileQuery(undefined);
    const profileWallet = profileData?.data?.wallet_address;
    const [copied, setCopied] = useState(false);

    const { data: affiliateData, refetch: refetchAffiliate } = useAffiliateDetailsQuery(undefined);
    const affiliateWallet = affiliateData?.data?.wallet_address;
    const datas = affiliateData?.data || {};

    const currentWallet = profileWallet ?? affiliateWallet ?? null;
    // main.theclue.io
    const link = `https://main.theclue.io/auth/signup?reff_id=${datas?.referral_id || ""}`

    const [amount, setAmount] = useState<number | undefined>(undefined);

    const [referralWithdrawalRequest, { isLoading: isWithdrawing }] = useReferralWithdrawalRequestMutation();
    const [updateWalletAddress, { isLoading: isUpdatingWallet }] = useUpdateProfileMutation();

    // Wallet dialog states
    const [walletInput, setWalletInput] = useState("");
    const [openWalletDialog, setOpenWalletDialog] = useState(false);

    // Withdraw dialog open state (needed to control it manually)
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);

    const successfulSignups = datas?.total_affiliate_count || 0
    const bonusEarned = datas?.total_commission_earned || 0
    const withdrawableBonus = datas?.withdrawable_amount || 0

    const handleCopy = async () => {        
        try {
            await navigator.clipboard.writeText(link)
            setCopied(true)
            toast.success("Referral link copied!")

            // reset icon after 2 seconds
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch (err) {
            toast.error("Failed to copy")
        }
    }

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await referralWithdrawalRequest({ amount }).unwrap();
            toast.success(response?.message || "Withdrawal request submitted successfully");
            setOpenWithdrawDialog(false); // Close dialog on success
            setAmount(undefined);
        } catch (error: any) {
            const errorMessage = error?.data?.message || "Failed to submit withdrawal request";

            if (errorMessage === "Set your wallet address before requesting a withdrawal.") {
                toast.error(errorMessage);
                setOpenWithdrawDialog(false); // Close withdraw dialog
                setWalletInput(currentWallet || ""); // Pre-fill if editing
                setOpenWalletDialog(true);    // Open wallet dialog automatically
            } else {
                toast.error(errorMessage);
            }
        }
    };

    const handleSaveWallet = async () => {
        if (!walletInput.trim()) {
            toast.error("Please enter a valid wallet address");
            return;
        }

        try {
            await updateWalletAddress({ wallet_address: walletInput.trim() }).unwrap();
            toast.success("Wallet address saved successfully");
            refetchProfile();
            refetchAffiliate();
            setOpenWalletDialog(false);
            setWalletInput("");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to save wallet address");
        }
    };

    // Pre-fill when editing existing wallet
    const openWalletEdit = () => {
        setWalletInput(currentWallet || "");
        setOpenWalletDialog(true);
    };

    return (
        <div className="  max-w-6xl mx-auto min-h-screen mt-[100px]">
            <div className="flex items-center justify-center ">
                <div className="w-full max-w-xl h-[530px] p-4">
                    <div className="rounded-3xl bg-gradient-to-b border border-[#62C1BF] from-[#161616] via-[#2c2c2c] to-[#3f3d3d] p-6 sm:p-8 shadow-2xl">
                        <h1 className="text-center text-3xl sm:text-5xl font-medium text-[#EFF9F9] mb-6 sm:mb-8 tracking-tight">
                            Refer & Earn
                        </h1>

                        {/* Referral Code */}
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-lg font-semibold text-[#F3F3F3] mb-3 tracking-wider">Your Referral Code</h2>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <input
                                    type="text"
                                    value={link}
                                    readOnly
                                    className="flex-1 rounded-lg bg-[#535353] px-4 py-3 text-center text-sm sm:text-base font-mono text-gray-200"
                                />
                                <button
                                    onClick={handleCopy}
                                    disabled={copied}
                                    className="rounded-lg bg-[#535353] hover:bg-slate-600 p-3 text-[#62C1BF] transition-all"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Wallet Address Section */}
                        <div className="mb-6 sm:mb-8">
                            <div className="flex items-center justify-between mb-2">
                                <Label className="text-lg font-semibold text-[#F3F3F3] tracking-wider">
                                    Your Wallet Address
                                </Label>
                                {currentWallet && (
                                    <Button variant="outline" size="sm" className="text-white" onClick={openWalletEdit}>
                                        Edit
                                    </Button>
                                )}
                            </div>

                            {currentWallet ? (
                                <div className="rounded-lg bg-[#535353] px-4 py-3 text-sm text-gray-200 break-all">
                                    {currentWallet}
                                </div>
                            ) : (
                                <Button className="w-full text-black" onClick={() => setOpenWalletDialog(true)}>
                                    Add Wallet Address
                                </Button>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="rounded-lg bg-[#535353] p-5 text-center">
                                <div className="text-3xl font-normal text-white">{successfulSignups}</div>
                                <p className="text-sm text-[#FFFFFF] font-medium">Successful Signups</p>
                            </div>
                            <div className="rounded-lg bg-[#535353] p-5 text-center">
                                <div className="text-3xl font-normal text-white">${bonusEarned}</div>
                                <p className="text-sm text-[#FFFFFF] font-medium">Bonus Earned</p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-[#535353] p-6 mb-8 text-center">
                            <div className="text-3xl font-normal text-white">${withdrawableBonus}</div>
                            <p className="text-sm text-[#FFFFFF] font-medium">Withdrawable Bonus</p>
                        </div>

                        {/* Withdraw Dialog */}
                        <Dialog open={openWithdrawDialog} onOpenChange={setOpenWithdrawDialog}>
                            <DialogTrigger asChild>
                                <button className="w-full rounded-full bg-[#62C1BF] py-3 font-medium text-[#224443] text-lg hover:scale-105 transition-all">
                                    Withdraw
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Withdraw</DialogTitle>
                                    <DialogDescription>Minimum withdrawal amount is $100</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleWithdraw}>
                                    <div className="grid gap-4 py-4">
                                        <Label htmlFor="amount" className="text-white">Amount</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="Enter amount"
                                            value={amount || ""}
                                            onChange={(e) => setAmount(Number(e.target.value) || undefined)}
                                            className="text-white"
                                            required
                                        />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={isWithdrawing} className="text-black">
                                            {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <p className="text-center text-[#FFFFFF] text-xs sm:text-sm mt-6 px-2">
                        Share your code and earn rewards on every successful signup
                    </p>
                </div>

                {/* Wallet Address Dialog */}
                <Dialog open={openWalletDialog} onOpenChange={setOpenWalletDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-white">
                                {currentWallet ? "Update" : "Add"} Wallet Address
                            </DialogTitle>
                            <DialogDescription>
                                This address will be used for all withdrawal requests.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Label htmlFor="wallet" className="text-white">Wallet Address</Label>
                            <Input
                                id="wallet"
                                placeholder="e.g. TZ1r.......SV8CRnHq"
                                value={walletInput}
                                className="text-white"
                                onChange={(e) => setWalletInput(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="secondary" onClick={() => setOpenWalletDialog(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveWallet} disabled={isUpdatingWallet} className="text-black">
                                {isUpdatingWallet ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>


            </div>
            <div className="mt-[250px]">
                <Bouns />
            </div>
        </div>
    )
}