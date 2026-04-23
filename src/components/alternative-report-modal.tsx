"use client";

import { useState, useRef } from "react";
import { X, AlertCircle, Send } from "lucide-react";
import Image from "next/image";

interface AlternativeReportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Alternative Report Issue Modal Design
 * - Side-by-side layout with illustration
 * - Compact form with inline fields
 * - Different color scheme with red accent
 */
export default function AlternativeReportModal({
    isOpen,
    onClose,
}: AlternativeReportModalProps) {
    const [formData, setFormData] = useState({
        subject: "",
        issue: "",
        email: "",
        priority: "medium" as "low" | "medium" | "high",
        photo: null as File | null,
    });
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append("subject", formData.subject);
            submitFormData.append("issue", formData.issue);
            submitFormData.append("email", formData.email);
            submitFormData.append("priority", formData.priority);
            if (formData.photo) {
                submitFormData.append("photo", formData.photo);
            }

            const response = await fetch("/api/report-issue", {
                method: "POST",
                body: submitFormData,
            });

            if (response.ok) {
                setFormData({
                    subject: "",
                    issue: "",
                    email: "",
                    priority: "medium",
                    photo: null,
                });
                setPhotoPreview(null);
                onClose();
            }
        } catch (error) {
            console.error("Error submitting report:", error);
        } finally {
            setIsSubmitting(false);
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
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-[#1B1B1B] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Illustration */}
                    <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-red-900 to-red-800 p-8 flex-col items-center justify-center text-center">
                        <AlertCircle className="w-24 h-24 text-red-300 mb-4" />
                        <h3 className="text-white text-xl font-bold mb-2">Help Us Improve</h3>
                        <p className="text-red-100 text-sm">
                            Your feedback helps us create a better experience for everyone.
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-3/5 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Report Issue</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Subject */}
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Brief subject"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm"
                                    required
                                />
                            </div>

                            {/* Priority & Email Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        Priority
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                        className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition-colors text-sm"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-white text-sm font-semibold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="issue"
                                    value={formData.issue}
                                    onChange={handleInputChange}
                                    placeholder="Describe the issue in detail..."
                                    disabled={isSubmitting}
                                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none h-28 text-sm"
                                    required
                                />
                            </div>

                            {/* Photo Upload */}
                            <div>
                                <label className="block text-white text-sm font-semibold mb-2">
                                    Attachment (Optional)
                                </label>
                                {photoPreview ? (
                                    <div className="relative inline-block w-full">
                                        <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-red-500">
                                            <Image
                                                src={photoPreview}
                                                alt="Issue attachment"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, photo: null }));
                                                setPhotoPreview(null);
                                            }}
                                            className="mt-2 text-xs text-red-400 hover:text-red-300"
                                        >
                                            Remove attachment
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isSubmitting}
                                        className="w-full border-2 border-dashed border-gray-600 hover:border-red-500 rounded-lg py-6 transition-colors text-center text-gray-400 hover:text-red-400 text-sm"
                                    >
                                        Click to upload or drag and drop
                                    </button>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={18} />
                                {isSubmitting ? "Sending..." : "Send Report"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
