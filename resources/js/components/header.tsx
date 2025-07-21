import { useEffect, useRef, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Globe, ChevronDown, Menu, X, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSub, setOpenSub] = useState<Record<number, boolean>>({})
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { url, props } = usePage() as { url: string; props: any }
  const user = props.auth?.user
  const isLoggedIn = !!user

  const { t } = useTranslation()

  const toggleLang = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id'
    i18n.changeLanguage(nextLang)
    localStorage.setItem('lang', nextLang)
  }

  const getInitial = (name: string) => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const menus: MenuItem[] = [
    {
      label: t('nav.tentangKami'),
      href: '',
      children: [
        { label: t('nav.siapaKami'), href: '/tentang-kami/siapa-kami' },
        { label: t('nav.aktivitasKami'), href: '/tentang-kami/aktivitas-kami' },
        { label: t('nav.mitra'), href: '/tentang-kami/mitra' },
        { label: t('nav.karir'), href: '/tentang-kami/karir' },
        { label: t('nav.administrasi'), href: '/tentang-kami/administrasi' },
      ],
    },
    {
      label: t('nav.informasi'),
      href: '',
      children: [
        { label: t('nav.publikasi'), href: '/informasi/publikasi' },
        { label: t('nav.hasilProyek'), href: '/informasi/hasil-proyek' },
      ],
    },
    {
      label: t('nav.layanan'),
      href: '',
      children: [
        { label: t('nav.fotoUdara'), href: '/layanan/foto-udara' },
        { label: t('nav.iot'), href: '/layanan/internet-of-things' },
        { label: t('nav.inspeksi'), href: '/layanan/inspeksi-teknik' },
        { label: t('nav.penelitian'), href: '/layanan/penelitian' },
        { label: t('nav.agrikultur'), href: '/layanan/agrikultur' },
        { label: t('nav.telematika'), href: '/layanan/telematika' },
        { label: t('nav.webapp'), href: '/layanan/website-aplikasi' },
        { label: t('nav.lainnya'), href: '/layanan/layanan-lainnya' },
      ],
    },
    {
      label: t('nav.produk'),
      href: '',
      children: [
        { label: t('nav.rumahTeknologi'), href: '/produk/rumah-teknologi' },
        { label: t('nav.genesis'), href: '/produk/genesis-data' },
      ],
    },
    { label: t('nav.hubungiKami'), href: '/hubungi-kami' },
  ]

  const toggleSub = (i: number) =>
    setOpenSub((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((k) => [k, false])),
      [i]: !prev[i],
    }))

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setShowHeader(y < lastScrollY.current || y < 100)
      setScrolled(y > 10)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = mobileMenuRef.current
    if (el) el.style.transform = menuOpen ? 'translateX(0%)' : 'translateX(100%)'

    const handleOutsideMenu = (e: MouseEvent) => {
      if (menuOpen && el && !el.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideMenu)
    return () => document.removeEventListener('mousedown', handleOutsideMenu)
  }, [menuOpen])

  useEffect(() => {
    const handleOutsideDropdown = (e: MouseEvent) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideDropdown)
    return () => document.removeEventListener('mousedown', handleOutsideDropdown)
  }, [dropdownOpen])

  return (
    <header
      className={`fixed top-0 z-[60] w-full transition-transform duration-500 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? 'bg-black/45' : ''}`}
    >
      <div className="relative z-[60] mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 xl:h-24 xl:px-8">
        <Link href="/" className="relative z-[70] select-none">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="max-h-20 sm:max-h-16 xl:max-h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {menus.map((m, i) => {
            const activeParent = m.href && url === m.href
            const activeChild = m.children?.some((c) => url === c.href.split('#')[0])
            return (
              <div key={i} className="group relative">
                <div className="flex cursor-pointer items-center gap-1 text-white group-hover:text-yellow-400">
                  <Link
                    href={m.href || '#'}
                    className={`font-nunito text-base font-semibold ${
                      activeParent || activeChild ? 'text-yellow-400' : ''
                    }`}
                  >
                    {m.label}
                  </Link>
                  {m.children && (
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 group-hover:rotate-180 ${
                        activeParent || activeChild ? 'text-yellow-400' : ''
                      }`}
                    />
                  )}
                </div>
                {m.children && (
                  <div className="absolute left-[-15px] z-50 mt-0 hidden min-w-[160px] rounded-lg bg-black/70 py-1 text-white shadow-lg group-hover:block">
                    {m.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block px-4 py-0 text-sm hover:text-yellow-400 hover:bg-white/30 rounded ${
                          url === c.href ? 'text-yellow-400 font-semibold' : ''
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="hidden items-center gap-10 xl:flex relative">
          <div className="font-nunito flex items-center gap-1 text-sm text-white">
          <Globe size={18} />
          <span
            className={`cursor-pointer font-bold hover:text-yellow-400 ${
              i18n.language === 'id' ? 'text-yellow-400' : ''
            }`}
            onClick={() => i18n.changeLanguage('id')}
          >
            Indonesia
          </span>
          <span className="mx-1 text-xs">|</span>
          <span
            className={`cursor-pointer font-bold hover:text-yellow-400 ${
              i18n.language === 'en' ? 'text-yellow-400' : ''
            }`}
            onClick={() => i18n.changeLanguage('en')}
          >
            English
          </span>
        </div>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="cursor-pointer font-nunito rounded-lg border border-white px-8 py-1 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              {t('nav.login')}
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full px-3 py-2 focus:outline-none"
              >
                <div className="cursor-pointer h-8 w-8 rounded-full border-2 border-gray-300 bg-sky-700 flex items-center justify-center text-gray-300 font-bold text-xs">
                  {getInitial(user.name)}
                </div>
                <span className="text-gray-300 text-sm item-center font-bold cursor-pointer">{user.name}</span>
              </button>

              {dropdownOpen && (
              <div className="absolute right-0 w-30 rounded-lg bg-black/70 px-1 py-1 text-sm text-white shadow-xl z-[99] space-y-0">
                <Link
                  href="/dashboard"
                  className="block w-full rounded-md px-4 py-1 text-center font-semibold hover:bg-white/30 hover:text-yellow-400 transition"
                >
                  {t('nav.dashboard')}
                </Link>
                <Link
                href="/logout"
                method="post"
                as="button"
                className="flex items-center justify-center gap-1 w-full rounded-md px-4 py-1 text-center font-bold text-red-500 hover:text-red-600 hover:bg-white/30 transition"
              >
                <LogOut size={18} />
                {t('nav.keluar')}
              </Link>
              </div>
            )}
            </div>
          )}
        </div>

        <button
          aria-label="Buka menu"
          className="relative z-[80] text-white xl:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} />
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setMenuOpen(false)} />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 z-[70] h-screen w-[90%] max-w-sm bg-gray-800 px-6 text-white shadow-2xl transition-transform duration-400 sm:px-10"
          >
            <button
              aria-label="Tutup menu"
              className="absolute top-6 right-4 z-[60]"
              onClick={() => setMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="space-y-6 pt-20">
              {menus.map((m, i) => (
                <div key={i}>
                  {m.children ? (
                    <>
                      <div
                        className="flex items-center justify-between text-lg font-semibold hover:text-yellow-400"
                        onClick={() => toggleSub(i)}
                      >
                        {m.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            openSub[i] ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {openSub[i] && (
                        <div className="ml-4 mt-2 space-y-2">
                          {m.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className={`block text-base text-white hover:text-yellow-400 ${
                                url === c.href ? 'text-yellow-400 font-semibold' : ''
                              }`}
                              onClick={() => setMenuOpen(false)}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={m.href}
                      className={`block text-lg font-semibold hover:text-yellow-400 ${
                        url === m.href ? 'text-yellow-400' : ''
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {m.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="space-y-4 border-t border-white/50 pt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-base">
                <Globe size={18} />
                <span
                  className={`cursor-pointer font-bold hover:text-yellow-500 ${
                    i18n.language === 'id' ? 'text-yellow-500' : ''
                  }`}
                  onClick={() => i18n.changeLanguage('id')}
                >
                  Indonesia
                </span>
                <span className="mx-1">|</span>
                <span
                  className={`cursor-pointer font-bold hover:text-yellow-500 ${
                    i18n.language === 'en' ? 'text-yellow-500' : ''
                  }`}
                  onClick={() => i18n.changeLanguage('en')}
                >
                  English
                </span>
              </div>

                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="w-full text-center rounded-lg border border-white px-35 py-2 font-semibold hover:bg-[#02517A] hover:text-white"
                  >
                    {t('nav.login')}
                  </Link>
                ) : (
                  <div className="space-y-3 border-t border-white/50 text-left">
                    <button
                      onClick={() => setDropdownOpenMobile(!dropdownOpenMobile)}
                      className="flex mt-4 bg-gray-700 px-2 py-2 rounded-lg w-full items-center justify-center gap-3 focus:outline-none"
                    >
                      <div className="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300 bg-sky-700 flex items-center justify-center text-gray-300 font-bold text-sm">
                        {getInitial(user.name)}
                      </div>
                      <span className="cursor-pointer font-semibold text-gray-300">{user.name}</span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-300 transition-transform duration-300 ${
                          dropdownOpenMobile ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {dropdownOpenMobile && (
                    <div className="mt-1 w-full rounded-lg bg-gray-700 px-4 py-3 text-base text-white shadow-lg space-y-2">
                      <Link
                        href="/dashboard"
                        className="block w-full rounded-md bg-white/10 px-4 py-2 text-center font-semibold text-white hover:bg-white/20 transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        {t('nav.dashboard')}
                      </Link>
                      <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex items-center justify-center gap-2 w-full rounded-md px-4 py-2 text-center font-bold text-red-500 hover:bg-white/10 transition"
                      >
                        <LogOut size={18} />
                        {t('nav.keluar')}
                        </Link>
                    </div>
                  )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
