import { Dialog } from '@headlessui/react'
import { X, LoaderCircle } from 'lucide-react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button' 

export default function ModalDownloadForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    reason: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    post('/download/profil', {
      preserveScroll: true,
      onSuccess: () => {
        window.open('/files/profil-perusahaan.pdf', '_blank')
        onClose()
        reset() // reset form setelah submit
      },
    })
  }

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/65">
      <div className="bg-white p-6 w-full max-w-md rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Isi Data untuk Unduh Profil</h3>
          <button onClick={onClose} aria-label="Tutup form">
          <X size={20} />
        </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <textarea
            placeholder="Kenapa kamu ingin mengunduh profil?"
            value={data.reason}
            onChange={(e) => setData('reason', e.target.value)}
            className="w-full border rounded px-3 py-2"
            minLength={10}
            required
          />
          {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}

          <Button type="submit" className="font-semibold mt-4 w-full cursor-pointer" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Unduh Sekarang
          </Button>
        </form>
      </div>
    </Dialog>
  )
}
