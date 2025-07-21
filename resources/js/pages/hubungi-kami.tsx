'use client'

import { Head } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { useRef, useState, ChangeEvent, FormEvent } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import ScrollDownIndicator from '@/components/ScrollDownIndicator'
import ReCaptchaWrapper, { ReCaptchaRef } from '@/components/ReCaptcha'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

export default function ContactPage() {
  const captchaRef = useRef<ReCaptchaRef>(null)
  const { t } = useTranslation()

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
      alert(t('contact.alert.captcha'))
      return
    }

    console.log({ ...form, captcha: token })
    alert(t('contact.alert.success'))
    captchaRef.current?.reset()
  }

  return (
    <AppLayout>
      <Head title={t('contact.title')} />

      <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-x-hidden">
        
        {/* HERO */}
        <section
          className="relative h-[100vh] bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('/head.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 w-full px-6 md:px-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-yellow-400 font-nunito mb-4">
                {t('contact.heading')}
              </h1>
              <p className="tracking-widest font-bold text-white uppercase text-sm md:text-base">
                Loka Spasial Nusantara
              </p>
            </div>
          </div>
          <ScrollDownIndicator />
        </section>

        {/* KONTEN */}
        <main className="flex-grow">
          <div className="max-w-[1440px] mx-auto py-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-16">
            
            {/* Info Kontak */}
            <div className="flex-1 flex flex-col text-white gap-10">
              <p className="text-lg leading-loose text-justify">
                {t('contact.description')}
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold">
                {t('contact.heading')}
              </h2>

              <div className="flex flex-col gap-6 text-base">
                <a className="flex items-center gap-3" href="https://wa.me/6282188885751">
                  <Phone className="w-6 h-6" /> +62-821-8888-5751
                </a>

                <a className="flex items-center gap-3" href="mailto:admin@lokaspasial.com">
                  <Mail className="w-6 h-6" /> admin@lokaspasial.com
                </a>

                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6" /> Denpasar Selatan, Kota Denpasar, Bali 80224
                </div>
              </div>
            </div>

            {/* Formulir */}
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow p-6 border border-sky-800">
              <form className="flex flex-col text-white gap-5" onSubmit={handleSubmit}>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="name">{t('contact.form.name')}</Label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder={t('contact.form.namePlaceholder')}
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-4 py-2 bg-gray-800 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="email">{t('contact.form.email')}</Label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-4 py-2 bg-gray-800 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="topic">{t('contact.form.topic')}</Label>
                  <input
                    id="topic"
                    type="text"
                    name="topic"
                    placeholder={t('contact.form.topicPlaceholder')}
                    value={form.topic}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-4 py-2 bg-gray-800 text-white placeholder-gray-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-4 py-2 bg-gray-800 text-white placeholder-gray-500"
                    required
                  />
                </div>

                <ReCaptchaWrapper ref={captchaRef} />

                <button
                  type="submit"
                  className="bg-sky-800 text-white py-2 px-5 cursor-pointer rounded-md font-semibold hover:bg-sky-900 transition w-full"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  )
}
