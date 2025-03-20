'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GuestLayout from '@/layouts/guest-layout';

import { Head } from '@inertiajs/react';
import { Download, File, FileArchive, FileCode, FileImage, FileText } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage({ unduhan }: any) {
    const [searchTerm, setSearchTerm] = useState('');

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
            case 'doc':
            case 'docx':
                return <FileText className="h-5 w-5 text-blue-600" />;
            case 'zip':
            case 'rar':
                return <FileArchive className="h-5 w-5 text-blue-600" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <FileImage className="h-5 w-5 text-blue-600" />;
            case 'html':
            case 'css':
            case 'js':
                return <FileCode className="h-5 w-5 text-blue-600" />;
            default:
                return <File className="h-5 w-5 text-blue-600" />;
        }
    };

    const filteredUnduhan = unduhan.filter((item) => item.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <GuestLayout>
            <Head title="Download Center" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2NmgtNnYtNnoiLz48cGF0aCBkPSJNMzAgMjRWMGg2djI0aC02em0xMiAwVjBoNnYyNGgtNnptLTE4IDZoNnYtNmgtNnY2em0xMiAwaDZ2LTZoLTZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="relative z-10 container mx-auto px-4 py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-6 text-4xl font-bold md:text-5xl">Download Center</h1>
                        <p className="mb-8 text-xl text-blue-100 md:text-2xl">Access and download all our resources in one place</p>

                        {/* Search Bar */}
                        <div className="relative mx-auto max-w-xl">
                            <input
                                type="text"
                                placeholder="Search files..."
                                className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-blue-100 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute top-4 right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute right-0 bottom-0 left-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="h-auto w-full">
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Files Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Available Resources</h2>

                    {filteredUnduhan.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-lg text-gray-500">No files found matching your search.</p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-lg border shadow-sm">
                            <Table>
                                <TableHeader className="bg-blue-50">
                                    <TableRow>
                                        <TableHead className="w-[60px]"></TableHead>
                                        <TableHead className="font-bold text-blue-900">File Name</TableHead>

                                        <TableHead className="text-right font-bold text-blue-900">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUnduhan.map((item) => (
                                        <TableRow key={item.id} className="hover:bg-blue-50/50">
                                            <TableCell className="w-[60px]">{getFileIcon(item.file)}</TableCell>
                                            <TableCell className="font-medium">{item.nama}</TableCell>
                                            <TableCell className="text-right">
                                                <a
                                                    href={route('admin.unduhan.download', item.id)}
                                                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Why Use Our Download Center?</h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-xl bg-white p-8 text-center shadow-md">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Fast Downloads</h3>
                            <p className="text-gray-600">All files are optimized for quick and efficient downloads.</p>
                        </div>

                        <div className="rounded-xl bg-white p-8 text-center shadow-md">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Secure Files</h3>
                            <p className="text-gray-600">All our resources are scanned and verified for your safety.</p>
                        </div>

                        <div className="rounded-xl bg-white p-8 text-center shadow-md">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Regular Updates</h3>
                            <p className="text-gray-600">We constantly update our resources with the latest versions.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-blue-900 py-12 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold">Download Center</h2>
                            <p className="mt-2 text-blue-200">Access all your resources in one place</p>
                        </div>

                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 transition-colors hover:bg-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-facebook"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 transition-colors hover:bg-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-twitter"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 transition-colors hover:bg-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-instagram"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <hr className="my-8 border-blue-800" />

                    <div className="text-center text-blue-200">
                        <p>&copy; {new Date().getFullYear()} Download Center. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </GuestLayout>
    );
}
