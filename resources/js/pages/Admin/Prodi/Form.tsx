'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ImageIcon, Loader2, Upload, User } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

declare global {
    interface Window {
        route: any;
    }
}

export default function ProdiForm({ prodi }: any) {
    const isEditing = !!prodi;
    const [previewFotoKetua, setPreviewFotoKetua] = useState<string | null>(prodi?.data?.foto_ketua || null);
    const [previewFotoProdi, setPreviewFotoProdi] = useState<string | null>(prodi?.data?.foto_prodi || null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama_prodi: prodi?.data?.nama_prodi || '',
        quoute: prodi?.data?.quoute || '',
        nama_ketua: prodi?.data?.nama_ketua || '',
        foto_ketua: null as File | null,
        foto_prodi: null as File | null,
        visi: prodi?.data?.visi || '',
        misi: prodi?.data?.misi || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (isEditing) {
            post(window.route('admin.prodi.update', prodi.id), {
                onSuccess: () => {
                    // Handle success
                },
            });
        } else {
            post(window.route('admin.prodi.store'), {
                onSuccess: () => {
                    reset();
                    setPreviewFotoKetua(null);
                    setPreviewFotoProdi(null);
                    setFormSubmitted(false);
                },
            });
        }
    };

    const handleFotoKetuaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('foto_ketua', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewFotoKetua(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFotoProdiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('foto_prodi', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewFotoProdi(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Prodi', href: '/admin/prodi' },
        { title: isEditing ? 'Edit Prodi' : 'Tambah Prodi', href: '#' },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Prodi' : 'Tambah Prodi'} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mx-auto max-w-5xl">
                    <Card className="border-t-primary border-t-4 shadow-lg">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl font-bold">{isEditing ? 'Edit Program Studi' : 'Tambah Program Studi'}</CardTitle>
                                    <CardDescription className="mt-1">
                                        {isEditing
                                            ? 'Perbarui informasi program studi yang sudah ada'
                                            : 'Tambahkan program studi baru ke dalam sistem'}
                                    </CardDescription>
                                </div>
                                <Badge variant={isEditing ? 'outline' : 'default'} className="py-1 text-sm">
                                    {isEditing ? 'Mode Edit' : 'Mode Tambah'}
                                </Badge>
                            </div>
                        </CardHeader>

                        <Separator />

                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <motion.div variants={itemVariants} className="space-y-6">
                                    <div className="text-primary flex items-center gap-2 font-medium">
                                        <BookOpen size={18} />
                                        <h3>Informasi Program Studi</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="nama_prodi" className="block text-sm font-medium">
                                                Nama Program Studi
                                            </label>
                                            <Input
                                                id="nama_prodi"
                                                value={data.nama_prodi}
                                                onChange={(e) => setData('nama_prodi', e.target.value)}
                                                placeholder="Masukkan nama program studi"
                                                className={errors.nama_prodi ? 'border-destructive' : ''}
                                            />
                                            {errors.nama_prodi && <p className="text-destructive mt-1 text-sm">{errors.nama_prodi}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="nama_ketua" className="block text-sm font-medium">
                                                Nama Ketua Program Studi
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="nama_ketua"
                                                    value={data.nama_ketua}
                                                    onChange={(e) => setData('nama_ketua', e.target.value)}
                                                    placeholder="Masukkan nama ketua program studi"
                                                    className={`pl-10 ${errors.nama_ketua ? 'border-destructive' : ''}`}
                                                />
                                                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                            </div>
                                            {errors.nama_ketua && <p className="text-destructive mt-1 text-sm">{errors.nama_ketua}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="quoute" className="block text-sm font-medium">
                                                Kutipan
                                            </label>
                                            <Input
                                                id="quoute"
                                                value={data.quoute}
                                                onChange={(e) => setData('quoute', e.target.value)}
                                                placeholder="Masukkan quoute"
                                                className={errors.quoute ? 'border-destructive' : ''}
                                            />
                                            {errors.quoute && <p className="text-destructive mt-1 text-sm">{errors.quoute}</p>}
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-6">
                                    <div className="text-primary flex items-center gap-2 font-medium">
                                        <ImageIcon size={18} />
                                        <h3>Media & Gambar</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="foto_ketua" className="block text-sm font-medium">
                                                Foto Ketua Program Studi
                                            </label>
                                            <label htmlFor="foto_ketua">
                                                <div
                                                    className={`rounded-lg border-2 border-dashed p-4 transition-colors ${errors.foto_ketua ? 'border-destructive' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                                                >
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        {!previewFotoKetua ? (
                                                            <>
                                                                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                                                                    <Upload className="text-primary h-6 w-6" />
                                                                </div>
                                                                <p className="text-muted-foreground text-center text-sm">
                                                                    Klik untuk upload atau drag & drop
                                                                    <br />
                                                                    <span className="text-xs">JPG, PNG (Maks. 2MB)</span>
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <div className="relative h-48 w-full overflow-hidden rounded-md">
                                                                <img
                                                                    src={previewFotoKetua || '/placeholder.svg'}
                                                                    alt="Preview Foto Ketua"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                                                                    <p className="text-sm text-white">Klik untuk mengganti</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Input
                                                            id="foto_ketua"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFotoKetuaChange}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </label>

                                            {errors.foto_ketua && <p className="text-destructive mt-1 text-sm">{errors.foto_ketua}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="foto_prodi" className="block text-sm font-medium">
                                                Foto Program Studi
                                            </label>
                                            <label htmlFor="foto_prodi">
                                                <div
                                                    className={`rounded-lg border-2 border-dashed p-4 transition-colors ${errors.foto_prodi ? 'border-destructive' : 'border-muted-foreground/25 hover:border-primary/50'}`}
                                                >
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        {!previewFotoProdi ? (
                                                            <>
                                                                <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                                                                    <Upload className="text-primary h-6 w-6" />
                                                                </div>
                                                                <p className="text-muted-foreground text-center text-sm">
                                                                    Klik untuk upload atau drag & drop
                                                                    <br />
                                                                    <span className="text-xs">JPG, PNG (Maks. 2MB)</span>
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <div className="relative h-48 w-full overflow-hidden rounded-md">
                                                                <img
                                                                    src={previewFotoProdi || '/placeholder.svg'}
                                                                    alt="Preview Foto Prodi"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                                                                    <p className="text-sm text-white">Klik untuk mengganti</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Input
                                                            id="foto_prodi"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFotoProdiChange}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </label>
                                            {errors.foto_prodi && <p className="text-destructive mt-1 text-sm">{errors.foto_prodi}</p>}
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="space-y-6">
                                    <div className="text-primary flex items-center gap-2 font-medium">
                                        <CheckCircle2 size={18} />
                                        <h3>Visi & Misi</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="visi" className="block text-sm font-medium">
                                                Visi
                                            </label>
                                            <Textarea
                                                id="visi"
                                                value={data.visi}
                                                onChange={(e) => setData('visi', e.target.value)}
                                                placeholder="Masukkan visi program studi"
                                                rows={4}
                                                className={errors.visi ? 'border-destructive' : ''}
                                            />
                                            {errors.visi && <p className="text-destructive mt-1 text-sm">{errors.visi}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="misi" className="block text-sm font-medium">
                                                Misi
                                            </label>
                                            <Textarea
                                                id="misi"
                                                value={data.misi}
                                                onChange={(e) => setData('misi', e.target.value)}
                                                placeholder="Masukkan misi program studi (pisahkan setiap poin misi dengan baris baru)"
                                                rows={6}
                                                className={errors.misi ? 'border-destructive' : ''}
                                            />
                                            {errors.misi && <p className="text-destructive mt-1 text-sm">{errors.misi}</p>}
                                            <p className="text-muted-foreground mt-1 text-xs">Pisahkan setiap poin misi dengan baris baru</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="flex justify-end gap-3 border-t pt-4">
                                    <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={processing}>
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing} className="min-w-[120px]">
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {isEditing ? 'Memperbarui...' : 'Menyimpan...'}
                                            </>
                                        ) : (
                                            <>{isEditing ? 'Perbarui' : 'Simpan'}</>
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AppLayout>
    );
}
