import { useState } from 'react';
import { Dialog, LoaderCircle } from '@headlessui/react';
import { X } from 'lucide-react';

export default function ModalDownloadForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', reason: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.length < 3 || !form.email.includes('@') || form.reason.length < 10) {
      setError('Mohon lengkapi form dengan benar.');
      return;
    }

    // Kirim data ke backend
    const res = await fetch('/download/profil', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      window.open('/files/profil-perusahaan.pdf', '_blank'); // Atau pakai res.blob()
      onClose();
    } else {
      setError('Gagal mengirim data. Coba lagi nanti.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 w-full max-w-md rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Isi Data untuk Unduh Profil</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Kenapa kamu ingin mengunduh profil?"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full border rounded px-3 py-2"
            minLength={10}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="font-semibold mt-4 w-full cursor-pointer" tabIndex={4} disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Unduh Sekarang
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
