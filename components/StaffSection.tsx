'use client'

import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase'

type Staff = {
  id: string
  Nama: string
  Jabatan: string
  NIP: string
  Gambar: string
  deskripsi?: string
}

export default function StafSection() {
  const [staff, setStaff] = useState<Staff[]>([])

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const records = await pb.collection('Staff').getFullList<Staff>({
          sort: 'Nama',
        })
        setStaff(records)
      } catch (error) {
        console.error('Gagal ambil data staff:', error)
      }
    }

    fetchStaff()
  }, [])

  return (
    <section id="staff" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-10 text-center text-emerald-700">Staff Desa</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {staff.map((item) => (
            <div key={item.id} className="card shadow bg-base-100 text-center p-4">
              <img
                src={`https://pocketbase-app-production.up.railway.app/api/files/Staff/${item.id}/${item.Gambar}`}
                alt={item.Nama}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold">{item.Nama}</h4>
              <p className= "text-white-600 font-small">{item.NIP}</p>
              <p className="text-emerald-600 font-medium">{item.Jabatan}</p>
              {item.deskripsi && <p className="text-sm text-gray-500 mt-2">{item.deskripsi}</p>}
            </div>
          ))}
        </div>

        {staff.length === 0 && (
          <p className="text-center text-gray-500 mt-10">Belum ada data staff ditambahkan.</p>
        )}
      </div>
    </section>
  )
}
