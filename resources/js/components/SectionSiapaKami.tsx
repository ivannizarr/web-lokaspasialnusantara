import { FileDown } from "lucide-react";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";
import Footer from "@/components/footer";

const SectionSiapaKami = () => {
  return (
    <section
      id="siapa-kami"
      className="flex flex-col w-full bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/head.jpg')" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Konten utama (centered) */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold font-nunito drop-shadow-[0_4px_80px_rgba(0,0,0,0.9)]">
          Siapa Kami
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] max-w-5xl mx-auto text-center">
          Kami Loka Spasial Nusantara (Loka Spasial) bergerak di bidang jasa konsultansi Non-Kontruksi dengan klasifikasi
          layanan mencakup pada sektor: teknologi dan sistem informasi, penelitian (sosial-budaya, ekonomi, dan lingkungan),
          perencanaan tata ruang, inspeksi teknik, survey dan monitoring target khusus, fotogrametri, registrasi kepemilikan tanah/kadastral,
          pelatihan dan pengembangan kapasitas, hingga pemberdayaan masyarakat di sektor perikanan, pertanian, serta kehutanan.
        </p>

        <button
          onClick={() => window.open('/files/profil-perusahaan.pdf', '_blank')}
          className="mx-auto flex items-center gap-3 px-5 py-2 text-xs font-bold text-white border border-white rounded-md hover:bg-sky-800 transition-all duration-100"
        >
          Unduh Profil Perusahaan
          <FileDown size={20} className="stroke-white" />
        </button>
      </div>

      {/* Scroll Indicator & Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      </div>
      <ScrollDownIndicator />
      <Footer />
    </section>
  );
};

export default SectionSiapaKami;
