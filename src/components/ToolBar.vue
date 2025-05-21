<template>
  <v-app-bar
    app
    :height="115"
    color="white"
  >
    <div
      style="width: 100%;"
      class="d-flex flex-column fill-height"
    >
      <div class="d-flex text-caption text--disabled font-weight-regular">
        Joao Brasileiro | ACME LTDA
        <v-spacer></v-spacer>
        {{ $t('toolbar.timeZone') }}: BRT
      </div>

      <div class="my-auto d-flex" style="justify-content: space-between; overflow: auto hidden">
        <div class="d-flex align-center" style="min-height: 64px">
          <v-img
            aspect-ratio="16/9"
            height="80"
            :src="require(`./../assets/logo-tech.png`)"
            max-width="150"
            min-width="150"
            contain
            class="ml-10"
          >
          </v-img>
   
          <v-divider inset vertical class="mx-4" style="height: 100%"></v-divider>
  
          <div 
            class="pr-4 mt-2 font-weight-light text--secondary"
            style="font-size: 26px !important;"
          >
            Tech Pharmacy
          </div>
        </div>

        <!-- <div
          class="d-flex align-center"
          style="overflow: auto hidden"
        > -->
          <!-- <v-slide-group
            class="d-flex mb-n3"
            style="width: 255px;"
            show-arrows
          >
            <v-slide-item
              v-for="(sparkline, ticker, index) in sparklineListIntraday"
              :key="index"
            >
              <sparkline-chart 
                :sparklineData="sparkline"
                :ticker="ticker"
                style="min-width: 150px;"
              >
              </sparkline-chart>
            </v-slide-item>
          </v-slide-group> -->

        <!-- </div> -->

        

        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="my-auto ml-12"
              v-bind="attrs"
              v-on="on"
              icon
            >
            <v-img
              v-if="isPtBRLocale"
              style="height: 32px;"
              content-class="rounded-lg"
              class="rounded-lg"
              aspect-ratio="16/9"
              max-width="32"
              width="32"
              :src="require(`./../assets/brazil_flag.png`)"
            />
            <v-img
              v-else
              style="height: 32px;"
              content-class="rounded-lg"
              class="rounded-lg"
              aspect-ratio="16/9"
              max-width="32"
              width="32"
              :src="require(`./../assets/usd_flag.png`)"
            />
            </v-btn>
          </template> -->

          <v-list>
            <v-list-item link @click="changeLanguage('en')">
              <v-img
                style="height: 32px;"
                content-class="rounded-lg"
                class="rounded-lg mr-2"
                aspect-ratio="16/9"
                max-width="32"
                width="32"
                :src="require(`./../assets/usd_flag.png`)"
              />
              <v-list-item-title>
                EN-US
              </v-list-item-title>
            </v-list-item>
            <v-list-item link @click="changeLanguage('pt')">
              <v-img
                style="height: 32px;"
                content-class="rounded-lg"
                class="rounded-lg mr-2"
                aspect-ratio="16/9"
                max-width="32"
                width="32"
                :src="require(`./../assets/brazil_flag.png`)"
              />
              <v-list-item-title>
                PT-BR
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="my-auto ml-5"
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item link @click="logoutClicked()">
              <v-list-item-title>
                {{ $t('instructions.logout') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <template v-slot:extension>
      <!-- <v-tabs
        v-model="tab"
        dense
        background-color="#121212"
        :slider-size="5"
        :height="40"
        class="mt-3"
        style="border-bottom: 1px solid gray"
        show-arrows
      >
        <v-tab
          v-for="(menu, index) in menus"
          :key="index"
          :disabled="menu.disabled"
          :to="menu.to"
        >
          <span 
            class="white--text text-capitalize"
            style="font-weight: 400;"
          >
            {{ menu.label }}
          </span>
        </v-tab>
        <v-spacer></v-spacer>
        <v-chip color="#212121" class="mr-2">
          <v-switch
            v-model="isMockDataOn"
            color="primary"
            @change="onSwitchChange()"
            hide-details
          ></v-switch>
          <span 
            class="white--text text-capitalize"
            style="font-weight: 400;"
            :style="{ fontWeight: getIsMockDataOn ? 'bold' : 'normal' }"
          >
            {{ $t('toolbar.testMode') }}
          </span>
        </v-chip>
      </v-tabs> -->
      <v-card class="mt-4 d-flex" style="width: 100%; background-color: #ededeb;">
        <div class="d-flex" style="background-color: #ededeb; height: 40px;">
          <template v-for="(menus, index) in menusList">
            <router-link
              :key="'direct-' + index"
              :to="menus.menus[0].to"
              class="d-flex align-center px-4 text-decoration-none hoverable-menu"
              style="background-color: #ededeb;"
              :style="{ ...isActiveMenu(menus.menus), width: index === 1 ? '200px' : '140px' }"
            >
              <span class="font-weight-bold">{{ menus.title }}</span>
            </router-link>
          </template>
        </div>
      </v-card>
    </template>

    <v-snackbar
      color="attention"
      v-model="logoutError"
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="attention"
          text
          v-bind="attrs"
          @click="logoutError = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>
  </v-app-bar>
</template>

<script>
import { mapActions, mapWritableState } from "pinia"
// import { mapActions, mapState, mapWritableState } from "pinia"
import { useAuthStore } from "./../store/index"

export default {
  components: {
  },
  data () {
    return {
      tab: 0,
      logoutError: false,
      errorMessage: undefined,
      // menus: [
      //   { label: this.$t('menus.fxmarket'), to: "/grid/fxmarket" },
      //   { label: this.$t('menus.trading'), to: "/grid/trading" },
      //   { label: this.$t('menus.reports'), to: "/grid/reports" },
      //   { label: "Monitoring (TBR)", disabled: true },
      //   { label: "IP Allowlist (TBR)", disabled: true },
      //   { label: "Session (TBR)", disabled: true },
      //   { label: "Notifications (TBR)", disabled: true }
      // ],
      eventSource: undefined,
      GRIDPretty: "",
      GRIDPROPretty: "PRO",
      intervalMinutely: null,
      intervalHourly: null,
      openGroups: {},
      hasFetchedHourlySuccess: false,
      animationDuration: 20,
      menuStates: {},
      activeSubItemIndex: null
    }
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions(useAuthStore, [
      "logout",
      "removeSessionLocalStorage",
      "getUserRoleFromLocalStorage"
    ]),
    logoutClicked () {
      this.logout()
        .then(() => {
          this.authenticated = false
          this.userId = undefined
          this.removeSessionLocalStorage()
          this.$router.push("/")
        })
        .catch((error) => {
          this.logoutError = true
          this.errorMessage = "Unable to log out. Try again later."
          console.log(error)
        })
    },

    isActiveMenu(menuList) {
      const isCurrentRoute = menuList.some(menu => menu.to === this.$route.path)

      const isCurvesRoute = this.$route.path === "/grid/home-curves/curves"

      if (isCurrentRoute || (isCurvesRoute && menuList.some(menu => menu.to.includes('/grid/home-curves')))) {
        return { borderBottom: '5px solid #0073ff' }
      }

      return {}
    },
  },
  computed: {
    ...mapWritableState(useAuthStore, [
      "authenticated",
      "userId"
    ]),
    isPtBRLocale() {
      return this.$i18n.locale === "pt"
    },
    menusList() {
      return [
        {
          title: this.$t("menus.home"),
          menus: [
            { label: this.$t("menus.home"), to: "/tech-pharmacy/home" },
          ]
        },
        {
          title: this.$t("menus.activeMedications"),
          menus: [
            { label: this.$t("menus.activeMedications"), to: "/tech-pharmacy/active-medications" },
          ]
        }
      ]
    },
  }
}
</script>

<style scoped>
::v-deep .v-toolbar__extension {
  height: 42px !important;
}

::v-deep .v-tabs-bar {
  align-items: center
}
::v-deep .v-toolbar__extension {
  padding: 0 !important;
}
</style>
