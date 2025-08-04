'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createInfografik, getAllInfografik } from "@/lib/infografikService"
import AdminNavbar from "@/components/AdminNavbar"
import pb from "@/lib/pocketbase"

export default function InfografikPage() {
  const [infografikList, setInfografikList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    Judul: "",
    Labels: "",
    Data: "",
    Warna: "#ccffcc",
    Jenis_Chart: "bar",
  })

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!pb.authStore.isValid || !pb.authStore.model) {
        router.push("/admin/login")
      } else {
        await fetchInfografik()
        setLoading(false)
      }
    }

    // delay biar pocketbase sempat sync token
    setTimeout(checkAuth, 100)
  }, [])

  const fetchInfografik = async () => {
    const res = await getAllInfografik()
    setInfografikList(res)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await createInfografik({
      ...formData,
      Jenis_Chart: formData.Jenis_Chart as "bar" | "pie" | "line",
    })

    setFormData({
      Judul: "",
      Labels: "",
      Data: "",
      Warna: "#ccffcc",
      Jenis_Chart: "bar",
    })

    fetchInfografik()
  }

  if (loading) return null // atau tambahkan loader kalau ingin

  return (
    <>
      <AdminNavbar />
      <main className="p-8 bg-[#111111] min-h-screen text-white font-serif">
        <h1 className="text-3xl font-bold mb-10 text-center text-[#ccffcc]">Manajemen Infografik</h1>

        {/* Form Tambah Infografik */}
        <form onSubmit={handleSubmit} className="bg-[#014421] rounded-2xl p-6 mb-12 shadow-lg max-w-2xl mx-auto space-y-5">
          <h2 className="text-xl font-bold mb-3 text-[#ccffcc] text-center">Tambah Infografik Baru</h2>

          <div>
            <label htmlFor="judul" className="block text-sm mb-1 text-white">Judul</label>
            <input
              id="judul"
              type="text"
              placeholder="Judul infografik"
              className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
              value={formData.Judul}
              onChange={(e) => setFormData({ ...formData, Judul: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="labels" className="block text-sm mb-1 text-white">Labels (pisahkan dengan koma)</label>
            <input
              id="labels"
              type="text"
              placeholder="Contoh: A,B,C"
              className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
              value={formData.Labels}
              onChange={(e) => setFormData({ ...formData, Labels: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="data" className="block text-sm mb-1 text-white">Data (pisahkan dengan koma)</label>
            <input
              id="data"
              type="text"
              placeholder="Contoh: 10,20,30"
              className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
              value={formData.Data}
              onChange={(e) => setFormData({ ...formData, Data: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="warna" className="block text-sm mb-1 text-white">Warna</label>
            <input
              id="warna"
              type="color"
              className="w-full h-12 p-1 rounded-xl bg-[#1a3d2f] outline-none focus:ring-2 focus:ring-[#ccffcc]"
              value={formData.Warna}
              onChange={(e) => setFormData({ ...formData, Warna: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="jenis_chart" className="block text-sm mb-1 text-white">Jenis Chart</label>
            <select
              id="jenis_chart"
              className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white outline-none focus:ring-2 focus:ring-[#ccffcc]"
              value={formData.Jenis_Chart}
              onChange={(e) => setFormData({ ...formData, Jenis_Chart: e.target.value })}
            >
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
              <option value="line">Line</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#ccffcc] hover:bg-[#b3ffb3] transition px-6 py-3 rounded-xl w-full font-semibold text-black mt-2"
          >
            Tambah Infografik
          </button>
        </form>

        {/* Daftar Infografik */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#ccffcc]">Daftar Infografik</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infografikList.map((item) => (
              <div key={item.id} className="bg-[#014421] p-5 rounded-2xl shadow-lg space-y-2">
                <p className="font-bold text-lg text-[#ccffcc]">{item.Judul}</p>
                <p className="text-sm text-gray-200">Labels: {item.Labels}</p>
                <p className="text-sm text-gray-200">Data: {item.Data}</p>
                <p className="text-sm text-gray-200">Warna: <span style={{ color: item.Warna }}>{item.Warna}</span></p>
                <p className="text-sm text-gray-200">Jenis Chart: {item.Jenis_Chart}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
