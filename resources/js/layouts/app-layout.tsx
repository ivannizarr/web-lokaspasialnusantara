import Header from '@/components/header'
import Footer from '@/components/footer'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { useTranslation } from 'react-i18next'

export default function AppLayout({ children, breadcrumbs = [] }) {
  const { t } = useTranslation()

  return (
    <>
      <Header />

      {breadcrumbs.length > 0 && (
        <Breadcrumb className="px-4 md:px-8 py-4">
          <BreadcrumbList>
            {breadcrumbs.map((item, idx) => (
              <BreadcrumbItem key={idx}>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>
                    {t(item.title)}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{t(item.title)}</BreadcrumbPage>
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
