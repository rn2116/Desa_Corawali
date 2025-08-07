'use client'

import { useEffect, useState } from 'react'
import pb from '@/lib/pocketbase'

type Berita = {
  id: string
  Judul: string
  Isi: string
  Foto: string
  Tanggal: string
}

export default function BeritaSection() {
  const [berita, setBerita] = useState<Berita[]>([])
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null)

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const records = await pb.collection('Berita').getFullList<Berita>({
          sort: '-Tanggal',
        })
        setBerita(records)
      } catch (error) {
        console.error('Gagal fetch berita:', error)
      }
    }

    fetchBerita()
  }, [])

  return (
    <section id="berita" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-6 text-center text-emerald-700">
          Berita & Pengumuman
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {berita.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow">
              <figure>
                <img
                  src={`https://pocketbase-app-production.up.railway.app/api/files/berita/${item.id}/${item.Foto}`}
                  alt={item.Judul}
                  className="w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.Judul}</h2>
                <p
                  className="line-clamp-3 text-sm"
                  dangerouslySetInnerHTML={{ __html: item.Isi }}
                ></p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => setSelectedBerita(item)}
                  >
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            </div>
          ))}

          {berita.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              Belum ada berita ditampilkan.
            </p>
          )}
        </div>
      </div>

      {/* Modal detail berita */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-lg shadow-lg relative p-6 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedBerita(null)}
              className="absolute top-3 right-3 text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedBerita.Judul}</h2>
            <img
              src={`http://127.0.0.1:8090/api/files/Berita/${selectedBerita.id}/${selectedBerita.Foto}`}
              alt={selectedBerita.Judul}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <div
              className="text-sm leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: selectedBerita.Isi }}
            ></div>
          </div>
        </div>
      )}
    </section>
  )
}
