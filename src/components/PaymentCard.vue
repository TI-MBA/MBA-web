<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Mês de referência:
                {{ paymentDateText(payment.date) }}
            </p>
        </header>

        <div class="card-content">
            <div class="content">
                <p class="has-text-left"> <b>Valor:</b><br/>{{ "R$ " + (payment.paymentValue).toFixed(2) }}</p>
                <p class="has-text-left"> <b>Data do pagamento:</b><br/> {{ '10/12/2022' }}</p>
                <p class="has-text-left"> <b>Observações:</b><br/> {{ payment.observation == '' ? '-' : payment.observation }} </p>
            </div>
        </div>
    </div>
</template>
<script>

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
        paymentDateText(dateString) {
            const paymentDate = new Date(dateString);
            return (paymentDate.getUTCMonth() + 1) + "/" + (paymentDate.getUTCFullYear())
        }
    }
}
</script>

<style>
</style>