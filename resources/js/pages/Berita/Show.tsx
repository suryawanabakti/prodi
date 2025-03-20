'use client';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, Clock, Share2, User } from 'lucide-react';

interface Berita {
    id: number;
    judul: string;
    deskripsi: string;
    konten: string;
    gambar: string | null;
    created_at: string;
    penulis: string;
    baca_waktu: number;
}

interface Props {
    berita: Berita;
}

export default function BeritaShow({ berita }: Props) {
    return (
        <GuestLayout>
            <Head title={berita.judul} />

            <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Button variant="ghost" className="hover:text-primary mb-8 hover:bg-transparent" onClick={() => window.history.back()}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Berita
                    </Button>

                    <h1 className="gradient-text mb-6 text-4xl font-bold tracking-tight md:text-5xl">{berita.judul}</h1>

                    <div className="text-muted-foreground mb-8 flex flex-wrap items-center text-sm">
                        <span className="mr-4 mb-2 flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(berita.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                        <span className="mr-4 mb-2 flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            {berita.penulis}
                        </span>
                        <span className="mb-2 flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {berita.baca_waktu} menit baca
                        </span>
                    </div>
                </motion.div>

                {berita.gambar && (
                    <motion.div
                        className="mb-8 overflow-hidden rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="h-auto w-full object-cover" />
                    </motion.div>
                )}

                <motion.div
                    className="prose prose-lg max-w-none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    dangerouslySetInnerHTML={{ __html: berita.konten }}
                />

                <motion.div
                    className="mt-12 border-t border-gray-200 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="mb-4 text-2xl font-semibold">Bagikan Artikel</h2>
                    <div className="flex space-x-4">
                        <Button variant="outline" className="flex items-center">
                            <Share2 className="mr-2 h-4 w-4" />
                            Facebook
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <Share2 className="mr-2 h-4 w-4" />
                            Twitter
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <Share2 className="mr-2 h-4 w-4" />
                            LinkedIn
                        </Button>
                    </div>
                </motion.div>
            </article>
        </GuestLayout>
    );
}
