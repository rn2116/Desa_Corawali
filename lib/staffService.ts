import pb from "./pocketbase"

export async function getStaff() {
  const records = await pb.collection('Staff').getFullList({ sort: '-created' })
  return records
}

export async function createStaff(data: FormData) {
  return await pb.collection('Staff').create(data)
}
