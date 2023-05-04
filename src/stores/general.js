import {defineStore} from "pinia";

export const useGeneralStore = defineStore('general', {
  state: () => ({isLoading: true}),

  actions: {
    setLoading(value = false) {
      this.isLoading = value
    }
  },
})