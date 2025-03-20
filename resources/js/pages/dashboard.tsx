import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BookOpen, GraduationCap, Newspaper, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
];

export default function Dashboard({ totalStats }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Dosen</CardTitle>
                            <Users className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStats.dosen}</div>
                            <p className="text-muted-foreground text-xs">+{totalStats.dosen} bulan ini</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Mata Kuliah</CardTitle>
                            <BookOpen className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStats.mataKuliah}</div>
                            <p className="text-muted-foreground text-xs">+{totalStats.mataKuliah} semester ini</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Berita</CardTitle>
                            <Newspaper className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalStats.berita}</div>
                            <p className="text-muted-foreground text-xs">+{totalStats.berita} bulan ini</p>
                        </CardContent>
                    </Card>

                    <Card className="hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pengunjung Website</CardTitle>
                            <GraduationCap className="text-muted-foreground h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-muted-foreground text-xs">+21% dari bulan lalu</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
