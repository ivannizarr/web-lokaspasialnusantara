'use client'

import { useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

import AppLayout from '@/layouts/app-layout'
import SectionSiapaKami from '@/components/SectionSiapaKami'
import SectionAktivitasKami from '@/components/SectionAktivitasKami'
import SectionMitraKami from '@/components/SectionMitra'
import SectionKarir from '@/components/SectionKarir'
import Footer2 from '@/components/footer-v2'

import useActiveSection from '@/hooks/useActiveSection'

// Gunakan kunci i18next, bukan string hardcoded
const sectionKeys = ['siapaKami', 'aktivitasKami', 'mitra', 'karir'] as const
type SectionKey = typeof sectionKeys[number]

export default function TentangKamiPage() {
  const { t } = useTranslation()
  const { props } = usePage<{ activeSection: string | null }>()
  const activeSection = props.activeSection

  // Buat list section dengan ID dan label dari terjemahan
  const sectionList = sectionKeys.map((key) => ({
    id: key.replace(/([A-Z])/g, '-$1').toLowerCase(), // camelCase → kebab-case
    title: t(`nav.${key}`),
  }))

  const activeId = useActiveSection(sectionList.map((s) => s.id))
  const activeTitle = sectionList.find((s) => s.id === activeId)?.title ?? t('nav.tentangKami')

  useEffect(() => {
    if (activeSection) {
      const el = document.getElementById(activeSection)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [activeSection])

  return (
    <AppLayout>
      <Head title={`${activeTitle} - Loka Spasial Nusantara`} />
      <SectionSiapaKami id="siapa-kami" />
      <SectionAktivitasKami id="aktivitas-kami" />
      <SectionMitraKami id="mitra" />
      <SectionKarir id="karir" />
      <Footer2 />
    </AppLayout>
  )
}
