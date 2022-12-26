<template>
    <nav class="navbar has-shadow is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" @click="goToMemberHome">
                <h2 id="name"> Home </h2>
            </a>

            <a class="navbar-item" @click="goToEditPassword">
                <h2 id="name"> Editar senha </h2>
            </a>

            <a class="navbar-burger" @click="toggleBurgerMenu">
            <span></span>
            <span></span>
            <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">
            <div class="navbar-end">
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

export default {
    Data() {
        return {
            userId: null
        }
    },
    created () {
        this.userId = this.$localStorage.get('userid')
    },
    methods: {
        toggleBurgerMenu() {
            document
            .querySelector('#nav-links')
            .classList
            .toggle('is-active')
        },
        goToMemberHome() {
            console.log("To member home");
        },
        goToEditPassword() {
            console.log("To edit password");
        },
        logout() {
            console.log("to logout");
      }
    },
    computed: {
        adminAddPaymentClass: function() {
            return this.addPayment?
            ''
            :
            'is-hidden'
        }
    }
}
</script>

<style>
#name {
  font-weight: bold;
}
</style>