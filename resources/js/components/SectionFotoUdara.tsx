import { CloudDownload } from "lucide-react";

const SectionFotoUdara = () => {
  return (
      <section
        id="foto-udara"
        className="flex flex-col w-full bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/1.jpg')" }}
      >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Konten utama (centered) */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-nunito drop-shadow-[0_4px_80px_rgba(0,0,0,0.9)]">
          Foto Udara
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] max-w-5xl mx-auto text-center">
          Layanan pemetaan dan dokumentasi visual menggunakan drone beresolusi tinggi yang mampu menangkap citra udara secara detail dan presisi. Digunakan untuk kebutuhan survei, monitoring wilayah, pemetaan topografi, serta mendukung proses pengambilan keputusan berbasis data spasial secara cepat dan akurat.
        </p>

        <button
          onClick={() => window.open('/hubungi-kami')}
          className="mx-auto flex items-center gap-2 px-5 py-2 text-sm font-bold text-white border border-white rounded-md hover:bg-sky-800 transition-all duration-100"
        >
          Hubungi Kami
        </button>
      </div>

      {/* Scroll Indicator & Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      </div>
    </section>
  );
};

export default SectionFotoUdara;
