import Header from '@/components/header'
import Footer from '@/components/footer'
import { type BreadcrumbItem } from '@/types'
import { type ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
  return (
    <>
      <Header />
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <main className="min-h-screen font-sans bg-background text-foreground">
        {children}
      </main>
      <Footer />
    </>
  )
}
