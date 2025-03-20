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

interface MataKuliah {
    id: number;
    dosen: any;
    rps: string;
    kurikulum: any;
    prodi_id: number;
    kode: string;
    nama_matakuliah: string;
}

interface Props {
    mataKuliah: MataKuliah[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'Mata Kuliah',
        href: '/admin/mata-kuliah',
    },
];

export default function MataKuliahIndex({ mataKuliah }: Props) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedMataKuliah, setSelectedMataKuliah] = React.useState<MataKuliah | null>(null);

    const filteredMataKuliah = mataKuliah.filter(
        (mk) => mk.kode.toLowerCase().includes(searchTerm.toLowerCase()) || mk.nama_matakuliah.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDelete = () => {
        // Handle delete logic here
        router.delete('/admin/mata-kuliah/' + selectedMataKuliah?.id);
        setDeleteDialogOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Mata Kuliah" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Mata Kuliah</h1>
                    <Button asChild variant={'outline'}>
                        <Link href="/admin/mata-kuliah/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Mata Kuliah
                        </Link>
                    </Button>
                </div>

                <div className="relative mb-6 max-w-md">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        type="search"
                        placeholder="Cari mata kuliah..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Kode</TableHead>
                                <TableHead>Nama Mata Kuliah</TableHead>
                                <TableHead>Nama Dosen</TableHead>
                                <TableHead>RPS</TableHead>
                                <TableHead className="">Kurikulum</TableHead>
                                <TableHead className="w-[150px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMataKuliah.length > 0 ? (
                                filteredMataKuliah.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.kode}</TableCell>
                                        <TableCell>{item.nama_matakuliah}</TableCell>
                                        <TableCell>{item.dosen?.nama}</TableCell>
                                        <TableCell>{item.rps}</TableCell>
                                        <TableCell>{item.kurikulum?.nama}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/mata-kuliah/${item.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        setSelectedMataKuliah(item);
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
                                        <p className="text-muted-foreground">Tidak ada mata kuliah yang ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus mata kuliah "{selectedMataKuliah?.nama_matakuliah}"? Tindakan ini tidak dapat
                                dibatalkan.
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
            </div>
        </AppLayout>
    );
}
