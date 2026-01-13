<script setup lang="ts">
</script>

<template>
  <li class="bullet"><span class="bullet-style">✱ </span><slot></slot></li>
</template>

<style scoped>
.bullet {
  font-size: inherit;
  list-style: none;
}

.bullet-style {
  color: var(--red-500);
}
</style>
