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
import { Briefcase, Calendar, Dock, Save, User } from 'lucide-react';
import React from 'react';

interface alumniFormProps {
    alumni?: {
        id?: number;
        nim: string;
        nama: string;
        judul: string | null;
        tahun: string;
        prodi_id: number;
    };
    prodi: { id: number; nama: string }[];
}

export default function alumniForm({ alumni, prodi }: alumniFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        nim: alumni?.nim || '',
        nama: alumni?.nama || '',
        judul: alumni?.judul || '',
        tahun: alumni?.tahun || '',
        prodi_id: alumni?.prodi_id || '',
    });

    const isEditing = !!alumni?.id;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.alumni.update', alumni.id));
        } else {
            post(route('admin.alumni.store'));
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin' },
        { title: 'alumni', href: '/admin/alumni' },
        { title: isEditing ? 'Edit alumni' : 'Tambah alumni', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit alumni' : 'Tambah alumni'} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{isEditing ? 'Edit alumni' : 'Tambah alumni'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama alumni</Label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="nama"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        className="pl-10"
                                        placeholder="Masukkan nama alumni"
                                    />
                                </div>
                                {errors.nama && <p className="text-sm text-red-600">{errors.nama}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nama">NIM</Label>
                                <div className="relative">
                                    <User className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="nim"
                                        type="text"
                                        value={data.nim}
                                        onChange={(e) => setData('nim', e.target.value)}
                                        className="pl-10"
                                        placeholder="Masukkan nim alumni"
                                    />
                                </div>
                                {errors.nim && <p className="text-sm text-red-600">{errors.nim}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="judul">Judul Skripsi</Label>
                                <div className="relative">
                                    <Dock className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="judul"
                                        type="text"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        className="pl-10"
                                        placeholder="Masukkan judul alumni"
                                    />
                                </div>
                                {errors.judul && <p className="text-sm text-red-600">{errors.judul}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tahun">Tahun</Label>
                                <div className="relative">
                                    <Calendar className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        id="tahun"
                                        type="number"
                                        value={data.tahun}
                                        onChange={(e) => setData('tahun', e.target.value)}
                                        className="pl-10"
                                        placeholder="Masukkan tahun alumni"
                                    />
                                </div>
                                {errors.tahun && <p className="text-sm text-red-600">{errors.tahun}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bidang_keilmuwan">Bidang Keilmuan</Label>
                                <div className="relative">
                                    <Briefcase className="absolute top-3 left-3 text-gray-400" />
                                    <Textarea
                                        id="bidang_keilmuwan"
                                        value={data.bidang_keilmuwan}
                                        onChange={(e) => setData('bidang_keilmuwan', e.target.value)}
                                        className="min-h-[100px] pl-10"
                                        placeholder="Masukkan bidang keilmuan"
                                    />
                                </div>
                                {errors.bidang_keilmuwan && <p className="text-sm text-red-600">{errors.bidang_keilmuwan}</p>}
                            </div>

                            <div className="space-y-2">
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

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isEditing ? 'Perbarui alumni' : 'Simpan alumni'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </AppLayout>
    );
}
