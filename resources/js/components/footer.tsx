import React, { useEffect, useState } from "react"
import { Link } from '@inertiajs/react'
import { FaWhatsapp } from "react-icons/fa"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const [showFooter, setShowFooter] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll ke bawah dan cukup jauh
        setShowFooter(false)
      } else {
        // Scroll ke atas
        setShowFooter(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <footer
      className={`fixed bottom-0 z-40 w-full px-4 py-2 text-xs font-light text-white backdrop-blur-sm sm:text-sm transition-transform duration-300 ${
        showFooter ? 'translate-y-0' : 'translate-y-full'
      } bg-[#02517A] border-t border-gray-400/30 shadow-lg`}
    >
      <div className="relative flex w-full items-center justify-center">
        {/* Teks footer */}
        <span className="text-center">
          ©{currentYear} Loka Spasial Nusantara. All Rights Reserved.
        </span>

        {/* WhatsApp Icon */}
        <Link
          href="https://wa.me/6282188885751"
          target="_blank"
          rel="noopener noreferrer"
          className={`absolute right-4 bottom-2 sm:right-6 sm:bottom-3 transition-transform duration-300 ${
            showFooter ? 'translate-y-0' : 'translate-y-20'
          }`}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full shadow-md transition-transform hover:scale-110 sm:h-11 sm:w-11 md:h-12 md:w-12">
            <div className="absolute inset-0 bg-green-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaWhatsapp className="text-xl text-white sm:text-2xl md:text-3xl" />
            </div>
          </div>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
