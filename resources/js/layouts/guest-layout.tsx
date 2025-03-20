'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useScroll, useSpring } from 'framer-motion';
import type React from 'react';

interface GuestLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-grow">{children}</main>

            <Footer />
        </div>
    );
}
