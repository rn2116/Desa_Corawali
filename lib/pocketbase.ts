import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-app-production.up.railway.app')

// matikan auto-cancel supaya tidak error saat navigasi cepat
pb.autoCancellation(false)

if (typeof window !== 'undefined') {
  const token = localStorage.getItem("pb_user_token")
  const model = localStorage.getItem("pb_user_data")

  if (token && model) {
    pb.authStore.save(token, JSON.parse(model))
  }
}

export default pb
