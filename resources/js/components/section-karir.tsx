'use client'

import { useState, useEffect } from 'react'
import { MapPin, CalendarDays, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const jobTypes = ['Full_Time', 'Part_Time', 'Internship'] as const
const JOBS_PER_PAGE = 4

type Karir = {
  title: string
  location: string
  year: string
  type: string 
  status: string 
  description: string
}

export default function JobListSection({ id = 'karir' }: { id?: string }) {
  const { t, i18n } = useTranslation()
  const [jobs, setJobs] = useState<Karir[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Load JSON file berdasarkan bahasa aktif
  useEffect(() => {
    const lang = i18n.language || 'id'
    const url = `/data/${lang}/karir.json`

    fetch(url)
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Gagal memuat data karir:', err))
  }, [i18n.language])

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
    setCurrentPage(1)
  }

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedTypes.length === 0 || selectedTypes.includes(job.type)) &&
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  )

  const jobCounts = jobTypes.reduce<Record<string, number>>((acc, type) => {
    acc[type] = jobs.filter((job) => job.type === type).length
    return acc
  }, {})

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <section
      id={id}
      className="relative z-10 pt-8 mt-0 bg-gray-700 text-foreground py-6 px-6 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-screen-xl mx-auto space-y-12">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-center text-yellow-400 font-extrabold font-nunito border-b border-white pb-6">
          {t('karir.title')}
        </h2>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-12">
          {/* Sidebar kiri */}
          <aside className="space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 w-5 h-5" />
              <input
                type="text"
                placeholder={t('karir.search')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 pr-4 py-2 w-full bg-transparent border border-white rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-800"
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">{t('karir.category')}</h3>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center justify-between cursor-pointer text-sm border border-white/10 px-3 py-2 rounded-md hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox bg-gray-700 text-sky-800 border-zinc-600"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      <span className="text-white font-medium">
                        {t(`karir.types.${type}`)}
                      </span>
                    </div>
                    <span className="text-white text-sm font-semibold">
                      {jobCounts[type]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Daftar lowongan */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {currentJobs.length === 0 ? (
                <p className="col-span-full text-white text-lg">
                  {t('karir.noJob')}
                </p>
              ) : (
                currentJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900 border border-sky-800 rounded-lg p-6 flex flex-col justify-between gap-4 hover:border-sky-800 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h3 className="text-xl font-bold font-nunito">
                          {job.title}
                        </h3>
                        <div className="flex gap-2">
                          <span className="bg-sky-800 text-xs px-3 py-1 rounded-full">
                            {t(`karir.types.${job.type}`)}
                          </span>
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              job.status === 'Open'
                                ? 'bg-green-600'
                                : 'bg-orange-400'
                            }`}
                          >
                            {t(`karir.status.${job.status}`)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-white">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-2 border-t border-white/10 mt-auto flex-wrap">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-sky-800" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="w-4 h-4 text-sky-800" />
                        {job.year}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        window.open(
                          `mailto:admin@lokaspasial.com?subject=${encodeURIComponent(
                            t('karir.emailSubject', { title: job.title })
                          )}&body=${encodeURIComponent(
                            t('karir.emailBody', { title: job.title })
                          )}`,
                          '_blank'
                        )
                      }
                      className="cursor-pointer mt-4 border border-white text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-all text-sm"
                    >
                      {t('karir.apply')}
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-sm text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('karir.prev')}
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`w-8 h-8 text-sm border border-zinc-300 rounded flex items-center justify-center transition ${
                      currentPage === index + 1
                        ? 'bg-white text-black'
                        : 'text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-sm text-white hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('karir.next')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
