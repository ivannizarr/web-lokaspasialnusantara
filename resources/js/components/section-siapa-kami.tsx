'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import ScrollDownIndicator from '@/components/scroll-down-indicator'
import Footer from '@/components/footer'
import { Dialog } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/react'

const SectionSiapaKami = () => {
  const [openModal, setOpenModal] = useState(false)
  const { t } = useTranslation()
  const { auth } = usePage().props as unknown as { auth: { user: any } }

  const handleClickDownload = () => {
    if (!auth?.user) {
      // Redirect ke login dan setelah login kembali ke #siapa-kami
      window.location.href = '/login?redirect_to=siapa-kami'
    } else {
      setOpenModal(true)
    }
  }

  return (
    <section
      id="siapa-kami"
      className="relative flex flex-col w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/head.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-screen gap-5 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-yellow-400 font-extrabold font-nunito drop-shadow-[0_4px_80px_rgba(0,0,0,0.9)]">
          {t('siapaKami.title')}
        </h2>

        <p className="font-nunito text-sm sm:text-base md:text-lg font-medium leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] max-w-5xl mx-auto text-white">
          {t('siapaKami.description')}
        </p>

        <button
          onClick={handleClickDownload}
          className="cursor-pointer mx-auto flex items-center gap-3 px-5 py-2 text-sm font-semibold text-white border border-white rounded-md hover:bg-sky-800 transition-all duration-100"
        >
          {t('siapaKami.button')}
        </button>
      </div>

      <ScrollDownIndicator />
      <Footer />

      <DownloadModal open={openModal} onClose={() => setOpenModal(false)} />
    </section>
  )
}

export default SectionSiapaKami

// Modal Komponen
const DownloadModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '', reason: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (
      form.name.trim().length < 3 ||
      !form.email.includes('@') ||
      form.reason.trim().length < 10
    ) {
      setError(t('siapaKami.form.error'))
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/download/profil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        window.open('/files/profil-perusahaan.pdf', '_blank')
        onClose()
      } else {
        setError(t('siapaKami.form.serverError'))
      }
    } catch (err) {
      setError(t('siapaKami.form.networkError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-60 flex items-center justify-center bg-black/65 p-4">
      <Dialog.Panel className="bg-gray-800 text-white p-6 rounded-lg shadow max-w-xl w-full space-y-4 relative">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-nunito font-semibold text-white">
            {t('siapaKami.modalTitle')}
          </h3>
          <button onClick={onClose} aria-label="Close modal">
            <X className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t('siapaKami.form.name')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder={t('siapaKami.form.email')}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <textarea
            placeholder={t('siapaKami.form.reason')}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm min-h-[100px]"
            maxLength={300}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-800 text-white py-2 rounded hover:bg-sky-900 text-sm font-semibold cursor-pointer"
          >
            {loading ? t('siapaKami.form.sending') : t('siapaKami.form.submit')}
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  )
}
