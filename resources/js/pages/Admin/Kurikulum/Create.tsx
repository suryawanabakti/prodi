'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type React from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('kurikulums.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Kurikulum" />
            <div className="container py-8">
                <div className="mb-6">
                    <Link href={route('kurikulums.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </Button>
                    </Link>
                </div>

                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Create New Kurikulum</CardTitle>
                        <CardDescription>Add a new kurikulum to the system.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama</Label>
                                <Input id="nama" value={data.nama} onChange={(e) => setData('nama', e.target.value)} />
                                {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={route('kurikulums.index')}>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
