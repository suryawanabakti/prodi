"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import type { SharedData } from "@/types"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { MoreHorizontal, Pencil, PlusCircle, Trash, Check } from "lucide-react"
import React from "react"
import { route } from "ziggy-js" // Import route from ziggy-js

interface Kurikulum {
  id: number
  nama: string
  created_at: string
  updated_at: string
  is_approve: boolean
}

interface Props {
  kurikulums: Kurikulum[]
}

export default function Index({ kurikulums }: Props) {
  const [open, setOpen] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState<number | null>(null)
  const [selectedKurikulumIds, setSelectedKurikulumIds] = React.useState<number[]>([])

  const handleDelete = () => {
    if (deleteId) {
      router.delete(route("kurikulums.destroy", deleteId), {
        onSuccess: () => {
          setOpen(false)
          setDeleteId(null)
        },
      })
    }
  }

  const handleSelectKurikulum = (kurikulumId: number, checked: boolean) => {
    if (checked) {
      setSelectedKurikulumIds([...selectedKurikulumIds, kurikulumId])
    } else {
      setSelectedKurikulumIds(selectedKurikulumIds.filter((id) => id !== kurikulumId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKurikulumIds(kurikulums.map((k) => k.id))
    } else {
      setSelectedKurikulumIds([])
    }
  }

  const handleBulkApprove = () => {
    router.put(
      "/admin/kurikulum/approve",
      {
        ids: selectedKurikulumIds,
        is_approve: true,
      },
      {
        preserveScroll: true,
        onSuccess: () => {
          setSelectedKurikulumIds([])
          console.log("Kurikulum berhasil di-approve")
        },
        onError: (errors) => {
          console.error("Gagal approve kurikulum:", errors)
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

  const { auth } = usePage<SharedData>().props

  const isAllSelected = kurikulums.length > 0 && selectedKurikulumIds.length === kurikulums.length
  const isIndeterminate = selectedKurikulumIds.length > 0 && selectedKurikulumIds.length < kurikulums.length

  return (
    <AppLayout>
      <Head title="Kurikulums" />
      <div className="container p-5">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kurikulum</h1>
          <div className="flex items-center gap-2">
            {selectedKurikulumIds.length > 0 && (
              <Button onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" />
                Approve ({selectedKurikulumIds.length})
              </Button>
            )}
               {
              auth.user.email.includes("admin") && 
            <Link href={route("kurikulums.create")}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </Link>
}
          </div>
        </div>

        <Table>
          <TableCaption>List of all kurikulums</TableCaption>
          <TableHeader>
            <TableRow>
              {
                auth.user.email.includes("kaprodi") &&  <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                  className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
                />
              </TableHead>
              }
             
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status Approval</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {kurikulums.map((kurikulum) => (
              <TableRow key={kurikulum.id}>
                 {
                auth.user.email.includes("kaprodi") &&
                <TableCell>
                  <Checkbox
                    checked={selectedKurikulumIds.includes(kurikulum.id)}
                    onCheckedChange={(checked) => handleSelectKurikulum(kurikulum.id, checked as boolean)}
                    aria-label={`Select ${kurikulum.nama}`}
                  />
                </TableCell>}
                <TableCell className="font-medium">{kurikulum.id}</TableCell>
                <TableCell>{kurikulum.nama}</TableCell>
                <TableCell>{new Date(kurikulum.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{getApprovalBadge(kurikulum.is_approve)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Link href={route("kurikulums.edit", kurikulum.id)}>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() => {
                          setDeleteId(kurikulum.id)
                          setOpen(true)
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
  )
}
