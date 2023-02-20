<template>
    <div class="hero">
      <progress class="progress is-small is-info" max="100" v-bind:class="progressVisibility">50%</progress>
      <div class="hero-body">
        <div class="columns is-centered">
          <div class="column is-4-widescreen">
            <div class="box">
              <img src="@/assets/logoBaque.png">
  
              <div class="title has-text-grey is-5">Login</div>            
              <form @submit.prevent="login">
                <div class="field">
                  <div class="control">
                   <input class="input is-large" v-model="email" placeholder="Email" autofocus="">
                  </div>
                </div>
  
                <div class="field">
                  <div class="control">
                    <input class="input is-large" v-model="password" type="password" placeholder="Senha">
                  </div>
                </div>
                <br>
                <p class="has-text-danger" v-bind:class="errorMessageVisibility">{{ errorMessage }}</p>
                <br>
                <button type="submit" class="button is-block is-danger is-large is-fullwidth" v-bind:class="buttonLoading">Login</button>
              </form>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {  
    data() {
      return {
        email: "",
        password: "",
        user_type: 0,
        progressVisibility: 'is-hidden',
        errorMessageVisibility: 'is-hidden',
        buttonLoading: '',
        errorMessage: ''
      };
    },
    mounted() {
        let userID = localStorage.getItem('userid')
        let userType = localStorage.getItem('user_type')
        if (userID) {
          if (userType == 1 || userType == 4) { 
            this.$router.push('/presence-info')
          } else {
            this.$router.push('/')
          }
        }
    },
    computed: {},
    methods: {
      login() {
        this.isLoading(true)
        this.clearErrors()
        if (this.email == "" || this.password == "") {
          this.setError('Email e Senha devem ser preenchidos')
          this.isLoading(false)
          return
        } else {
          this.executeLoginRequest()
        }
      },
      executeLoginRequest() {
        axios.post('https://mba-api.herokuapp.com/api/user/signin', {
          email: this.email,
          password: this.password        
        })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            this.isLoading(false)
            let route = ''
            if (response.data.adminLevel == 0){
              route = '/'
            } else if (response.data.adminLevel == 1 || response.data.adminLevel == 4) {              
              route = '/presence-info'
            } else {
              this.setError('Página em construção')
              return
            }

            localStorage.setItem('userid', response.data.id)
            localStorage.setItem('userEmail', response.data.email)
            localStorage.setItem('user_type', response.data.adminLevel)
            this.$router.push(route)
          }        
        })
        .catch(err => {
            this.isLoading(false)
            if (err.response.status == 401) {
                this.setError('Email ou Senha incorretos')
            } else {
                this.setError('Erro ao realizar login')
            }
        });
      },
      isLoading(stateLoading) {
        if (stateLoading) {
          this.progressVisibility = ''
          this.buttonLoading = 'is-loading'
        } else {
          this.progressVisibility = 'is-hidden'
          this.buttonLoading = ''
        }
      },
      clearErrors() {
        this.errorMessageVisibility = 'is-hidden'
      },
      setError(message) {
        this.errorMessage = message
        this.errorMessageVisibility = ''
      }
    }
  }
  </script>