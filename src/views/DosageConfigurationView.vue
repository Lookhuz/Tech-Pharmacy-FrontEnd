// DosageConfigurationView.vue
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7" xl="6">
        <template v-if="medicationDetails">
          <v-card>
            <v-card-title class="headline font-weight-bold primary--text text-center d-block pt-4 pb-2">
              Configurar Dosagem: {{ medicationDetails.nome }}
            </v-card-title>

            <v-card-text class="mt-2">
              <h3 class="text-h6 font-weight-medium mb-2 secondary--text">
                Informações de Uso
              </h3>
              <p class="text-body-1" v-if="medicationDetails.informacoesDeUso">
                {{ medicationDetails.informacoesDeUso }}
              </p>
              <p class="text-body-1" v-else>
                Siga as orientações médicas para o uso deste medicamento ou consulte a bula.
              </p>
              <p v-if="passedUserInfo" class="text-caption grey--text mt-3">
                Configurando para: Idade {{ passedUserInfo.idade }}, Peso {{ passedUserInfo.peso }}kg.
                Alergias: {{ passedUserInfo.alergias || 'Nenhuma informada' }}.
              </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-form ref="dosageForm">
              <v-card-text>
                <h3 class="text-h6 font-weight-medium mb-4 primary--text">Definir Tratamento</h3>
                <v-select
                  v-model="dosageInfo.intervaloHoras"
                  :items="intervalOptions"
                  item-text="text"
                  item-value="value"
                  label="Intervalo entre as doses"
                  outlined
                  dense
                  class="mb-3"
                  :rules="[rules.required]"
                ></v-select>

                <v-text-field
                  v-model="dosageInfo.duracaoDias"
                  label="Duração do tratamento (dias)"
                  type="number"
                  outlined
                  dense
                  class="mb-3"
                  :rules="[rules.required, rules.numberOnly, rules.positiveNumber]"
                  min="1"
                ></v-text-field>
              </v-card-text>

              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="success" large @click="configureReminders">
                  <v-icon left>mdi-calendar-clock</v-icon>
                  Configurar Lembretes
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </template>
        <template v-else>
          <v-alert type="error" border="left" colored-border prominent>
            <div class="text-h6">Erro ao Carregar Medicamento</div>
            Não foi possível carregar os detalhes para o medicamento com ID: <strong>{{ id }}</strong>.
            Verifique se o medicamento existe ou tente novamente.
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useMedicationStore, useActiveMedicationsStore } from "@/store/index.js";

export default {
  name: 'DosageConfigurationView',
  props: {
    id: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dosageInfo: {
        intervaloHoras: null,
        duracaoDias: null,
      },
      intervalOptions: [
        { text: 'A cada 4 horas', value: 4 },
        { text: 'A cada 6 horas', value: 6 },
        { text: 'A cada 8 horas', value: 8 },
        { text: 'A cada 12 horas', value: 12 },
        { text: 'A cada 24 horas (1 vez ao dia)', value: 24 },
      ],
      rules: {
        required: value => !!value || 'Este campo é obrigatório.',
        numberOnly: value => /^[0-9]*$/.test(value) || 'Apenas números são permitidos.',
        positiveNumber: value => (value === null || value === '' || parseFloat(value) > 0) || 'O valor deve ser maior que zero.',
      },
      passedUserInfo: null,
    };
  },
  computed: {
    medicationDetails() {
      const medicationStore = useMedicationStore();
      return medicationStore.getMedicamentoById(this.id);
    }
  },
  created() {
    const medicationStore = useMedicationStore();
    medicationStore.ensureMedicamentosLoaded();

    if (this.userInfo) {
      this.passedUserInfo = { ...this.userInfo };
    } else if (this.$route.params.userInfo) {
      try {
        this.passedUserInfo = (typeof this.$route.params.userInfo === 'string')
          ? JSON.parse(this.$route.params.userInfo)
          : this.$route.params.userInfo;
      } catch (e) {
        console.error("Erro ao parsear userInfo dos parâmetros da rota:", e);
        this.passedUserInfo = null;
      }
    }
  },
  methods: {
    configureReminders() {
      if (this.$refs.dosageForm.validate()) {
        const activeMedications = useActiveMedicationsStore();

        const activeMedicationData = {
          medicationId: this.id,
          userInfo: this.passedUserInfo, // As informações que já tínhamos
          dosageInfo: { ...this.dosageInfo } // A dosagem configurada
        };

        activeMedications.addActiveMedication(activeMedicationData);

        // console.log('Configuração de Dosagem Salva:', activeMedicationData);
        // console.log('Medicamento:', this.medicationDetails);

        // Redirecionar para a tela de medicamentos ativos
        this.$router.push({ name: 'active-medications' });
      } else {
        // alert('Por favor, preencha todos os campos corretamente.');
        this.$vuetify.goTo(0);
      }
    }
  }
};
</script>

<style scoped>
.headline.font-weight-bold.primary--text {
  /* Estilos se necessário */
}
.text-center.d-block {
  display: block;
  text-align: center;
}
</style>