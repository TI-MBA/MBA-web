<template>
  <div class="content">
    <div class="container padding-horizontal">
      <div v-for="payment in paymentList" :key="payment.id">
        <PaymentCard :payment="payment" :isAdmin="this.isAdmin" />
      </div>
    </div>
    <br />
    <progress
      class="progress is-small is-info"
      max="100"
      v-bind:class="progressVisibility"
    >
      50%
    </progress>
  </div>
</template>

<script>
import { paymentService } from "../services/ApiService";
import PaymentCard from "./PaymentCard.vue";

export default {
  props: {
    userId: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PaymentCard,
  },
  created() {
    if (this.effectiveUserId) {
      this.progressVisibility = "";
      this.fetchPayments();
    }
  },
  data() {
    return {
      showDialog: false,
      selectedPayment: {},
      paymentList: [],
      progressVisibility: "is-hidden",
    };
  },
  computed: {
    effectiveUserId() {
      return this.userId || localStorage.getItem("userid");
    },
  },
  methods: {
    fetchPayments() {
      paymentService
        .getPaymentsBy(this.effectiveUserId)
        .then((response) => {
          this.paymentList = this.order(response.data);
          this.progressVisibility = "is-hidden";
        })
        .catch((err) => {
          if (err.response) {
            this.progressVisibility = "is-hidden";
          }
        });
    },
    order(paymentList) {
      return paymentList.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1.5em;
  margin-top: 1.5em;
}
.padding-horizontal {
  padding-inline-start: 5%;
  padding-inline-end: 5%;
}
</style>
