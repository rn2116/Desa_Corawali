import pb from "@/lib/pocketbase"

export type Infografik = {
  id: string
  Judul: string
  Labels: string
  Data: string
  Warna?: string
  Jenis_Chart?: 'bar' | 'pie' | 'line'
}

export async function getAllInfografik(): Promise<Infografik[]> {
  return await pb.collection("Infografik").getFullList<Infografik>({
    sort: "-created",
  })
}

export async function createInfografik(data: Omit<Infografik, "id">) {
  return await pb.collection("Infografik").create(data)
}
