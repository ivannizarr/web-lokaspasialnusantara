import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import SectionSiapaKami from '@/components/SectionSiapaKami';
import SectionAktivitasKami from '@/components/SectionAktivitasKami';
import SectionMitraKami from '@/components/SectionMitra';
import SectionKarir from '@/components/SectionKarir';
import Footer2 from '@/components/footer-v2';

export default function TentangKamiPage() {
  const { props } = usePage<{ activeSection: string | null }>();
  const activeSection = props.activeSection;

  useEffect(() => {
  if (activeSection) {
    const section = document.getElementById(activeSection);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); 
    }
  }
}, [activeSection]);

  return (
    <AppLayout>
      <SectionSiapaKami id="siapa-kami" />
      <SectionAktivitasKami id="aktivitas-kami" />
      <SectionMitraKami id="mitra" />
      <SectionKarir id="karir" />
      <Footer2 />
    </AppLayout>
  );
}
