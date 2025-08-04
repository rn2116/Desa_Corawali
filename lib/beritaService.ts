// lib/beritaService.ts
import pb from "./pocketbase"

export async function getAllBerita() {
  const records = await pb.collection("berita").getFullList({
    sort: "-created",
  });
  return records;
}

export async function createBerita(formData: FormData) {
  const record = await pb.collection("berita").create(formData);
  return record;
}
