"use client"

import type React from "react"

import { Head, Link, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { ArrowLeft, Upload } from "lucide-react"
import { useState } from "react"
import AppLayout from "@/layouts/app-layout"

export default function ProfilLulusanCreate() {
  const { data, setData, post, processing, errors } = useForm({
    judul: "",
    deskripsi: "",
    gambar: null as File | null,
    urutan: 1,
    is_active: true,
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setData("gambar", file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route("admin.profil-lulusan.store"))
  }

  return (
    <AppLayout>
      <Head title="Tambah Profil Lulusan" />

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={route("admin.profil-lulusan.index")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tambah Profil Lulusan</h1>
            <p className="text-muted-foreground">Tambah profil lulusan program studi baru</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Profil Lulusan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="judul">Judul Profil</Label>
                <Input
                  id="judul"
                  value={data.judul}
                  onChange={(e) => setData("judul", e.target.value)}
                  placeholder="Masukkan judul profil lulusan..."
                />
                {errors.judul && <p className="text-sm text-destructive">{errors.judul}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={data.deskripsi}
                  onChange={(e) => setData("deskripsi", e.target.value)}
                  placeholder="Masukkan deskripsi profil lulusan..."
                  rows={4}
                />
                {errors.deskripsi && <p className="text-sm text-destructive">{errors.deskripsi}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gambar">Gambar</Label>
                <div className="flex items-center gap-4">
                  <Input id="gambar" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("gambar")?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Pilih Gambar
                  </Button>
                  {previewImage && (
                    <img
                      src={previewImage || "/placeholder.svg"}
                      alt="Preview"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  )}
                </div>
                {errors.gambar && <p className="text-sm text-destructive">{errors.gambar}</p>}
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
                  {processing ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button variant="outline" asChild>
                  <Link href={route("admin.profil-lulusan.index")}>Batal</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
