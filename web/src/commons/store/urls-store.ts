import { create } from "zustand"
import type { UrlResonseType } from "../adapters/url-adapter"
import { urlsApi } from "../resources/urls-resources"

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
      .finally(() => {
        set({ isLoading: false })
      })
  },
}))