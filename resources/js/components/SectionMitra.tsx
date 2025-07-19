'use client'

import { useEffect, useState } from "react"
import PartnerSliderRow from "@/components/CarouselLogo"
import { useTranslation } from "react-i18next"

interface Mitra {
  slug: string
  name: string
  logo: string
  since: string
  projects: string
  type: string
  location: string
  description: string
}

const SectionMitraKami = ({ id = "mitra" }: { id?: string }) => {
  const [partnerList, setPartnerList] = useState<Mitra[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    fetch("/data/mitra.json")
      .then((res) => res.json())
      .then((data) => setPartnerList(data))
      .catch((err) => console.error("Gagal load mitra.json", err))
  }, [])

  const duplicated = [...partnerList, ...partnerList]
  const halfway = Math.ceil(duplicated.length / 2)
  const logos1 = duplicated.slice(0, halfway)
  const logos2 = duplicated.slice(halfway)

  return (
    <section
      id={id}
      className="relative z-10 pt-8 w-full bg-gray-500 px-4 sm:px-6 md:px-10 lg:px-16 py-20 flex flex-col items-center gap-10"
    >
      <div className="container w-full max-w-[1300px] border-b border-white pb-6">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-center text-yellow-400 font-extrabold font-nunito">
          {t("mitraKami.title")}
        </h2>
      </div>

      <p className="text-center text-sm sm:text-base md:text-lg lg:text-lg font-medium max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl leading-relaxed">
        {t("mitraKami.description")}
      </p>

      <div className="cursor-pointer flex flex-col gap-4 w-full max-w-7xl">
        <PartnerSliderRow logos={logos1} />
        <PartnerSliderRow logos={logos2} reverse />
      </div>
    </section>
  )
}

export default SectionMitraKami
