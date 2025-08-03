<template>
  <div class="content">
    <table class="table is-borderless is-striped center mt-4">
      <thead>
        <tr>
          <th>Data do ensaio</th>
          <th>Tipo de presença</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="presence in presenceList" :key="presence.id">
          <td class="is-vcentered">
            {{ presenceDateText(presence.rehearsalDate) }}
          </td>
          <td class="is-vcentered">
            <img
              :src="presenceTypeIcon(presence.type)"
              width="30"
              height="30"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/api";
import moment from "moment";

export default {
  data() {
    return {
      userId: localStorage.getItem("userid"),
      presenceList: [],
    };
  },
  created() {
    if (this.userId) {
      this.fetchPresence();
    }
  },
  methods: {
    fetchPresence() {
      api
        .get("/presence/user/" + this.userId)
        .then((response) => {
          this.presenceList = response.data;
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.status);
          }
        });
    },
    presenceTypeIcon(type) {
      const presenceTypeMap = new Map();
      presenceTypeMap.set(
        "OBSERVATION",
        "https://cdn-icons-png.flaticon.com/512/1041/1041891.png"
      );
      presenceTypeMap.set(
        "PRESENT",
        "https://cdn-icons-png.flaticon.com/512/190/190411.png"
      );
      presenceTypeMap.set(
        "ABSENT",
        "https://cdn-icons-png.flaticon.com/512/190/190406.png"
      );

      const resultIcon = presenceTypeMap.get(type);

      return resultIcon == null
        ? "https://cdn-icons-png.flaticon.com/512/953/953738.png"
        : resultIcon;
    },
    presenceDateText(dateString) {
      return moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSS").format(
        "DD/MM/YYYY"
      );
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
</style>
