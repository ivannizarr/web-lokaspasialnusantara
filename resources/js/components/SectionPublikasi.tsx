'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

const kategoriList = ['Buku', 'Peraturan', 'Modul Pelatihan'] as const
type Kategori = (typeof kategoriList)[number]

const dummyPublikasi = [
  {
    title: 'Pengembangan Sistem Informasi Jaga Laut',
    description:
      'Dokumentasi sistem informasi maritim berbasis web yang digunakan untuk pemantauan aktivitas nelayan dan pengelolaan data tangkapan hasil laut secara akurat dan terintegrasi.',
    tags: ['Web Aplikasi', 'Inspeksi Teknik'],
    category: 'Buku',
    image: '/img/web-app.jpg',
  },
  {
    title: 'Modul Pelatihan Drone',
    description:
      'Panduan teknis operasional drone untuk kegiatan pemetaan wilayah pesisir serta pelatihan penggunaan teknologi udara dalam mendukung survei dan monitoring wilayah laut.',
    tags: ['Foto Udara', 'Pelatihan'],
    category: 'Modul Pelatihan',
    image: '/img/foto-udara.jpg',
  },
  {
    title: 'Peraturan Zonasi Laut',
    description:
      'Regulasi strategis mengenai tata kelola wilayah laut dan zonasi pemanfaatan ruang laut yang mendukung pengambilan keputusan berbasis spasial dan kebijakan.',
    tags: ['Kebijakan', 'Zonasi', 'GIS'],
    category: 'Peraturan',
    image: '/img/iot.jpg',
  },
]

export default function SectionPublikasi() {
  const [filters, setFilters] = useState<Kategori[]>([])
  const [search, setSearch] = useState('')

  const handleFilterChange = (kategori: Kategori) => {
    setFilters((prev) =>
      prev.includes(kategori)
        ? prev.filter((item) => item !== kategori)
        : [...prev, kategori]
    )
  }

  const filteredData = dummyPublikasi.filter((item) => {
    const matchFilter =
      filters.length === 0 || filters.includes(item.category as Kategori)
    const matchSearch =
      search === '' || item.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <section
      id="publikasi"
      className="bg-background text-foreground py-6 px-6 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-screen-xl mx-auto space-y-12">
        {/* Judul */}
        <div className="border-b border-white pb-6">
          <h2 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold font-nunito">
            Publikasi
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-64 space-y-6 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-transparent border border-white rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-800"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold">Kategori</h3>
              {kategoriList.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={filters.includes(cat)}
                    onChange={() => handleFilterChange(cat)}
                    className="form-checkbox bg-gray-700 text-sky-800 border-zinc-600"
                  />
                  <span className="text-white font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Konten Kartu */}
          <div className="flex-1">
            {filteredData.length === 0 ? (
              <p className="text-white text-xl">
                Tidak ada publikasi yang cocok.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {filteredData.map((item, idx) => (
                  <div
                    key={idx}
                    className="h-full border border-white/10 bg-black rounded-lg overflow-hidden shadow hover:shadow-lg transition-all flex flex-col"
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
                            className="bg-sky-800 text-xs px-3 py-1 rounded-full text-white whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href="#"
                        className="mt-2 inline-flex items-center text-sm font-semibold text-white hover:text-yellow-400"
                      >
                        Lihat Proyek →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">
              <button className="text-sm text-white hover:text-yellow-400">
                Sebelumnya
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className="w-8 h-8 text-sm border border-zinc-300 rounded flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  {page}
                </button>
              ))}
              <span className="text-white">...</span>
              <button className="text-sm text-white hover:text-yellow-400">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
