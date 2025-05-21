<template>
  <div>
    <v-row no-gutters class="mb-8 px-8">
      <v-col
        xs="0"
        sm="0"
        md="0"
        lg="1"
        xl="1"
      >
      </v-col>

      <v-col
        xs="12"
        sm="12"
        md="12"
        lg="10"
        xl="10"
        class="pt-8"
      >
        <div class="d-flex flex-column">
          <v-row class="d-flex pb-8">
            <v-col class="d-flex justify-center text-h3 font-weight-light text-center">
              {{ $t('medication.title') }}
            </v-col>
            <v-col v-if="false" cols="2" class="font-weight-light">
              <!-- {{ now }} -->
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="1">
            </v-col>

            <v-col cols="10">
              <v-row no-gutters class="justify-center">
                <v-col cols="10"  class="d-flex justify-center flex-gap-8">
                  <span>abap</span>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="1">
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col
        xs="0"
        sm="0"
        md="0"
        lg="1"
        xl="1"
      >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  useDisplayStore,
  useAuthStore,
} from "../store/index"
import { mapState, mapActions } from "pinia"
import * as utils from "../utils.js"

export default {
  components: {
  },
  filters: {
    formatDate (timestamp) {
      return utils.getLocaleFormattedDateTime(timestamp)
    },
    formatPrice (price) {
      return utils.formatPrice(price)
    },
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(useDisplayStore, [
      "isXSmall",
      "isSmall",
      "isMedium",
      "isLarge",
      "isXLarge"
    ]),
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions(useAuthStore, [
      "getUserRoleFromLocalStorage"
    ]),
  }
}
</script>

<style scoped>
::v-deep div.v-radio.disabled.v-radio--is-disabled.theme--dark > div > i {
  color: #303030;
}
.font-size-rate {
  font-size: 22px;
}
.line-height {
  line-height: 26px;
}
.relative-container {
    position: relative;
}
.center-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

/* @media (max-width: 810px) {
  .responsive {
    flex-direction: column;
  }
  .responsive > :first-child {
    flex-direction: row !important;
  }
} */

.v-input--radio-group__input {
  display: block
}
</style>
