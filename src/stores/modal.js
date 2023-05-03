import {defineStore} from "pinia";
import {hideBodyScrollbar, showBodyScrollbar} from "../helpers";

export const useModalStore = defineStore('modal', {
  state: () => ({component: null, data: null}),

  actions: {
    openModal({component, data}) {
      this.component = component
      this.data = data
      hideBodyScrollbar()

      return new Promise((resolve, reject) => {
        function onClose({detail: {success = false, ...data}}) {
          window.removeEventListener('modal-close', onClose);
          if (success) {
            resolve({success, ...data})
          } else {
            reject({success, ...data})
          }
        }

        window.addEventListener('modal-close', onClose)
      })
    },
    closeModal(success = false, data = {}) {
      this.component = null
      this.data = null
      showBodyScrollbar()

      window.dispatchEvent(new CustomEvent('modal-close', {
        detail: {
          success,
          ...data
        }
      }))
    }
  },
})