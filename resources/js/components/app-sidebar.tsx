import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Cog, Download, Home, LayoutGrid, List, Newspaper, User2 } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Prodi',
        url: '/admin/prodi',
        icon: Home,
    },
    {
        title: 'Berita',
        url: '/admin/berita',
        icon: Newspaper,
    },
    {
        title: 'Unduhan',
        url: '/admin/unduhan',
        icon: Download,
    },

    {
        title: 'Dosen',
        url: '/admin/dosen',
        icon: User2,
    },
    {
        title: 'Kurikulum',
        url: '/admin/kurikulums',
        icon: List,
    },

    {
        title: 'Mata Kuliah',
        url: '/admin/mata-kuliah',
        icon: List,
    },

    {
        title: 'Alumni',
        url: '/admin/alumni',
        icon: User2,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Pengaturan',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Cog,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto hidden" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
