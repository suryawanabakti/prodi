'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    nama: z.string().min(1, 'Name is required'),
    file: z.instanceof(File, { message: 'File is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Create({ flash }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('nama', data.nama);
        formData.append('file', data.file);

        router.post(route('admin.unduhan.store'), formData, {
            forceFormData: true,
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <AppLayout>
            <Head title="Create Unduhan" />
            <div className="container p-5">
                <div className="mb-6">
                    <Link href={route('admin.unduhan.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Create New Unduhan</CardTitle>
                        <CardDescription>Add a new downloadable file to the system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="nama"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter file name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({ field: { value, onChange, ...fieldProps } }) => (
                                        <FormItem>
                                            <FormLabel>File</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    {...fieldProps}
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                            onChange(e.target.files[0]);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
