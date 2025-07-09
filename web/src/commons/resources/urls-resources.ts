import { urlRequestAdapter, urlsResponseAdapter, type UrlRequestType } from "../adapters/url-adapter"
import api from "./base"

const pathUrl = "/urls"

export const urlsApi = {
  async getUrls() {
    const response = await api.get(pathUrl)
    return urlsResponseAdapter(response.data)
  },

  async createUrl(data: UrlRequestType) {
    await api.post(pathUrl, { ...urlRequestAdapter(data) })
  },

  async getOriginalUrl(shortenedUrl: string) {
    const response = await api.get(pathUrl + shortenedUrl)
    return response.data
  },

  async deleteUrl(id: string) {
    await api.delete(`${pathUrl}/${id}`)
  },

  async exportUrls() {
    const response = await api.post(`${pathUrl}/export`)
    return response.data
  },
}