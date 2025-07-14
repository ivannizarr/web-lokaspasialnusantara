import AppLayout from '@/layouts/app-layout'
import PageSection from '@/layouts/PageSection'

import SectionFotoUdara from '@/components/SectionFotoUdara'
import SectionIoT from '@/components/SectionIoT'
import SectionInspeksiTeknik from '@/components/SectionInspeksiTeknik'
import SectionPenelitian from '@/components/SectionPenelitian'
import SectionAgrikultur from '@/components/SectionAgrikultur'
import SectionTelematika from '@/components/SectionTelematika'
import SectionWebApp from '@/components/SectionWebApp'
import SectionLayananLainnya from '@/components/SectionLayananLainnya'

export default function LayananPage() {
  return (
    <AppLayout>
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll no-scrollbar">
        <PageSection id="#foto-udara" dir="up">
          <SectionFotoUdara />
        </PageSection>
        <PageSection id="#internet-of-things" dir="down">
          <SectionIoT />
        </PageSection>
        <PageSection id="#inspeksi-teknik" dir="up">
          <SectionInspeksiTeknik />
        </PageSection>
        <PageSection id="#penelitian" dir="down">
          <SectionPenelitian />
        </PageSection>
        <PageSection id="#agrikultur" dir="up">
          <SectionAgrikultur />
        </PageSection>
        <PageSection id="#telematika" dir="down">
          <SectionTelematika />
        </PageSection>
        <PageSection id="#website-aplikasi" dir="up">
          <SectionWebApp />
        </PageSection>
        <PageSection id="#layanan-lainnya" dir="down">
          <SectionLayananLainnya />
        </PageSection>
      </div>
    </AppLayout>
  )
}