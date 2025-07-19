'use client'

import { useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

import AppLayout from '@/layouts/app-layout'
import PageSection from '@/layouts/PageSection'
import useActiveSection from '@/hooks/useActiveSection'

import SectionFotoUdara from '@/components/SectionFotoUdara'
import SectionIoT from '@/components/SectionIoT'
import SectionInspeksiTeknik from '@/components/SectionInspeksiTeknik'
import SectionPenelitian from '@/components/SectionPenelitian'
import SectionAgrikultur from '@/components/SectionAgrikultur'
import SectionTelematika from '@/components/SectionTelematika'
import SectionWebApp from '@/components/SectionWebApp'
import SectionLayananLainnya from '@/components/SectionLayananLainnya'

const sectionKeys = [
  'fotoUdara',
  'iot',
  'inspeksi',
  'penelitian',
  'agrikultur',
  'telematika',
  'webapp',
  'lainnya',
] as const

type SectionKey = typeof sectionKeys[number]

export default function LayananPage() {
  const { t } = useTranslation()
  const { props } = usePage<{ activeSection: string | null }>()
  const activeSection = props.activeSection

  const sectionList = sectionKeys.map((key) => ({
    id: key
      .replace(/[A-Z]/g, (match) => '-' + match.toLowerCase()) // camelCase → kebab-case
      .replace(/^iot$/, 'internet-of-things') // override khusus IoT
      .replace(/^webapp$/, 'website-aplikasi') // override khusus Web App
      .replace(/^lainnya$/, 'layanan-lainnya'), // override khusus Layanan Lainnya
    title: t(`nav.${key}`),
  }))

  const activeId = useActiveSection(sectionList.map((s) => s.id))
  const activeTitle = sectionList.find((s) => s.id === activeId)?.title ?? t('nav.layanan')

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
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar">
        <PageSection id="foto-udara" dir="up"><SectionFotoUdara /></PageSection>
        <PageSection id="internet-of-things" dir="down"><SectionIoT /></PageSection>
        <PageSection id="inspeksi-teknik" dir="up"><SectionInspeksiTeknik /></PageSection>
        <PageSection id="penelitian" dir="down"><SectionPenelitian /></PageSection>
        <PageSection id="agrikultur" dir="up"><SectionAgrikultur /></PageSection>
        <PageSection id="telematika" dir="down"><SectionTelematika /></PageSection>
        <PageSection id="website-aplikasi" dir="up"><SectionWebApp /></PageSection>
        <PageSection id="layanan-lainnya" dir="down"><SectionLayananLainnya /></PageSection>
      </div>
    </AppLayout>
  )
}
