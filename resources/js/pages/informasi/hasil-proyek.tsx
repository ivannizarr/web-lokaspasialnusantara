'use client'

import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import ScrollDownIndicator from '@/components/ScrollDownIndicator'
import SectionHasilProyek from '@/components/SectionHasilProyek'
import Footer2 from '@/components/footer-v2'
import { useTranslation } from 'react-i18next'

export default function HasilProyekPage() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <Head title={t('hasilProyek.title')} />
      <div className="flex flex-col min-h-screen bg-gray-600 text-white overflow-x-hidden">
        {/* HERO */}
        <section
          className="relative h-[100vh] bg-cover bg-center text-white flex items-center"
          style={{ backgroundImage: "url('/head.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 w-full px-6 md:px-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-yellow-400 font-nunito mb-4">
                {t('hasilProyek.title')}
              </h1>
              <p className="tracking-widest font-bold text-white uppercase text-sm md:text-base">
                {t('hasilProyek.subtitle')}
              </p>
            </div>
          </div>
          <ScrollDownIndicator />
        </section>
        <div>
          <SectionHasilProyek />
        </div>
        <Footer2 />
      </div>
    </AppLayout>
  )
}
