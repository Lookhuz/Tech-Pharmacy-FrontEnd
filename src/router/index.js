import VueRouter from "vue-router";
import LoginView from "./../views/LoginView.vue";
import RegisterView from "./../views/RegisterView.vue";
import NotFoundView from './../views/NotFoundView.vue';
import { useAuthStore } from "./../store/index"

const auth = Number(process.env.VUE_APP_AUTH)

const routes = [
  {
    path: "/login",
    name: "login",
    // component: () => import("./../views/LoginView.vue"),
    component: LoginView,
    meta: {
      public: true
    },
  },
  {
    path: "/register",
    name: "register",
    // component: () => import("./../views/RegisterView.vue"),
    component: RegisterView,
    meta: {
      public: true
    },
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFoundView
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

function handleRedirect (to, next, isPublicRoute, authenticated) {
  const onlyLoggedOutRoute = to.matched.some(record => record.meta.public)
  // no-logged try to access private route
  if (!isPublicRoute && !authenticated) {
    return next("/login")
  }
  // logged try to access public route
  if (authenticated && onlyLoggedOutRoute) {
    return next("/console/home")
  }
  return next()
}

router.beforeEach((to, from, next) => {
  if (auth === 0) {
    return next()
  }
  const authStore = useAuthStore()
  let authenticated = authStore.isAuthenticated
  const isPublicRoute = to.matched.some(record => record.meta.public)
  // validation for user refresh page (F5) cenario
  if (authenticated === undefined) {
    authStore.loadAuthenticatedAndUserIdStateFromLocalStorage()
    authenticated = authStore.isAuthenticated
    if (!isPublicRoute) {
      if (authenticated) {
        return handleRedirect(to, next, isPublicRoute, authenticated)
      }
      return next("/login")
    }
  }
  return handleRedirect(to, next, isPublicRoute, authenticated)
})

// router.afterEach((to, from) => {
  // store.commit("setCurrentRouteName", to.name)
  // store.commit("setToolbarTitle", to.meta.pageTitle)
  // store.commit("setPreviousPage", from.path)
  // store.commit("setMaxHeightCurrentRoute", to.meta.maxHeight)
  // store.commit("setBackgroundColor", to.meta.backgroundColor)
  // resize.onResize()
// })

export default router