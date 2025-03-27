'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronRight, Newspaper, Phone, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Global CSS that would normally go in your globals.css
const globalStyles = `
  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #e11d48, #be123c);
  }
  
  .glass-effect {
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.7);
  }
  
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px -5px rgba(225, 29, 72, 0.1), 0 8px 10px -6px rgba(225, 29, 72, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    .glass-effect {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

// Add this after the imports
const styles = {
    gradientText: 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800',
    glassEffect: 'backdrop-blur-md bg-white/70 dark:bg-black/30',
    hoverLift: 'transition-transform duration-300 hover:-translate-y-2',
    heroText: 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
    glassCard: 'backdrop-blur-md bg-white/70 border border-white/20 shadow-xl',
};

interface Prodi {
    data: {
        id: number;
        nama_prodi: string;
        nama_ketua: string;
        foto_ketua: string | null;
        foto_prodi: string | null;
        visi: string;
        misi: string;
    };
}

interface Dosen {
    id: number;
    nama: string;
    bidang_keilmuwan: string;
    nidn: string;
    nohp: string;
    foto: string | null;
}

interface Berita {
    id: number;
    judul: string;
    deskripsi: string;
    gambar: string | null;
    created_at: string;
}

interface MataKuliah {
    id: number;
    kode: string;
    nama_matakuliah: string;
}

interface Props {
    prodi: any;
    dosen: Dosen[];
    berita: Berita[];
    mataKuliah: MataKuliah[];
}

export default function Landing({ prodi, dosen, berita, mataKuliah }: Props) {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (heroRef.current) {
                heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Add the global styles
        const styleElement = document.createElement('style');
        styleElement.innerHTML = globalStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <GuestLayout>
            <Head title={prodi?.data?.nama_prodi} />

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative h-screen bg-cover bg-fixed bg-center"
                style={{
                    backgroundImage: prodi?.data?.foto_prodi ? `url(${prodi?.data?.foto_prodi})` : "url('/placeholder.svg?height=1080&width=1920')",
                }}
            >
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-blue-900/70 to-blue-800/60" />
                <div className="absolute inset-0 z-20 container mx-auto flex flex-col justify-center px-4 text-white sm:px-6 lg:px-8">
                    <motion.h1
                        className="max-w-4xl text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] sm:text-5xl md:text-6xl"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {prodi?.data?.nama_prodi}
                    </motion.h1>
                    <motion.p
                        className="mt-6 inline-block max-w-xl rounded-lg bg-black/20 p-4 text-lg text-white/90 drop-shadow-md backdrop-blur-sm"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Membentuk generasi unggul dengan pendidikan berkualitas dan inovasi berkelanjutan.
                    </motion.p>
                    <motion.div
                        className="mt-8 flex flex-wrap gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Button size="lg" className={`${styles.hoverLift} bg-blue-600 text-white shadow-lg hover:bg-blue-700`} asChild>
                            <Link href="#about">
                                Pelajari Lebih Lanjut
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-10 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
                <motion.div
                    className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 transform"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
                >
                    <ChevronDown className="h-8 w-8 text-white drop-shadow-lg" />
                </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-gradient-to-b from-white to-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-6 text-3xl font-bold tracking-tight text-blue-700">Tentang Program Studi</h2>
                            <div className="space-y-4">
                                <Tabs defaultValue="visi" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="visi">Visi</TabsTrigger>
                                        <TabsTrigger value="misi">Misi</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="visi" className="mt-4 text-lg">
                                        {prodi?.data?.visi}
                                    </TabsContent>
                                    <TabsContent value="misi" className="mt-4 text-lg">
                                        <div dangerouslySetInnerHTML={{ __html: prodi?.data?.misi.replace(/\n/g, '<br/>') }} />
                                    </TabsContent>
                                </Tabs>
                            </div>
                            <div className="mt-6">
                                <Button variant="outline" asChild className={styles.hoverLift}>
                                    <Link href="/visi-misi">
                                        Lihat Detail Visi & Misi
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute -inset-4 -z-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 opacity-20 blur-xl" />
                            <div className={`${styles.glassEffect} flex flex-col gap-6 rounded-xl p-8 shadow-lg`}>
                                <div className="flex items-center gap-4">
                                    {prodi?.data?.foto_ketua ? (
                                        <img
                                            src={prodi?.data?.foto_ketua || '/placeholder.svg'}
                                            alt={prodi?.data?.nama_ketua}
                                            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                                            <Users className="h-12 w-12 text-blue-600" />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold">{prodi?.data?.nama_ketua}</h3>
                                        <p className="text-muted-foreground">Ketua Program Studi</p>
                                    </div>
                                </div>
                                <p className="text-lg italic">
                                    "Kami berkomitmen untuk memberikan pendidikan berkualitas tinggi dan mempersiapkan mahasiswa untuk menghadapi
                                    tantangan dunia nyata."
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-blue-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            { value: dosen.length, label: 'Dosen' },
                            { value: mataKuliah.length, label: 'Mata Kuliah' },
                            { value: '95%', label: 'Tingkat Kelulusan' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                                <div className="text-muted-foreground mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Lecturers */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className={`${styles.gradientText} mb-8 text-center text-3xl font-bold tracking-tight`}>Dosen Unggulan</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {dosen.slice(0, 3).map((dosen, index) => (
                            <motion.div
                                key={dosen.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className={`${styles.hoverLift} h-full overflow-hidden`}>
                                    <div className="aspect-[4/3] w-full bg-blue-50">
                                        {dosen.foto ? (
                                            <img src={`/storage/${dosen.foto}`} alt={dosen.nama} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Users className="h-16 w-16 text-blue-300" />
                                            </div>
                                        )}
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
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild className={styles.hoverLift}>
                            <Link href="/dosen">Lihat Semua Dosen</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="bg-blue-50/50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className={`${styles.gradientText} mb-8 text-center text-3xl font-bold tracking-tight`}>Berita Terbaru</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {berita.slice(0, 3).map((berita, index) => (
                            <motion.div
                                key={berita.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className={`${styles.hoverLift} h-full overflow-hidden`}>
                                    <div className="aspect-video w-full bg-blue-50">
                                        {berita.gambar ? (
                                            <img src={`/storage/${berita.gambar}`} alt={berita.judul} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <Newspaper className="h-16 w-16 text-blue-300" />
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="flex h-full flex-col p-6">
                                        <div className="text-muted-foreground mb-2 text-sm">
                                            {new Date(berita.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        <h3 className="mb-2 line-clamp-2 text-xl font-semibold">{berita.judul}</h3>
                                        <p className="mt-2 line-clamp-3 flex-grow">{berita.deskripsi}</p>
                                        <Button variant="link" className="mt-4 px-0 text-blue-600" asChild>
                                            <Link href={`/berita/${berita.id}`}>Baca Selengkapnya</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild className={styles.hoverLift}>
                            <Link href="/berita">Lihat Semua Berita</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className={`${styles.gradientText} mb-8 text-center text-3xl font-bold tracking-tight`}>Mata Kuliah Unggulan</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mataKuliah.slice(0, 6).map((mk, index) => (
                            <motion.div
                                key={mk.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className={`${styles.hoverLift} flex h-full items-start gap-4 p-6`}>
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                        <BookOpen className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground text-sm font-medium">{mk.kode}</div>
                                        <h3 className="mt-1 text-lg font-semibold">{mk.nama_matakuliah}</h3>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button variant="outline" asChild className={styles.hoverLift}>
                            <Link href="/mata-kuliah">Lihat Semua Mata Kuliah</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden py-20 text-white">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-800 to-blue-600"></div>
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: `url('/placeholder.svg?height=500&width=1920')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mixBlendMode: 'overlay',
                    }}
                ></div>
                <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
                    <motion.h2
                        className="mb-4 text-3xl font-bold tracking-tight drop-shadow-md"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Bergabunglah dengan Program Studi Kami
                    </motion.h2>
                    <motion.p
                        className="mx-auto mb-8 max-w-2xl text-lg text-white/90"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Mulai perjalanan akademik Anda bersama kami dan raih masa depan yang cerah dengan pendidikan berkualitas.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Button size="lg" className={`${styles.hoverLift} bg-white px-8 text-blue-600 shadow-lg hover:bg-white/90`} asChild>
                            <Link href="/kontak">Daftar Sekarang</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </GuestLayout>
    );
}
