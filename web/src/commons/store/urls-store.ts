import { create } from "zustand"
import type { UrlResonseType } from "../adapters/url-adapter"
import { urlsApi } from "../resources/urls-resources"
import { toast } from "react-toastify"

type UrlsState = {
  urls: UrlResonseType[],
  isLoading: boolean,
  fetchUrls: () => Promise<void>,
}

export const useUrlsStore = create<UrlsState>((set) => ({
  urls: [],
  isLoading: false,

  fetchUrls: async () => {
    set({ isLoading: true })
    urlsApi.getUrls()
      .then(response => {
        set({ urls: response })
      })
      .catch(() => {
        toast.error("Não foi possível buscar a lista de links.")
      })
      .finally(() => {
        set({ isLoading: false })
      })
  },
}))