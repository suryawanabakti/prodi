'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ChevronDown, LogOut, Menu, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { auth } = usePage().props as any;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Beranda', href: '/' },
        {
            name: 'Tentang',
            href: '#',
            children: [
                { name: 'Visi & Misi', href: '/visi-misi' },
                { name: 'Unduhan', href: '/unduhan' },
                { name: 'Tujuan', href: '/tujuan' },
                { name: 'Profil Lulusan', href: '/profil-lulusan' },
            ],
        },
        { name: 'Dosen', href: '/dosen' },
        { name: 'Mata Kuliah', href: '/mata-kuliah' },
        { name: 'Alumni', href: '/alumni' },
        { name: 'Berita', href: '/berita' },
    ];

    const navItemVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.05 * i,
                duration: 0.3,
            },
        }),
    };

    return (
        <motion.header
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${
                scrolled ? 'bg-white/95 shadow-lg dark:bg-gray-900/95' : 'bg-transparent'
            } supports-[backdrop-filter]:backdrop-blur-md`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="container flex h-20 items-center">
                <div className="mr-8 flex items-center">
                    <Link href="/" className="flex items-center space-x-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-green-100 shadow-md"
                        >
                            <img
                                src="https://site.unitama.ac.id/wp-content/uploads/2024/08/Lambang-Unitama.png"
                                alt="UNITAMA Logo"
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                        <div className="flex flex-col">
                            <motion.span
                                className="text-lg leading-tight font-bold"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Sistem Informasi</span>
                            </motion.span>
                            <motion.span
                                className="text-xs text-gray-600 dark:text-gray-300"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Universitas Teknologi AKBA Makassar
                            </motion.span>
                            <motion.span
                                className="text-xs font-semibold text-green-600"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                UNITAMA
                            </motion.span>
                        </div>
                    </Link>
                </div>

                <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
                    <nav className="flex items-center space-x-8">
                        {navigation.map((item, i) =>
                            item.children ? (
                                <motion.div key={item.name} custom={i} initial="hidden" animate="visible" variants={navItemVariants}>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="flex items-center gap-1 transition-colors duration-300 hover:bg-transparent hover:text-green-600"
                                            >
                                                {item.name}
                                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-48 rounded-xl border-green-100 p-1 shadow-lg">
                                            {item.children.map((child) => (
                                                <DropdownMenuItem
                                                    key={child.name}
                                                    asChild
                                                    className="cursor-pointer rounded-lg hover:bg-green-50 focus:bg-green-50"
                                                >
                                                    <Link href={child.href} className="w-full">
                                                        {child.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </motion.div>
                            ) : (
                                <motion.div key={item.name} custom={i} initial="hidden" animate="visible" variants={navItemVariants}>
                                    <Link
                                        href={item.href}
                                        className="relative font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:text-green-600 hover:after:w-full"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ),
                        )}
                    </nav>
                    <div className="flex items-center space-x-2">
                        {auth?.user ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 transition-colors duration-300 hover:bg-green-50">
                                            <Avatar className="h-8 w-8 ring-2 ring-green-100">
                                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                <AvatarFallback className="bg-green-100 text-green-600">{auth.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>Hi, {auth.user.name}</span>
                                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-green-100 p-1 shadow-lg">
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-green-50 focus:bg-green-50">
                                            <Link href="/dashboard" className="w-full">
                                                <User className="mr-2 h-4 w-4 text-green-500" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="cursor-pointer rounded-lg hover:bg-green-50 focus:bg-green-50">
                                            <Link href="/logout" method="post" as="button" className="w-full">
                                                <LogOut className="mr-2 h-4 w-4 text-green-500" />
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                <Button
                                    variant="default"
                                    asChild
                                    className="rounded-full bg-gradient-to-r from-green-600 to-green-700 px-6 shadow-md transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:shadow-lg"
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="ml-auto flex md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="transition-colors duration-300 hover:bg-green-50 md:hidden">
                                <Menu className="h-5 w-5 text-green-600" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-green-100 p-0 sm:w-[400px]">
                            <div className="h-full bg-gradient-to-b from-white to-green-50/30 p-6">
                                <div className="mb-8 flex justify-center">
                                    <div className="flex flex-col items-center">
                                        <div className="mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-green-100 shadow-md">
                                            <img
                                                src="https://site.unitama.ac.id/wp-content/uploads/2024/08/Lambang-Unitama.png"
                                                alt="UNITAMA Logo"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-xl font-bold text-transparent">
                                            Sistem Informasi
                                        </span>
                                        <span className="text-xs text-gray-600">Universitas Teknologi AKBA Makassar</span>
                                        <span className="text-xs font-semibold text-green-600">UNITAMA</span>
                                    </div>
                                </div>

                                <nav className="mt-8 flex flex-col gap-5">
                                    {navigation.map((item, i) =>
                                        item.children ? (
                                            <motion.div
                                                key={item.name}
                                                className="space-y-3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i, duration: 0.3 }}
                                            >
                                                <div className="font-medium text-green-800">{item.name}</div>
                                                <div className="space-y-3 border-l-2 border-green-200 pl-4">
                                                    {item.children.map((child, j) => (
                                                        <motion.div
                                                            key={child.name}
                                                            initial={{ opacity: 0, x: 10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 * i + 0.05 * j, duration: 0.3 }}
                                                        >
                                                            <Link
                                                                href={child.href}
                                                                className="block text-gray-600 transition-colors duration-300 hover:text-green-600"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i, duration: 0.3 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="font-medium text-gray-800 transition-colors duration-300 hover:text-green-600"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        ),
                                    )}
                                </nav>

                                <div className="mt-12 border-t border-green-100 pt-6">
                                    {auth?.user ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 rounded-xl bg-white/80 p-3 shadow-sm">
                                                <Avatar className="h-12 w-12 ring-2 ring-green-100">
                                                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                    <AvatarFallback className="bg-green-100 text-lg text-green-600">
                                                        {auth.user.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-gray-800">Hi, {auth.user.name}</p>
                                                    <p className="text-sm text-gray-500">{auth.user.email}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                asChild
                                                className="w-full border-green-200 transition-all duration-300 hover:bg-green-50 hover:text-green-600"
                                            >
                                                <Link href="/profile" onClick={() => setIsOpen(false)}>
                                                    <User className="mr-2 h-4 w-4" />
                                                    Profile
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="default"
                                                asChild
                                                className="w-full bg-gradient-to-r from-green-600 to-green-700 transition-all duration-300 hover:from-green-700 hover:to-green-800"
                                            >
                                                <Link href="/logout" method="post" as="button" onClick={() => setIsOpen(false)}>
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Logout
                                                </Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            asChild
                                            className="w-full bg-gradient-to-r from-green-600 to-green-700 shadow-md transition-all duration-300 hover:from-green-700 hover:to-green-800"
                                        >
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                Login
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}
