
/* eslint-disable @typescript-eslint/no-explicit-any */

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

/* ------------------ helpers ------------------ */

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

/* ------------------ component ------------------ */

export default function WithdrawalTable() {
  const { data, isLoading, error } = useWithdrawalHistoryQuery(undefined)

  /* ✅ NORMALIZE API RESPONSE (CRITICAL FIX) */
  const withdrawals: WithdrawalRequest[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : []

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

  /* ✅ SAFE SORTING */
  const sortedData = useMemo(() => {
    return [...withdrawals].sort((a, b) => {
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
  }, [withdrawals, sortKey, sortOrder])

  /* ------------------ UI guards ------------------ */

  if (isLoading)
    return <p className="text-center mt-20 text-white">Loading...</p>

  if (error)
    return <p className="text-center mt-20 text-red-500">Failed to load withdrawals</p>

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <div className="w-full space-y-6 max-w-7xl mx-auto pt-[150px] pb-10 h-screen">
        <h1 className="text-2xl font-semibold text-[#62C1BF]">
          Withdrawal History
        </h1>

        {/* TABLE */}
        <div className="rounded border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
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

              <TableBody>
                {sortedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      No withdrawal history found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-white">Total Requests</p>
              <p className="text-2xl font-medium text-white">
                {sortedData.length}
              </p>
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
    </div>
  )
}
