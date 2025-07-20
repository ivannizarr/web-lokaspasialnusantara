import { Head, Link, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, Home, User, FileText, LogOut, MoveLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import ProfileCard from '@/components/ProfileCard'
import TransaksiSection from '@/components/TransaksiSection'

export default function Dashboard() {
  const { props, url } = usePage() as { props: any; url: string }
  const user = props.auth.user
  const section = props.section 
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef(null)

  const { t } = useTranslation()

  const getInitial = (name: string) => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !(overlayRef.current as any).contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const menuItems = [
    { label: t('dashboard.menu.dashboard'), href: '/dashboard', icon: Home },
    { label: t('dashboard.menu.transaksi'), href: '/dashboard/transaksi', icon: FileText },
    { label: t('dashboard.menu.pengaturan'), href: '/dashboard/profile', icon: User },
  ]

  return (
    <>
      <Head title="Dashboard" />
      <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
        {/* Sidebar */}
        <aside
          ref={overlayRef}
          className={`fixed xl:relative z-50 w-64 bg-gray-800 p-6 flex flex-col justify-between h-full shadow transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
          }`}
        >
          <div>
            <div className="flex flex-col items-center mb-8">
              <div className="h-16 w-16 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold text-lg">
                {getInitial(user.name)}
              </div>
              <p className="mt-2 font-semibold text-center">{user.name}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-600 mb-4" />

            <nav className="space-y-2 text-sm">
              {menuItems.map(({ label, href, icon: Icon }) => {
                const isActive =
                  (label === t('dashboard.menu.pengaturan') && section === 'profile') ||
                  (label === t('dashboard.menu.transaksi') && section === 'transaksi') ||
                  (label === t('dashboard.menu.dashboard') &&
                    (!section || section === 'home' || section === undefined))

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md font-semibold ${
                      isActive
                        ? 'bg-sky-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-gray-600">
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-700"
            >
              <LogOut size={18} />
              {t('dashboard.logout')}
            </Link>
          </div>
        </aside>

        {menuOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 xl:hidden" />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar Mobile */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 xl:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-yellow-400 hover:underline"
            >
              <MoveLeft size={16} strokeWidth={2} />
              {t('dashboard.back')}
            </Link>
          </div>

          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold capitalize">
                {section === 'profile'
                  ? t('dashboard.title.pengaturan')
                  : section === 'transaksi'
                  ? t('dashboard.title.transaksi')
                  : t('dashboard.title.dashboard')}
              </h1>

              <Link
                href="/"
                className="hidden xl:inline-block text-sm font-semibold hover:text-yellow-400 text-white"
              >
                <span className="inline-flex items-center gap-2 hover:underline">
                  <MoveLeft size={16} strokeWidth={2} />
                  {t('dashboard.back')}
                </span>
              </Link>
            </div>

            {section === 'profile' ? (
              <>
                <Head title={t('dashboard.title.pengaturan')}>
                  <meta name="description" content="Edit dan kelola profil Anda" />
                </Head>
                <ProfileCard user={user} getInitial={getInitial} />
              </>
            ) : section === 'transaksi' ? (
              <>
                <Head title={t('dashboard.title.transaksi')}>
                  <meta name="description" content="Lihat riwayat dan detail transaksi Anda" />
                </Head>
                <TransaksiSection />
              </>
            ) : (
              <div className="bg-gray-700 rounded-lg shadow p-6 text-white text-center">
                <h2 className="text-lg font-semibold mb-2">
                  {t('dashboard.welcome', { name: user.name })}
                </h2>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
