'use client'

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Link } from "@inertiajs/react"

// Fix icon Leaflet default (bundler modern seperti Vite/Webpack5)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

type Aktivitas = {
  title: string
  description: string
  image: string
  link: string
  location: {
    lat: number
    lng: number
  }
}

const SectionAktivitasKami = ({ id = "aktivitas-kami" }: { id?: string }) => {
  const [isClient, setIsClient] = useState(false)
  const [aktivitas, setAktivitas] = useState<Aktivitas[]>([])

  useEffect(() => {
    setIsClient(true)
    fetch("/data/aktivitas.json")
      .then((res) => res.json())
      .then((data) => setAktivitas(data))
      .catch((err) => console.error("Gagal load data aktivitas:", err))
  }, [])

  return (
    <section
      id={id}
      className="relative z-10 pt-8 w-full bg-gray-600 text-white px-4 sm:px-6 md:px-10 lg:px-16 py-20 flex flex-col items-center gap-10"
    >
      <div className="container w-full max-w-[1300px] border-b border-white pb-6">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-center text-yellow-400 font-extrabold font-nunito">
          Aktivitas Kami
        </h2>
      </div>

      <p className="text-center text-sm sm:text-base md:text-lg lg:text-lg font-medium max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl leading-relaxed">
        Kami berkontribusi dalam proyek strategis baik regional maupun nasional yang diinisiasi oleh
        pemerintah, swasta, organisasi, ataupun perorangan untuk mendukung pencapaian kinerja yang telah
        ditentukan. Sebaran pekerjaan kami dapat dilihat pada peta sebagai berikut:
      </p>

      {isClient && (
        <div className="w-full h-[500px] max-w-7xl rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
          <MapContainer center={[-2.5, 118]} zoom={4.5} scrollWheelZoom className="h-full w-full">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            <MarkerClusterGroup
              chunkedLoading
              showCoverageOnHover={false}
              spiderfyOnMaxZoom={true}
            >
              {aktivitas.map((item, idx) => (
                <Marker key={idx} position={[item.location.lat, item.location.lng]}>
                  <Popup>
                    <div className=" max-w font-nunito space-y-2 text-black rounded-sm p-2 py-4">
                      <h3 className="font-semibold text-xs leading-snug">{item.title}</h3>
                      <p className="text-xs text-base font-nunito leading-relaxed">{item.description}</p>
                      <a
                        href={item.link.includes("@") ? `mailto:${item.link}` : item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-800 text-sm font-normal hover:font-semibold hover:underline"
                      >
                        Hubungi Kami
                      </a>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto rounded-md object-cover"
                      />
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      )}
    </section>
  )
}

export default SectionAktivitasKami