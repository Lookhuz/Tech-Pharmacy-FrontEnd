// router.js
import VueRouter from "vue-router";
import AuthenticatedLayout from "./../layouts/AuthenticatedLayout.vue";
import LandingView from './../views/LandingView.vue';
import LoginView from "./../views/LoginView.vue";
import HomeView from "./../views/HomeView.vue";
import MedicationDetailView from "./../views/MedicationDetailView.vue";
import DosageConfigurationView from "./../views/DosageConfigurationView.vue";
import ActiveMedicationsView from "./../views/ActiveMedicationsView.vue";
import RegisterView from "./../views/RegisterView.vue";
import NotFoundView from './../views/NotFoundView.vue';
import { useAuthStore } from "./../store/index";

const auth = Number(process.env.VUE_APP_AUTH);

const routes = [
  {
    path: "/",
    name: "landing",
    component: LandingView,
    meta: {
      public: true
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      public: true
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      public: true
    },
  },
  {
    path: "/tech-pharmacy",
    component: AuthenticatedLayout,
    meta: {
      public: false
    },
    redirect: "/tech-pharmacy/home",
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "medication/:id",
        name: "medication-detail",
        component: MedicationDetailView,
        props: true
      },
      {
        path: "medication/:id/dosage",
        name: "dosage-configuration",
        component: DosageConfigurationView,
        props: true
      },
      {
        path: "active-medications",
        name: "active-medications",
        component: ActiveMedicationsView,
      },
    ]
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
    return next("/tech-pharmacy/home")
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

  if (authenticated === undefined) {
    authStore.loadAuthenticatedAndUserIdStateFromLocalStorage()
    authenticated = authStore.isAuthenticated
  }
  return handleRedirect(to, next, isPublicRoute, authenticated)
})


export default router;