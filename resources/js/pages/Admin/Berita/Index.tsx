"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, SharedData } from "@/types"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Pencil, Plus, Search, Trash, Check } from "lucide-react"
import React from "react"

interface Berita {
  id: number
  prodi_id: number
  judul: string
  deskripsi: string
  gambar: string | null
  created_at: string
  is_approve: boolean
}

interface Props {
  berita: Berita[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Berita",
    href: "/admin/berita",
  },
]

export default function BeritaIndex({ berita }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedBerita, setSelectedBerita] = React.useState<Berita | null>(null)
  const [selectedBeritaIds, setSelectedBeritaIds] = React.useState<number[]>([])

  const filteredBerita = berita.filter(
    (b) =>
      b.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = () => {
    router.delete("/admin/berita/" + selectedBerita?.id)
    setDeleteDialogOpen(false)
  }

  const handleSelectBerita = (beritaId: number, checked: boolean) => {
    if (checked) {
      setSelectedBeritaIds([...selectedBeritaIds, beritaId])
    } else {
      setSelectedBeritaIds(selectedBeritaIds.filter((id) => id !== beritaId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBeritaIds(filteredBerita.map((b) => b.id))
    } else {
      setSelectedBeritaIds([])
    }
  }

  const handleBulkApprove = () => {
    router.put(
      "/admin/berita/approve",
      {
        ids: selectedBeritaIds,
        is_approve: true,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setSelectedBeritaIds([])
          console.log("Berita berhasil di-approve")
        },
        onError: (errors) => {
          console.error("Gagal approve berita:", errors)
        },
      },
    )
  }

  const getApprovalBadge = (status: boolean) => {
    if (status) {
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          Iya
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
          Belum
        </Badge>
      )
    }
  }

  const isAllSelected = filteredBerita.length > 0 && selectedBeritaIds.length === filteredBerita.length
  const isIndeterminate = selectedBeritaIds.length > 0 && selectedBeritaIds.length < filteredBerita.length

  const { auth } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Berita" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Berita</h1>
          <div className="flex items-center gap-2">
            {selectedBeritaIds.length > 0 && (
              <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve ({selectedBeritaIds.length})
              </Button>
            )}
          
            <Button asChild variant={"secondary"}>
              <Link href="/admin/berita/create">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Berita
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Cari berita..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {auth.user.email.includes('kaprodi') && <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
                  />
                </TableHead> }
                
                <TableHead>Judul</TableHead>
                <TableHead className="hidden md:table-cell">Tanggal</TableHead>
                <TableHead>Status Approval</TableHead>
                <TableHead className="w-[150px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBerita.length > 0 ? (
                filteredBerita.map((item) => (
                  <TableRow key={item.id}>
                         {auth.user.email.includes('kaprodi') &&
                    <TableCell>
                      <Checkbox
                        checked={selectedBeritaIds.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectBerita(item.id, checked as boolean)}
                        aria-label={`Select ${item.judul}`}
                      />
                    </TableCell> }
                    <TableCell className="font-medium">
                      <span className="line-clamp-1">{item.judul}</span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>{getApprovalBadge(item.is_approve)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/berita/${item.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedBerita(item)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-6 text-center">
                    <p className="text-muted-foreground">Tidak ada berita yang ditemukan.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Hapus</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus berita "{selectedBerita?.judul}"? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
