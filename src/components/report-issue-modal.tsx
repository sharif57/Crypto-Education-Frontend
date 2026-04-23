"use client";

import { useState, useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ReportIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReportIssueModal({
    isOpen,
    onClose,
}: ReportIssueModalProps) {
    const [formData, setFormData] = useState({
        issue: "",
        email: "",
        photo: null as File | null,
    });
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isSubmitting,] = useState(false);
    const [submitStatus,] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, photo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleRemovePhoto = () => {
        setFormData((prev) => ({ ...prev, photo: null }));
        setPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-gradient-to-b from-[#1B1B1B] to-[#373737] backdrop-blur-xl border border-[#62C1BF] rounded-2xl p-6 shadow-2xl w-full max-w-[600px] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className=" ">
                    <h2 className="text-3xl lg:text-5xl font-medium text-[#EFF9F9] text-center">
                        Report an Issue
                    </h2>
                </div>

                {/* Form Content */}
                <form className=" space-y-4 pt-6">
                    {/* Issue Description */}
                    <div>
                        <label className="block text-[#F3F3F3] text-lg font-semibold mb-3">
                            Explain the issue
                        </label>
                        <div className="relative">
                            <textarea
                                name="issue"
                                value={formData.issue}
                                onChange={handleInputChange}
                                placeholder="Write here..."
                                disabled={isSubmitting}
                                className="w-full rounded-lg p-4 pb-16 bg-[#535353] text-white placeholder-[#E0E0E0] text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#62C1BF] focus:border-[#62C1BF] transition-all resize-none h-44 disabled:opacity-50"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isSubmitting}
                                className="absolute left-3 bottom-5 flex flex-col items-center justify-center gap-0.5 bg-[#7D7D7D] hover:bg-white/20 text-white text-[9px] w-[60px] h-[45px] rounded-lg transition-colors disabled:opacity-50"                            >
                                <ImagePlus className="w-3.5 h-3.5" />
                                Add Photo
                            </button>

                            {photoPreview && (
                                <div className="absolute right-3 bottom-3 w-16 h-16 rounded-md overflow-hidden border border-[#62C1BF]/70">
                                    <Image
                                        src={photoPreview}
                                        alt="Issue preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        disabled={isSubmitting}
                                        className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-1 transition-colors disabled:opacity-50"
                                        aria-label="Remove photo"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-[#F3F3F3] text-lg font-semibold mb-3">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                            className="w-full bg-[#535353]  rounded-[12px] px-4 py-3 text-white placeholder-[#E0E0E0] text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#62C1BF] focus:border-[#62C1BF] transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* Status Message */}
                    {submitStatus.type && (
                        <div
                            className={`p-3 rounded-lg text-sm font-medium text-center ${submitStatus.type === "success"
                                ? "bg-emerald-900/40 text-emerald-300 border border-emerald-600/40"
                                : "bg-red-900/40 text-red-300 border border-red-600/40"
                                }`}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#62C1BF] hover:bg-[#62C1BF]/90 text-[#224443] font-medium py-3 rounded-[16px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isSubmitting ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </div>
    );
}