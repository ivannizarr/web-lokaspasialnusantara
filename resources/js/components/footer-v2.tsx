import React from "react"
import { Phone, Mail, MapPin } from "lucide-react"
import { Link } from '@inertiajs/react'
import { FaLinkedinIn, FaWhatsapp, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { useTranslation } from "react-i18next"

const Footer2 = () => {
  const { t } = useTranslation()

  return (
    <footer className="w-full bg-gray-800 px-6 md:px-11 py-10 flex flex-col items-center gap-7 text-white">
      <div className="w-full max-w-[1300px] flex flex-col gap-10">
        {/* Info dan menu link */}
        <div className="flex flex-col md:flex-row justify-between gap-12 text-sm md:text-base font-nunito">

          {/* Logo & Kontak */}
          <div className="flex flex-col gap-6 font-nunito text-base text-white mt-0 md:mt-2 mb-2 w-full md:w-auto">
            <div className="relative -top-1 sm:-top-2 md:-top-4">
              <img
                src="/white-logo.png"
                alt="Logo"
                className="h-22 sm:h-16 md:h-22 w-auto object-contain"
              />
            </div>

            <div className="space-y-4 relative -top-2 md:-top-6">
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 shrink-0" />
                <a href="https://wa.me/6282188885751" className="hover:text-yellow-400 transition">
                  +62-821-8888-5751
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 shrink-0" />
                <a href="mailto:admin@lokaspasial.com" className="hover:text-yellow-400 transition">
                  admin@lokaspasial.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 shrink-0 mt-1" />
                <a
                  href="https://www.google.com/maps?q=Denpasar+Selatan,+Kota+Denpasar,+Bali+80224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-400 transition"
                >
                  Denpasar Selatan, Kota Denpasar, Bali 80224
                </a>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white">

              {/* Tentang Kami */}
              <div>
                <h4 className="font-bold mb-4 text-sm sm:text-lg tracking-wide">
                  {t('nav.tentangKami')}
                </h4>
                <ul className="space-y-2 font-nunito font-semibold text-base text-gray-300">
                  {[
                    { label: t('nav.siapaKami'), href: '/tentang-kami/siapa-kami' },
                    { label: t('nav.aktivitasKami'), href: '/tentang-kami/aktivitas-kami' },
                    { label: t('nav.mitra'), href: '/tentang-kami/mitra' },
                    { label: t('nav.karir'), href: '/tentang-kami/karir' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="hover:text-yellow-400 transition">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Layanan */}
              <div>
                <h4 className="font-bold mb-4 text-base sm:text-lg tracking-wide">
                  {t('nav.layanan')}
                </h4>
                <ul className="space-y-2 font-nunito font-semibold text-base text-gray-300">
                  {[
                    { label: t('nav.fotoUdara'), href: '/layanan/foto-udara' },
                    { label: t('nav.iot'), href: '/layanan/internet-of-things' },
                    { label: t('nav.inspeksi'), href: '/layanan/inspeksi-teknik' },
                    { label: t('nav.penelitian'), href: '/layanan/penelitian' },
                    { label: t('nav.agrikultur'), href: '/layanan/agrikultur' },
                    { label: t('nav.telematika'), href: '/layanan/telematika' },
                    { label: t('nav.webapp'), href: '/layanan/website-aplikasi' },
                    { label: t('nav.lainnya'), href: '/layanan/layanan-lainnya' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="hover:text-yellow-400 transition">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Informasi */}
              <div>
                <h4 className="font-bold mb-4 text-base sm:text-lg tracking-wide">
                  {t('nav.informasi')}
                </h4>
                <ul className="space-y-2 font-nunito font-semibold text-base text-gray-300">
                  {[
                    { label: t('nav.publikasi'), href: '/informasi/publikasi' },
                    { label: t('nav.hasilProyek'), href: '/informasi/hasil-proyek' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="hover:text-yellow-400 transition">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Produk */}
              <div>
                <h4 className="font-bold mb-4 text-base sm:text-lg tracking-wide">
                  {t('nav.produk')}
                </h4>
                <ul className="space-y-2 font-nunito font-semibold text-base text-gray-300">
                  {[
                    { label: t('nav.rumahTeknologi'), href: '/produk/rumah-teknologi' },
                    { label: t('nav.genesis'), href: '/produk/genesis-data' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="hover:text-yellow-400 transition">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-white w-full max-w-[1300px]" />

      {/* Footer bawah */}
      <div className="w-full max-w-[1300px] flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs md:text-sm font-light font-nunito">
        <span className="text-center sm:text-left">
          ©2025 Loka Spasial Nusantara. All Rights Reserved.
        </span>

        <div className="flex gap-3">
          <a href="https://www.linkedin.com/company/lokaspasial" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
            aria-label="LinkedIn" title="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://wa.me/6282188885751" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
            aria-label="WhatsApp" title="WhatsApp">
            <FaWhatsapp size={20} />
          </a>
          <a href="https://www.instagram.com/lokaspasial" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
            aria-label="Instagram" title="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="https://x.com/lokaspasial" target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
            aria-label="X (Twitter)" title="X (Twitter)">
            <FaXTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer2
