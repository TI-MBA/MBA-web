<template>
  <div>
    <Navbar />
    <section class="section">
      <div class="hero-body p-5">
        <h1 class="title has-text-centered mb-4">Admin fiscal</h1>
        <div
          class="field is-flex is-justify-content-center mb-5"
          style="max-width: 600px; margin: 0 auto"
        >
          <div class="control is-expanded">
            <input
              class="input is-medium"
              type="text"
              placeholder="Filtrar membros"
              v-model="searchQuery"
            />
          </div>
        </div>

        <MemberList
          :members="filteredMembers"
          @member-clicked="handleMemberClick"
        />
        <progress
          class="progress is-small is-info"
          max="100"
          v-bind:class="progressVisibility"
        >
          50%
        </progress>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import MemberList from "../components/FinanceMemberList.vue";
import { userService } from "../services/ApiService";

export default {
  components: {
    Navbar,
    MemberList,
  },
  created() {
    this.progressVisibility = "";
    this.fetchMemberList();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      searchQuery: "",
      progressVisibility: "is-hidden",
      members: [],
    };
  },
  computed: {
    filteredMembers() {
      if (!this.searchQuery) return this.members;
      const query = this.searchQuery.toLowerCase();
      return this.members.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.instrument.toLowerCase().includes(query) ||
          m.situation.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    fetchMemberList() {
      userService
        .getAll()
        .then((response) => {
          this.members = response.data.filter((item) => {
            const name = item.name.toLowerCase();
            return !name.includes("admin") && !name.includes("deletado");
          });
          this.progressVisibility = "is-hidden";
        })
        .catch((err) => {
          if (err.response) {
            this.progressVisibility = "is-hidden";
          }
        });
    },
    handleMemberClick(member) {
      this.$router.push({ path: "member", query: { userId: member.id } });
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
