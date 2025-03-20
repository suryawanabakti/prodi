'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, Phone, Search, Users } from 'lucide-react';
import { useState } from 'react';

interface Dosen {
    id: number;
    nidn: string;
    nama: string;
    bidang_keilmuwan: string;
    nohp: string;
    foto: string | null;
}

interface Props {
    dosen: Dosen[];
}

export default function DosenIndex({ dosen }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDosen = dosen.filter(
        (d) => d.nama.toLowerCase().includes(searchTerm.toLowerCase()) || d.bidang_keilmuwan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <GuestLayout>
            <Head title="Daftar Dosen" />

            <section className="from-primary/10 bg-gradient-to-b to-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        className="gradient-text mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Daftar Dosen
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Temui para dosen berkualitas yang akan membimbing perjalanan akademik Anda dengan dedikasi dan keahlian di bidangnya
                        masing-masing.
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
                            placeholder="Cari dosen..."
                            className="border-primary/20 focus:border-primary rounded-full border-2 py-2 pr-4 pl-10 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredDosen.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredDosen.map((dosen, index) => (
                                <motion.div
                                    key={dosen.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Card className="hover:shadow-primary/10 h-full overflow-hidden border-none bg-white transition-all duration-300 hover:shadow-xl">
                                        <div className="relative">
                                            <div className="from-primary/5 to-secondary/10 aspect-[4/3] w-full overflow-hidden bg-gradient-to-br">
                                                {dosen.foto ? (
                                                    <img
                                                        src={`/storage/${dosen.foto}`}
                                                        alt={dosen.nama}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Avatar className="h-32 w-32">
                                                            <AvatarFallback className="bg-primary/5 text-primary">
                                                                {dosen.nama
                                                                    .split(' ')
                                                                    .map((name) => name[0])
                                                                    .join('')
                                                                    .substring(0, 2)
                                                                    .toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <CardContent className="p-6">
                                            <h3 className="group-hover:text-primary mb-2 text-xl font-semibold tracking-tight transition-colors">
                                                {dosen.nama}
                                            </h3>

                                            <div className="mb-4 space-y-2">
                                                <div className="text-muted-foreground flex items-center text-sm">
                                                    <BookOpen className="text-primary/70 mr-2 h-4 w-4" />
                                                    <span className="font-medium">NIDN:</span>
                                                    <span className="ml-2">{dosen.nidn}</span>
                                                </div>

                                                <div className="text-muted-foreground flex items-center text-sm">
                                                    <Phone className="text-primary/70 mr-2 h-4 w-4" />
                                                    <span className="font-medium">No HP:</span>
                                                    <span className="ml-2">{dosen.nohp}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary/80">
                                                    {dosen.bidang_keilmuwan}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
                            <Users className="text-primary/30 mx-auto mb-4 h-16 w-16" />
                            <h3 className="mb-2 text-xl font-medium">Tidak ada dosen yang ditemukan</h3>
                            <p className="text-muted-foreground">Coba gunakan kata kunci pencarian yang berbeda.</p>
                        </div>
                    )}

                    {filteredDosen.length > 0 && (
                        <motion.div
                            className="mt-16 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary rounded-full"
                            >
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
