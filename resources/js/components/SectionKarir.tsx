import { useState } from "react";
import { MapPin, CalendarDays, Search } from "lucide-react";

const jobs = [
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Full Time",
    status: "Open",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Part Time",
    status: "Closed",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Full Time",
    status: "Closed",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
  {
    title: "Surveyor Perikanan",
    location: "Denpasar, Bali",
    year: "2024",
    type: "Magang",
    status: "Open",
    description:
      "Dibutuhkan tenaga kerja fresh graduate untuk survey hasil tangkapan nelayan di Kabupaten Badung. Bisa mengoperasikan motor, memiliki smartphone untuk pencatatan hasil survey.",
  },
  // Tambah lagi data dummy kalau perlu...
];

export default function JobListSection({ id = "karir" }: { id?: string }) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter lowongan berdasarkan checkbox & pencarian
  const filteredJobs = jobs.filter(
    (job) =>
      (selectedTypes.length === 0 || selectedTypes.includes(job.type)) &&
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <section id={id} className="bg-gray-600 text-white py-8 px-6 lg:px-12">
      <div className="max-w-screen-xl mx-auto space-y-12">
        <h2 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold font-nunito border-b border-white pb-6">
          Lowongan Kami
        </h2>

        <div className="grid lg:grid-cols-[1fr_3fr] gap-12">
          {/* Sidebar kiri */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white opacity-60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-transparent border border-white rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-800"
              />
            </div>

            {/* Filter */}
            <div>
              <h3 className="font-semibold mb-2">Kategori</h3>
              <div className="space-y-2">
                {["Full Time", "Part Time", "Magang"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox bg-gray-700 text-sky-800 border-zinc-600"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span className="text-white font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* List lowongan + pagination */}
          <div className="space-y-12">
            {/* Grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredJobs.length === 0 ? (
                <p className="col-span-full text-white/70 text-xl">
                  Tidak ada lowongan yang sesuai.
                </p>
              ) : (
                filteredJobs.map((job, idx) => (
                  <div
                    key={idx}
                    className="bg-black border border-white/20 rounded-lg p-6 flex flex-col justify-between gap-4 hover:border-sky-800 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold font-nunito">
                          {job.title}
                        </h3>
                        <div className="flex gap-2">
                        <span className="bg-sky-800 text-xs px-3 py-1 rounded-full">
                          {job.type}
                        </span>
                        <span className="text-xs bg-green-500 px-3 py-1 rounded-full">
                          {job.status}
                        </span>
                      </div>
                      </div>
                      <p className="text-sm leading-relaxed text-white/90">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-2 border-t border-white/10 mt-auto flex-wrap">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-sky-800" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="w-4 h-4 text-sky-800" />
                        {job.year}
                      </div>
                    </div>

                    <button className="mt-4 border border-white text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-all text-sm">
                      Lamar Sekarang
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2">
              <button className="text-sm text-white hover:text-yellow-400">
                Sebelumnya
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className="w-8 h-8 text-sm border border-zinc-300 rounded flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  {page}
                </button>
              ))}
              <span className="text-white">...</span>
              <button className="text-sm text-white hover:text-yellow-400">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
