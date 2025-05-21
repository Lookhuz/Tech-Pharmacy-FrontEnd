<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7" xl="6">
        <template v-if="medicationDetails">
          <v-card>
            <v-img
              :src="medicationDetails.fotoLink"
              height="300px"
              contain
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-card-title class="headline font-weight-bold primary--text text-center d-block pt-4 pb-2">
              {{ medicationDetails.nome }}
            </v-card-title>

            <v-card-text class="text-center mb-4 text-body-1">
              {{ medicationDetails.descricao }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text>
              <h3 class="text-h6 font-weight-medium mb-4 primary--text">Informações Adicionais</h3>
              <v-form ref="userInfoForm">
                <v-text-field
                  v-model="userInfo.idade"
                  label="Idade"
                  type="number"
                  outlined
                  dense
                  class="mb-3"
                  :rules="[rules.numberOnly, rules.positiveNumber]"
                  min="0"
                ></v-text-field>

                <v-text-field
                  v-model="userInfo.peso"
                  label="Peso (kg)"
                  type="number"
                  outlined
                  dense
                  suffix="kg"
                  class="mb-3"
                  :rules="[rules.numberOnly, rules.positiveNumber]"
                  min="0"
                ></v-text-field>

                <v-textarea
                  v-model="userInfo.alergias"
                  label="Alergias (se houver)"
                  outlined
                  dense
                  rows="3"
                  placeholder="Ex: Dipirona, Amoxicilina, Frutos do Mar"
                  class="mb-2"
                ></v-textarea>
              </v-form>
            </v-card-text>

            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submitUserInfo">
                Enviar Informações
              </v-btn>
            </v-card-actions>

          </v-card>
        </template>
        <template v-else>
          <v-alert type="warning" border="left" colored-border prominent>
            <div class="text-h6">Medicamento não encontrado</div>
            Não foi possível carregar os detalhes para o medicamento com ID: <strong>{{ idFromRoute }}</strong>.
            Por favor, verifique se o ID está correto ou tente novamente mais tarde.
          </v-alert>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useMedicationStore } from "@/store/index.js";

export default {
  name: 'MedicationDetailView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userInfo: {
        idade: null,
        peso: null,
        alergias: '',
      },
      rules: {
        numberOnly: value => /^[0-9]*$/.test(value) || 'Apenas números são permitidos.',
        positiveNumber: value => (value === null || value === '' || parseFloat(value) >= 0) || 'O valor deve ser positivo.',
        // Adicionar regra de obrigatório se necessário para os campos de userInfo
        requiredField: value => !!value || 'Campo obrigatório.',
      }
    };
  },
  computed: {
    medicationDetails() {
      const medicationStore = useMedicationStore();
      return medicationStore.getMedicamentoById(this.id);
    },
    idFromRoute() {
      return this.id || this.$route.params.id;
    }
  },
  created() {
    const medicationStore = useMedicationStore();
    medicationStore.ensureMedicamentosLoaded();
  },
  methods: {
    submitUserInfo() {
      if (this.$refs.userInfoForm.validate()) {
        // console.log('Informações do usuário válidas:', this.userInfo);
        // console.log('Medicamento selecionado ID:', this.id);

        // Navegar para a tela de configuração de dosagem
        this.$router.push({
          name: 'dosage-configuration', // Nome da rota definida em router.js
          params: {
            id: this.id, // Passa o ID do medicamento (já é parte da URL da nova rota)
            userInfo: this.userInfo // Passa o objeto com dados do usuário
          }
        });
      } else {
        // alert('Por favor, corrija os erros no formulário.');
        this.$vuetify.goTo(0); // Rola para o topo para ver os erros de validação
      }
    }
  }
};
</script>

<style scoped>
.headline.font-weight-bold.primary--text {
  /* Se quiser usar a cor primária do seu tema Vuetify */
  /* color: var(--v-primary-base); */
}

.text-center.d-block {
  display: block;
  text-align: center;
}

/* Adicionar um pouco mais de espaço se necessário */
.v-card__text h3 {
  margin-top: 8px;
}
</style>