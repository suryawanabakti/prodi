import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Cog, Database, Download, Home, LayoutGrid, List, Newspaper, User2 } from 'lucide-react';
import AppLogo from './app-logo';



const footerNavItems: NavItem[] = [
    {
        title: 'Pengaturan',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Cog,
    },
];

export function AppSidebar() {
    
    const adminNavItems: NavItem[] = [
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
            title: 'Tujuan',
            url: '/admin/tujuan',
            icon: Database,
        },
            {
            title: 'Profil Lulusan',
            url: '/admin/profil-lulusan',
            icon: Database,
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

    const kaprodiNavItem: NavItem[] = [
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
            title: 'Kurikulum',
            url: '/admin/kurikulums',
            icon: List,
        },
        {
            title: 'Dosen',
            url: '/admin/dosen',
            icon: User2,
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

    const dosenNavItem: NavItem[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
        },
       
        {
            title: 'Berita',
            url: '/admin/berita',
            icon: Newspaper,
        },
    
    ];

    let navItem = adminNavItems;

    const { auth } = usePage<SharedData>().props;

    let role = '';
    
    if (auth.user.email.includes('admin')) {
      role = 'admin';
      navItem = adminNavItems
    } else if (auth.user.email.includes('kaprodi')) {
      role = 'kaprodi';
      navItem = kaprodiNavItem
    } else if (auth.user.email.includes('dosen')) {
      role = 'dosen';
      navItem = dosenNavItem
    } else {
       role = 'dosen';
      navItem = dosenNavItem
    }
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
                <NavMain items={navItem} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto hidden" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
