<template>
  <div>
    <Navbar />
    <MemberInfo :userId="this.userId" />
    <hr />
    <MemberFinance :userId="this.userId" :isAdmin="true" />
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
import FloatingActionButton from "../components/FloatingActionButton.vue";
import PaymentFormDialog from "../components/PaymentFormDialog.vue";

export default {
  components: {
    Navbar,
    MemberInfo,
    MemberFinance,
    FloatingActionButton,
    PaymentFormDialog,
  },
  created() {},
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return { dialogVisible: false };
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {},
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
