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

interface Berita {
    id: number;
    prodi_id: number;
    judul: string;
    deskripsi: string;
    gambar: string | null;
    created_at: string;
}

interface Props {
    berita: Berita[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
    {
        title: 'Berita',
        href: '/admin/berita',
    },
];

export default function BeritaIndex({ berita }: Props) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedBerita, setSelectedBerita] = React.useState<Berita | null>(null);

    const filteredBerita = berita.filter(
        (b) => b.judul.toLowerCase().includes(searchTerm.toLowerCase()) || b.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDelete = () => {
        // Handle delete logic here
        router.delete('/admin/berita/' + selectedBerita?.id);
        setDeleteDialogOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Berita" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Berita</h1>
                    <Button asChild variant={'secondary'}>
                        <Link href="/admin/berita/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Berita
                        </Link>
                    </Button>
                </div>

                <div className="relative mb-6 max-w-md">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        type="search"
                        placeholder="Cari berita..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Judul</TableHead>
                                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                                <TableHead className="w-[150px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBerita.length > 0 ? (
                                filteredBerita.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            <span className="line-clamp-1">{item.judul}</span>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {new Date(item.created_at).toLocaleDateString('id-ID')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/berita/${item.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive"
                                                    onClick={() => {
                                                        setSelectedBerita(item);
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
                                        <p className="text-muted-foreground">Tidak ada berita yang ditemukan.</p>
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
                                Apakah Anda yakin ingin menghapus berita "{selectedBerita?.judul}"? Tindakan ini tidak dapat dibatalkan.
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
