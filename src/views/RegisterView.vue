<template>
  <div class="d-flex fill-height">
    <v-app-bar
      app
      :height="65"
      color="white"
    >
      <v-img
        style="height: 50px;"
        aspect-ratio="16/9"
        :src="require(`./../assets/logo-tech.png`)"
        max-width="148"
        contain
        class="my-auto"
      >
      </v-img>
      <!-- <div class="my-auto d-flex">
      </div> -->
    </v-app-bar>

    <v-main 
      class="d-flex justify-center align-center content py-0"
    >
      <v-card
        width="450"
        height="570"
        class="pa-6 mx-auto"
      >
        <v-card-title class="text-h4">
          {{ $t('register.title') }}
        </v-card-title>
        <v-card-text>
          <v-form
            v-model="formValid"
            ref="form"
            class="d-flex flex-column mt-4"
          >
            <span class="font-weight-bold">
              {{ $t('register.fullName') }}
            </span>

            <v-text-field
              v-model="fullName"
              dense
              :background-color="'white'"
              :placeholder="$t('register.fullNamePlaceholder')"
              outlined
              required
            >
              <!-- prepend-inner-icon="mdi-monitor-multiple" -->
              <template v-slot:prepend-inner>
                <v-icon 
                  small
                  color="#a5a5a5"
                  class="pa-1"
                >
                mdi-account
                </v-icon>
              </template>
            </v-text-field>

            <span class="font-weight-bold">
              {{ $t('register.email') }}
            </span>

            <v-text-field
              v-model="email"
              dense
              :background-color="'white'"
              :placeholder="$t('register.emailPlaceholder')"
              outlined
              required
              :rules="[v => !!v || 'Email é obrigatório', v => isEmailValid || 'Email inválido']"
            >
              <!-- prepend-inner-icon="mdi-monitor-multiple" -->
              <template v-slot:prepend-inner>
                <v-icon 
                  small
                  color="#a5a5a5"
                  class="pa-1"
                >
                  mdi-monitor-multiple
                </v-icon>
              </template>
            </v-text-field>

            <div class="d-flex font-weight-bold">
              <span>
                {{ $t('register.password') }}
              </span>
              <v-spacer></v-spacer>
              <span
                class="primary--text"
                style="cursor: pointer;"
              >
              <!--Forgot Password-->
              </span>
            </div>

            <v-text-field
              v-model="password"
              dense
              :background-color="'white'"
              :placeholder="$t('register.passwordPlaceholder')"
              outlined
              required
              :type="showPassword ? 'text' : 'password'"
              :rules="[
                v => !!v || 'Senha é obrigatória',
                v => (v && v.length >= 10) || 'Mínimo de 10 caracteres',
                v => /\d/.test(v) || 'Deve conter ao menos um número',
                v => /[^A-Za-z0-9]/.test(v) || 'Deve conter caractere especial'
              ]"
            >
              <!-- prepend-inner-icon="mdi-key" -->
              <template v-slot:prepend-inner>
                <v-icon 
                  small
                  color="#a5a5a5"
                  class="pa-1"
                >
                  mdi-key
                </v-icon>
              </template>

              <!-- :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" -->
              <template v-slot:append>
                <v-icon 
                  small
                  class="pa-1"
                  color="#a5a5a5"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>

            <div class="d-flex font-weight-bold">
              <span>
                {{ $t('register.confirmPassword') }}
              </span>
              <v-spacer></v-spacer>
              <span
                class="primary--text"
                style="cursor: pointer;"
              >
              <!--Forgot Password-->
              </span>
            </div>

            <v-text-field
              v-model="confirmPassword"
              dense
              :background-color="'white'"
              :placeholder="$t('register.confirmPasswordPlaceholder')"
              outlined
              required
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="[
                v => !!v || 'Confirmação é obrigatória',
                v => v === password || 'Senhas não coincidem'
              ]"
            >
              <!-- prepend-inner-icon="mdi-key" -->
              <template v-slot:prepend-inner>
                <v-icon 
                  small
                  color="#a5a5a5"
                  class="pa-1"
                >
                  mdi-key
                </v-icon>
              </template>

              <!-- :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" -->
              <template v-slot:append>
                <v-icon 
                  small
                  class="pa-1"
                  color="#a5a5a5"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  {{ showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </template>
            </v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div>
            <span>
              {{ $t('register.alreadyHaveAccount') }}
              <span
                class="primary--text"
                style="cursor: pointer;"
                @click="redirect('/login')"
              >
                {{ $t('register.login') }}
              </span>
            </span>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            elevation="0"
            tile
            :disabled="!formValid || disabledRegisterButton"
            @click="submitRegisterUser()"
          >
            <!-- :href="'/console/home'" -->
            <span class="text-capitalize">
              {{ $t('register.register') }}
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-main>

    <v-snackbar
      color="attention"
      v-model="loginError"
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="attention"
          text
          v-bind="attrs"
          @click="loginError = false"
        >
          OK
        </v-btn>
      </template>
    </v-snackbar>

    <v-footer 
      app
      padless
      height="32" 
      color="white"
      class="d-flex text-caption px-4"
    >
      <div>
        © 2023-2024 Tech Pharmacy All rights reserved.
      </div>

      <v-menu
        open-on-hover
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            plain
          >
            <v-img
              v-if="isPtBRLocale"
              style="height: 32px;"
              content-class="rounded-lg"
              class="rounded-lg mr-2"
              aspect-ratio="16/9"
              max-width="32"
              width="32"
              :src="require(`./../assets/brazil_flag.png`)"
            />
            <v-img
              v-else
              style="height: 32px;"
              content-class="rounded-lg"
              class="rounded-lg mr-2"
              aspect-ratio="16/9"
              max-width="32"
              width="32"
              :src="require(`./../assets/usd_flag.png`)"
            />
            {{ $t('extras.language') }}
            </v-btn>
        </template>

        <v-list style="background-color: white;">
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
              <span style="color: #000" >EN-US</span>
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
              <span style="color: #000" >PT-BR</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <!--
      <div class="footer-menu"> Contact Us </div>
      <v-divider vertical inset class="mx-6"></v-divider>
      <div class="footer-menu"> Terms of Service </div>
      <v-divider vertical inset class="mx-6"></v-divider>
      <div class="footer-menu"> Trademarks </div>
      <v-divider vertical inset class="mx-6"></v-divider>
      <div class="footer-menu"> Privacy Policy </div>
      -->
    </v-footer>
  </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from "pinia";
import { useAuthStore } from "./../store/index";

export default {
  data () {
    return {
      formValid: undefined,
      fullName: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      showPassword: false,
      showConfirmPassword: false,
      loadingLogin: false,
      loginError: false,
      errorMessage: undefined,
      disabledRegisterButton: false,
    }
  },
  mounted () {
    // this.registerUser()
  },
  methods: {
    ...mapActions(useAuthStore, [
      "login",
      "saveSessionLocalStorage",
      "registerUser"
    ]),
    validate () {
      this.$refs.form.validate()
      if (this.formValid) {
        this.loadingLogin = true
        if (this.username === "hedge" && this.password === "hedge@1234"){
          this.authenticated = true
          this.$router.push("/console/home")
          return
        }
        this.loginError = true
        this.errorMessage = "User authentication failed: invalid credentials"
        // const data = {
        //   username: this.username,
        //   // eslint-disable-next-line
        //   password: md5(this.password.trim())
        // }
        // this.login(data)
        //   .then((response) => {
        //     const data = response.data
        //     const userId = data.user_id
        //     this.authenticated = true
        //     this.userId = userId
        //     this.saveSessionLocalStorage(data)
        //     this.$router.push("/console/home")
        //   })
        //   .catch((error) => {
        //     if (error.response && error.response.status === 401) {
        //       this.loginError = true
        //       this.errorMessage = "User authentication failed: invalid credentials"
        //       console.log(error)
        //     }
        //   })
        //   .finally(() => {
        //     this.loadingLogin = false
        //   })
      }
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang
      localStorage.setItem('userLanguage', lang)
    },
    redirect (url) {
      this.$router.push(url)
    },
    submitRegisterUser () {
      this.$refs.form.validate()
      if (this.formValid) {
        const payload = {
          name: this.fullName,
          email: this.email,
          password: this.password
        }

        this.disabledRegisterButton = true
        this.registerUser(payload)
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {
            this.loginError = true
            this.errorMessage = "Email já existente, tente outro!"
          })
          .finally(() => {
            this.disabledRegisterButton = false
          })
      }
    }
  },
  computed: {
    ...mapWritableState(useAuthStore, [
      "authenticated",
      "userId",
      "apiKey"
    ]),
    ...mapState(useAuthStore, [
      // "getBlotter",
      // "isBlotterFXSupplier",
      "isAuthenticated",
      "getUserId"
    ]),
    isPtBRLocale() {
      return this.$i18n.locale === "pt"
    },
    disabledRegister() {
      return !this.isEmailValid || !this.isPasswordStrong || this.password !== this.confirmPassword
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(this.email || '')
    },
    isPasswordStrong() {
      if(!this.password) return false
      const hasNumber = /\d/.test(this.password || '')
      const hasSpecialChar = /[^A-Za-z0-9]/.test(this.password || '')
      return (this.password || '').length >= 10 && hasNumber && hasSpecialChar
    }
  }
}
</script>

<style scoped>
.content {
  background-image: url("./../assets/white-background-login.svg");
  background-repeat: repeat;
  background-color: #000;
  flex: 1 0 auto;
}
.banner-title {
  background-color: #000;
  color: #fff;
  font-size: 60px;
  font-weight: 500;
  letter-spacing: .29px;
  line-height: 73px;
  max-height: 200px;
  max-width: 520px;
  margin-top: 90px;
  padding: 25px 50px;
  text-align: start;
  word-wrap: break-word;
}
.container-login {
  color: #fff;
  background-color: #000;
  /* margin-left: 13%; */
  max-width: 460px;
  font-size: 22px;
  text-align: start;
  max-height: 520px;
  height: 500px;
  font-weight: 300;
  padding: 0 10px 0 40px;
}
.footer-menu {
  cursor: pointer;
}
.footer-menu:hover {
  text-decoration: underline;
}
</style>
