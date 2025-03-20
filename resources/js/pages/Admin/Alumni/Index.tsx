'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash } from 'lucide-react';
import React from 'react';

interface alumni {
    id: number;
    nim: number;
    nama: string;
    judul: string;
    tahun: string | null;
}

interface Props {
    alumni: alumni[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'alumni',
        href: '/admin/alumni',
    },
];

export default function AlumniIndex({ alumni }: Props) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedalumni, setSelectedalumni] = React.useState<alumni | null>(null);

    const filteredalumni = alumni.filter(
        (d) => d.nama.toLowerCase().includes(searchTerm.toLowerCase()) || d.bidang_keilmuwan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDelete = () => {
        // Handle delete logic here
        router.delete('/admin/alumni/' + selectedalumni?.id);
        setDeleteDialogOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola alumni" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Alumni</h1>
                    <Button asChild variant={'secondary'}>
                        <Link href="/admin/alumni/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah alumni
                        </Link>
                    </Button>
                </div>

                <div className="relative mb-6 max-w-md">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        type="search"
                        placeholder="Cari alumni..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden md:table-cell">NIM</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Angkatan</TableHead>
                                <TableHead className="w-[150px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredalumni.length > 0 ? (
                                filteredalumni.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="hidden md:table-cell">
                                            <span className="line-clamp-1">{item.nim}</span>
                                        </TableCell>
                                        <TableCell className="font-medium">{item.nama}</TableCell>
                                        <TableCell className="font-medium">{item.judul}</TableCell>
                                        <TableCell className="font-medium">{item.tahun}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/alumni/${item.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        setSelectedalumni(item);
                                                        setDeleteDialogOpen(true);
                                                    }}
                                                >
                                                    <Trash className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="py-6 text-center">
                                        <p className="text-muted-foreground">Tidak ada alumni yang ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription>
                            Apakah Anda yakin ingin menghapus alumni "{selectedalumni?.nama}"? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
