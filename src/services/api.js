import axios from "axios"

export const BASE_URL = "http://localhost:8000"

/** Bangun URL lengkap dari path relatif public Laravel
 *  File disimpan ke public_path('movies') → URL: /movies/xxx
 */
export const storageUrl = (path) => {
  if (!path) return null
  // Sudah URL penuh
  if (path.startsWith("http")) return path
  // public_path → langsung akses dari root domain
  return `${BASE_URL}/${path}`
}

const api = axios.create({
  baseURL: `${BASE_URL}/api`
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api