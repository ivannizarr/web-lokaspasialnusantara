'use client'
import { Link } from '@inertiajs/react';
import { useState } from 'react'
import { Search } from 'lucide-react'

// Daftar kategori berdasarkan tag yang digunakan
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

// Dummy data publikasi
const dummyPublikasi = [
  {
    title: 'Pengembangan Sistem Informasi Jaga Laut',
    description:
      'Dokumentasi sistem informasi maritim berbasis web yang digunakan untuk pemantauan aktivitas nelayan dan pengelolaan data tangkapan hasil laut secara akurat dan terintegrasi.',
    tags: ['Website Aplikasi', 'Inspeksi Teknik'],
    image: '/img/web-app.jpg',
  },
  {
    title: 'Modul Pelatihan Drone',
    description:
      'Panduan teknis operasional drone untuk kegiatan pemetaan wilayah pesisir serta pelatihan penggunaan teknologi udara dalam mendukung survei dan monitoring wilayah laut.',
    tags: ['Foto Udara', 'Penelitian'],
    image: '/img/foto-udara.jpg',
  },
  {
    title: 'Peraturan Zonasi Laut',
    description:
      'Regulasi strategis mengenai tata kelola wilayah laut dan zonasi pemanfaatan ruang laut yang mendukung pengambilan keputusan berbasis spasial dan kebijakan.',
    tags: ['Internet of Things', 'Penelitian'],
    image: '/img/iot.jpg',
  },
]

export default function SectionPublikasi() {
  const [filters, setFilters] = useState<Kategori[]>([])
  const [search, setSearch] = useState('')

  const toggleFilter = (kategori: Kategori) => {
    setFilters((prev) =>
      prev.includes(kategori)
        ? prev.filter((item) => item !== kategori)
        : [...prev, kategori]
    )
  }

  // Hitung jumlah per kategori
  const tagCounts = kategoriList.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = dummyPublikasi.filter((item) => item.tags.includes(tag)).length
    return acc
  }, {})

  const filtered = dummyPublikasi.filter((item) => {
    const matchSearch =
      search === '' || item.title.toLowerCase().includes(search.toLowerCase())

    const matchFilter =
      filters.length === 0 ||
      filters.some((f) => item.tags.includes(f as string))

    return matchSearch && matchFilter
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
            Hasil Proyek
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-10">
          {/* Sidebar filter */}
          <aside className="space-y-8">
            {/* Search */}
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

            {/* Kategori filter */}
            <div>
              <h3 className="font-semibold mb-2">Kategori</h3>
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
                      <span className="text-white font-medium">
                        {kategori}
                      </span>
                    </div>
                    <span className="text-white text-xs rounded-full px-2 py-[1px] font-bold">
                      {tagCounts[kategori]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Kartu konten Proyek*/}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filtered.length === 0 ? (
                <p className="text-white text-xl col-span-full">
                  Tidak ada yang cocok.
                </p>
              ) : (
                filtered.map((item, idx) => (
                  <div
                    key={idx}
                    className="h-full border border-white/10 bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition-all flex flex-col"
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
                      <Link
                      href={item.link}
                      className="cursor-pointer text-center font-nunito font-semibold mt-1 border border-white text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-all text-sm"
                    >
                      Lihat Proyek
                    </Link>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination (placeholder) */}
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
