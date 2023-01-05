<template>
    <div class="hero">
        <Navbar />
        <div class="mt-4 ml-4 is-centered">
            <p class= "is-size-3"> {{ 'Cartilha Maracatu Baque Alagoano' }} </p>
            <vue-pdf-embed class= "is-centered" :source="'cartilha.pdf'" />            
        </div>
    </div>
</template>
<script>
    import Navbar from '../components/Navbar.vue'
    import VuePdfEmbed from 'vue-pdf-embed'

    export default {
        components: {
            Navbar,
            VuePdfEmbed
        },
        mounted () {
        },
        created () {},
        data() {
            return {
                path: 'cartilha.pdf'
            };
        },
        methods: {}
    }
</script>
    
<style>
    .flex-center {
        display: flex;
        align-items: center;
    }
</style>