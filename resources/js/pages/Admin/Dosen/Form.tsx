"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { Head, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Briefcase, Camera, Save, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import type React from "react"
import { useState } from "react"


interface DosenFormProps {
  dosen?: {
    nohp: string
    id?: number
    nidn?: string
    nama?: string
    user?: any
    bidang_keilmuwan: string
    foto: string | null
    prodi_id: string
  }
  prodi: { id: number; nama: string }[]
}

export default function DosenForm({ dosen, prodi }: DosenFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { data, setData, post, put, processing, errors } = useForm({
    nidn: dosen?.nidn || "",
    nama: dosen?.nama || "",
    email: dosen?.user?.email || "",
    password: "",
    password_confirmation: "",
    nohp: dosen?.nohp || "",
    bidang_keilmuwan: dosen?.bidang_keilmuwan || "",
    foto: null as File | null,
    prodi_id: dosen?.prodi_id || "",
  })

  const isEditing = !!dosen?.id

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditing) {
      post(route("admin.dosen.update", dosen.id))
    } else {
      post(route("admin.dosen.store"))
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/admin" },
    { title: "Dosen", href: "/admin/dosen" },
    { title: isEditing ? "Edit Dosen" : "Tambah Dosen", href: "#" },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={isEditing ? "Edit Dosen" : "Tambah Dosen"} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{isEditing ? "Edit Dosen" : "Tambah Dosen"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NIDN Field */}
              <div className="space-y-2">
                <Label htmlFor="nidn">NIDN</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="nidn"
                    type="text"
                    value={data.nidn}
                    onChange={(e) => setData("nidn", e.target.value)}
                    className="pl-10"
                    placeholder="Masukkan NIDN dosen"
                  />
                </div>
                {errors.nidn && <p className="text-sm text-red-600">{errors.nidn}</p>}
              </div>

              {/* Nama Field */}
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Dosen</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="nama"
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData("nama", e.target.value)}
                    className="pl-10"
                    placeholder="Masukkan nama dosen"
                  />
                </div>
                {errors.nama && <p className="text-sm text-red-600">{errors.nama}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="pl-10"
                    placeholder="Masukkan email dosen"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password{" "}
                  {isEditing && <span className="text-sm text-gray-500">(Kosongkan jika tidak ingin mengubah)</span>}
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Konfirmasi password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password_confirmation && <p className="text-sm text-red-600">{errors.password_confirmation}</p>}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="nohp">Nomor Handphone</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="nohp"
                    type="text"
                    value={data.nohp}
                    onChange={(e) => setData("nohp", e.target.value)}
                    className="pl-10"
                    placeholder="Masukkan nomor handphone"
                  />
                </div>
                {errors.nohp && <p className="text-sm text-red-600">{errors.nohp}</p>}
              </div>

              {/* Bidang Keilmuan Field */}
              <div className="space-y-2">
                <Label htmlFor="bidang_keilmuwan">Bidang Keilmuan</Label>
                <div className="relative">
                  <Briefcase className="absolute top-3 left-3 text-gray-400" />
                  <Textarea
                    id="bidang_keilmuwan"
                    value={data.bidang_keilmuwan}
                    onChange={(e) => setData("bidang_keilmuwan", e.target.value)}
                    className="min-h-[100px] pl-10"
                    placeholder="Masukkan bidang keilmuan"
                  />
                </div>
                {errors.bidang_keilmuwan && <p className="text-sm text-red-600">{errors.bidang_keilmuwan}</p>}
              </div>

              {/* Program Studi Field */}
              <div className="space-y-2">
                <Label htmlFor="prodi_id">Program Studi</Label>
                <Select value={data.prodi_id.toString()} onValueChange={(value) => setData("prodi_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih program studi" />
                  </SelectTrigger>
                  <SelectContent>
                    {prodi.map((p: any) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.nama_prodi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.prodi_id && <p className="text-sm text-red-600">{errors.prodi_id}</p>}
              </div>

              {/* Photo Field */}
              <div className="space-y-2">
                <Label htmlFor="foto">Foto Dosen</Label>
                <div className="flex items-center space-x-4">
                  {dosen?.foto && (
                    <img
                      src={dosen.foto ? "/storage/" + dosen.foto : ""}
                      alt={dosen.nama}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  )}
                  <Button type="button" variant="outline" onClick={() => document.getElementById("foto")?.click()}>
                    <Camera className="mr-2 h-4 w-4" /> Unggah Foto
                  </Button>
                  <Input
                    id="foto"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setData("foto", e.target.files?.[0] || null)}
                  />
                </div>
                {errors.foto && <p className="text-sm text-red-600">{errors.foto}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Batal
                </Button>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? "Menyimpan..." : isEditing ? "Perbarui Dosen" : "Simpan Dosen"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  )
}
