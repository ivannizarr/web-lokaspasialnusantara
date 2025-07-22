'use client'

import { useTranslation } from "react-i18next"
import ScrollDownIndicator from "@/components/scroll-down-indicator"

const SectionAgrikultur = () => {
  const { t } = useTranslation()

  return (
    <section
      id="agrikultur"
      className="flex flex-col w-full bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/img/agrikultur.jpg')" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Konten utama */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <div className="mx-2 w-full max-w-5xl rounded-2xl bg-gray-950/50 px-6 py-6 text-white">
          <h2 className="font-montserrat mb-2 text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight text-yellow-400 drop-shadow-[0_4px_80px_rgba(0,0,0,0.9)]">
            {t('agrikultur.title')}
          </h2>

          <p className="font-nunito mb-4 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            {t('agrikultur.description')}
          </p>

          <button
            onClick={() => (window.location.href = '/hubungi-kami')}
            className="font-nunito font-semibold cursor-pointer rounded-lg border border-white px-8 py-2 text-sm text-white transition hover:bg-sky-800"
          >
            {t('agrikultur.button')}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
        <ScrollDownIndicator />
    </section>
  )
}

export default SectionAgrikultur
