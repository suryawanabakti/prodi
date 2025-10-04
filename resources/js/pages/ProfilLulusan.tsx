"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GuestLayout from "@/layouts/guest-layout"
import { Head, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap, Users, Briefcase } from "lucide-react"

interface ProfilLulusan {
  id: number
  judul: string
  deskripsi: string
  gambar: string | null
  gambar_url: string | null
  urutan: number
  is_active: boolean
}

interface Props {
  prodi: {
    id: number
    nama_prodi: string
  }
  profilLulusan: ProfilLulusan[]
}

export default function ProfilLulusan({ prodi, profilLulusan }: Props) {
  // Filter active profiles and sort by urutan
  const activeProfiles = profilLulusan?.filter((item) => item.is_active)?.sort((a, b) => a.urutan - b.urutan) || []

  return (
    <GuestLayout>
      <Head title={`Profil Lulusan - ${prodi.nama_prodi}`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-green-900 to-green-700"></div>
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url('/placeholder.svg?height=500&width=1920')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
          }}
        ></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              className="mb-4 text-3xl font-bold text-white drop-shadow-md md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Profil Lulusan
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Peluang karir dan kompetensi lulusan Program Studi {prodi.nama_prodi}
            </motion.p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-green-600">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-green-600">Profil Lulusan</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Introduction */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Peluang Karir Lulusan</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Program Studi {prodi.nama_prodi} mempersiapkan lulusan dengan berbagai kompetensi untuk menghadapi
              tantangan dunia kerja di era digital. Berikut adalah profil dan peluang karir yang dapat dijalani oleh
              lulusan kami.
            </p>
          </motion.div>

          {/* Profiles Grid */}
          {activeProfiles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {activeProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden border-green-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="h-2 bg-gradient-to-r from-green-600 to-green-800"></div>

                    {/* Image Section */}
                    <div className="aspect-[4/3] w-full bg-green-50">
                      {profile.gambar_url ? (
                        <img
                          src={profile.gambar_url || "/placeholder.svg"}
                          alt={profile.judul}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Briefcase className="h-16 w-16 text-green-300" />
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                          {profile.urutan}
                        </div>
                        <h3 className="text-xl font-bold text-green-700 tracking-tight">{profile.judul}</h3>
                      </div>

                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">{profile.deskripsi}</p>
                      </div>

                      {/* Career Highlights */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                          <Briefcase className="h-4 w-4" />
                          <span>Peluang Karir Utama</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum Ada Profil Lulusan</h3>
              <p className="text-gray-500">Profil lulusan akan segera ditambahkan.</p>
            </motion.div>
          )}

          {/* Statistics Section */}
          {activeProfiles.length > 0 && (
            <motion.div
              className="mt-16 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-bold text-green-800">Statistik Lulusan</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{activeProfiles.length}</div>
                    <div className="text-green-700">Profil Karir</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <div className="text-green-700">Tingkat Kelulusan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">85%</div>
                    <div className="text-green-700">Terserap Kerja</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Button variant="outline" asChild className="transition-transform duration-300 hover:-translate-y-1">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </GuestLayout>
  )
}
