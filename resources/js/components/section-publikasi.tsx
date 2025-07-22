'use client'

import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const kategoriList = ['Buku', 'Peraturan', 'Modul Pelatihan'] as const
type Kategori = (typeof kategoriList)[number]

// Dummy data publikasi
const dummyPublikasi = [
  {
    title: 'Pengembangan Sistem Informasi Jaga Laut',
    description:
      'Dokumentasi sistem informasi maritim berbasis web yang digunakan untuk pemantauan aktivitas nelayan dan pengelolaan data tangkapan hasil laut secara akurat dan terintegrasi.',
    tags: ['Web Aplikasi', 'Inspeksi Teknik'],
    category: 'Buku',
    image: '/img/web-app.jpg',
    link: '/publikasi/#',
  },
  {
    title: 'Modul Pelatihan Drone',
    description:
      'Panduan teknis operasional drone untuk kegiatan pemetaan wilayah pesisir serta pelatihan penggunaan teknologi udara dalam mendukung survei dan monitoring wilayah laut.',
    tags: ['Foto Udara', 'Pelatihan'],
    category: 'Modul Pelatihan',
    image: '/img/foto-udara.jpg',
    link: '/publikasi/#',
  },
  {
    title: 'Peraturan Zonasi Laut',
    description:
      'Regulasi strategis mengenai tata kelola wilayah laut dan zonasi pemanfaatan ruang laut yang mendukung pengambilan keputusan berbasis spasial dan kebijakan.',
    tags: ['Kebijakan', 'Zonasi', 'GIS'],
    category: 'Peraturan',
    image: '/img/iot.jpg',
    link: '/publikasi/#',
  },
  {
    title: 'Standar Inspeksi Dermaga',
    description:
      'Pedoman teknis inspeksi dan evaluasi dermaga berbasis pemodelan struktur dan deteksi visual kondisi material dermaga secara berkala.',
    tags: ['Dermaga', 'Struktur'],
    category: 'Buku',
    image: '/img/foto-udara.jpg',
    link: '/publikasi/#',
  },
  {
    title: 'Peraturan Kawasan Konservasi Laut',
    description:
      'Landasan hukum pengelolaan kawasan konservasi laut untuk mendukung kelestarian ekosistem pesisir dan pelestarian spesies laut.',
    tags: ['Konservasi', 'Hukum'],
    category: 'Peraturan',
    image: '/img/web-app.jpg',
    link: '/publikasi/#',
  },
  {
    title: 'Modul Pelatihan GIS Laut',
    description:
      'Materi pelatihan penggunaan sistem informasi geografis (GIS) untuk analisis spasial wilayah laut dan pesisir dalam konteks perencanaan zonasi.',
    tags: ['GIS', 'Pelatihan'],
    category: 'Modul Pelatihan',
    image: '/img/iot.jpg',
    link: '/publikasi/#',
  },
  {
    title: 'Buku Panduan Identifikasi Spesies Laut',
    description:
      'Buku referensi lengkap tentang jenis-jenis spesies laut Indonesia, lengkap dengan gambar, klasifikasi, dan habitat alami.',
    tags: ['Biologi', 'Panduan'],
    category: 'Buku',
    image: '/img/foto-udara.jpg',
    link: '/publikasi/#',
  },
]

const ITEMS_PER_PAGE = 6

export default function SectionPublikasi() {
  const { t } = useTranslation()
  const [data, setData] = useState(dummyPublikasi)
  const [filters, setFilters] = useState<Kategori[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const categoryCount = kategoriList.reduce<Record<string, number>>((acc, curr) => {
    acc[curr] = data.filter((p) => p.category === curr).length
    return acc
  }, {})

  const handleFilterChange = (kategori: Kategori) => {
    setFilters((prev) =>
      prev.includes(kategori) ? prev.filter((item) => item !== kategori) : [...prev, kategori]
    )
    setCurrentPage(1)
  }

  const filteredData = data.filter((item) => {
    const matchFilter = filters.length === 0 || filters.includes(item.category as Kategori)
    const matchSearch = search === '' || item.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  const currentData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <section
      id="publikasi"
      className="bg-gray-700 text-foreground py-6 px-6 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-screen-xl mx-auto space-y-12">
        <div className="border-b border-white pb-6">
          <h2 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-yellow-400 font-extrabold font-nunito">
            {t('publikasi.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-10">
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 w-5 h-5" />
              <input
                type="text"
                placeholder={t('publikasi.search')}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 pr-4 py-2 w-full bg-transparent border border-white rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-800"
              />
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{t('publikasi.category')}</h3>
              <div className="flex flex-col gap-2">
                {kategoriList.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center justify-between cursor-pointer text-sm border border-white/10 px-3 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.includes(cat)}
                        onChange={() => handleFilterChange(cat)}
                        className="form-checkbox bg-gray-700 text-sky-800 border-zinc-600"
                      />
                      <span className="text-white font-medium">{t(`publikasi.kategori.${cat}`)}</span>
                    </div>
                    <span className="text-white/70 text-sm font-bold">{categoryCount[cat]}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Konten */}
          <div className="flex-1 space-y-12">
            {currentData.length === 0 ? (
              <p className="text-white text-xl">{t('publikasi.empty')}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {currentData.map((item, idx) => (
                  <div
                    key={idx}
                    className="h-full border border-sky-800 bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all flex flex-col"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="p-5 flex flex-col justify-between gap-4 flex-grow">
                      <div>
                        <h3 className="font-bold font-nunito text-white text-base line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white mt-2 line-clamp-4">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-sky-800 text-xs px-3 py-1 rounded-full text-white whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.link && (
                        <Link
                          href={item.link || '#'}
                          className={`text-center mt-1 border py-2 px-4 rounded-lg text-sm transition ${
                            item.link
                              ? 'cursor-pointer text-white border-white hover:bg-sky-800'
                              : 'cursor-not-allowed text-white/40 border-white/20'
                          }`}
                        >
                          {t('publikasi.download')}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-sm text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('publikasi.prev')}
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={`w-8 h-8 text-sm border border-zinc-300 rounded flex items-center justify-center transition ${
                      currentPage === i + 1
                        ? 'bg-white text-black'
                        : 'text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-sm text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('publikasi.next')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}