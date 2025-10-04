"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import GuestLayout from "@/layouts/guest-layout"
import { Head, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { ArrowLeft, Target, CheckCircle, Lightbulb, TrendingUp } from "lucide-react"

interface Tujuan {
  id: number
  deskripsi: string
  urutan: number
  is_active: boolean
}

interface Props {
  prodi: {
    id: number
    nama_prodi: string
  }
  tujuan: Tujuan[]
}

export default function Tujuan({ prodi, tujuan }: Props) {
  // Filter active objectives and sort by urutan
  const activeTujuan = tujuan?.filter((item) => item.is_active)?.sort((a, b) => a.urutan - b.urutan) || []

  return (
    <GuestLayout>
      <Head title={`Tujuan - ${prodi.nama_prodi}`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
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
              Tujuan Program Studi
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Sasaran dan target pencapaian Program Studi {prodi.nama_prodi}
            </motion.p>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 z-10 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-blue-600">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-blue-600">Tujuan</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Introduction */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">Tujuan Program Studi</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Untuk mencapai visi dan misi yang telah ditetapkan, Program Studi {prodi.nama_prodi}
              memiliki tujuan-tujuan strategis yang menjadi panduan dalam penyelenggaraan pendidikan dan pengembangan
              program studi.
            </p>
          </motion.div>

          {/* Objectives List */}
          {activeTujuan.length > 0 ? (
            <div className="space-y-6">
              {activeTujuan.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-blue-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                          {item.urutan}
                        </div>
                        <div className="flex-1">
                          <div className="prose prose-blue max-w-none">
                            <p className="text-lg leading-relaxed text-gray-700">{item.deskripsi}</p>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="font-medium">Tujuan Strategis</span>
                          </div>
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
                <Target className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">Belum Ada Tujuan</h3>
              <p className="text-gray-500">Tujuan program studi akan segera ditambahkan.</p>
            </motion.div>
          )}

          {/* Key Focus Areas */}
          {activeTujuan.length > 0 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="overflow-hidden border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-center text-2xl font-bold text-blue-800">Area Fokus Utama</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-semibold text-blue-800">Inovasi</h4>
                      <p className="text-sm text-blue-700">Mengembangkan inovasi dalam bidang teknologi informasi</p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-semibold text-blue-800">Kualitas</h4>
                      <p className="text-sm text-blue-700">Meningkatkan kualitas pendidikan dan lulusan</p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="mb-2 font-semibold text-blue-800">Relevansi</h4>
                      <p className="text-sm text-blue-700">Menjaga relevansi dengan kebutuhan industri</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Statistics */}
          {activeTujuan.length > 0 && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-6">
                  <div className="text-3xl font-bold text-blue-600">{activeTujuan.length}</div>
                  <div className="text-blue-700">Tujuan Strategis</div>
                </div>
                <div className="rounded-lg bg-blue-50 p-6">
                  <div className="text-3xl font-bold text-blue-600">100%</div>
                  <div className="text-blue-700">Komitmen Pencapaian</div>
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
