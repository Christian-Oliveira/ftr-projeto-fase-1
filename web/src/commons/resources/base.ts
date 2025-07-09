import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BASE,
})

api.defaults.headers.post['Content-Type'] = 'application/json'

export default api