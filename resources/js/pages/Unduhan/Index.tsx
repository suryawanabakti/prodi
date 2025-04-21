'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, Download, File, FileArchive, FileCode, FileImage, FileText, Search } from 'lucide-react';
import { useState } from 'react';

// Declare the route function (replace with your actual route function or import)
declare function route(name: string, params?: any): string;

export default function LandingPage({ unduhan }: any) {
    const [searchTerm, setSearchTerm] = useState('');

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
            case 'doc':
            case 'docx':
                return <FileText className="text-primary h-5 w-5" />;
            case 'zip':
            case 'rar':
                return <FileArchive className="text-primary h-5 w-5" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <FileImage className="text-primary h-5 w-5" />;
            case 'html':
            case 'css':
            case 'js':
                return <FileCode className="text-primary h-5 w-5" />;
            default:
                return <File className="text-primary h-5 w-5" />;
        }
    };

    const filteredUnduhan = unduhan.filter((item) => item.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <GuestLayout>
            <Head title="Download Center" />

            <section className="from-primary/10 bg-gradient-to-b to-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        className="gradient-text mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Download Center
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Access and download all our resources in one place
                    </motion.p>
                    <motion.div
                        className="relative mx-auto mb-12 max-w-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
                        <Input
                            type="search"
                            placeholder="Search files..."
                            className="border-primary/20 focus:border-primary rounded-full border-2 py-2 pr-4 pl-10 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Card className="overflow-hidden shadow-lg">
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="bg-primary/5 text-primary w-[60px] font-semibold"></TableHead>
                                            <TableHead className="bg-primary/5 text-primary font-semibold">File Name</TableHead>
                                            <TableHead className="bg-primary/5 text-primary text-right font-semibold">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredUnduhan.length > 0 ? (
                                            filteredUnduhan.map((item) => (
                                                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                                                    <TableCell className="w-[60px]">{getFileIcon(item.file)}</TableCell>
                                                    <TableCell className="font-medium">{item.nama}</TableCell>
                                                    <TableCell className="text-right">
                                                        <a
                                                            href={route('admin.unduhan.download', item.id)}
                                                            className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                                                        >
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="py-8 text-center">
                                                    <BookOpen className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                                                    <p className="text-muted-foreground">No files found matching your search.</p>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                    {filteredUnduhan.length > 0 && (
                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button variant="outline" size="lg" className="rounded-full">
                                Load More
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="mb-12 text-center text-3xl font-bold text-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Why Use Our Download Center?
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="border-primary/10 rounded-xl border bg-white p-8 text-center shadow-md">
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Fast Downloads</h3>
                            <p className="text-muted-foreground">All files are optimized for quick and efficient downloads.</p>
                        </div>

                        <div className="border-primary/10 rounded-xl border bg-white p-8 text-center shadow-md">
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary h-8 w-8"
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
                            <p className="text-muted-foreground">All our resources are scanned and verified for your safety.</p>
                        </div>

                        <div className="border-primary/10 rounded-xl border bg-white p-8 text-center shadow-md">
                            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary h-8 w-8"
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
                            <p className="text-muted-foreground">We constantly update our resources with the latest versions.</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </GuestLayout>
    );
}
