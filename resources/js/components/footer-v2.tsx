import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link, usePage } from '@inertiajs/react'
import { FaLinkedinIn, FaWhatsapp, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer2 = () => {
  return (
    <footer className="w-full bg-[#02517A] px-6 md:px-11 py-10 flex flex-col items-center gap-7 text-white">
      <div className="w-full max-w-[1300px] flex flex-col gap-10">
        {/* info dan menu link */}
        <div className="flex flex-col md:flex-row justify-between gap-10 text-sm md:text-base font-nunito">
          
          {/* kontak footer*/}
          <div className="flex flex-col gap-4 text-lg font-nunito">
            <div className="flex items-center gap-3.5">
              <Phone className="w-6 h-6" />
              <a
                href="https://wa.me/6282188885751"
                className=" hover:text-yellow-400 hover:font-semibold transition"
              >
                +62-821-8888-5751
              </a>
            </div>
            <div className="flex items-center gap-3.5">
              <Mail className="w-6 h-6" />
              <a
                href="mailto:admin@lokaspasial.com"
                className=" hover:text-yellow-400 transition"
              >
                admin@lokaspasial.com
              </a>
            </div>
            <div className="flex items-center gap-3.5">
              <MapPin className="w-6 h-6" />
              <a
                href="https://www.google.com/maps?q=Denpasar+Selatan,+Kota+Denpasar,+Bali+80224"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-yellow-400 transition"
              >
                Denpasar Selatan, Kota Denpasar, Bali 80224
              </a>
            </div>
          </div>

          {/* grid footer */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-17">
            {/* tentang kami link */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <h4 className="font-bold mb-4 text-lg">Tentang Kami</h4>
                <ul className="space-y-1 font-semibold text-gray-300">
                  {[
                    { label: 'Siapa Kami', href: '/tentang/siapa-kami' },
                    { label: 'Aktivitas Kami', href: '/tentang/aktivitas' },
                    { label: 'Mitra', href: '/tentang/mitra' },
                    { label: 'Karir', href: '/tentang/karir' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className=" hover:text-yellow-400 transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* layanan link */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <h4 className="font-bold mb-4 text-lg">Layanan</h4>
                <ul className="space-y-1 font-semibold text-gray-300">
                  {[
                    { label: 'Foto Udara', href: '/layanan/foto-udara' },
                    { label: 'Internet of Things', href: '/layanan/iot' },
                    { label: 'Inspeksi Teknik', href: '/layanan/inspeksi' },
                    { label: 'Penelitian', href: '/layanan/penelitian' },
                    { label: 'Agrikultur', href: '/layanan/agrikultur' },
                    { label: 'Telematika', href: '/layanan/telematika' },
                    { label: 'Website Aplikasi', href: '/layanan/website' },
                    { label: 'Layanan lainnya', href: '/layanan/lainnya' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className=" hover:text-yellow-400 transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* informasi link */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <h4 className="font-bold mb-4 text-lg">Informasi</h4>
                <ul className="space-y-1 font-semibold text-gray-300">
                  {[
                    { label: 'Publikasi', href: '/informasi/publikasi' },
                    { label: 'Hasil Proyek', href: '/informasi/hasil-proyek' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className=" hover:text-yellow-400 transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* produk link */}
            <div className="flex flex-col h-full justify-between">
              <div>
                <h4 className="font-bold mb-4 text-lg">Produk</h4>
                <ul className="space-y-1 font-semibold text-gray-300">
                  {[
                    { label: 'Rumah Teknologi', href: '/produk/rumah-teknologi' },
                    { label: 'Genesis Data', href: '/produk/genesis-data' },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className=" hover:text-yellow-400 transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* devider */}
        <hr className="border-white w-full" />

        {/* footer */}
        <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs md:text-sm font-light font-nunito">
          {/* Copyright */}
          <span className="text-center sm:text-left">
            ©2025 Loka Spasial Nusantara. All Rights Reserved.
          </span>

          {/* icon social media */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/lokaspasial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://wa.me/6282188885751"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href="https://www.instagram.com/lokaspasial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://x.com/lokaspasial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white text-white rounded-full hover:text-yellow-400 transition"
              aria-label="X (Twitter)"
              title="X (Twitter)"
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
