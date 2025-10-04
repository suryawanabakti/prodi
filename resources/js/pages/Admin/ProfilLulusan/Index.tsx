"use client"

import { Head, Link, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "@/components/ui/alert-dialog"

import { Edit, Plus, Trash2, ImageIcon } from "lucide-react"
import AppLayout from "@/layouts/app-layout"

interface ProfilLulusan {
  id: number
  judul: string
  deskripsi: string
  gambar: string | null
  gambar_url: string | null
  urutan: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Props {
  profilLulusan: {
    data: ProfilLulusan[]
    links: any[]
    meta: any
  }
}

export default function ProfilLulusanIndex({ profilLulusan }: Props) {
  const handleDelete = (id: number) => {
    router.delete(`/admin/profil-lulusan/${id}`, {
      onSuccess: () => {
        // Handle success
      },
    })
  }

  return (
    <AppLayout>
      <Head title="Kelola Profil Lulusan" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kelola Profil Lulusan</h1>
            <p className="text-muted-foreground">Kelola profil lulusan program studi</p>
          </div>
          <Button asChild variant={"link"}>
            <Link href="/admin/profil-lulusan/create">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Profil Lulusan
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Profil Lulusan</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Urutan</TableHead>
                  <TableHead>Gambar</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal Dibuat</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profilLulusan.data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.urutan}</TableCell>
                    <TableCell>
                      {item.gambar_url ? (
                        <img
                          src={item.gambar_url || "/placeholder.svg"}
                          alt={item.judul}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.judul}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="line-clamp-2">{item.deskripsi}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/profil-lulusan/${item.id}/edit`}>
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
                              <AlertDialogTitle>Hapus Profil Lulusan</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus profil lulusan ini? Tindakan ini tidak dapat
                                dibatalkan.
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
