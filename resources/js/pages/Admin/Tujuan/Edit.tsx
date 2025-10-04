"use client"

import type React from "react"

import { Head, Link, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { ArrowLeft } from "lucide-react"
import AppLayout from "@/layouts/app-layout"

interface Tujuan {
  id: number
  deskripsi: string
  urutan: number
  is_active: boolean
}

interface Props {
  tujuan: Tujuan
}

export default function TujuanEdit({ tujuan }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    deskripsi: tujuan.deskripsi,
    urutan: tujuan.urutan,
    is_active: tujuan.is_active,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route("admin.tujuan.update", tujuan.id))
  }

  return (
    <AppLayout>
      <Head title="Edit Tujuan" />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={route("admin.tujuan.index")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Tujuan</h1>
            <p className="text-muted-foreground">Edit tujuan program studi</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Edit Tujuan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi Tujuan</Label>
                <Textarea
                  id="deskripsi"
                  value={data.deskripsi}
                  onChange={(e) => setData("deskripsi", e.target.value)}
                  placeholder="Masukkan deskripsi tujuan..."
                  rows={4}
                />
                {errors.deskripsi && <p className="text-sm text-destructive">{errors.deskripsi}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="urutan">Urutan</Label>
                <Input
                  id="urutan"
                  type="number"
                  min="1"
                  value={data.urutan}
                  onChange={(e) => setData("urutan", Number.parseInt(e.target.value))}
                />
                {errors.urutan && <p className="text-sm text-destructive">{errors.urutan}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={data.is_active}
                  onCheckedChange={(checked) => setData("is_active", !!checked)}
                />
                <Label htmlFor="is_active">Aktif</Label>
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                  {processing ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href={route("admin.tujuan.index")}>Batal</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
