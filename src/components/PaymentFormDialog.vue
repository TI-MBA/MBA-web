<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeDialog">
    <div class="modal-content">
      <h2 class="title">Adicionar Pagamento</h2>
      <div v-bind:class="progressVisibility">
        <div class="has-text-centered is-flex is-justify-content-center mt-6">
          <span class="loader my-custom-loader"></span>
        </div>
        <p class="mt-4">Carregando...</p>
      </div>
      <div class="notification is-light is-danger" v-bind:class="errorClass">
        <strong>Campos com * são obritatórios</strong>
      </div>
      <div v-bind:class="formVisibility">
        <div class="row">
          <label for="referenceDate">Mês de referência *</label>
          <Datepicker
            v-model="referenceDate"
            :enable-time-picker="false"
            month-picker
            locale="pt"
            cancelText="Cancelar"
            selectText="Selecionar"
          />
        </div>
        <div class="row">
          <label for="paymentDate" class="mt-4">Data do pagamento *</label>
          <Datepicker
            v-model="paymentDate"
            :enable-time-picker="false"
            :format="format"
            locale="pt"
            cancelText="Cancelar"
            selectText="Selecionar"
          />
        </div>

        <label for="value" class="mt-4">Valor (R$) *</label>
        <input
          id="value"
          type="number"
          min="0"
          step="0.01"
          v-model.number="value"
          class="input"
          placeholder="R$ 0,00"
          required
        />

        <label for="obs" class="mt-4">Observações</label>
        <textarea
          id="obs"
          v-model="observations"
          class="textarea"
          rows="4"
          placeholder="Digite suas observações"
        ></textarea>

        <div class="buttons mt-5">
          <button type="button" class="button is-light" @click="$emit('close')">
            Cancelar
          </button>
          <button type="submit" class="button is-primary" @click="submitClick">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { paymentService } from "../services/ApiService";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

export default {
  components: { Datepicker },
  props: {
    visible: { type: Boolean, required: true },
    memberId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const format = (date) => {
      return moment(date).format("DD/MM/YYYY");
    };
    return {
      format,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) this.resetForm();
    },
  },
  data() {
    return {
      errorClass: "is-hidden",
      referenceDate: null,
      paymentDate: null,
      value: null,
      observations: "",
      progressVisibility: "is-hidden",
      formVisibility: "",
    };
  },
  computed: {
    monthYearFormat() {
      return { month: "long", year: "numeric" };
    },
  },
  methods: {
    toRequest(date) {
      return moment(date).format("YYYY-MM-DDTHH:mm:ss.sssZ");
    },
    resetForm() {
      this.referenceDate = null;
      this.paymentDate = null;
      this.value = null;
      this.observations = "";
      this.errorClass = "is-hidden";
      this.progressVisibility = "is-hidden";
      this.formVisibility = "";
    },
    closeDialog() {
      this.$emit("close");
    },
    submitClick() {
      if (
        this.referenceDate == null ||
        this.paymentDate == null ||
        this.value == null
      ) {
        this.errorClass = "";
      } else {
        this.progressVisibility = "";
        this.formVisibility = "is-hidden";
        this.createPayment();
      }
    },
    createPayment() {
      let request = {
        date: this.toRequest(this.referenceDate),
        paymentDate: this.toRequest(this.paymentDate),
        paymentValue: parseFloat(this.value),
        observation: this.observations,
        user: { id: this.memberId },
      };
      paymentService
        .addPayment(request)
        .then((response) => {
          this.progressVisibility = "is-hidden";
          this.handleSubmit();
        })
        .catch((err) => {
          if (err.response) {
            this.formVisibility = "";
            this.progressVisibility = "is-hidden";
          }
        });
    },
    handleSubmit() {
      this.$emit("submit");
      this.closeDialog();
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(10, 10, 10, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 2rem;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.title {
  margin-bottom: 1rem;
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-5 {
  margin-top: 1.5rem;
}

.input,
.textarea {
  width: 100%;
  box-sizing: border-box;
}

.my-custom-loader {
  font-size: 6rem; /* makes it much bigger */
}
</style>
