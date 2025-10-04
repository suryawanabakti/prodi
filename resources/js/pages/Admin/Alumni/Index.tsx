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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, SharedData } from "@/types"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Download, FileText, Filter, Pencil, Plus, Search, Trash, X, Check } from "lucide-react"
import React from "react"

interface Alumni {
  id: number
  nim: number
  nama: string
  judul: string
  tahun: string | null
  is_approve: boolean
}

interface Props {
  alumni: Alumni[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
  },
  {
    title: "Alumni",
    href: "/admin/alumni",
  },
]

export default function AlumniIndex({ alumni }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedYear, setSelectedYear] = React.useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedAlumni, setSelectedAlumni] = React.useState<Alumni | null>(null)
  const [selectedAlumniIds, setSelectedAlumniIds] = React.useState<number[]>([])
  const [isExporting, setIsExporting] = React.useState(false)

  // Get unique years for filter dropdown
  const uniqueYears = React.useMemo(() => {
    const years = alumni
      .map((item) => item.tahun)
      .filter((year): year is string => year !== null && year !== "")
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
    return [...new Set(years)]
  }, [alumni])

  // Filter alumni based on search term and selected year
  const filteredAlumni = React.useMemo(() => {
    return alumni.filter((item) => {
      const matchesSearch =
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nim.toString().includes(searchTerm.toLowerCase()) ||
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesYear = selectedYear === "all" || item.tahun === selectedYear

      return matchesSearch && matchesYear
    })
  }, [alumni, searchTerm, selectedYear])

  const handleDelete = () => {
    router.delete("/admin/alumni/" + selectedAlumni?.id)
    setDeleteDialogOpen(false)
  }

  const handleSelectAlumni = (alumniId: number, checked: boolean) => {
    if (checked) {
      setSelectedAlumniIds([...selectedAlumniIds, alumniId])
    } else {
      setSelectedAlumniIds(selectedAlumniIds.filter((id) => id !== alumniId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAlumniIds(filteredAlumni.map((a) => a.id))
    } else {
      setSelectedAlumniIds([])
    }
  }

  const handleBulkApprove = () => {
    router.put(
      "/admin/alumni/approve",
      {
        ids: selectedAlumniIds,
        is_approve: true,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setSelectedAlumniIds([])
          console.log("Alumni berhasil di-approve")
        },
        onError: (errors) => {
          console.error("Gagal approve alumni:", errors)
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

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedYear("all")
  }

  const exportToPDFSimple = async () => {
    setIsExporting(true)
    try {
      const jsPDF = (await import("jspdf")).default
      const doc = new jsPDF()

      // Add title
      doc.setFontSize(20)
      doc.text("Data Alumni", 14, 22)

      // Add export date
      doc.setFontSize(10)
      doc.text(`Diekspor pada: ${new Date().toLocaleDateString("id-ID")}`, 14, 30)

      let yPosition = 40

      // Add filter info if any
      if (searchTerm || selectedYear !== "all") {
        doc.text("Filter yang diterapkan:", 14, yPosition)
        yPosition += 5
        if (searchTerm) {
          doc.text(`- Pencarian: "${searchTerm}"`, 16, yPosition)
          yPosition += 5
        }
        if (selectedYear !== "all") {
          doc.text(`- Angkatan: ${selectedYear}`, 16, yPosition)
          yPosition += 5
        }
        yPosition += 10
      }

      // Add table header
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("No", 14, yPosition)
      doc.text("NIM", 30, yPosition)
      doc.text("Nama", 60, yPosition)
      doc.text("Judul", 110, yPosition)
      doc.text("Angkatan", 170, yPosition)
      yPosition += 5

      // Add line under header
      doc.line(14, yPosition, 190, yPosition)
      yPosition += 5

      // Add data
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)

      filteredAlumni.forEach((item, index) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }

        doc.text((index + 1).toString(), 14, yPosition)
        doc.text(item.nim.toString(), 30, yPosition)
        doc.text(item.nama.substring(0, 25), 60, yPosition) // Limit nama length
        doc.text(item.judul.substring(0, 30), 110, yPosition) // Limit judul length
        doc.text(item.tahun || "-", 170, yPosition)
        yPosition += 5
      })

      // Add footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.text(`Halaman ${i} dari ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10)
      }

      // Save the PDF
      const fileName = `data-alumni-${new Date().toISOString().split("T")[0]}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.")
    } finally {
      setIsExporting(false)
    }
  }

  const hasActiveFilters = searchTerm !== "" || selectedYear !== "all"
  const isAllSelected = filteredAlumni.length > 0 && selectedAlumniIds.length === filteredAlumni.length
  const isIndeterminate = selectedAlumniIds.length > 0 && selectedAlumniIds.length < filteredAlumni.length

const { auth } = usePage<SharedData>().props;

    
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Alumni" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Alumni</h1>
          <div className="flex gap-2">
            {selectedAlumniIds.length > 0 && (
              <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve ({selectedAlumniIds.length})
              </Button>
            )}
            <Button variant="outline" asChild disabled={filteredAlumni.length === 0 || isExporting}>
              <a href="/export-alumni">
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Mengekspor..." : "Export PDF"}
              </a>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin/alumni/create">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Alumni
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari alumni..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Year Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pilih Angkatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Angkatan</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      Angkatan {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700">
                  <Search className="h-3 w-3" />
                  <span>Pencarian: "{searchTerm}"</span>
                  <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-blue-900">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {selectedYear !== "all" && (
                <div className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs text-green-700">
                  <Filter className="h-3 w-3" />
                  <span>Angkatan: {selectedYear}</span>
                  <button onClick={() => setSelectedYear("all")} className="ml-1 hover:text-green-900">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-muted-foreground">
          Menampilkan {filteredAlumni.length} dari {alumni.length} alumni
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                   {auth.user.email.includes('kaprodi') &&
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
                  />
                </TableHead> }
                <TableHead className="hidden md:table-cell">NIM</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Angkatan</TableHead>
                <TableHead>Status Approval</TableHead>
                <TableHead className="w-[150px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((item) => (
                  <TableRow key={item.id}>
                     {auth.user.email.includes('kaprodi') &&
                    <TableCell>
                      <Checkbox
                        checked={selectedAlumniIds.includes(item.id)}
                        onCheckedChange={(checked) => handleSelectAlumni(item.id, checked as boolean)}
                        aria-label={`Select ${item.nama}`}
                      />
                    </TableCell> }
                    <TableCell className="hidden md:table-cell">
                      <span className="line-clamp-1">{item.nim}</span>
                    </TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell className="font-medium">{item.judul}</TableCell>
                    <TableCell className="font-medium">{item.tahun || "-"}</TableCell>
                    <TableCell>{getApprovalBadge(item.is_approve)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/alumni/${item.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedAlumni(item)
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
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        {hasActiveFilters
                          ? "Tidak ada alumni yang sesuai dengan filter."
                          : "Tidak ada alumni yang ditemukan."}
                      </p>
                      {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          <X className="mr-1 h-3 w-3" />
                          Hapus Filter
                        </Button>
                      )}
                    </div>
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
              Apakah Anda yakin ingin menghapus alumni "{selectedAlumni?.nama}"? Tindakan ini tidak dapat dibatalkan.
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
