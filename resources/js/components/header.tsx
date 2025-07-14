import { useEffect, useRef, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Globe, ChevronDown, Menu, X } from 'lucide-react'

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

const menus: MenuItem[] = [
  {
    label: 'Tentang Kami',
    href: '',
    children: [
      { label: 'Siapa Kami', href: '/tentang-kami/siapa-kami' },
      { label: 'Aktivitas Kami', href: '/tentang-kami/aktivitas-kami' },
      { label: 'Mitra', href: '/tentang-kami/mitra' },
      { label: 'Karir', href: '/tentang-kami/karir' },
      { label: 'Administrasi', href: '/tentang-kami/administrasi' },
    ],
  },
  {
    label: 'Informasi',
    href: '',
    children: [
      { label: 'Publikasi', href: '/informasi/publikasi' },
      { label: 'Hasil Proyek', href: '/informasi/hasil-proyek' },
    ],
  },
  {
    label: 'Layanan',
    href: '',
    children: [
      { label: 'Foto Udara', href: '/layanan/#foto-udara' },
      { label: 'Internet of Things', href: '/layanan/#internet-of-things' },
      { label: 'Inspeksi Teknik', href: '/layanan/#inspeksi-teknik' },
      { label: 'Penelitian', href: '/layanan/#penelitian' },
      { label: 'Agrikultur', href: '/layanan/#agrikultur' },
      { label: 'Telematika', href: '/layanan/#telematika' },
      { label: 'Website Aplikasi', href: '/layanan/#website-aplikasi' },
      { label: 'Layanan Lainnya', href: '/layanan/#layanan-lainnya' },
    ],
  },
  {
    label: 'Produk',
    href: '',
    children: [
      { label: 'Rumah Teknologi', href: '/produk/rumah-teknologi' },
      { label: 'Genesis Data', href: '/produk/genesis-data' },
    ],
  },
  { label: 'Hubungi Kami', href: '/hubungi-kami' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSub, setOpenSub] = useState<Record<number, boolean>>({})
  const [showHeader, setShowHeader] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const { url } = usePage() as { url: string }
  const isLoggedIn = false // ganti dengan auth real jika ada

  /* ── scroll hide/reveal ─────────────────────────────── */
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

  /* ── mobile menu slide & outside click ──────────────── */
  useEffect(() => {
    const el = mobileMenuRef.current
    if (el) el.style.transform = menuOpen ? 'translateX(0%)' : 'translateX(100%)'

    const handleOutside = (e: MouseEvent) => {
      if (menuOpen && el && !el.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

  const toggleSub = (i: number) =>
    setOpenSub((prev) => ({ ...Object.fromEntries(Object.keys(prev).map(k => [k, false])), [i]: !prev[i] }))

  /* ── render ─────────────────────────────────────────── */
  return (
    <header
      className={`fixed top-0 z-[60] w-full transition-transform duration-500 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? 'bg-black/45' : ''}`}
    >
      {/* desktop bar */}
      <div className="relative z-[60] mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 xl:h-24 xl:px-8">
        <Link href="/" className="relative z-[70] select-none">
          <img
            src="/logo-white.png"
            alt="Logo"
            className="h-20 w-auto max-w-[300px] object-contain xl:h-24"
          />
        </Link>

        {/* desktop nav */}
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
                  <div className="absolute left-[-10px] z-50 mt-0 hidden min-w-[140px] rounded-lg bg-black/70 py-1 text-white shadow-lg group-hover:block">
                    {m.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`block px-3 py-0 text-sm hover:text-yellow-400 ${
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

        {/* desktop right */}
        <div className="hidden items-center gap-6 xl:flex">
          <div className="font-nunito flex items-center gap-1 text-sm text-white">
            <Globe size={18} />
            <span className="cursor-pointer font-bold hover:text-yellow-400">Indonesia</span>
            <span className="mx-1 text-xs">|</span>
            <span className="cursor-pointer font-bold hover:text-yellow-400">English</span>
          </div>
          {!isLoggedIn ? (
            <button className="font-nunito rounded-lg border border-white px-8 py-1 text-sm font-semibold text-white transition hover:bg-sky-800">
              Login
            </button>
          ) : (
            <div className="h-9 w-9 rounded-full bg-yellow-400" />
          )}
        </div>

        {/* mobile hamburger */}
        <button
          aria-label="Buka menu"
          className="relative z-[80] text-white xl:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={32} />
        </button>
      </div>

      {/* ── MOBILE OVERLAY & DRAWER ─────────────────────── */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setMenuOpen(false)} />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 z-[70] h-screen w-[90%] max-w-sm border-l border-white/30 bg-white px-6 text-black shadow-2xl transition-transform duration-500 sm:px-10"
          >
            <button
              aria-label="Tutup menu"
              className="absolute top-6 right-4 z-[80]"
              onClick={() => setMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="space-y-6 pt-20">
              {menus.map((m, i) => (
                <div key={i}>
                  <div
                    className="flex items-center justify-between text-lg font-semibold hover:text-yellow-400"
                    onClick={() => (m.children ? toggleSub(i) : setMenuOpen(false))}
                  >
                    {m.label}
                    {m.children && (
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openSub[i] ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>

                  {m.children && openSub[i] && (
                    <div className="ml-4 mt-2 space-y-2">
                      {m.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`block text-base text-gray-700 hover:text-yellow-400 ${
                            url === c.href ? 'text-yellow-400 font-semibold' : ''
                          }`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-10 space-y-4 border-t border-black/20 pt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-base">
                  <Globe size={18} />
                  <span className="cursor-pointer font-bold hover:text-yellow-500">Indonesia</span>
                  <span className="mx-1">|</span>
                  <span className="cursor-pointer font-bold hover:text-yellow-500">English</span>
                </div>
                {!isLoggedIn ? (
                  <button className="w-full rounded-xl border border-black px-6 py-2 font-semibold hover:bg-[#02517A] hover:text-white">
                    Login
                  </button>
                ) : (
                  <div className="mx-auto h-10 w-10 rounded-full bg-yellow-500" />
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
