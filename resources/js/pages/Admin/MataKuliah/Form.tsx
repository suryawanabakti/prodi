'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Save } from 'lucide-react';
import type React from 'react';

interface MataKuliahFormProps {
    kurikulums: any;
    dosens: any;
    mataKuliah?: {
        id?: number;
        kurikulum_id: number;
        kode: string;
        dosen_id: number;
        nama_matakuliah: string;
        deskripsi: string;
        sks: number;
        prodi_id: string;
        rps: string;
    };
    prodi: { id: number; nama_prodi: string }[];
}

export default function MataKuliahForm({ mataKuliah, prodi, kurikulums, dosens }: MataKuliahFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        kode: mataKuliah?.kode || '',
        kurikulum_id: mataKuliah?.kurikulum_id || '',
        dosen_id: mataKuliah?.dosen_id || '',
        nama_matakuliah: mataKuliah?.nama_matakuliah || '',
        rps: mataKuliah?.rps || '',
        deskripsi: mataKuliah?.deskripsi || '',
        sks: mataKuliah?.sks || 0,
        prodi_id: mataKuliah?.prodi_id || '',
    });

    const isEditing = !!mataKuliah?.id;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.mata-kuliah.update', mataKuliah?.id));
        } else {
            post(route('admin.mata-kuliah.store'));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Mata Kuliah', href: '/admin/mata-kuliah' },
        { title: isEditing ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{isEditing ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="kurikulum_id">Kurikulum</Label>
                                    <Select value={data.kurikulum_id.toString()} onValueChange={(value) => setData('kurikulum_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kurikulum" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {kurikulums.map((p) => (
                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                    {p.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.kurikulum_id && <p className="text-sm text-red-600">{errors.kurikulum_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kurikulum_id">Dosen</Label>
                                    <Select value={data.dosen_id.toString()} onValueChange={(value) => setData('dosen_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Dosen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dosens.map((p) => (
                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                    {p.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.dosen_id && <p className="text-sm text-red-600">{errors.dosen_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kode">Kode Mata Kuliah</Label>
                                    <div className="relative">
                                        <Code className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="kode"
                                            type="text"
                                            value={data.kode}
                                            onChange={(e) => setData('kode', e.target.value)}
                                            className="pl-10"
                                            placeholder="Masukkan kode mata kuliah"
                                        />
                                    </div>
                                    {errors.kode && <p className="text-sm text-red-600">{errors.kode}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nama_matakuliah">Nama Mata Kuliah</Label>
                                    <div className="relative">
                                        <BookOpen className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="nama_matakuliah"
                                            type="text"
                                            value={data.nama_matakuliah}
                                            onChange={(e) => setData('nama_matakuliah', e.target.value)}
                                            className="pl-10"
                                            placeholder="Masukkan nama_matakuliah mata kuliah"
                                        />
                                    </div>
                                    {errors.nama_matakuliah && <p className="text-sm text-red-600">{errors.nama_matakuliah}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rps">RPS</Label>
                                    <div className="relative">
                                        <BookOpen className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                        <Input
                                            id="rps"
                                            type="text"
                                            value={data.rps}
                                            onChange={(e) => setData('rps', e.target.value)}
                                            className="pl-10"
                                            placeholder="Masukkan rps mata kuliah"
                                        />
                                    </div>
                                    {errors.rps && <p className="text-sm text-red-600">{errors.rps}</p>}
                                </div>

                                <div className="hidden space-y-2">
                                    <Label htmlFor="deskripsi">Deskripsi</Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        className="min-h-[100px]"
                                        placeholder="Masukkan deskripsi mata kuliah"
                                    />
                                    {errors.deskripsi && <p className="text-sm text-red-600">{errors.deskripsi}</p>}
                                </div>

                                <div className="space-y-2" hidden>
                                    <Label htmlFor="sks">SKS</Label>
                                    <Input
                                        id="sks"
                                        type="number"
                                        value={data.sks}
                                        onChange={(e) => setData('sks', Number.parseInt(e.target.value))}
                                        min={0}
                                        placeholder="Masukkan jumlah SKS"
                                    />
                                    {errors.sks && <p className="text-sm text-red-600">{errors.sks}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prodi_id">Program Studi</Label>
                                    <Select value={data.prodi_id.toString()} onValueChange={(value) => setData('prodi_id', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Prodi" />
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

                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        <Save className="mr-2 h-4 w-4" />
                                        {isEditing ? 'Perbarui Mata Kuliah' : 'Simpan Mata Kuliah'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AppLayout>
    );
}
