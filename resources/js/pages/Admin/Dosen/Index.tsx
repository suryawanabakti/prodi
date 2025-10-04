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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, SharedData } from "@/types"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Pencil, Plus, Search, Trash, Check } from "lucide-react"
import React from "react"

interface Dosen {
  id: number
  nidn: string
  user: any
  prodi_id: number
  nama: string
  bidang_keilmuwan: string
  foto: string | null
  is_approve: boolean
}

interface Props {
  dosen: Dosen[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Dosen",
    href: "/admin/dosen",
  },
]

export default function DosenIndex({ dosen }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedDosen, setSelectedDosen] = React.useState<Dosen | null>(null)
  const [selectedDosenIds, setSelectedDosenIds] = React.useState<number[]>([])

  const filteredDosen = dosen.filter(
    (d) =>
      d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.bidang_keilmuwan.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = () => {
    router.delete("/admin/dosen/" + selectedDosen?.id)
    setDeleteDialogOpen(false)
  }

  const handleSelectDosen = (dosenId: number, checked: boolean) => {
    if (checked) {
      setSelectedDosenIds([...selectedDosenIds, dosenId])
    } else {
      setSelectedDosenIds(selectedDosenIds.filter((id) => id !== dosenId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDosenIds(filteredDosen.map((d) => d.id))
    } else {
      setSelectedDosenIds([])
    }
  }

  const handleBulkApprove = () => {
    router.put(
      "/admin/dosen/approve",
      {
        ids: selectedDosenIds,
        is_approve: true,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setSelectedDosenIds([])
          console.log("Dosen berhasil di-approve")
        },
        onError: (errors) => {
          console.error("Gagal approve dosen:", errors)
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

  const isAllSelected = filteredDosen.length > 0 && selectedDosenIds.length === filteredDosen.length
  const isIndeterminate = selectedDosenIds.length > 0 && selectedDosenIds.length < filteredDosen.length

const { auth } = usePage<SharedData>().props;

    
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Dosen" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dosen</h1>
          <div className="flex items-center gap-2">
            {selectedDosenIds.length > 0 && (
              <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve ({selectedDosenIds.length})
              </Button>
            )}
            {
              auth.user.email.includes("admin") &&     <Button asChild variant={"outline"}>
              <Link href="/admin/dosen/create">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Dosen
              </Link>
            </Button>
            }
        
          </div>
        </div>

        <div className="relative mb-6 max-w-md">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Cari dosen..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {auth.user.email.includes('kaprodi') &&    <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
                  />
                </TableHead>
                }
             
                <TableHead>NIDN</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Bidang Keilmuan</TableHead>
                <TableHead className="hidden lg:table-cell">Status Approval</TableHead>
                <TableHead className="w-[150px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDosen.length > 0 ? (
                filteredDosen.map((item) => (
                  <TableRow key={item.id}>
                     {auth.user.email.includes('kaprodi') &&    <TableCell>
                      <Checkbox
                        checked={selectedDosenIds.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectDosen(item.id, checked as boolean)}
                        aria-label={`Select ${item.nama}`}
                      />
                    </TableCell>}
                 
                    <TableCell className="font-medium">{item.nidn}</TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell className="font-medium">{item.user?.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="line-clamp-1">{item.bidang_keilmuwan}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{getApprovalBadge(item.is_approve)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/dosen/${item.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedDosen(item)
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
                    <p className="text-muted-foreground">Tidak ada dosen yang ditemukan.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus dosen "{selectedDosen?.nama}"? Tindakan ini tidak dapat dibatalkan.
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
    </AppLayout>
  )
}
