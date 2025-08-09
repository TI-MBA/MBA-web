<template>
  <div class="hero">
    <progress
      class="progress is-small is-info"
      max="100"
      v-bind:class="progressVisibility"
    >
      50%
    </progress>
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column is-4-widescreen">
          <div class="box">
            <img src="@/assets/logoBaque.png" />

            <div class="title has-text-grey is-5">Login</div>
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    v-model="email"
                    placeholder="Email"
                    autofocus=""
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    v-model="password"
                    type="password"
                    placeholder="Senha"
                  />
                </div>
              </div>
              <br />
              <p class="has-text-danger" v-bind:class="errorMessageVisibility">
                {{ errorMessage }}
              </p>
              <br />
              <button
                type="submit"
                class="button is-block is-danger is-large is-fullwidth"
                v-bind:class="buttonLoading"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "../services/ApiService";

export default {
  data() {
    return {
      email: "",
      password: "",
      user_type: 0,
      progressVisibility: "is-hidden",
      errorMessageVisibility: "is-hidden",
      buttonLoading: "",
      errorMessage: "",
    };
  },
  mounted() {
    let userID = localStorage.getItem("userid");
    if (userID) {
      this.$router.push("/");
    }
  },
  computed: {},
  methods: {
    login() {
      this.isLoading(true);
      this.clearErrors();
      if (this.email == "" || this.password == "") {
        this.setError("Email e Senha devem ser preenchidos");
        this.isLoading(false);
        return;
      } else {
        this.executeLoginRequest();
      }
    },
    executeLoginRequest() {
      authService
        .login(this.email, this.password)
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            this.isLoading(false);
            localStorage.setItem("userid", response.data.id);
            localStorage.setItem("userEmail", response.data.email);
            localStorage.setItem("user_type", response.data.adminLevel);
            this.$router.push("/");
          }
        })
        .catch((err) => {
          this.isLoading(false);
          if (err.response.status == 401) {
            this.setError("Email ou Senha incorretos");
          } else {
            this.setError("Erro ao realizar login");
          }
        });
    },
    isLoading(stateLoading) {
      if (stateLoading) {
        this.progressVisibility = "";
        this.buttonLoading = "is-loading";
      } else {
        this.progressVisibility = "is-hidden";
        this.buttonLoading = "";
      }
    },
    clearErrors() {
      this.errorMessageVisibility = "is-hidden";
    },
    setError(message) {
      this.errorMessage = message;
      this.errorMessageVisibility = "";
    },
  },
};
</script>
