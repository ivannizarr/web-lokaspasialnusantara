import Header from '@/components/header'
import Footer from '@/components/footer'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { type BreadcrumbItem as ItemType } from '@/types'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next' // ✅ Tambahan untuk multibahasa

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: ItemType[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const { t } = useTranslation() // ✅ Inisialisasi i18next

    return (
        <>
            <Header />

            {breadcrumbs && breadcrumbs.length > 0 && (
                <Breadcrumb className="px-4 md:px-8 py-4">
                    <BreadcrumbList>
                        {breadcrumbs.map((item, idx) => (
                            <BreadcrumbItem key={idx}>
                                {item.href ? (
                                    <BreadcrumbLink href={item.href}>{t(item.title)}</BreadcrumbLink> // ✅ Gunakan i18n
                                ) : (
                                    <BreadcrumbPage>{t(item.title)}</BreadcrumbPage> // ✅ Gunakan i18n
                                )}
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            )}

            <main className="min-h-screen font-sans bg-background text-foreground">
                {children}
            </main>

            <Footer />
        </>
    )
}
