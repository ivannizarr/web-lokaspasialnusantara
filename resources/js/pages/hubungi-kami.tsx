import { Head } from '@inertiajs/react' 
import AppLayout from '@/layouts/app-layout'      
import { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import ScrollDownIndicator from '@/components/ScrollDownIndicator'
import ReCaptchaWrapper, { ReCaptchaRef } from '@/components/ReCaptcha'

export default function ContactPage() {
  const captchaRef = useRef<ReCaptchaRef>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const token = captchaRef.current?.getValue()

    if (!token) {
      alert('Verifikasi captcha terlebih dahulu.')
      return
    }

    // Simulasi kirim form
    console.log({ ...form, captcha: token })
    alert('Form berhasil dikirim!')
    captchaRef.current?.reset()
  }

  return (
    <AppLayout>
      <Head title="Hubungi Kami" />
      <div className="flex flex-col min-h-screen bg-gray-600 text-white overflow-x-hidden">
        {/* HERO  */}
        <section
          className="relative h-[100vh] bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('/head.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 w-full px-6 md:px-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-yellow-400 font-nunito mb-4">
                Hubungi Kami
              </h1>
              <p className="tracking-widest font-bold text-white uppercase text-sm md:text-base">
                Loka Spasial Nusantara
              </p>
            </div>
          </div>
          <ScrollDownIndicator />
        </section>

        {/* KONTEN  */}
        <main className="flex-grow">
          <div className="max-w-[1440px] mx-auto py-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-16">
            {/* Info Kontak */}
            <div className="flex-1 flex flex-col text-white gap-10">
              <p className="text-lg leading-loose text-justify">
                Apakah Anda masih ada pertanyaan setelah membaca website kami? Hubungi kami melalui
                formulir berikut atau kirim email langsung. Kami menantikan pesan dari Anda.
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Hubungi Kami
              </h2>

              <div className="flex flex-col gap-6 text-base">
                <a
                  className="flex items-center gap-3"
                >
                  <Phone className="w-6 h-6" /> +62-821-8888-5751
                </a>

                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6" /> admin@lokaspasial.com
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" /> Denpasar Selatan, Kota Denpasar, Bali 80224
                </div>
              </div>
            </div>

            {/* Formulir Kontak */}
            <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow p-6 border border-sky-800">
              <form className="flex flex-col text-white gap-5" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Lengkap"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="topic"
                  placeholder="Topik"
                  value={form.topic}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md px-4 py-2"
                />
                <textarea
                  name="message"
                  placeholder="Pesan"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="border border-gray-400 rounded-md px-4 py-2"
                  required
                />

                <ReCaptchaWrapper ref={captchaRef} />

                <button
                  type="submit"
                  className="bg-sky-800 text-white py-2 px-5 cursor-pointer rounded-md font-semibold hover:bg-sky-900 transition w-full"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
