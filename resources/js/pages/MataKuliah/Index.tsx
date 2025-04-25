'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MataKuliah {
    id: number;
    dosen: any;
    kurikulum: any;
    kode: string;
    rps: string;
    nama_matakuliah: string;
}

interface Props {
    mataKuliah: MataKuliah[];
}

export default function MataKuliahIndex({ mataKuliah }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKurikulum, setSelectedKurikulum] = useState<string>('');
    const [kurikulumList, setKurikulumList] = useState<{ id: string | number; nama: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page

    // Extract unique kurikulum options from the data
    useEffect(() => {
        const uniqueKurikulum = mataKuliah.reduce(
            (acc, mk) => {
                if (mk.kurikulum && !acc.some((k) => k.id === mk.kurikulum.id)) {
                    acc.push({
                        id: mk.kurikulum.id,
                        nama: mk.kurikulum.nama,
                    });
                }
                return acc;
            },
            [] as { id: string | number; nama: string }[],
        );

        setKurikulumList(uniqueKurikulum);
    }, [mataKuliah]);

    // Reset pagination when search term or selected kurikulum changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedKurikulum]);

    // Filter mata kuliah based on selected kurikulum and search term
    const filteredMataKuliah = mataKuliah.filter((mk) => {
        const matchesSearch =
            mk.kode.toLowerCase().includes(searchTerm.toLowerCase()) || mk.nama_matakuliah.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesKurikulum = !selectedKurikulum || (mk.kurikulum && mk.kurikulum.id.toString() === selectedKurikulum);

        return matchesSearch && matchesKurikulum;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredMataKuliah.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredMataKuliah.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Maximum number of page buttons to show

        if (totalPages <= maxVisiblePages) {
            // If total pages is less than or equal to max visible pages, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first page
            pageNumbers.push(1);

            // Calculate start and end of middle section
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                endPage = 4;
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push('ellipsis1');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('ellipsis2');
            }

            // Always include last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <GuestLayout>
            <Head title="Mata Kuliah" />

            <section className="from-primary/10 bg-gradient-to-b to-white pt-20 pb-5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        className="gradient-text mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Mata Kuliah
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Jelajahi berbagai mata kuliah yang kami tawarkan untuk mengembangkan pengetahuan dan keterampilan Anda dalam bidang yang Anda
                        minati.
                    </motion.p>

                    {/* Kurikulum Selection */}
                    <motion.div
                        className="mx-auto mb-8 max-w-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="flex flex-col items-center space-y-2">
                            <label htmlFor="kurikulum-select" className="text-primary text-center font-medium">
                                Pilih Kurikulum
                            </label>
                            <Select value={selectedKurikulum} onValueChange={setSelectedKurikulum}>
                                <SelectTrigger className="border-primary/20 focus:border-primary w-full max-w-md rounded-full border-2 py-2 transition-colors">
                                    <SelectValue placeholder="Pilih Kurikulum" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kurikulumList.map((kurikulum) => (
                                        <SelectItem key={kurikulum.id} value={kurikulum.id.toString()}>
                                            {kurikulum.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </motion.div>
                </div>
            </section>

            {selectedKurikulum && (
                <section className="bg-gray-50 py-1">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6">
                            <div className="flex items-center justify-between">
                                <div className="bg-primary/10 inline-flex items-center rounded-full px-4 py-2">
                                    <Filter className="text-primary mr-2 h-4 w-4" />
                                    <span className="text-sm font-medium">
                                        Kurikulum: {kurikulumList.find((k) => k.id.toString() === selectedKurikulum)?.nama || selectedKurikulum}
                                    </span>
                                </div>

                                {/* Search Input moved above the table */}
                                <div className="relative w-full max-w-md">
                                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
                                    <Input
                                        type="search"
                                        placeholder="Cari mata kuliah..."
                                        className="border-primary/20 focus:border-primary rounded-full border-2 py-2 pr-4 pl-10 transition-colors"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <Card className="overflow-hidden shadow-lg">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="bg-primary/5 text-primary w-[100px] font-semibold">Kode</TableHead>
                                                <TableHead className="bg-primary/5 text-primary font-semibold">Nama Mata Kuliah</TableHead>
                                                {/* <TableHead className="bg-primary/5 text-primary font-semibold">Nama Dosen</TableHead> */}
                                                {/* <TableHead className="bg-primary/5 text-primary font-semibold">No.HP Dosen</TableHead> */}
                                                <TableHead className="bg-primary/5 text-primary font-semibold">RPS</TableHead>
                                                <TableHead className="bg-primary/5 text-primary font-semibold">Kurikulum</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentItems.length > 0 ? (
                                                currentItems.map((mk, index) => (
                                                    <TableRow key={mk.id} className="hover:bg-muted/50 transition-colors">
                                                        <TableCell className="font-medium">{mk.kode}</TableCell>
                                                        <TableCell>{mk.nama_matakuliah}</TableCell>
                                                        {/* <TableCell className="font-medium">{mk.dosen?.nama}</TableCell>
                                                        <TableCell className="font-medium">{mk.dosen?.nohp}</TableCell> */}
                                                        <TableCell className="font-medium">{mk.rps}</TableCell>
                                                        <TableCell className="font-medium">{mk.kurikulum?.nama}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="py-8 text-center">
                                                        <BookOpen className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                                                        <p className="text-muted-foreground">Tidak ada mata kuliah yang ditemukan.</p>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Pagination Navigation */}
                        {filteredMataKuliah.length > 0 && (
                            <motion.div
                                className="mt-8 flex justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <nav className="flex items-center space-x-1">
                                    {/* Previous Page Button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-9 w-9 rounded-full"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only">Previous Page</span>
                                    </Button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((pageNumber, index) => {
                                        if (pageNumber === 'ellipsis1' || pageNumber === 'ellipsis2') {
                                            return (
                                                <span key={`ellipsis-${index}`} className="text-muted-foreground px-2">
                                                    ...
                                                </span>
                                            );
                                        }

                                        return (
                                            <Button
                                                key={`page-${pageNumber}`}
                                                variant={currentPage === pageNumber ? 'default' : 'outline'}
                                                size="icon"
                                                className="h-9 w-9 rounded-full"
                                                onClick={() => setCurrentPage(pageNumber as number)}
                                            >
                                                {pageNumber}
                                            </Button>
                                        );
                                    })}

                                    {/* Next Page Button */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-9 w-9 rounded-full"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                        <span className="sr-only">Next Page</span>
                                    </Button>
                                </nav>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}
        </GuestLayout>
    );
}
