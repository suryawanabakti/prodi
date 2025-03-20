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
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, PlusCircle, Trash } from 'lucide-react';
import React from 'react';

interface Kurikulum {
    id: number;
    nama: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    kurikulums: Kurikulum[];
}

export default function Index({ kurikulums }: Props) {
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('kurikulums.destroy', deleteId), {
                onSuccess: () => {
                    setOpen(false);
                    setDeleteId(null);
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Kurikulums" />
            <div className="container p-5">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Kurikulum</h1>
                    <Link href={route('kurikulums.create')}>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New
                        </Button>
                    </Link>
                </div>

                <Table>
                    <TableCaption>List of all kurikulums</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {kurikulums.map((kurikulum) => (
                            <TableRow key={kurikulum.id}>
                                <TableCell className="font-medium">{kurikulum.id}</TableCell>
                                <TableCell>{kurikulum.nama}</TableCell>
                                <TableCell>{new Date(kurikulum.created_at).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <Link href={route('kurikulums.edit', kurikulum.id)}>
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setDeleteId(kurikulum.id);
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
                                This action cannot be undone. This will permanently delete the kurikulum from the database.
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
