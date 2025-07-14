import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SectionFotoUdara from '@/components/SectionFotoUdara';
import SectionIoT from '@/components/SectionIoT';
import SectionInspeksiTeknik from '@/components/SectionInspeksiTeknik';
import SectionPenelitian from '@/components/SectionPenelitian';
import SectionAgrikultur from '@/components/SectionAgrikultur';
import SectionTelematika from '@/components/SectionTelematika';
import SectionWebApp from '@/components/SectionWebApp';
import SectionLayananLainnya from '@/components/SectionLayananLainnya';

export default function LayananPage() {

    return (
    <AppLayout>
  <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
    <SectionFotoUdara />
    <SectionIoT />
    <SectionInspeksiTeknik />
    <SectionPenelitian />
    <SectionAgrikultur />
    <SectionTelematika />
    <SectionWebApp />
    <SectionLayananLainnya />
  </div>
</AppLayout>
  );
}