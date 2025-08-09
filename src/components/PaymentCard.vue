<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-vcentered mt-4">
        Mês de referência: {{ referenceMonthDateText(payment.date) }}
      </p>
      <button
        class="button is-danger is-light m-2"
        v-bind:class="getDeleteClass"
        @click="confirmDelete"
      >
        <span class="icon">
          <i class="fas fa-trash"></i>
        </span>
      </button>
    </header>

    <div class="card-content">
      <div class="content">
        <p class="has-text-left">
          <b>Valor:</b><br />
          {{ "R$ " + payment.paymentValue.toFixed(2) }}
        </p>
        <p class="has-text-left">
          <b>Data do pagamento:</b><br />
          {{ paymentDateText(payment.paymentDate) }}
        </p>
        <p class="has-text-left">
          <b>Observações:</b><br />
          {{ payment.observation === "" ? "-" : payment.observation }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentService } from "../services/ApiService";
import moment from "moment";

export default {
  props: {
    payment: Object,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  computed: {
    getDeleteClass() {
      return this.isAdmin ? "" : "is-hidden";
    },
  },
  methods: {
    referenceMonthDateText(dateString) {
      return moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSS").format("MM/YYYY");
    },
    paymentDateText(dateString) {
      return moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSS").format(
        "DD/MM/YYYY"
      );
    },
    confirmDelete() {
      if (confirm("Tem certeza que deseja excluir este pagamento?")) {
        paymentService
          .delete(this.payment.id)
          .then((response) => {
            this.$router.go();
          })
          .catch((err) => {
            if (err.response) {
              console.log(err);
            }
          });
      }
    },
  },
};
</script>
