<template>
  <div>
    <Navbar />
    <MemberInfo :userId="this.userId" />
    <hr />
    <div class="tabs is-large is-fullwidth">
      <ul>
        <li v-bind:class="financeTabClass">
          <a @click="financeTabDidPress">Financeiro</a>
        </li>
        <li v-bind:class="frequencyTabClass">
          <a @click="frequencyTabDidPress">Frequência</a>
        </li>
      </ul>
    </div>
    <MemberFinance
      :userId="this.userId"
      :isAdmin="true"
      v-bind:class="memberFinanceVisibility"
    />
    <MemberPresence
      :userId="this.userId"
      v-bind:class="memberPresenceVisibility"
    />
    <FloatingActionButton :onClickAction="showDialog" />

    <PaymentFormDialog
      :visible="dialogVisible"
      :memberId="this.userId"
      @close="hideDialog"
      @submit="handlePaymentSubmit"
    />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import MemberInfo from "../components/MemberInfo.vue";
import MemberFinance from "../components/MemberFinance.vue";
import MemberPresence from "../components/MemberPresence.vue";
import FloatingActionButton from "../components/FloatingActionButton.vue";
import PaymentFormDialog from "../components/PaymentFormDialog.vue";

export default {
  components: {
    Navbar,
    MemberInfo,
    MemberFinance,
    MemberPresence,
    FloatingActionButton,
    PaymentFormDialog,
  },
  created() {},
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      financeTabClass: "is-active",
      frequencyTabClass: "",
      dialogVisible: false,
    };
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    memberPresenceVisibility: function () {
      return this.frequencyTabClass != "" ? "" : "is-hidden";
    },
    memberFinanceVisibility: function () {
      return this.financeTabClass != "" ? "" : "is-hidden";
    },
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
    handlePaymentSubmit() {
      this.$router.go();
    },
    financeTabDidPress() {
      this.financeTabClass = "is-active";
      this.frequencyTabClass = "";
    },
    frequencyTabDidPress() {
      this.financeTabClass = "";
      this.frequencyTabClass = "is-active";
    },
  },
};
</script>

<style>
.table.is-borderless td,
.table.is-borderless th {
  border: 0;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.ml-4 {
  margin: 0rem;
  padding: 1rem;
}
hr {
  margin: 0rem;
}
.width-limit {
  word-wrap: break-word;
  max-width: 100px;
}
</style>
