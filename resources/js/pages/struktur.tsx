'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Users } from 'lucide-react';

interface StaffMember {
    id: number;
    name: string;
    position: string;
    photo: string | null;
}

interface Props {
    prodi: {
        id: number;
        nama_prodi: string;
        nama_ketua: string;
        foto_ketua: string | null;
    };
    staff: StaffMember[];
}

export default function Struktur({ prodi, staff = [] }: Props) {
    // Sample staff data if none provided
    const sampleStaff: StaffMember[] = [
        { id: 1, name: 'Dr. Budi Santoso, M.Kom', position: 'Sekretaris Program Studi', photo: null },
        { id: 2, name: 'Dr. Siti Rahayu, M.Sc', position: 'Koordinator Bidang Akademik', photo: null },
        { id: 3, name: 'Dr. Ahmad Hidayat, M.TI', position: 'Koordinator Bidang Kemahasiswaan', photo: null },
        { id: 4, name: 'Dr. Rina Wijaya, M.Cs', position: 'Koordinator Bidang Penelitian', photo: null },
        { id: 5, name: 'Dr. Hendra Kusuma, M.Kom', position: 'Koordinator Bidang Pengabdian Masyarakat', photo: null },
        { id: 6, name: 'Indra Permana, M.Kom', position: 'Koordinator Laboratorium', photo: null },
    ];

    const displayStaff = staff.length > 0 ? staff : sampleStaff;

    return (
        <GuestLayout>
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-red-900 to-red-700"></div>
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
                            Struktur Organisasi
                        </motion.h1>
                        <motion.p
                            className="max-w-2xl text-lg text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Program Studi {prodi.nama_prodi} Universitas Teknologi AKBA Makassar
                        </motion.p>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center text-sm text-gray-500">
                    <Link href="/" className="transition-colors hover:text-red-600">
                        Beranda
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-red-600">Struktur Organisasi</span>
                </div>
            </div>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
                        <Card className="overflow-hidden border-red-100 shadow-lg">
                            <div className="h-2 bg-gradient-to-r from-red-600 to-red-800"></div>
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-100">
                                        <Building2 className="h-8 w-8 text-red-600" />
                                    </div>
                                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Struktur Organisasi Program Studi</h2>
                                    <p className="mb-8 max-w-3xl text-gray-600">
                                        Struktur organisasi Program Studi {prodi.nama_prodi} dirancang untuk memastikan penyelenggaraan pendidikan
                                        yang berkualitas, penelitian yang inovatif, dan pengabdian kepada masyarakat yang bermanfaat.
                                    </p>

                                    {/* Org Chart */}
                                    <div className="mx-auto w-full max-w-4xl">
                                        <div className="flex flex-col">
                                            <div className="mx-auto mb-8">
                                                <div className="relative">
                                                    <div className="w-64 rounded-lg bg-red-600 p-4 text-center text-white shadow-lg">
                                                        <h3 className="font-bold">Ketua Program Studi</h3>
                                                        <p className="text-sm text-white/90">{prodi.nama_ketua}</p>
                                                    </div>
                                                    <div className="absolute bottom-0 left-1/2 h-8 w-0.5 -translate-x-1/2 translate-y-full bg-red-600"></div>
                                                </div>
                                            </div>

                                            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
                                                <div className="absolute top-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2 bg-red-600 md:w-full"></div>

                                                <div className="relative">
                                                    <div className="absolute top-0 left-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-full bg-red-600"></div>
                                                    <div className="rounded-lg bg-red-100 p-4 text-center text-red-800 shadow-md">
                                                        <h3 className="font-bold">Sekretaris Program Studi</h3>
                                                        <p className="text-sm">{displayStaff[0].name}</p>
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <div className="absolute top-0 left-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-full bg-red-600"></div>
                                                    <div className="rounded-lg bg-red-100 p-4 text-center text-red-800 shadow-md">
                                                        <h3 className="font-bold">Koordinator Bidang Akademik</h3>
                                                        <p className="text-sm">{displayStaff[1].name}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                                                {displayStaff.slice(2, 5).map((staff, index) => (
                                                    <motion.div
                                                        key={staff.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.1 * index }}
                                                        className="rounded-lg border border-red-100 bg-white p-4 text-center shadow-sm"
                                                    >
                                                        <h3 className="text-sm font-bold">{staff.position}</h3>
                                                        <p className="text-sm text-gray-600">{staff.name}</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Staff List */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Staf Program Studi</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {displayStaff.map((staff, index) => (
                                <motion.div
                                    key={staff.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.05 * index }}
                                >
                                    <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-md">
                                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-red-50">
                                            {staff.photo ? (
                                                <img
                                                    src={staff.photo || '/placeholder.svg'}
                                                    alt={staff.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Users className="h-16 w-16 text-red-300" />
                                            )}
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-bold">{staff.name}</h3>
                                            <p className="text-sm text-gray-600">{staff.position}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="mt-12 text-center">
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
