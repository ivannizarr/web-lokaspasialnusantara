import { CloudDownload } from "lucide-react";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";

const SectionLayananLainnya = () => {
  return (
    <section
      id="layanan-lainnya"
      className="flex flex-col w-full bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/.jpg')" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Konten utama (centered) */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-nunito drop-shadow-[0_4px_80px_rgba(0,0,0,0.9)]">
          Layanan Lainnya
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] max-w-5xl mx-auto text-center">
          Selain layanan utama, kami juga menyediakan solusi teknologi sesuai kebutuhan khusus mitra, mulai dari penyusunan sistem informasi, integrasi data, hingga pelatihan teknis. Setiap solusi dikembangkan secara fleksibel dan adaptif sesuai dengan tantangan dan tujuan organisasi Anda.
        </p>

        <button
          onClick={() => window.open('/files/profil-perusahaan.pdf', '_blank')}
          className="mx-auto flex items-center gap-2 px-5 py-2 text-sm font-bold text-white border border-white rounded-md hover:bg-sky-800 transition-all duration-100"
        >
          Hubungi Kami
        </button>
      </div>

      {/* Scroll Indicator & Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      </div>
      <ScrollDownIndicator />
    </section>
  );
};

export default SectionLayananLainnya;
