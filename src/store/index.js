import { defineStore } from "pinia"
import axiosInstance from "@/http.js"
const axios = axiosInstance

export let API_URL = process.env.VUE_APP_API_URL
export const API_USERS = `api/users`

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
    getAuthenticated () {
      this.loadAuthenticatedAndUserIdStateFromLocalStorage()
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
    registerUser (data) {
      const url = `${API_URL}/${API_USERS}/register`
      return axios.post(url, data)
    },
    login(data) {
      const url = `${API_URL}/${API_USERS}/login`
      return axios.post(url, data)
    },
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
