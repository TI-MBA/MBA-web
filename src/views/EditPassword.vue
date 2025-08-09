<template>
  <div class="hero">
    <Navbar />
    <div class="notification is-light" v-bind:class="resultAlertClass">
      <strong>{{ resultAlertMessage }}</strong>
    </div>

    <div class="hero-body p-5">
      <p class="is-size-3">{{ "Editar senha" }}</p>
      <div class="columns is-centered">
        <div class="box mt-5">
          <div class="column">
            <form @submit.prevent="didClickEditPassword">
              <div class="field">
                <label
                  class="has-text-weight-semibold flex-center mr-4"
                  for="payment-value"
                  >Digite sua senha atual: *</label
                >
                <input
                  class="input is-large"
                  v-model="currentPassword"
                  type="password"
                  placeholder="senha atual"
                  autofocus=""
                />
              </div>

              <div class="field">
                <label
                  class="has-text-weight-semibold flex-center mr-4"
                  for="payment-value"
                  >Digite a nova senha: *</label
                >
                <input
                  class="input is-large"
                  v-model="newPassword"
                  type="password"
                  placeholder="nova senha"
                  autofocus=""
                />
              </div>

              <div class="field">
                <label
                  class="has-text-weight-semibold flex-center mr-4"
                  for="payment-value"
                  >Repita a nova senha: *</label
                >
                <input
                  class="input is-large"
                  v-model="repeatNewPassword"
                  type="password"
                  placeholder="repita nova senha"
                  autofocus=""
                />
              </div>
              <br />
              <button
                type="submit"
                class="button is-info is-size-5"
                v-bind:class="buttonLoading"
              >
                Alterar senha
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import { authService } from "../services/ApiService";

export default {
  components: {
    Navbar,
  },
  mounted() {},
  created() {},
  data() {
    return {
      userId: localStorage.getItem("userid"),
      email: localStorage.getItem("userEmail"),
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      buttonLoading: "",
      resultAlertClass: "is-hidden",
      resultAlertMessage: "",
    };
  },
  methods: {
    didClickEditPassword() {
      this.clearAlert();
      this.buttonLoading = "is-loading";
      if (
        this.currentPassword == "" ||
        this.newPassword == "" ||
        this.repeatNewPassword == ""
      ) {
        this.showResultAlert("Todos os campos são obrigatórios", false);
      } else if (this.newPassword != this.repeatNewPassword) {
        this.showResultAlert(
          "Os campos 'Digite nova senha' e 'repita nova senha' devem ser iguais",
          false
        );
      } else {
        this.fetchEditPassword();
      }
    },
    fetchEditPassword() {
      authService
        .editPassword(this.email, this.currentPassword, this.newPassword)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            this.showResultAlert("Senha alterada com sucesso", true);
          } else {
            this.showResultAlert("Falha ao alterar a senha", false);
          }
        })
        .catch((err) => {
          this.showResultAlert(
            "Erro ao alterar senha code: " + err.response.status,
            false
          );
        });
    },
    showResultAlert(message, wasSuccess) {
      this.resultAlertMessage = message;
      this.resultAlertClass = wasSuccess ? "is-success" : "is-danger";
      this.buttonLoading = "";
    },
    clearAlert() {
      this.resultAlertClass = "is-hidden";
    },
  },
};
</script>

<style>
.flex-center {
  display: flex;
  align-items: center;
}
</style>
