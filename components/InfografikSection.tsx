'use client'

import { useEffect, useState } from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2'
import pb from '@/lib/pocketbase'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
)

type Infografik = {
  id: string
  Judul: string
  Labels: string
  Data: string
  Warna?: string
  Jenis_Chart?: 'bar' | 'pie' | 'line'
}

export default function InfografikSection() {
  const [grafik, setGrafik] = useState<Infografik[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const records = await pb.collection('Infografik').getFullList<Infografik>({
        sort: '-created',
      })
      setGrafik(records)
    }

    fetchData()
  }, [])

  return (
    <section className="py-16 bg-gray-100" id="infografik">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-emerald-700 mb-10">Infografik</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {grafik.map((item) => {
            const labels = item.Labels.split(',').map((l) => l.trim())
            const data = item.Data.split(',').map((d) => parseInt(d.trim()))
            const color = item.Warna || '#10b981'
            const jenis = item.Jenis_Chart || 'bar'

            const chartData = {
              labels,
              datasets: [
                {
                  label: item.Judul,
                  data,
                  backgroundColor: color,
                  borderColor: color,
                  borderWidth: 1,
                },
              ],
            }

            return (
              <div key={item.id} className="bg-white p-4 shadow rounded-lg">
                <h4 className="text-lg font-semibold mb-2">{item.Judul}</h4>
                {jenis === 'bar' && <Bar data={chartData} />}
                {jenis === 'pie' && <Pie data={chartData} />}
                {jenis === 'line' && <Line data={chartData} />}
              </div>
            )
          })}
        </div>

        {grafik.length === 0 && (
          <p className="text-center text-gray-500">Belum ada data infografik.</p>
        )}
      </div>
    </section>
  )
}
