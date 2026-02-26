'use client';
import { useAdditionalResourcesQuery } from '@/Redux/feature/categoryVideoSlice'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ExternalLink, FileText, Link2 } from 'lucide-react';
import React from 'react'

interface AdditionalResource {
    object_id: string;
    file: string | null;
    link: string | null;
    created_at: string;
}

interface AdditionalResourcesResponse {
    status?: string;
    data?: AdditionalResource[];
}

const getFileName = (fileUrl: string | null) => {
    if (!fileUrl) return 'No file attached';

    try {
        const parsedUrl = new URL(fileUrl);
        const pathname = parsedUrl.pathname;
        const lastSlashIndex = pathname.lastIndexOf('/');
        const slicedName = pathname.slice(lastSlashIndex + 1);
        return decodeURIComponent(slicedName || 'resource-file');
    } catch {
        const lastSlashIndex = fileUrl.lastIndexOf('/');
        return fileUrl.slice(lastSlashIndex + 1) || 'resource-file';
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'Invalid date';

    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function ImportantTopics() {
    const { data, isLoading, isError } = useAdditionalResourcesQuery(undefined);
    const responseData = data as AdditionalResourcesResponse | undefined;
    const resources = Array.isArray(responseData?.data) ? responseData.data : [];

    return (
        <div className="min-h-screen pt-[100px] lg:pt-[100px] p-4 sm:p-6 lg:p-8 w-full  bg-gradient-to-b from-[#326866] to-[#1B1B1B]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">Important Topics Resources</h1>
                    <p className="text-[#C2E6E4] mt-2 text-sm sm:text-base">
                        Browse downloadable files and external links from your additional learning resources.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="bg-white/10 border-white/20 animate-pulse">
                                <CardHeader className="space-y-2">
                                    <div className="h-4 rounded bg-white/20 w-2/3" />
                                    <div className="h-3 rounded bg-white/20 w-1/2" />
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="h-3 rounded bg-white/20 w-full" />
                                    <div className="h-9 rounded bg-white/20 w-full" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : isError ? (
                    <Card className="bg-red-500/10 border-red-400/30">
                        <CardContent className="py-8 text-center text-red-100">
                            Failed to load additional resources. Please refresh and try again.
                        </CardContent>
                    </Card>
                ) : resources.length === 0 ? (
                    <Card className="bg-white/10 border-white/20">
                        <CardContent className="py-10 text-center text-white/90">
                            No resources available yet.
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                        {resources.map((resource) => (
                            <Card key={resource.object_id} className="bg-white/10 backdrop-blur-xl text-white border-white/20 ">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-base sm:text-lg flex items-start gap-2 min-w-0">
                                                <FileText className="w-4 h-4 text-[#62C1BF] mt-0.5 flex-shrink-0" />
                                                <span className="block min-w-0 break-all whitespace-normal leading-snug" title={getFileName(resource.file)}>
                                                    {getFileName(resource.file)}
                                                </span>
                                            </CardTitle>
                                            <CardDescription className="text-[#BEE3E2] mt-2 text-xs sm:text-sm">
                                                Added: {formatDate(resource.created_at)}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3">
                                    <div className="rounded-md border border-[#62C1BF]/30 bg-[#0E2221] p-3 text-xs sm:text-sm text-[#D9F0EF] break-all">
                                        {resource.link || 'No external link available'}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {resource.file ? (
                                            <Button asChild className="w-full bg-[#62C1BF] text-[#123433] hover:bg-[#51B3B1]">
                                                <a href={resource.file} target="_blank" rel="noopener noreferrer" download>
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </a>
                                            </Button>
                                        ) : (
                                            <Button disabled className="w-full bg-[#62C1BF]/40 text-[#123433]/80 cursor-not-allowed">
                                                <Download className="w-4 h-4" />
                                                No File
                                            </Button>
                                        )}

                                        {resource.link ? (
                                            <Button asChild variant="outline" className="w-full border-[#62C1BF]/50 text-[#D9F0EF] bg-transparent hover:bg-[#62C1BF]/20 hover:text-white">
                                                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open Link
                                                </a>
                                            </Button>
                                        ) : (
                                            <Button disabled variant="outline" className="w-full border-[#62C1BF]/30 text-[#D9F0EF]/50 bg-transparent cursor-not-allowed">
                                                <Link2 className="w-4 h-4" />
                                                No Link
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}
