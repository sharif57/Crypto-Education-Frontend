
'use client'

import Heading from '@/hook/heading'
import { ShieldPlus, User, Users } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Badge } from './ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from './ui/dialog'
import { X } from 'lucide-react'

export default function Everyone() {
    const [open, setOpen] = useState(false)

    return (
        <div className="py-12">
            <Heading
                title="TheClue® is for everyone"
                subtitle="No matter your background or experience, TheClue empowers you to grow, connect, and succeed—your journey starts here."
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                    {/* Image (2 columns) with modal trigger */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div className="lg:col-span-2 h-[380px] lg:h-[400px] rounded-2xl overflow-hidden cursor-pointer">
                                <Image
                                    src="/image.png"
                                    width={1200}
                                    height={700}
                                    alt="image"
                                    priority
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </DialogTrigger>

                        <DialogContent className="max-w-5xl w-full p-0 bg-black/90">
                            <DialogHeader className="p-4">
                                <DialogTitle className="text-white text-lg">TheClue Video</DialogTitle>
                                <DialogClose className="absolute top-4 right-4">
                                    <X className="w-6 h-6 text-white" />
                                </DialogClose>
                            </DialogHeader>
                            <div className="w-full aspect-video">
                                <iframe
                                    src="https://www.youtube.com/embed/sWRUzxINCoA"
                                    title="TheClue Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Glass Card (1 column) */}
                    <div className="h-[380px] lg:h-[400px] bg-[#1B1B1B]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                            <ShieldPlus className="text-white w-6 h-6" />

                            <h1 className="text-xl font-normal text-white">
                                The Clue is fully secured
                            </h1>

                            <p className="text-[16px] font-normal text-[#B4B4B4] leading-relaxed">
                                Your data is safe with us—TheClue uses top-tier encryption and
                                security standards to protect your privacy at all times.
                            </p>

                            <Badge
                                variant="outline"
                                className="mt-6 rounded-full px-6 py-2 w-fit text-sm flex items-center gap-2 text-white border-white"
                            >
                                <ShieldPlus className="w-4 h-4 text-white " />
                                Secure
                            </Badge>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-8">

                    {/* LEFT CARD */}
                    <div className="relative min-h-[620px] bg-[#1B1B1B]/60 p-4 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">

                        {/* TOP CONTENT */}
                        <div className="absolute top-4 left-4 right-4 z-10 text-white space-y-3">
                            <User className="w-6 h-6" />
                            <h1 className="text-xl font-normal">24/7 support</h1>
                            <p className="text-[16px] text-[#B4B4B4] leading-relaxed">
                                Round-the-clock support whenever you need it—because your journey doesn’t keep office hours.
                            </p>
                        </div>

                        {/* IMAGE (bottom cropped, taller) */}
                        <div className="absolute bottom-4 left-4 right-4 h-[62%] overflow-hidden rounded-2xl border border-foreground">
                            <Image
                                src="/Layer_1.png"
                                alt="video"
                                width={600}
                                height={800}
                                priority
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>

                    {/* RIGHT CARD */}
                    <div
                        className="
      relative lg:col-span-2 min-h-[620px]
      rounded-2xl overflow-hidden cursor-pointer
      bg-[url('/images/transform.png')]
      bg-cover bg-center
    "
                    >
                        {/* Overlay for readability */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* TEXT CONTENT */}
                        <div className="absolute top-4 left-4 right-4 z-10 text-white space-y-3">
                            <Users className="w-6 h-6" />
                            <h1 className="text-xl font-normal">Meet other people</h1>
                            <p className="text-[16px] text-[#B4B4B4] leading-relaxed max-w-xl">
                                Connect with like-minded people, share your journey, and grow together
                                in a vibrant, supportive community.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
