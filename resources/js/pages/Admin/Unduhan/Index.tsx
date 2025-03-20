'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { PageProps, Unduhan } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Download, MoreHorizontal, Pencil, PlusCircle, Trash } from 'lucide-react';
import React, { useEffect } from 'react';

interface Props extends PageProps {
    unduhan: Unduhan[];
}

export default function Index({ unduhan, flash }: Props) {
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<number | null>(null);

    useEffect(() => {}, [flash.message]);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('admin.unduhan.destroy', deleteId), {
                onSuccess: () => {
                    setOpen(false);
                    setDeleteId(null);
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Unduhan" />
            <div className="container p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Unduhan</h1>
                    <Link href={route('admin.unduhan.create')}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New
                        </Button>
                    </Link>
                </div>

                <Table>
                    <TableCaption>List of all unduhan</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>File</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {unduhan.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell className="font-medium">{data.id}</TableCell>
                                <TableCell>{data.nama}</TableCell>
                                <TableCell>{data.file.split('/').pop()}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <a href={route('admin.unduhan.download', data.id)} target="_blank" rel="noreferrer">
                                                <DropdownMenuItem>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </DropdownMenuItem>
                                            </a>
                                            <Link className="hidden" href={route('admin.unduhan.edit', data.id)}>
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setDeleteId(data.id);
                                                    setOpen(true);
                                                }}
                                                className="text-red-600"
                                            >
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the unduhan from the database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
