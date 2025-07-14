import { useEffect, useState } from "react";
import { Briefcase, MapPin, CalendarDays, Search } from "lucide-react";

// Daftar dummy jobs saat ini (static content)
// TODO: Ganti ini dengan fetch dari API (misalnya dari endpoint: /api/jobs)
const jobs = [
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Full Time",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Part Time",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Magang",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
];

// Komponen utama untuk menampilkan daftar lowongan kerja
export default function JobListSection({ id = "karir" }: { id?: string }) {
  return (
    <section id={id} className=" bg-gray-600 text-white py-16 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="max-w-screen-xl mx-auto space-y-12">
        {/* Judul utama section */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center font-nunito">
          Lowongan Kami
        </h2>

        {/* Bagian Search & Filter */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* Input pencarian pekerjaan */}
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari pekerjaan..."
              className="pl-10 pr-4 py-2 w-full bg-transparent border border-white rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-800"
            />
          </div>

          {/* Filter berdasarkan jenis pekerjaan */}
          <div className="flex flex-wrap gap-3">
            {["Full Time", "Part Time", "Magang"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox bg-gray-700 text-sky-800 border-zinc-600"
                />
                <span className="text-white font-medium">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Kartu lowongan kerja */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* TODO: Loop ini bisa diganti dengan map dari data API */}
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-gray-900 border border-zinc-700 rounded-lg p-6 flex flex-col justify-between gap-4 hover:border-sky-800 transition-all"
            >
              {/* Header kartu + deskripsi pekerjaan */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg sm:text-xl font-extrabold font-nunito">{job.title}</h3>
                  <span className="bg-sky-800 text-xs px-3 py-1 rounded-full">{job.type}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/90">{job.description}</p>
              </div>

              {/* Lokasi dan Tahun */}
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center pt-2 border-t border-white/10 mt-auto">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-800" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-sky-800" />
                  <span className="text-sm">{job.year}</span>
                </div>
              </div>

              {/* Tombol Aksi */}
              <button className="mt-4 border border-white text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-all text-sm">
                Lamar Sekarang
              </button>
            </div>
          ))}
        </div>

        {/* Pagination – navigasi halaman pekerjaan */}
        <div className="flex justify-center items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className="w-8 h-8 text-sm border border-zinc-300 rounded flex items-center justify-center hover:bg-white hover:text-black transition"
            >
              {page}
            </button>
          ))}
          <span className="text-white">...</span>
          <button className="text-sm text-white hover:text-yellow-400">Selanjutnya</button>
        </div>
      </div>
    </section>
  );
}
