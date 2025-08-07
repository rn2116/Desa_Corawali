'use client'

import { useEffect, useState } from "react"
import { createBerita, getAllBerita } from "@/lib/beritaService"
import AdminNavbar from "@/components/AdminNavbar"

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    Judul: "",
    Isi: "",
    Foto: null as File | null,
    Tanggal: "",
  })

  useEffect(() => {
    fetchBerita()
  }, [])

  const fetchBerita = async () => {
    const res = await getAllBerita()
    setBeritaList(res)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append("Judul", formData.Judul)
    form.append("Isi", formData.Isi)
    form.append("Tanggal", formData.Tanggal)
    if (formData.Foto) {
      form.append("Foto", formData.Foto)
    }

    await createBerita(form)
    setFormData({ Judul: "", Isi: "", Foto: null, Tanggal: "" })
    fetchBerita()
  }

  return (
    <>
    <AdminNavbar />
    <main className="p-8 bg-[#111111] min-h-screen text-white font-serif">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#ccffcc]">Manajemen Berita & Pengumuman</h1>

      {/* Form Tambah Berita */}
      <form onSubmit={handleSubmit} className="bg-[#014421] rounded-2xl p-6 mb-12 shadow-lg max-w-2xl mx-auto space-y-5">
        <h2 className="text-xl font-bold mb-3 text-[#ccffcc] text-center">Tambah Berita Baru</h2>

        <div>
          <label htmlFor="judul" className="block text-sm mb-1 text-white">Judul</label>
          <input
            id="judul"
            type="text"
            placeholder="Masukkan judul"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
            value={formData.Judul}
            onChange={(e) => setFormData({ ...formData, Judul: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="isi" className="block text-sm mb-1 text-white">Isi</label>
          <textarea
            id="isi"
            placeholder="Masukkan isi berita"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc] h-32"
            value={formData.Isi}
            onChange={(e) => setFormData({ ...formData, Isi: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="tanggal" className="block text-sm mb-1 text-white">Tanggal</label>
          <input
            id="tanggal"
            type="datetime-local"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white outline-none focus:ring-2 focus:ring-[#ccffcc]"
            value={formData.Tanggal}
            onChange={(e) => setFormData({ ...formData, Tanggal: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="foto" className="block text-sm mb-1 text-white">Foto / Gambar</label>
          <input
            id="foto"
            type="file"
            accept="image/*"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white file:bg-[#ccffcc] file:text-black file:rounded file:px-4 file:py-2 file:border-none"
            onChange={(e) =>
              setFormData({ ...formData, Foto: e.target.files?.[0] || null })
            }
          />
        </div>
        <button
          type="submit"
          className="bg-[#ccffcc] hover:bg-[#b3ffb3] transition px-6 py-3 rounded-xl w-full font-semibold text-black mt-2"
        >
          Tambah Berita
        </button>
      </form>

      {/* Daftar Berita */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#ccffcc]">Daftar Berita</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beritaList.map((item) => (
            <div key={item.id} className="bg-[#014421] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
              <img
                src={`https://pocketbase-app-production.up.railway.app/api/files/Berita/${item.id}/${item.Foto}`}
                alt={`Gambar ${item.Judul}`}
                className="w-full h-48 object-cover rounded-xl border-2 border-[#ccffcc]"
              />
              <h3 className="text-xl font-bold text-[#ccffcc]">{item.Judul}</h3>
              <p className="text-sm text-gray-200 line-clamp-4">{item.Isi}</p>
              <p className="text-sm text-gray-400">Tanggal: {new Date(item.Tanggal).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  )
}
