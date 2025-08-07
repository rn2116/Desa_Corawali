'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // penting!
import { createStaff, getStaff } from "@/lib/staffService"
import AdminNavbar from "@/components/AdminNavbar"
import pb from "@/lib/pocketbase"

export default function StaffPage() {
  const [staffList, setStaffList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    Nama: "",
    NIP: "",
    Jabatan: "",
    Gambar: null as File | null,
  })

  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const checkAuth = async () => {
    if (!pb.authStore.isValid || !pb.authStore.model) {
      router.push("/admin/login")
    } else {
      await fetchStaff() // 🔥 Panggil untuk ambil data staff
      setLoading(false)
    }
  }

  // delay sedikit biar pocketbase sempat load dari localStorage
  setTimeout(checkAuth, 100)
}, [])

  const fetchStaff = async () => {
    const res = await getStaff()
    setStaffList(res)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append("Nama", formData.Nama)
    form.append("NIP", formData.NIP)
    form.append("Jabatan", formData.Jabatan)
    if (formData.Gambar) {
      form.append("Gambar", formData.Gambar)
    }

    await createStaff(form)
    setFormData({ Nama: "", NIP: "", Jabatan: "", Gambar: null })
    fetchStaff()
  }

  
  return (
    <>
        <AdminNavbar />
    <main className="p-8 bg-[#111111] min-h-screen text-white font-serif">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#ccffcc]">Manajemen Data Staff</h1>

      {/* Form Tambah Staff */}
      <form onSubmit={handleSubmit} className="bg-[#014421] rounded-2xl p-6 mb-12 shadow-lg max-w-2xl mx-auto space-y-5">
        <h2 className="text-xl font-bold mb-3 text-[#ccffcc] text-center">Tambah Staff Baru</h2>

        <div>
          <label htmlFor="nama" className="block text-sm mb-1 text-white">Nama</label>
          <input
            id="nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
            value={formData.Nama}
            onChange={(e) => setFormData({ ...formData, Nama: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="nip" className="block text-sm mb-1 text-white">NIP</label>
          <input
            id="nip"
            type="text"
            placeholder="Masukkan NIP"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
            value={formData.NIP}
            onChange={(e) => setFormData({ ...formData, NIP: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="jabatan" className="block text-sm mb-1 text-white">Jabatan</label>
          <input
            id="jabatan"
            type="text"
            placeholder="Masukkan jabatan"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-[#ccffcc]"
            value={formData.Jabatan}
            onChange={(e) => setFormData({ ...formData, Jabatan: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="gambar" className="block text-sm mb-1 text-white">Foto / Gambar</label>
          <input
            id="gambar"
            type="file"
            accept="image/*"
            className="w-full p-3 rounded-xl bg-[#1a3d2f] text-white file:bg-[#ccffcc] file:text-black file:rounded file:px-4 file:py-2 file:border-none"
            onChange={(e) =>
              setFormData({ ...formData, Gambar: e.target.files?.[0] || null })
            }
          />
        </div>
        <button
          type="submit"
          className="bg-[#ccffcc] hover:bg-[#b3ffb3] transition px-6 py-3 rounded-xl w-full font-semibold text-black mt-2"
        >
          Tambah Staff
        </button>
      </form>

      {/* Daftar Staff */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#ccffcc]">Daftar Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((Staff) => (
            <div key={Staff.id} className="bg-[#014421] p-5 rounded-2xl shadow-lg flex gap-4 items-center">
              <img
                src={`https://pocketbase-app-production.up.railway.app/api/files/staff/${Staff.id}/${Staff.Gambar}`}
                alt={`Foto ${Staff.Nama}`}
                className="w-20 h-20 object-cover rounded-xl border-2 border-[#ccffcc]"
              />
              <div>
                <p className="font-bold text-lg text-[#ccffcc]">{Staff.Nama}</p>
                <p className="text-sm text-gray-200">NIP: {Staff.NIP}</p>
                <p className="text-sm text-gray-200">Jabatan: {Staff.Jabatan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  )
}
