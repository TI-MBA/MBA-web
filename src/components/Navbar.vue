<template>
    <nav class="navbar has-shadow is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" @click="redirectToPages">
                <h2 id="name"> Home </h2>
            </a>

            <a class="navbar-item" @click="goToEditPassword" v-bind:class="editPasswordVisibility">
                <h2 id="name"> Editar senha </h2>
            </a>
            <a class="navbar-item" @click="goToInfoPage">
                <h2 id="name"> Cartilha </h2>
            </a>

            <a class="navbar-burger" @click="toggleBurgerMenu">
            <span></span>
            <span></span>
            <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">
            <div class="navbar-end">
                <div class="navbar-item" v-bind:class="adminAddPaymentClass">
                    <a class="button is-info is-outlined" @click="addPaymentAction">
                        Adicionar pagamento
                    </a>
                </div>
                <div class="navbar-item">
                    <a class="button is-danger is-outlined" @click="logout">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </nav> 
</template>

<script>
// import func from 'vue-editor-bridge'

export default {
    props: {
        addPayment: Boolean
    },
    Data() {
        return {
            userId: null,
            isMaesteryAdmin: false
        }
    },
    created () {
        this.userId = localStorage.getItem('userid')
        this.isMaesteryAdmin = localStorage.getItem('user_type') == 1 || localStorage.getItem('user_type') == 4 ? true : false
    },
    methods: {
        toggleBurgerMenu() {
            document
            .querySelector('#nav-links')
            .classList
            .toggle('is-active')
        },
        goToMemberHome() {
            if (this.userId != null) {
                if (this.$route.name != 'MemberHome') {
                    this.$router.push('/');
                }
            } else {
                this.logout()
            }
        },
        goToEditPassword() {
            if (this.userId != null) {
                if (this.$route.name != 'EditPassword') {
                    this.$router.push('/editPassowrd');
                }
            } else {
                this.logout()
            }
        },
        goToInfoPage() {
            if (this.userId != null) {
                if (this.$route.name != 'Info') {
                    this.$router.push('/info');
                }
            } else {
                this.logout()
            }
        },
        goToMaesteryPresenceInfo() {
            if (this.userId != null) {
                if (this.$route.name != 'PresenceInfo') {
                    this.$router.push('/presence-info');
                }
            } else {
                this.logout()
            }
        },
        addPaymentAction() {
            if (this.userId != null) {
                console.log("go to add payment");
            } else {
                this.logout()
            }
        },        
        logout() {
            localStorage.removeItem('userid')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('user_type')
            this.$router.push('/login');
      }
    },
    computed: {
        adminAddPaymentClass: function() {
            return this.addPayment?
            ''
            :
            'is-hidden'
        },
        editPasswordVisibility: function() {
            if (localStorage.getItem('user_type') > 0) {
                return 'is-hidden'
            } else {
                return ''
            }
        }, 
        redirectToPages: function() {
            return this.isMaesteryAdmin?
            this.goToMaesteryPresenceInfo:
            this.goToMemberHome
        }
    }
}
</script>

<style>
#name {
  font-weight: bold;
}
</style>