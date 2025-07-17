import { Head } from "@inertiajs/react"
import type { PageProps } from "@inertiajs/inertia"
import AppLayout from "@/layouts/app-layout"
import Footer2 from '@/components/footer-v2'

interface Mitra {
  slug: string
  name: string
  logo: string
  since: string
  projects: string
  type: string
  location: string
  description: string
}

interface Props extends PageProps {
  partner: Mitra
}

export default function MitraDetail({ partner }: Props) {
  return (
    <AppLayout>
      <Head title={`${partner.name}`} />

      <section className="min-h-screen w-full bg-gray-600 py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center pt-20 mb-6">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-32 sm:h-40 object-contain rounded-lg"
            />
          </div>

          {/* Judul Mitra */}
          <h1 className="text-center text-xl sm:text-3xl font-bold mb-4 text-yellow-400">
            {partner.name}
          </h1>

          {/* Divider */}
          <hr className="border-t border-gray-300 my-6 max-w-4xl mx-auto" />

          {/* Informasi mitra */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-10 text-sm sm:text-base font-medium text-gray-100 text-center max-w-3xl mx-auto mt-8">
            <div>
              <strong>Bermitra Sejak:</strong><br />
              {partner.since || "-"}
            </div>
            <div>
              <strong>Jenis Kemitraan:</strong><br />
              {partner.type || "-"}
            </div>
            <div>
              <strong>Lokasi:</strong><br />
              {partner.location || "-"}
            </div>
          </div>

          {/* Divider kedua */}
          <hr className="border-t border-gray-300 my-6 max-w-4xl mx-auto" />

          {/* Deskripsi */}
          <p className="text-justify text-sm sm:text-base leading-relaxed text-gray-100 max-w-3xl mx-auto break-words whitespace-pre-line">
            {partner.description || "Deskripsi belum tersedia."}
          </p>

          {/* Divider bawah */}
          <hr className="border-t border-gray-300 mt-10 max-w-4xl mx-auto" />
        </div>
      </section>

      <Footer2 />
    </AppLayout>
  )
}
