'use client'

import { useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'

import SectionSiapaKami from '@/components/SectionSiapaKami'
import SectionAktivitasKami from '@/components/SectionAktivitasKami'
import SectionMitraKami from '@/components/SectionMitra'
import SectionKarir from '@/components/SectionKarir'
import Footer2 from '@/components/footer-v2'

import useActiveSection from '@/hooks/useActiveSection'

const sectionList = [
  { id: 'siapa-kami', title: 'Siapa Kami' },
  { id: 'aktivitas-kami', title: 'Aktivitas Kami' },
  { id: 'mitra', title: 'Mitra' },
  { id: 'karir', title: 'Karir' },
]

export default function TentangKamiPage() {
  const { props } = usePage<{ activeSection: string | null }>()
  const activeSection = props.activeSection

  const activeId = useActiveSection(sectionList.map(s => s.id))
  const activeTitle = sectionList.find(s => s.id === activeId)?.title ?? 'Tentang Kami'

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
