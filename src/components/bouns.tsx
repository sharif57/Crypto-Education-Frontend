/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAffiliateEarningsQuery } from '@/Redux/feature/referralSlice';
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';

export default function Bouns() {
    const { data: referralData, isLoading: referralLoading } = useAffiliateEarningsQuery(undefined);
    const referrals = referralData?.data || [];

    const invoices = referrals?.invoices || [];

    if (referralLoading) {
        return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>;
    }
    return (
        <div className='p-4'>
            <h1 className="text-2xl font-semibold text-[#62C1BF] " >Referral Bonus history</h1>
            {/* Invoices Table */}
            {invoices?.length > 0 && (
                <div className=" overflow-x-auto">
                    <Table className="min-w-full border border-gray-700 rounded-xl">
                        <TableHeader className="text-white">
                            <TableRow className="bg-[#1c1c1c] text-white">
                                <TableHead className="w-[100px] text-white">Invoice</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Method</TableHead>
                                <TableHead className="text-right text-white">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice: any) => (
                                <TableRow key={invoice.invoice_id || invoice.invoice} className="even:bg-[#1a1a1a]">
                                    <TableCell className="font-medium">{invoice.invoice || invoice.invoice_id}</TableCell>
                                    <TableCell>{invoice.payment_status}</TableCell>
                                    <TableCell>{invoice.payment_method}</TableCell>
                                    <TableCell className="text-right">{invoice.total_amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {invoices?.length > 0 && (
                <div className="mt-12 overflow-x-auto">
                    <Table className="min-w-full border border-gray-700 rounded-xl">
                        <TableCaption className="text-gray-400 text-sm">Your recent invoices</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-[#1c1c1c] text-white">
                                <TableHead className="w-[100px] text-white">Invoice</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Method</TableHead>
                                <TableHead className="text-right text-white">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice: any) => (
                                <TableRow key={invoice.invoice_id || invoice.invoice} className="even:bg-[#1a1a1a]">
                                    <TableCell className="font-medium text-white">{invoice.invoice || invoice.invoice_id}</TableCell>
                                    <TableCell className="text-white">{invoice.payment_status}</TableCell>
                                    <TableCell className="text-white">{invoice.payment_method}</TableCell>
                                    <TableCell className="text-right text-white">{invoice.total_amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {referrals?.length > 0 && (
                <div className="mt-8  overflow-x-auto">
                    <Table className="min-w-full border border-gray-700 rounded-xl">
                        <TableCaption className="text-gray-400 text-sm">Your referral earnings</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-[#1c1c1c] text-white">
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Email</TableHead>
                                <TableHead className="text-white">Commission</TableHead>
                                <TableHead className="text-white">release Date</TableHead>
                                <TableHead className="text-white">status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {referrals.map((ref: any) => (
                                <TableRow key={ref.id} className="even:bg-[#1a1a1a]">
                                    <TableCell className="font-medium text-white">{ref.referred_name}</TableCell>
                                    <TableCell className="text-white">{ref.referred_email}</TableCell>
                                    <TableCell className="text-white">${ref.commission_earned}</TableCell>
                                    <TableCell className="text-white">{new Date(ref.release_date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-white cursor-pointer" >
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Badge variant="secondary" className='capitalize bg-orange-500 text-white'>{ref.status}</Badge>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-white">
                                                <p className="text-black">this amount will be released on {new Date(ref.release_date).toLocaleDateString()}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-[#1c1c1c]">
                                <TableCell colSpan={2} className="font-semibold text-white">Total Commission</TableCell>
                                <TableCell colSpan={2} className="text-right font-semibold text-white">
                                    ${referrals.reduce((sum: number, r: any) => sum + parseFloat(r.commission_earned), 0).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            )}
        </div>
    )
}
