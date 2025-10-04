import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-green-100 shadow-md">
                                <img
                                    src="https://site.unitama.ac.id/wp-content/uploads/2024/08/Lambang-Unitama.png"
                                    alt="UNITAMA Logo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold">Sistem Informasi</h3>
                                <span className="text-xs text-green-200">Universitas Teknologi AKBA Makassar</span>
                            </div>
                        </div>
                        <p className="mb-4 text-green-100">Membentuk generasi unggul dengan pendidikan berkualitas dan inovasi berkelanjutan.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-bold">Tautan Cepat</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/visi-misi" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Visi & Misi
                                </Link>
                            </li>
                            <li>
                                <Link href="/dosen" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Dosen
                                </Link>
                            </li>
                            <li>
                                <Link href="/mata-kuliah" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Mata Kuliah
                                </Link>
                            </li>
                            <li>
                                <Link href="/berita" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Berita
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-bold">Program Studi</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Kurikulum
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Penelitian
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Pengabdian
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Prestasi
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-green-100 transition-colors duration-300 hover:text-white">
                                    Alumni
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-xl font-bold">Kontak</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="mr-2 h-5 w-5 shrink-0 text-green-200" />
                                <span className="text-green-100">Jl. Perintis Kemerdekaan Km. 9 No. 75 Makassar.</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="mr-2 h-5 w-5 shrink-0 text-green-200" />
                                <span className="text-green-100">+62 123 4567 890</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-2 h-5 w-5 shrink-0 text-green-200" />
                                <span className="text-green-100">info@pendidikanteknologi.ac.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-green-700 pt-8 text-center">
                    <p className="text-green-200">
                        &copy; {new Date().getFullYear()} Program Studi Sistem Informasi - Universitas Teknologi AKBA Makassar (UNITAMA). All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
