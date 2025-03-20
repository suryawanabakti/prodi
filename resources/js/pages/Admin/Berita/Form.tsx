'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import type React from 'react';

interface Berita {
    id?: number;
    prodi_id: string;
    judul: string;
    deskripsi: string;
    gambar: File | null;
}

interface Prodi {
    id: number;
    nama_prodi: string;
}

interface Props {
    berita?: Berita;
    prodi: Prodi[];
    isEditing: boolean;
}

export default function BeritaForm({ berita, prodi, isEditing }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<Berita>({
        prodi_id: berita?.prodi_id || '',
        judul: berita?.judul || '',
        deskripsi: berita?.deskripsi || '',
        gambar: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/berita/${berita?.id}`);
        } else {
            post('/admin/berita');
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Berita', href: '/admin/berita' },
        { title: isEditing ? 'Edit Berita' : 'Tambah Berita', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Berita' : 'Tambah Berita'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {' '}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">{isEditing ? 'Edit Berita' : 'Tambah Berita'}</h1>
                </div>
                <div className="max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="prodi_id">Program Studi</Label>
                            <Select value={data.prodi_id} onValueChange={(value) => setData('prodi_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih program studi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {prodi.map((p) => (
                                        <SelectItem key={p.id} value={p.id.toString()}>
                                            {p.nama_prodi}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.prodi_id && <p className="text-sm text-red-600">{errors.prodi_id}</p>}
                        </div>

                        <div>
                            <Label htmlFor="judul">Judul Berita</Label>
                            <Input
                                id="judul"
                                value={data.judul}
                                onChange={(e) => setData('judul', e.target.value)}
                                placeholder="Masukkan judul berita"
                            />
                            {errors.judul && <p className="text-sm text-red-600">{errors.judul}</p>}
                        </div>

                        <div>
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                id="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                placeholder="Masukkan deskripsi berita"
                                className="min-h-[200px]"
                            />
                            {errors.deskripsi && <p className="text-sm text-red-600">{errors.deskripsi}</p>}
                        </div>

                        <div>
                            <Label htmlFor="gambar">Gambar</Label>
                            <Input id="gambar" type="file" accept="image/*" onChange={(e) => setData('gambar', e.target.files?.[0] || null)} />
                            <p className="text-sm text-gray-500">Upload gambar untuk berita (opsional)</p>
                            {errors.gambar && <p className="text-sm text-red-600">{errors.gambar}</p>}
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={processing}>
                                {isEditing ? 'Perbarui' : 'Simpan'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Batal
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
