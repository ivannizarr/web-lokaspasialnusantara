import ScrollDownIndicator from "@/components/ScrollDownIndicator";

const SectionIoT = () => {
  return (
    <section
      id="internet-of-things"
      className="flex flex-col w-full bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/img/iot.jpg')" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Konten utama (centered + bg transparan gelap) */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-center min-h-screen gap-8 text-center">
        <div className="mx-2 w-full max-w-5xl rounded-2xl bg-gray-950/50 px-6 py-6 text-white">
          <h2 className="font-montserrat mb-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-yellow-400 drop-shadow-[0_4px_80px_rgba(0,0,0,0.9)]">
            INTERNET OF THINGS (IoT)
          </h2>

          <p className="font-nunito mb-4 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            Kami merancang dan mengimplementasikan sistem berbasis sensor yang terhubung melalui jaringan internet untuk memantau, mengukur, dan mengontrol berbagai parameter di lapangan secara real-time. Solusi ini membantu efisiensi operasional serta pengambilan keputusan yang lebih cerdas dan responsif.
          </p>

          <button
            onClick={() => (window.location.href = '/hubungi-kami')}
            className="font-montserrat font-semibold cursor-pointer rounded-lg border border-white px-8 py-2 text-sm text-white transition hover:bg-sky-800"
          >
            Hubungi Kami
          </button>
        </div>
      </div>

      {/* Scroll Indicator & Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      </div>
      <ScrollDownIndicator />
    </section>
  );
};

export default SectionIoT;