<template>
  <div class="hero">
    <div
      class="notification is-light is-danger"
      v-bind:class="resultAlertClass"
    >
      <strong>{{ errorMessage }}</strong>
    </div>
    <div class="hero-body p-5">
      <div class="box mt-5">
        <form @submit.prevent="searchMembers">
          <div class="columns is-vcentered">
            <div class="column is-one-quarter">
              <label
                class="has-text-weight-semibold flex-center mr-4"
                for="payment-value"
                >Data Inicial</label
              >
              <Datepicker
                v-model="startDate"
                :enable-time-picker="false"
                :format="format"
                locale="pt"
                cancelText="Cancelar"
                selectText="Selecionar"
              />
            </div>

            <div class="column is-one-quarter">
              <label
                class="has-text-weight-semibold flex-center mr-4"
                for="payment-value"
                >Data Final</label
              >
              <Datepicker
                v-model="endDate"
                :enable-time-picker="false"
                :format="format"
                locale="pt"
                cancelText="Cancelar"
                selectText="Selecionar"
              />
            </div>

            <div class="column is-one-quarter">
              <label
                class="has-text-weight-semibold flex-center mr-4"
                for="payment-value"
                >% de Ensaios</label
              >
              <input
                type="number"
                v-model="percentageValue"
                class="input"
                placeholder="Digite apenas números"
              />
            </div>

            <div class="column">
              <button
                type="submit"
                class="button is-info is-fullwidth mt-5"
                v-bind:class="buttonLoading"
              >
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
      <progress
        class="progress is-small is-info"
        max="100"
        v-bind:class="progressVisibility"
      >
        50%
      </progress>

      <div v-bind:class="resultVisibility">
        <p class="has-text-left has-text-weight-medium is-size-5">
          {{ "Número de total de ensaios: " + this.totalRehearsalCount }}
        </p>
        <p class="has-text-left has-text-weight-medium is-size-15 pl-4">
          {{
            "Não leva em conta possíveis feriados, cancelamentos e ensaios extras."
          }}
        </p>
        <p class="has-text-left has-text-weight-medium is-size-5">
          {{ "Número de ensaios necessários: " + this.requiredRehearsalCount }}
        </p>
        <p class="has-text-left has-text-weight-medium is-size-5">
          {{
            "Número de ensaios realizados: " + this.totalExistingRehearsalCount
          }}
        </p>
        <br />
        <ExpandableCard
          :title="maestryCardTitle"
          :memberList="maestryMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
        <br />
        <ExpandableCard
          :title="cantoCardTitle"
          :memberList="cantoMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
        <br />
        <ExpandableCard
          :title="agbeCardTitle"
          :memberList="agbeMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
        <br />
        <ExpandableCard
          :title="agogoCardTitle"
          :memberList="agogoMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
        <br />
        <ExpandableCard
          :title="gongueCardTitle"
          :memberList="gongueMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
        <br />
        <ExpandableCard
          :title="caixaCardTitle"
          :memberList="caixaMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
        <br />
        <ExpandableCard
          :title="alfaiaCardTitle"
          :memberList="alfaiaMembers"
          :requiredRehearsalCount="this.requiredRehearsalCount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ExpandableCard from "./ExpandableCard.vue";
import { rehearsalService } from "../services/ApiService";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

export default {
  components: {
    Datepicker,
    ExpandableCard,
  },
  setup() {
    const format = (date) => {
      return moment(date).format("DD/MM/YYYY");
    };
    return {
      format,
    };
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      percentageValue: "",
      buttonLoading: "",
      progressVisibility: "is-hidden",
      resultVisibility: "is-hidden",
      resultAlertClass: "is-hidden",
      errorMessage: "Todos os campos são obrigatórios",
      maestryCardTitle: "Maestria",
      cantoCardTitle: "Canto",
      agbeCardTitle: "Agbê",
      agogoCardTitle: "Agogô",
      gongueCardTitle: "Gonguê",
      caixaCardTitle: "Caixa",
      alfaiaCardTitle: "Alfaia",
      totalExistingRehearsalCount: 0,
      totalRehearsalCount: 0,
      requiredRehearsalCount: 0,
      cantoMembers: [],
      membersResult: [],
      maestryMembers: [],
      agbeMembers: [],
      agogoMembers: [],
      gongueMembers: [],
      caixaMembers: [],
      alfaiaMembers: [],
    };
  },
  methods: {
    toRequest(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    fetch() {
      rehearsalService
        .getRehearsalInfo(
          this.toRequest(this.startDate),
          this.toRequest(this.endDate),
          this.percentageValue
        )
        .then((response) => {
          this.membersResult = response.data.userCountDtos.filter(function (
            member
          ) {
            return (
              !member.name.toLowerCase().includes("admin") &&
              !member.name.toLowerCase().includes("deletado")
            );
          });
          this.totalExistingRehearsalCount = response.data.totalRehearsalCount;
          this.setupView();
          this.setupTotalRehearsalCount();
          this.isLoading(false);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status);
            this.isLoading(false);
          }
        });
    },
    filterBy(instrument) {
      return this.membersResult.filter(
        (member) => member.instrument == instrument
      );
    },
    filterAble(list) {
      return list.filter((member) => member.able);
    },
    setupView() {
      this.setupLists();
      this.setupCardTitles();
    },
    setupTotalRehearsalCount() {
      this.totalRehearsalCount = 0;

      let totalDays = moment(this.endDate).diff(moment(this.startDate), "days");
      var currentDate = this.startDate;

      for (let i = 0; i < totalDays; i++) {
        let stringDay = moment(currentDate).format("dddd");

        if (stringDay == "Saturday") {
          this.totalRehearsalCount += 1;
        }

        currentDate = moment(currentDate).add(1, "days");
      }

      let percentageNumber = parseInt(this.percentageValue) / 100;
      this.requiredRehearsalCount = parseInt(
        this.totalRehearsalCount * percentageNumber
      );
    },
    setupLists() {
      this.maestryMembers = this.filterBy("MAESTRIA");
      this.cantoMembers = this.filterBy("CANTO");
      this.agbeMembers = this.filterBy("AGBE");
      this.agogoMembers = this.filterBy("AGOGO");
      this.gongueMembers = this.filterBy("GONGUE");
      this.caixaMembers = this.filterBy("CAIXA");
      this.alfaiaMembers = this.filterBy("ALFAIA");
    },
    setupCardTitles() {
      let maestryAbleLength = this.filterAble(this.maestryMembers).length;
      let cantoAbleLength = this.filterAble(this.cantoMembers).length;
      let agbeAbleLength = this.filterAble(this.agbeMembers).length;
      let agogoAbleLength = this.filterAble(this.agogoMembers).length;
      let gongueAbleLength = this.filterAble(this.gongueMembers).length;
      let caixaAbleLength = this.filterAble(this.caixaMembers).length;
      let alfaiaAbleLength = this.filterAble(this.alfaiaMembers).length;
      this.maestryCardTitle =
        "Maestria " +
        maestryAbleLength +
        " / " +
        this.maestryMembers.length +
        " membros";
      this.cantoCardTitle =
        "Canto " +
        cantoAbleLength +
        " / " +
        this.cantoMembers.length +
        " Membros";
      this.agbeCardTitle =
        "Agbê " + agbeAbleLength + " / " + this.agbeMembers.length + " membros";
      this.agogoCardTitle =
        "Agogô " +
        agogoAbleLength +
        " / " +
        this.agogoMembers.length +
        " membros";
      this.gongueCardTitle =
        "Gonguê " +
        gongueAbleLength +
        " / " +
        this.gongueMembers.length +
        " membros";
      this.caixaCardTitle =
        "Caixa " +
        caixaAbleLength +
        " / " +
        this.caixaMembers.length +
        " membros";
      this.alfaiaCardTitle =
        "Alfaia " +
        alfaiaAbleLength +
        " / " +
        this.alfaiaMembers.length +
        " membros";
    },
    searchMembers() {
      if (
        this.percentageValue == "" ||
        this.startDate == null ||
        this.endDate == null
      ) {
        this.resultAlertClass = "";
        this.errorMessage = "Todos os campos são obrigatórios";
      } else if (this.startDate > this.endDate) {
        this.resultAlertClass = "";
        this.errorMessage = "Data final deve ser maior que inicial";
      } else {
        this.isLoading(true);
        this.resultAlertClass = "is-hidden";
        this.fetch();
      }
    },
    isLoading(stateLoading) {
      if (stateLoading) {
        this.progressVisibility = "";
        this.resultVisibility = "is-hidden";
        this.buttonLoading = "is-loading";
      } else {
        this.progressVisibility = "is-hidden";
        this.resultVisibility = "";
        this.buttonLoading = "";
      }
    },
  },
};
</script>

<style>
.hero-body {
  margin-top: -1%;
}

.is-size-3 {
  margin-bottom: 1%;
}
.box {
  margin: 0%;
  padding: 1% 4% 4% 4%;
}
</style>
