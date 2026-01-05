/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import type React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useUserProfileQuery } from "@/Redux/feature/userSlice";
// import { useAffiliateEarningsQuery } from "@/Redux/feature/referralSlice";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// export default function MyProfile() {

//   const { data } = useUserProfileQuery(undefined)
//   const user = data?.data

//   const { data: referralData } = useAffiliateEarningsQuery(undefined)
//   console.log(referralData)
//   const invoices = [
//     {
//       invoice: "INV001",
//       paymentStatus: "Paid",
//       totalAmount: "$250.00",
//       paymentMethod: "Credit Card",
//     },
//     {
//       invoice: "INV002",
//       paymentStatus: "Pending",
//       totalAmount: "$150.00",
//       paymentMethod: "PayPal",
//     },
//     {
//       invoice: "INV003",
//       paymentStatus: "Unpaid",
//       totalAmount: "$350.00",
//       paymentMethod: "Bank Transfer",
//     },
//     {
//       invoice: "INV004",
//       paymentStatus: "Paid",
//       totalAmount: "$450.00",
//       paymentMethod: "Credit Card",
//     },
//     {
//       invoice: "INV005",
//       paymentStatus: "Paid",
//       totalAmount: "$550.00",
//       paymentMethod: "PayPal",
//     },
//     {
//       invoice: "INV006",
//       paymentStatus: "Pending",
//       totalAmount: "$200.00",
//       paymentMethod: "Bank Transfer",
//     },
//     {
//       invoice: "INV007",
//       paymentStatus: "Unpaid",
//       totalAmount: "$300.00",
//       paymentMethod: "Credit Card",
//     },
//   ]

//   return (
//     <div className="min-h-screen w-full  text-white flex items-center justify-center">
//       <main
//         className="w-full"
//         style={{
//           backgroundImage: "url('/sideGradin.png')",
//           backgroundPosition: "top right",
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "auto 100%",
//         }}
//       >
//         <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 ">
// <div className="flex flex-col items-center justify-center  gap-8">
//   <div className="w-full max-w-[840px] bg-gradient-to-b border border-[#62C1BF]  from-[#161616] via-[#2c2c2c] to-[#3f3d3d] rounded-3xl shadow-xl p-6 sm:p-8">
//     <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
//       <div className="w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0">
//         {
//           user?.image ? (
//             <Image
//               src={user?.image}
//               alt="Profile"
//               width={250}
//               height={300}
//               className="w-full h-full object-cover rounded-lg"
//             />
//           ) : (
//             <p>No Image</p>
//           )
//         }
//       </div>
//       <div className="flex flex-col gap-6 sm:gap-8 justify-center items-start">
//         <div className="flex flex-col gap-1">
//           <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
//             Name:
//           </h1>
//           <p className="text-lg sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
//             {user?.full_name}
//           </p>
//         </div>
//         <div className="flex flex-col gap-1">
//           <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
//             Email:
//           </h1>
//           <p className="text-lg  sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
//             {user?.email}
//           </p>
//         </div>
//         <div className="flex flex-col gap-1">
//           <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
//             Language:
//           </h1>
//           <p className="text-lg  sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
//             {user?.language}
//           </p>
//         </div>
//         <div>
//           <Link href="/profile/edit-profile">
//             <Button
//               className="px-6 !py-5 sm:px-8 sm:py-4 cursor-pointer 
//            bg-text hover:bg-text font-normal text-[#224443] rounded-2xl text-sm sm:text-[16px]"
//             >
//               Edit Profile
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//           <div>
//             <Table>
//               <TableCaption>A list of your recent invoices.</TableCaption>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[100px]">Invoice</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Method</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {invoices.map((invoice) => (
//                   <TableRow key={invoice.invoice}>
//                     <TableCell className="font-medium">{invoice.invoice}</TableCell>
//                     <TableCell>{invoice.paymentStatus}</TableCell>
//                     <TableCell>{invoice.paymentMethod}</TableCell>
//                     <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//               <TableFooter>
//                 <TableRow>
//                   <TableCell colSpan={3}>Total</TableCell>
//                   <TableCell className="text-right">$2,500.00</TableCell>
//                 </TableRow>
//               </TableFooter>
//             </Table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useUserProfileQuery } from "@/Redux/feature/userSlice";
import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MyProfile() {
  const { data: userData, isLoading: userLoading } = useUserProfileQuery(undefined);
  const user = userData?.data;

  if (userLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
      <div className="min-h-screen w-full  text-white flex justify-center items-start py-12">
        <main
          className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage: "url('/sideGradin.png')",
            backgroundPosition: "top right",
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
          }}
        >

          <div className="flex flex-col items-center justify-center mb-12 mt-16">
            <div className="w-full max-w-[840px] bg-gradient-to-b border border-[#62C1BF]  from-[#161616] via-[#2c2c2c] to-[#3f3d3d] rounded-3xl shadow-xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="w-[200px] h-[240px] sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[370px] flex-shrink-0 relative">
                  {user?.image ? (
                    <>
                      <Image
                        src={user?.image}
                        alt="Profile"
                        width={300}
                        height={370}
                        className="w-full h-full object-cover rounded-2xl"
                      />

                      {/* Badge */}
                      <Badge
                        variant="secondary"
                        className="absolute top-3 right-3 flex items-center gap-1 
                   bg-blue-500 text-white dark:bg-blue-600 px-3 py-1"
                      >
                        <BadgeCheckIcon className="w-4 h-4" />
                        {user?.subscription}
                      </Badge>
                    </>
                  ) : (
                    <p>No Image</p>
                  )}
                </div>

                <div className="flex flex-col gap-6 sm:gap-8 justify-center items-start">
                  <div className="flex flex-col gap-1">

                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Name:
                    </h1>
                    <p className="text-lg sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
                      {user?.full_name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Email:
                    </h1>
                    <p className="text-lg  sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
                      {user?.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg sm:text-xl md:text-[23px] font-medium">
                      Language:
                    </h1>
                    <p className="text-lg  sm:text-xl md:text-[23px] font-medium text-[#E6F9FD]">
                      {user?.language}
                    </p>
                  </div>
                  <div>
                    <Link href="/profile/edit-profile">
                      <Button
                        className="px-6 !py-5 sm:px-8 sm:py-4 cursor-pointer 
                     bg-text hover:bg-text font-normal text-[#224443] rounded-2xl text-sm sm:text-[16px]"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
