'use client'

import { Link } from '@inertiajs/react'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const kategoriList = [
  'Foto Udara',
  'Internet of Things',
  'Inspeksi Teknik',
  'Penelitian',
  'Agrikultur',
  'Telematika',
  'Website Aplikasi',
  'Layanan Lainnya',
] as const

type Kategori = (typeof kategoriList)[number]

const dummyPublikasi = [
  {
    title: 'Pengembangan Sistem Informasi Jaga Laut',
    description:
      'Dokumentasi sistem informasi berbasis web aplikasi yang digunakan untuk pemantauan aktivitas nelayan dan pengelolaan data tangkapan hasil laut secara akurat dan terintegrasi.',
    tags: ['Website Aplikasi'],
    image: '/img/web-app.jpg',
    link: '/hasil-proyek/#',
  },
  {
    title: 'Modul Pelatihan Drone',
    description:
      'Panduan teknis operasional drone untuk kegiatan pemetaan wilayah pesisir serta pelatihan penggunaan teknologi udara dalam mendukung survei dan monitoring wilayah laut.',
    tags: ['Foto Udara', 'Penelitian'],
    image: '/img/foto-udara.jpg',
    link: '/hasil-proyek/#',
  },
  {
    title: 'Peraturan Zonasi Laut',
    description:
      'Regulasi strategis mengenai tata kelola wilayah laut dan zonasi pemanfaatan ruang laut yang mendukung pengambilan keputusan berbasis spasial dan kebijakan.',
    tags: ['Internet of Things', 'Penelitian'],
    image: '/img/iot.jpg',
    link: '/hasil-proyek/#',
  }
]

const ITEMS_PER_PAGE = 6

export default function SectionHasilProyek() {
  const { t } = useTranslation()
  const [data] = useState(dummyPublikasi)
  const [filters, setFilters] = useState<Kategori[]>([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const toggleFilter = (kategori: Kategori) => {
    setFilters((prev) =>
      prev.includes(kategori)
        ? prev.filter((item) => item !== kategori)
        : [...prev, kategori]
    )
    setCurrentPage(1)
  }

  const tagCounts = kategoriList.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = data.filter((item) => item.tags.includes(tag)).length
    return acc
  }, {})

  const filtered = data.filter((item) => {
    const matchSearch = search === '' || item.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filters.length === 0 || filters.some((f) => item.tags.includes(f))
    return matchSearch && matchFilter
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <section id="hasil-proyek" className="bg-gray-700 text-foreground py-6 px-6 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-screen-xl mx-auto space-y-12">
        <div className="border-b border-white pb-6">
          <h2 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-yellow-400 font-extrabold font-nunito">
            {t('hasilProyek.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-10">
          <aside className="space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 w-5 h-5" />
              <input
                type="text"
                placeholder={t('hasilProyek.search')}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 pr-4 py-2 w-full bg-transparent border border-white rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-800"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-white">{t('hasilProyek.category')}</h3>
              <div className="flex flex-col gap-2">
                {kategoriList.map((kategori) => (
                  <label
                    key={kategori}
                    className="flex items-center justify-between cursor-pointer text-sm border border-white/10 px-3 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.includes(kategori)}
                        onChange={() => toggleFilter(kategori)}
                        className="form-checkbox bg-gray-700 text-sky-800 border-zinc-600"
                      />
                      <span className="text-white font-medium">{t(`hasilProyek.kategori.${kategori}`)}</span>
                    </div>
                    <span className="text-white text-xs rounded-full px-2 py-[1px] font-bold">
                      {tagCounts[kategori]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {paginatedData.length === 0 ? (
                <p className="text-white text-xl col-span-full">
                  {t('hasilProyek.empty')}
                </p>
              ) : (
                paginatedData.map((item, idx) => (
                  <div
                    key={idx}
                    className="h-full border border-sky-800 bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all flex flex-col"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
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
                            className="bg-sky-800 text-[11px] px-3 py-1 rounded-full text-white whitespace-nowrap"
                          >
                            {t(`hasilProyek.kategori.${tag}`)}
                          </span>
                        ))}
                      </div>
                      {item.link && (
                        <Link
                          href={item.link}
                          className="cursor-pointer text-center font-nunito font-semibold mt-1 border border-white text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-all text-sm"
                        >
                          {t('hasilProyek.selengkapnya')}
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-sm text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('hasilProyek.prev')}
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
                  {t('hasilProyek.next')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
