<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Mês de referência:
                {{ referenceMonthDateText(payment.date) }}
            </p>
        </header>

        <div class="card-content">
            <div class="content">
                <p class="has-text-left"> <b>Valor:</b><br/>{{ "R$ " + (payment.paymentValue).toFixed(2) }}</p>
                <p class="has-text-left"> <b>Data do pagamento:</b><br/> {{ paymentDateText(payment.paymentDate) }}</p>
                <p class="has-text-left"> <b>Observações:</b><br/> {{ payment.observation == '' ? '-' : payment.observation }} </p>
            </div>
        </div>
    </div>
</template>
<script>

import moment from 'moment'

export default {
    props: {
        payment: Object
    },
    data() {
        return {
        }
    },
    computed: {},
    methods: {
        referenceMonthDateText(dateString) {
            return moment(dateString, 'YYYY-MM-DDTHH:mm:ss.SSSS').format("MM/YYYY")
        },
        paymentDateText(dateString) {
            return moment(dateString, 'YYYY-MM-DDTHH:mm:ss.SSSS').format("DD/MM/YYYY")
        }
    }
}
</script>

<style>
</style>