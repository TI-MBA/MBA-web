<template>
  <button class="fab-button" @click="onClick">+</button>
</template>

<script>
export default {
  name: "FloatingActionButton",
  props: {
    onClickAction: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.onClickAction();
    },
  },
};
</script>

<style>
.fab-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #3273dc;
  color: white;
  font-size: 32px;
  font-weight: bold; /* make + bold */
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(50, 50, 50, 0.3);
  display: flex;
  align-items: center; /* vertical center */
  justify-content: center; /* horizontal center */
  user-select: none;
  padding: 0; /* remove default padding */
  line-height: 1; /* tighten line height */
  transition: background-color 0.3s ease;
}

.fab-button:hover {
  background-color: #2759a5;
}
</style>
