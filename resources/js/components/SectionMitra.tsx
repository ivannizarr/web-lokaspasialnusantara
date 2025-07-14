import { useEffect, useState } from "react";
import PartnerSliderRow from "@/components/CarouselLogo";

const partnerImages1 = [
  "/mitra/1.jpg",
  "/mitra/2.jpg",
  "/mitra/3.jpg",
  "/mitra/4.jpg",
  "/mitra/5.jpg",
  "/mitra/1.jpg",
  "/mitra/2.jpg",
  "/mitra/3.jpg",
  "/mitra/4.jpg",
  "/mitra/5.jpg",
];
const partnerImages2 = [
  "/mitra/6.jpg",
  "/mitra/7.jpg",
  "/mitra/8.jpg",
  "/mitra/9.jpg",
  "/mitra/10.jpg",
  "/mitra/6.jpg",
  "/mitra/7.jpg",
  "/mitra/8.jpg",
  "/mitra/9.jpg",
  "/mitra/10.jpg",
];

const SectionMitraKami = ({ id = "mitra" }: { id?: string }) => {
  return (
    <section
      id={id}
      className="relative z-10 pt-15 w-full bg-gray-200 text-black px-4 sm:px-6 md:px-10 lg:px-16 py-20 flex flex-col items-center gap-10"
    >
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold font-nunito">
        Mitra Kami
      </h2>

      <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl leading-relaxed">
        Kami menjalin kemitraan dengan berbagai latar belakang pemangku kepentingan. Kami membuka kolaborasi untuk meningkatkan perekonomian, pengetahuan, dan kesadaran masyarakat, serta membuat bumi lebih baik.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-7xl">
        <PartnerSliderRow logos={partnerImages1} />
        <PartnerSliderRow logos={partnerImages2} reverse />
      </div>
    </section>
  );
};

export default SectionMitraKami;
