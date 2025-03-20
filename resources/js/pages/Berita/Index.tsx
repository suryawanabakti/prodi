'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Newspaper, Search } from 'lucide-react';
import { useState } from 'react';

interface Berita {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string | null;
    created_at: string;
}

interface Props {
    berita: Berita[];
}

export default function BeritaIndex({ berita }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    console.log(berita);
    const filteredBerita = berita.filter(
        (b) => b.judul.toLowerCase().includes(searchTerm.toLowerCase()) || b.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <GuestLayout>
            <Head title="Berita" />

            <section className="from-primary/10 bg-gradient-to-b to-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        className="gradient-text mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Berita Terbaru
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Temukan informasi terkini seputar kegiatan, prestasi, dan perkembangan terbaru di program studi kami.
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
                            placeholder="Cari berita..."
                            className="border-primary/20 focus:border-primary rounded-full border-2 py-2 pr-4 pl-10 transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBerita.length > 0 ? (
                            filteredBerita.map((berita, index) => (
                                <motion.div
                                    key={berita.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                                        <div className="from-primary/5 to-secondary/5 group relative aspect-video w-full overflow-hidden bg-gradient-to-br">
                                            {berita.gambar ? (
                                                <img
                                                    src={`/storage/${berita.gambar}`}
                                                    alt={berita.judul}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Newspaper className="text-primary/20 h-16 w-16" />
                                                </div>
                                            )}
                                            <div className="text-primary absolute top-4 left-4 flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                                                <Calendar className="mr-1 h-3 w-3" />
                                                {new Date(berita.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                        <CardContent className="flex flex-grow flex-col p-6">
                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold">{berita.judul}</h3>
                                            <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">{berita.deskripsi}</p>
                                            <Button variant="link" className="justify-start px-0" asChild>
                                                <a href={`/berita/${berita.id}`}>Baca Selengkapnya</a>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <Newspaper className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                                <p className="text-muted-foreground">Tidak ada berita yang ditemukan.</p>
                            </div>
                        )}
                    </div>
                    {filteredBerita.length > 0 && (
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
