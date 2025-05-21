<template>
  <div>
    <v-row no-gutters class="mb-8 px-8">
      <v-col xs="0" sm="0" md="0" lg="1" xl="1"></v-col>
      <v-col xs="12" sm="12" md="12" lg="10" xl="10" class="pt-8">
        <div class="d-flex flex-column">
          <v-row class="d-flex pb-8">
            <v-col class="d-flex justify-center text-h3 font-weight-light text-center">
              {{ $t('medication.title') }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="1" sm="0" md="0" lg="1" xl="1"></v-col>
            <v-col cols="10" sm="12" md="12" lg="10" xl="10">
              <v-row no-gutters class="justify-center">
                <v-col
                  v-for="medicamento in medicamentos"
                  :key="medicamento.id" cols="12" sm="6" md="4" lg="3" class="pa-2 d-flex"
                >
                  <v-card
                    class="d-flex flex-column flex-grow-1"
                    @click="verDetalhesMedicamento(medicamento)"
                    hover
                    style="cursor: pointer;"
                  >
                    <v-img :src="medicamento.fotoLink" height="200px" contain class="grey lighten-2">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <v-card-title class="text-subtitle-1">{{ medicamento.nome }}</v-card-title>
                    <v-card-text class="text-body-2 flex-grow-1">{{ medicamento.descricao }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" sm="0" md="0" lg="1" xl="1"></v-col>
          </v-row>
        </div>
      </v-col>
      <v-col xs="0" sm="0" md="0" lg="1" xl="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import {
  useDisplayStore,
  useAuthStore,
  useMedicationStore // Importar o novo store
} from "../store/index"; // Ou o caminho direto: import { useMedicationStore } from "@/store/medicationStore";
import { mapState, mapActions } from "pinia"; // mapActions não está sendo usado aqui, mas pode ser útil
import * as utils from "../utils.js";

export default {
  components: {},
  filters: {
    formatDate (timestamp) {
      return utils.getLocaleFormattedDateTime(timestamp);
    },
    formatPrice (price) {
      return utils.formatPrice(price);
    },
  },
  data () {
    return {};
  },
  computed: {
    ...mapState(useDisplayStore, [
      "isXSmall", "isSmall", "isMedium", "isLarge", "isXLarge"
    ]),
    ...mapState(useMedicationStore, [
      "getAllMedicamentos"
    ]),
    medicamentos() {
      return this.getAllMedicamentos;
    }
  },
  created() {
    this.ensureMedicamentosLoaded();
  },
  methods: {
    ...mapActions(useAuthStore, ["getUserRoleFromLocalStorage"]),
    ...mapActions(useMedicationStore, ["ensureMedicamentosLoaded"]),
    verDetalhesMedicamento(medicamento) {
      this.$router.push({
        name: 'medication-detail',
        params: {
          id: medicamento.id // MUDANÇA: Passar o ID do medicamento
          // Não é mais necessário passar medicationObject, pois MedicationDetailView buscará do store
        }
      });
    },
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

.v-input--radio-group__input {
  display: block
}

.d-flex.flex-column.flex-grow-1 {
  height: 100%;
}

.pa-2 {
  padding: 8px !important;
}
</style>