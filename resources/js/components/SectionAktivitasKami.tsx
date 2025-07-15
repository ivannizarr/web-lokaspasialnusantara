import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Perbaikan icon leaflet supaya nggak error di bundler modern
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Dummy data marker
const markers = [
  { position: [-8.65, 115.22], label: "Badung" },
  { position: [-8.7, 115.15], label: "Denpasar" },
  { position: [-1.1745981, 116.6769314], label: "Balikpapan" },
  { position: [1.5408092, 124.6196699], label: "Manado" },
  { position: [0.8974719, 99.2759108], label: "Riau" },
  { position: [-9.7959456, 119.2275991], label: "Sumba" },
  { position: [-0.4330105, 130.8165605], label: "Raja Ampat" },
];

const SectionAktivitasKami = ({ id = "aktivitas-kami" }: { id?: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Pastikan Leaflet render setelah window ada
  }, []);

  return (
    <section
      id={id}
      className="relative z-10 pt-8 w-full bg-gray-600 text-white px-4 sm:px-6 md:px-10 lg:px-16 py-20 flex flex-col items-center gap-10"
    >
      <div className="container mx-auto border-b border-white pb-6">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl text-center text-yellow-400 font-extrabold font-nunito">
        Aktivitas Kami
      </h2>
      </div>
      
      <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl leading-relaxed">
       Kami berkontribusi dalam proyek strategis baik regional maupun nasional yang diinisiasi oleh
        pemerintah, swasta, organisasi, ataupun perorangan untuk mendukung pencapaian kinerja yang telah
        ditentukan. Sebaran pekerjaan kami dapat dilihat pada peta sebagai berikut:
      </p>

      {isClient && (
        <div className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] max-w-7xl rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
          <MapContainer
            center={[-2.5, 118]}
            zoom={4.5}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {markers.map((marker, idx) => (
              <Marker key={idx} position={marker.position}>
                <Popup>{marker.label}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </section>
  );
};

export default SectionAktivitasKami;
