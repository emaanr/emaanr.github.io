<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import logo from '@/assets/logo.png'

const route = useRoute()

const labels: Record<string, string> = {
  '/': 'emaan rana',
  '/exec': 'doing',
  '/read': 'thinking',
}

const routeLabel = computed(() => labels[route.path] ?? 'emaan rana')
const hoverLabel = ref<string | null>(null)
const displayLabel = computed(() => hoverLabel.value ?? routeLabel.value)
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/exec" @mouseenter="hoverLabel = 'doing'" @mouseleave="hoverLabel = null">
        exec
      </RouterLink>
      <RouterLink to="/">
        <img :src="logo" alt="Logo" @mouseenter="hoverLabel = 'emaan rana'" @mouseleave="hoverLabel = null" />
      </RouterLink>
      <RouterLink to="/read" @mouseenter="hoverLabel = 'thinking'" @mouseleave="hoverLabel = null">
        read
      </RouterLink>
    </nav>
    <span>{{ displayLabel }}</span>
  </header>
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--ink-400);
}

header span {
  display: block;
  text-align: center;
  padding: 0.25rem 0;
  font-size: 15px;
  color: var(--slate-500)
}

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  padding-top: 1rem;
}

nav a {
  font-size: 1rem;
  font-family: "Press Start 2P", system-ui;
  font-weight: 400;
  font-style: normal;
}

nav img {
  display: block;
  width: 87px;
  height: auto;
  image-rendering: pixelated;
}
</style>
