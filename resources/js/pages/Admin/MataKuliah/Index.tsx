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

interface MataKuliah {
  id: number
  dosen: any
  rps: string
  kurikulum: any
  prodi_id: number
  kode: string
  nama_matakuliah: string
  is_approve: boolean
}

interface Props {
  mataKuliah: MataKuliah[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Mata Kuliah",
    href: "/admin/mata-kuliah",
  },
]

export default function MataKuliahIndex({ mataKuliah }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedMataKuliah, setSelectedMataKuliah] = React.useState<MataKuliah | null>(null)
  const [selectedMataKuliahIds, setSelectedMataKuliahIds] = React.useState<number[]>([])

  const filteredMataKuliah = mataKuliah.filter(
    (mk) =>
      mk.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mk.nama_matakuliah.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = () => {
    router.delete("/admin/mata-kuliah/" + selectedMataKuliah?.id)
    setDeleteDialogOpen(false)
  }

  const handleSelectMataKuliah = (mkId: number, checked: boolean) => {
    if (checked) {
      setSelectedMataKuliahIds([...selectedMataKuliahIds, mkId])
    } else {
      setSelectedMataKuliahIds(selectedMataKuliahIds.filter((id) => id !== mkId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMataKuliahIds(filteredMataKuliah.map((mk) => mk.id))
    } else {
      setSelectedMataKuliahIds([])
    }
  }

  const handleBulkApprove = () => {
    router.put(
      "/admin/mata-kuliah/approve",
      {
        ids: selectedMataKuliahIds,
        is_approve: true,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setSelectedMataKuliahIds([])
          console.log("Mata kuliah berhasil di-approve")
        },
        onError: (errors) => {
          console.error("Gagal approve mata kuliah:", errors)
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

  const isAllSelected = filteredMataKuliah.length > 0 && selectedMataKuliahIds.length === filteredMataKuliah.length
  const isIndeterminate = selectedMataKuliahIds.length > 0 && selectedMataKuliahIds.length < filteredMataKuliah.length
const { auth } = usePage<SharedData>().props;

    
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Mata Kuliah" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mata Kuliah</h1>
          <div className="flex items-center gap-2">
            {selectedMataKuliahIds.length > 0 && (
              <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve ({selectedMataKuliahIds.length})
              </Button>
            )}
               {
              auth.user.email.includes("admin") && 
            <Button asChild variant={"outline"}>
              <Link href="/admin/mata-kuliah/create">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Mata Kuliah
              </Link>
            </Button>
}
          </div>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Cari mata kuliah..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {auth.user.email.includes("kaprodi") && 
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
                  />
                </TableHead>}
                <TableHead className="w-[120px]">Kode</TableHead>
                <TableHead>Nama Mata Kuliah</TableHead>
                <TableHead>RPS</TableHead>
                <TableHead>Kurikulum</TableHead>
                <TableHead>Status Approval</TableHead>
                <TableHead className="w-[150px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMataKuliah.length > 0 ? (
                filteredMataKuliah.map((item) => (
                  <TableRow key={item.id}>
                        {auth.user.email.includes("kaprodi") && 
                    <TableCell>
                      <Checkbox
                        checked={selectedMataKuliahIds.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectMataKuliah(item.id, checked as boolean)}
                        aria-label={`Select ${item.nama_matakuliah}`}
                      />
                    </TableCell> }
                    <TableCell className="font-medium">{item.kode}</TableCell>
                    <TableCell>{item.nama_matakuliah}</TableCell>
                    <TableCell>{item.rps}</TableCell>
                    <TableCell>{item.kurikulum?.nama}</TableCell>
                    <TableCell>{getApprovalBadge(item.is_approve)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/mata-kuliah/${item.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedMataKuliah(item)
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
                  <TableCell colSpan={7} className="py-6 text-center">
                    <p className="text-muted-foreground">Tidak ada mata kuliah yang ditemukan.</p>
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
                Apakah Anda yakin ingin menghapus mata kuliah "{selectedMataKuliah?.nama_matakuliah}"? Tindakan ini
                tidak dapat dibatalkan.
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
