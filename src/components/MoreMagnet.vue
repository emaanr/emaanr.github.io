<script setup lang="ts">
import { ref } from 'vue'

const isExpanded = ref(false)

function expand() {
  isExpanded.value = true
}
</script>

<template>
  <button v-if="!isExpanded" class="more_magnet" @click="expand">
    <span class="more_magnet-left">&lt;</span>&nbsp;&nbsp;<span class="more_magnet-right">&gt;</span>
  </button>
  <span v-else class="more_magnet-content"><slot></slot></span>
</template>

<style scoped>
.more_magnet {
  position: relative;
  top: -1px;
  right: -5px;
  background: linear-gradient(to right, rgba(239, 82, 80, 0.8) 52%, rgba(255, 255, 255, 0.8) 48%);
  outline: 1px solid var(--red-600);
  border-radius: 2px;
  font-size: 0.6em;
  line-height: 1.2;
  padding: 0 0.2em;
  margin: 0 0.5em;
  font-weight: 800;
  cursor: pointer;
  vertical-align: middle;
}

.more_magnet:hover {
  outline: 2px solid var(--red-700);
}

.more_magnet-left {
  color: var(--white);
}

.more_magnet-right {
  color: var(--black);
}

.more_magnet-content {
  color: var(--slate-400);
}
</style>
