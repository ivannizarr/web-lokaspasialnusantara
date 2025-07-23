'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SlideItem } from '@/types/slide-item'

interface SlideProps {
  slide: SlideItem
}

const Slide = ({ slide }: SlideProps) => {
  const { t } = useTranslation()

  return (
    <motion.div
      className="relative flex h-screen min-w-full items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 mx-2 max-w-3xl rounded-2xl bg-gray-950/65 px-4 py-2 text-center text-white">
        <h1 className="font-montserrat mb-1 text-xl leading-tight font-bold tracking-tight text-yellow-400 sm:text-3xl md:text-3xl">
          {t(`${slide.key}.title`)}
        </h1>
        <p className="font-montserrat mb-4 text-sm leading-snug drop-shadow-md sm:text-base md:text-lg">
          {t(`${slide.key}.description`)}
        </p>
        <button className="font-nunito font-semibold cursor-pointer rounded-lg border border-white mb-1 px-4 py-1 text-sm text-white transition hover:bg-[#02517A] md:px-6 md:py-2 md:text-sm">
          {t(`${slide.key}.button`)}
        </button>
      </div>
    </motion.div>
  )
}

export default Slide
