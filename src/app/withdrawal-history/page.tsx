/* eslint-disable @typescript-eslint/no-explicit-any */
// // 'use client';
// // import { useWithdrawalHistoryQuery } from '@/Redux/feature/referralSlice'
// // import React from 'react'

// // export default function WithdrawHistory() {
// //     const { data } = useWithdrawalHistoryQuery(undefined);
// //     console.log(data)
// //     return (
// //         <div>

// //         </div>
// //     )
// // }
// "use client";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { useWithdrawalHistoryQuery } from "@/Redux/feature/referralSlice";

// const invoices = [
//     {
//         invoice: "INV001",
//         paymentStatus: "Paid",
//         totalAmount: "$250.00",
//         paymentMethod: "Credit Card",
//     },
//     {
//         invoice: "INV002",
//         paymentStatus: "Pending",
//         totalAmount: "$150.00",
//         paymentMethod: "PayPal",
//     },
//     {
//         invoice: "INV003",
//         paymentStatus: "Unpaid",
//         totalAmount: "$350.00",
//         paymentMethod: "Bank Transfer",
//     },
//     {
//         invoice: "INV004",
//         paymentStatus: "Paid",
//         totalAmount: "$450.00",
//         paymentMethod: "Credit Card",
//     },
//     {
//         invoice: "INV005",
//         paymentStatus: "Paid",
//         totalAmount: "$550.00",
//         paymentMethod: "PayPal",
//     },
//     {
//         invoice: "INV006",
//         paymentStatus: "Pending",
//         totalAmount: "$200.00",
//         paymentMethod: "Bank Transfer",
//     },
//     {
//         invoice: "INV007",
//         paymentStatus: "Unpaid",
//         totalAmount: "$300.00",
//         paymentMethod: "Credit Card",
//     },
// ]

// export default function TableDemo() {
//     const { data } = useWithdrawalHistoryQuery(undefined);
//     return (
//         <Table>
//             <TableCaption>A list of your recent invoices.</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[100px]">Invoice</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Method</TableHead>
//                     <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {invoices.map((invoice) => (
//                     <TableRow key={invoice.invoice}>
//                         <TableCell className="font-medium">{invoice.invoice}</TableCell>
//                         <TableCell>{invoice.paymentStatus}</TableCell>
//                         <TableCell>{invoice.paymentMethod}</TableCell>
//                         <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//             <TableFooter>
//                 <TableRow>
//                     <TableCell colSpan={3}>Total</TableCell>
//                     <TableCell className="text-right">$2,500.00</TableCell>
//                 </TableRow>
//             </TableFooter>
//         </Table>
//     )
// }
"use client"

import { useState, useMemo } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { useWithdrawalHistoryQuery } from "@/Redux/feature/referralSlice"

interface WithdrawalRequest {
    id: number
    amount: string
    payout_method: string
    wallet_address: string
    status: "pending" | "completed" | "failed"
    requested_at: string
    created_at: string
    updated_at: string
}

type SortKey = keyof WithdrawalRequest
type SortOrder = "asc" | "desc"

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

const truncateAddress = (address: string, length = 12) =>
    address.length <= length ? address : `${address.slice(0, length)}...`

const getStatusBadge = (status: WithdrawalRequest["status"]) => {
    const map = {
        pending: "bg-yellow-500/20 text-yellow-400",
        completed: "bg-green-500/20 text-green-400",
        failed: "bg-red-500/20 text-red-400",
    }

    return <Badge className={map[status]}>{status}</Badge>
}

export default function WithdrawalTable() {
    const { data = [] } = useWithdrawalHistoryQuery(undefined)

    const [sortKey, setSortKey] = useState<SortKey>("requested_at")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        } else {
            setSortKey(key)
            setSortOrder("asc")
        }
    }

    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            let aValue: any = a[sortKey]
            let bValue: any = b[sortKey]

            if (sortKey === "amount") {
                aValue = Number(aValue)
                bValue = Number(bValue)
            }

            if (sortKey.includes("at")) {
                aValue = new Date(aValue).getTime()
                bValue = new Date(bValue).getTime()
            }

            if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
            if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
            return 0
        })
    }, [data, sortKey, sortOrder])

    return (
        <div className="w-full space-y-6 max-w-7xl mx-auto mt-[150px] h-screen pb-10">
                <h1 className="text-2xl font-semibold text-[#62C1BF] mb-4" >Withdrawal History</h1>
            <div className="rounded border border-border bg-card overflow-hidden">
                <div className=" overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {[
                                    ["id", "ID"],
                                    ["amount", "Amount"],
                                    ["payout_method", "Method"],
                                    ["status", "Status"],
                                    ["requested_at", "Requested"],
                                ].map(([key, label]) => (
                                    <TableHead
                                        key={key}
                                        onClick={() => handleSort(key as SortKey)}
                                        className="cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1">
                                            {label}
                                            {sortKey === key && (
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""
                                                        }`}
                                                />
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                                <TableHead>Wallet</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="">
                            {sortedData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell >{item.id}</TableCell>
                                    <TableCell className="font-semibold">
                                        ${Number(item.amount).toFixed(2)}
                                    </TableCell>
                                    <TableCell>{item.payout_method}</TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {formatDate(item.requested_at)}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {truncateAddress(item.wallet_address)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <p className="text-xs text-white">Total Requests</p>
                        <p className="text-2xl font-medium text-white">{sortedData.length}</p>
                    </div>
                    <div>
                        <p className="text-xs text-white">Total Amount</p>
                        <p className="text-2xl font-medium text-white">
                            $
                            {sortedData
                                .reduce((sum, i) => sum + Number(i.amount), 0)
                                .toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-white">Pending</p>
                        <p className="text-2xl font-medium text-white">
                            {sortedData.filter((i) => i.status === "pending").length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
