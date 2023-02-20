<template>
    <div class="hero">
            <div class="card is-fullwidth">
                <header class="card-header" @click="toggleCard">
                    <p class="card-header-title" >{{ title }} </p>
                </header>
                <div class="card-content" v-bind:class="contentVisibility">
                    <div class="content">
                        <table class="table is-borderless is-striped center">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Presenças</th>
                                    <th>Observações</th>
                                </tr>
                            </thead>
 
                            <tbody>
                                <tr v-for="member in orderMemberList()" :key="member.name">
                                    <td class="is-vcentered">{{ member.name }}</td>
                                    <td class="is-vcentered">{{ presenceText(member) }}</td>
                                    <td class="is-vcentered">{{ observationText(member) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        title: String,
        memberList: Array
    },
    data() {
        return {
            contentVisibility: 'is-hidden',
            isExpanded: false
        }
    },
    computed: {},
    methods: {
        toggleCard() {
            this.isExpanded = !this.isExpanded

            if (this.isExpanded) {
                this.contentVisibility = ''
            } else {
                this.contentVisibility = 'is-hidden'
            }            
        },
        presenceText(member) {
            if (member.missingRehearsal == 0) {
                return 'Apto'
            } else if (member.missingRehearsal == 1) {
                return 'Falta ' + member.missingRehearsal + ' ensaio'
            } else {
                return 'Faltam ' + member.missingRehearsal + ' ensaios'
            }
        },
        observationText(member) {
            if (member.observationCount == 0) {
                return 'Nenhuma observação'
            } else if (member.observationCount == 1) {
                return member.observationCount + ' observação'
            } else {
                return member.observationCount + ' observações'
            }
        },
        orderMemberList() {
            return this.memberList.sort((a, b) => {  return a.missingRehearsal - b.missingRehearsal})
        }
    }
}
</script>

<style>
</style>