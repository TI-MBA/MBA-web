<template>
  <table class="table is-striped is-fullwidth mt-5 members-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Situação</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="member in members"
        :key="member.id"
        @click="$emit('member-clicked', member)"
      >
        <td class="is-vcentered">{{ member.name }}</td>
        <td class="is-vcentered">
          <span
            class="tag is-medium has-text-weight-bold"
            :class="getSituationTagClass(member)"
          >
            {{ getSituationText(member) }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {
  getSituationText,
  getSituationTagClass,
} from "../utils/memberSituationUtils";

export default {
  props: {
    members: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getSituationText,
    getSituationTagClass,
  },
};
</script>
