import { Head, Link, router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Edit, Plus, Trash2 } from 'lucide-react'
import AppLayout from '@/layouts/app-layout'

interface Tujuan {
  id: number
  deskripsi: string
  urutan: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Props {
  tujuan: {
    data: Tujuan[]
    links: any[]
    meta: any
  }
}

export default function TujuanIndex({ tujuan }: Props) {
  const handleDelete = (id: number) => {
    router.delete(route('admin.tujuan.destroy', id), {
      onSuccess: () => {
        // Handle success
      },
    })
  }

  return (
    <AppLayout>
      <Head title="Kelola Tujuan" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Tujuan</h1>
            <p className="text-muted-foreground">
              Kelola tujuan program studi
            </p>
          </div>
          <Button asChild variant={"ghost"}>
            <Link href={route('admin.tujuan.create')}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Tujuan
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Tujuan</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Urutan</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tujuan.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.urutan}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-3">{item.deskripsi}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_active ? 'default' : 'secondary'}>
                        {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={route('admin.tujuan.edit', item.id)}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Tujuan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus tujuan ini? Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}