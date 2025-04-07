import { defineStore } from "pinia"
import axiosInstance from "@/http.js"
const axios = axiosInstance

export let API_HOST = window.location.origin
export let SECRETKEY = process.env.VUE_APP_APIKEY
// export let REDIRECT_HOST=`@@VUE_APP_REDIRECT_HOST@@`
// export let APIVERSION = `@@VUE_APP_API_VERSION@@`
// export let APP_PROD = `@@VUE_APP_PROD@@`

export let CLEARFXAI_API_URL = process.env.VUE_APP_CLEARFXAI_API_URL
// export let AUTH_API_URL = process.env.VUE_APP_AUTH_API_URL
export const APIKEY = process.env.VUE_APP_APIKEY
export let APIVERSION = process.env.VUE_APP_API_VERSION
export let APP_PROD = process.env.VUE_APP_PROD

// if (process.env.NODE_ENV === "development"){
// }

// export const API_TRADINGBLOTTER = `apiv${APIVERSION}/octax/trading/blotter`
// export const API_TRADINGSETTINGS = `apiv${APIVERSION}/octax/trading/settings`
// export const API_FXSETTINGS = `apiv${APIVERSION}/octax/fx/settings`
// export const API_RFXPLATFORM = `apiv1/rfx`
export const API_CONTROLPLANE = `apiv${APIVERSION}/octax/controlplane`
// export const API_CPCATALOG = `apiv${APIVERSION}/octax/cpcatalog`
// export const API_PRICING = `apiv${APIVERSION}/octax/fx/px`
// export const API_RECEIPT = `apiv${APIVERSION}/octax/receipt`
// export const API_BLOTTER = `apiv${APIVERSION}/octax/trading/blotter`
// export const API_RFQ = `apiv${APIVERSION}/octax/rfq`
// export const API_DEMOBLOTTER = `apiv${APIVERSION}/clearfx/demo/blotter`
export let API_PATH = `v${APIVERSION}/clearfxai`
export let AUTH_PATH = `apiauth/${API_PATH}`
export let SANDBOX_PATH = `apisandbox/v${APIVERSION}`
export let TLS_PATH = `apitls/${API_PATH}`
export let CONN_PATH = `apiconn`

if (process.env.NODE_ENV === "development"){
  // AUTH_PATH = `${API_PATH}`
  // SANDBOX_PATH = `${API_PATH}`
  TLS_PATH = `${API_PATH}`
  // CONN_PATH = "/"
}

export const useUtilsStore = defineStore("utils", {
  state: () => ({}),
  actions: {},
});

export const useTlsStore = defineStore("tls", {
  state: () => ({
    tlsList: []
  }),
  getters: {
    // tlsListGetter(state) {
    //   const tlsList = state.tlsList
    //   const tlsListLength = tlsList.length
    //   for (let i=0; i < tlsListLength; i++) {
    //     tlsList[i] = JSON.parse(tlsList[i])
    //   }
    //   return tlsList
    // }
  },
  actions: {
    async getTLSList (active=1) {
      try {
        const url = `${CLEARFXAI_API_URL}/apitls/list`
        const response = await axios.get(url, {
          headers: { "APIKEY": APIKEY },
          params: {
            active: active
          },
        })
        const data = response.data
        // console.log(JSON.parse(JSON.stringify(JSON.stringify(data.content))))
        // console.log(JSON.parse(JSON.stringify(data.content)))
        // console.log(JSON.parse(data.content))

        // console.log(JSON.parse(JSON.stringify(JSON.stringify(data))))
        const jsonData = JSON.parse(JSON.stringify(data))
        // console.log(jsonData)
        // console.log(JSON.parse(jsonData.content.replaceAll("'", "")))
        // console.log(JSON.parse(JSON.stringify(jsonData.content)))

        // console.log(JSON.parse(data))
        let tlsList = []
        if (jsonData.content !== "") {
          tlsList = JSON.parse(jsonData.content.replaceAll("'", ""))
        }
        // console.log(tlsList)
        this.tlsList = tlsList
      } catch (error) {
        console.log(error)
      } 
    },
    downloadTLS (tlsId) {
      const url = `${CLEARFXAI_API_URL}/apitls/get`
      return axios.get(url, {
        headers: { "APIKEY": APIKEY },
        params: {
          hash_code: tlsId
        },
        responseType: "arraybuffer"
      })
    }
  },
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: undefined,
    userId: undefined,
    apiKey: undefined
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUserId: (state) => state.userId,
    getApiKey: (state) => state.apiKey,
  },
  actions: {
    loginXX (payload) {
      const url = `${CLEARFXAI_API_URL}/${AUTH_PATH}/login`
      return axios.post(url, payload)
    },
    getAuthenticated () {
      this.loadAuthenticatedAndUserIdStateFromLocalStorage()
      const userId = this.getUserId
      const url = `${CLEARFXAI_API_URL}/${AUTH_PATH}/${userId}`
      return axios.get(url)
    },
    logout () {
      const userId = this.getUserId
      const url = `${CLEARFXAI_API_URL}/${AUTH_PATH}/logout/${userId}`
      return axios.delete(url)
    },
    loadAuthenticatedAndUserIdStateFromLocalStorage () {
      let userId = localStorage.getItem("userId")
      let authenticated = false
      if (userId) {
        authenticated = true
      }
      this.authenticated = authenticated
      this.userId = userId
    },
    saveSessionLocalStorage (data) {
      localStorage.setItem("userId", data.user_id)
    },
    removeSessionLocalStorage () {
      localStorage.removeItem("userId")
      localStorage.removeItem("apiKey")
    },
    getSessionFromLocalStorage () {
      const data = localStorage.getItem("userId")
      return data
    },
    regenAPIKEY () {
      const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/apikey/regen`
      return axios.put(url, null, {
        headers: { "APIKEY": this.getApiKey },
      })
    },
    registerUser (data) {
      const url = `http://localhost:8080/api/users/register`
      return axios.post(url, data)
    },
    login(data) {
      const url = `http://localhost:8080/api/users/login`
      return axios.post(url, data)
    },
    /*
    async getApiKeyRequest () {
      try {
        const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/apikey`
        const response = await axios.get(url)
        this.apiKey = response.data.apikey
      } catch (error) {
        console.log(error)
      } 
    }
    */
    // async getCustoms () {
    //   try {
    //     let url = `${API_HOST}/${API_CONTROLPLANE}/customizations`
    //     const response = await axios.get(url, {
    //       headers: { "SECRETKEY": SECRETKEY },
    //     })
    //     const data = response.data
    //   } catch (error) {
    //     console.log(error)
    //   } 
    // },
  },
});

export const useDisplayStore = defineStore("display", {
  state: () => ({
    breakpoint: undefined,
    windowHeight: window.innerHeight,
    headerHeight: 153,
    // footerHeight: 30,
    marginLayout: 32,
  }),
  getters: {
    isMobile() {
      return this.mobile
    },
    currentBreakpoint () {
      return this.breakpoint
    },
    isXLarge () {
      return this.currentBreakpoint === "xl"
    },
    isLarge () {
      return this.currentBreakpoint === "lg"
    },
    isMedium () {
      return this.currentBreakpoint === "md"
    },
    isSmall () {
      return this.currentBreakpoint === "sm"
    },
    isXSmall () {
      return this.currentBreakpoint === "xs"
    },
    contentHeight () {
      const contentHeight = 
        this.windowHeight 
        - this.headerHeight 
        // - this.footerHeight 
        // - this.marginLayout // x axis
        // - this.marginLayout // y axis
      return `${contentHeight}`
    },
  },
  actions: {
  }
})

export const useConsoleApiStore = defineStore("consoleApi", {
  state: () => ({
    requestCount: 0,
    alerts: {},
    apiKey: "",
  }),
  actions: {
    async fetchRequestCount() {
      try {
        const url = `${CLEARFXAI_API_URL}/${CONN_PATH}/request-count`
        const response = await axios.get(url)
        this.requestCount = response.data.requests_count
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAlerts() {
      try {
        const url = `${CLEARFXAI_API_URL}/${CONN_PATH}/liquidity-providers-alerts`
        const response = await axios.get(url)
        this.alerts = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchApiKey() {
      try {
        const url = `${CLEARFXAI_API_URL}/${CONN_PATH}/apikey`
        const response = await axios.get(url)
        this.apiKey = response.data.apikey
      } catch (error) {
        console.error(error)
      }
    },
    async refreshApiKey(currentApiKey) {
      try {
        const url = `${CLEARFXAI_API_URL}/${CONN_PATH}/apikey-refresh?currentapikey=${currentApiKey}`
        const response = await axios.put(url)
        this.apiKey = response.data.apikey
      } catch (error) {
        console.error(error)
      }
    },
  },
});

export const useTableStore = defineStore('tableStore', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    fetchExposureData() {
      const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/get-exposure-data`
      return  axios.get(url, {
         headers: {
          "APIKEY": SECRETKEY
         }
      })
    },
    updateExposureData(updatedData) {
      const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/update-exposure-data`
      return axios.put(url, updatedData, {
        headers: {
          "APIKEY": SECRETKEY
        }
      })
    }
  },
})

export const useCashflowStore = defineStore('cashflowStore', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    getMaturities () {
      const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/csv/data`
      return axios.get(url, {
        headers: {
          "APIKEY": SECRETKEY
        }
      })
    },
    saveMaturities (data) {
      const file = data.file
      const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/csv/import`
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      return axios.post(url, bodyFormData, {
        headers: {
          "APIKEY": SECRETKEY
        }
      })
    },
    downloadMaturities () {
      const url = `${CLEARFXAI_API_URL}/${SANDBOX_PATH}/csv/export`
      return axios.get(url, {
        headers: {
          "APIKEY": SECRETKEY
        },
        responseType: "arraybuffer"
      })
    },
  },
});
