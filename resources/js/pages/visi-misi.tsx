'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GuestLayout from '@/layouts/guest-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, Target } from 'lucide-react';

interface Props {
    prodi: {
        id: number;
        nama_prodi: string;
        visi: string;
        misi: string;
    };
}

export default function VisiMisi({ prodi }: Props) {
    // Split misi into array for better presentation
    const misiPoints = prodi.misi.split('\n').filter((point) => point.trim() !== '');

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: `url('/placeholder.svg?height=500&width=1920')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mixBlendMode: 'overlay',
                    }}
                ></div>
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center">
                        <motion.h1
                            className="mb-4 text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Visi & Misi
                        </motion.h1>
                        <motion.p
                            className="max-w-2xl text-lg text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Arah dan tujuan Program Studi {prodi.nama_prodi} Universitas Teknologi AKBA Makassar
                        </motion.p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center text-sm text-gray-500">
                    <Link href="/" className="transition-colors hover:text-blue-600">
                        Beranda
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-blue-600">Visi & Misi</span>
                </div>
            </div>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <Tabs defaultValue="visi" className="w-full">
                        <TabsList className="mb-8 grid w-full grid-cols-2">
                            <TabsTrigger value="visi" className="text-base">
                                Visi
                            </TabsTrigger>
                            <TabsTrigger value="misi" className="text-base">
                                Misi
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="visi" className="mt-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <Card className="overflow-hidden border-blue-100 shadow-lg">
                                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-6">
                                            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:flex">
                                                <Target className="h-8 w-8 text-blue-600" />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-2xl font-bold text-gray-900">Visi Program Studi</h2>
                                                <div className="prose prose-red max-w-none">
                                                    <p className="text-lg leading-relaxed">{prodi.visi}</p>
                                                </div>
                                                <div className="pt-4">
                                                    <h3 className="mb-2 text-lg font-semibold">Makna Visi:</h3>
                                                    <ul className="space-y-3">
                                                        <li className="flex items-start gap-2">
                                                            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                                            <span>Menjadi pusat unggulan dalam pendidikan teknologi informasi</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                                            <span>Menghasilkan lulusan yang kompetitif di tingkat nasional dan global</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                                            <span>Berkontribusi pada pengembangan ilmu pengetahuan dan teknologi</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                                                            <span>
                                                                Menerapkan nilai-nilai etika dan profesionalisme dalam bidang teknologi informasi
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="misi" className="mt-4">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <Card className="overflow-hidden border-blue-100 shadow-lg">
                                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-6">
                                            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:flex">
                                                <BookOpen className="h-8 w-8 text-blue-600" />
                                            </div>
                                            <div className="space-y-4">
                                                <h2 className="text-2xl font-bold text-gray-900">Misi Program Studi</h2>
                                                <div className="prose prose-red max-w-none">
                                                    <p className="mb-4 text-lg leading-relaxed">
                                                        Untuk mewujudkan visi tersebut, Program Studi {prodi.nama_prodi} memiliki misi sebagai
                                                        berikut:
                                                    </p>

                                                    <ol className="space-y-4">
                                                        {misiPoints.map((point, index) => (
                                                            <motion.li
                                                                key={index}
                                                                className="flex items-start gap-3 rounded-lg bg-blue-50 p-4"
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                                            >
                                                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                                                    {index + 1}
                                                                </div>
                                                                <span className="text-gray-800">{point}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild className="transition-transform duration-300 hover:-translate-y-1">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Beranda
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
