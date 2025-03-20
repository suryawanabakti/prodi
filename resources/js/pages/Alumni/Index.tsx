'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface alumni {
    id: number;
    nim: string;
    nama: string;
    judul: string;
    tahun: string;
}

interface Props {
    alumni: alumni[];
}

export default function alumniIndex({ alumni }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredalumni = alumni.filter(
        (mk) => mk.nim.toLowerCase().includes(searchTerm.toLowerCase()) || mk.nama.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <GuestLayout>
            <Head title="Alumni" />

            <section className="from-primary/10 bg-gradient-to-b to-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        className="gradient-text mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Alumni
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Jelajahi berbagai Alumni yang kami tawarkan untuk mengembangkan pengetahuan dan keterampilan Anda dalam bidang yang Anda
                        minati.
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
                            placeholder="Cari Alumni..."
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
                                            <TableHead className="bg-primary/5 text-primary w-[100px] font-semibold">Nim</TableHead>
                                            <TableHead className="bg-primary/5 text-primary font-semibold">Nama Alumni</TableHead>
                                            <TableHead className="bg-primary/5 text-primary font-semibold">Judul</TableHead>
                                            <TableHead className="bg-primary/5 text-primary font-semibold">Angkatan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredalumni.length > 0 ? (
                                            filteredalumni.map((mk, index) => (
                                                <TableRow key={mk.id} className="hover:bg-muted/50 transition-colors">
                                                    <TableCell className="font-medium">{mk.nim}</TableCell>
                                                    <TableCell>{mk.nama}</TableCell>
                                                    <TableCell>{mk.judul}</TableCell>
                                                    <TableCell>{mk.tahun}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="py-8 text-center">
                                                    <BookOpen className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                                                    <p className="text-muted-foreground">Tidak ada Alumni yang ditemukan.</p>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </motion.div>
                    {filteredalumni.length > 0 && (
                        <motion.div
                            className="mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button variant="outline" size="lg" className="rounded-full">
                                Muat Lebih Banyak
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </section>
        </GuestLayout>
    );
}
