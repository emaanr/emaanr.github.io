<script setup lang="ts">
import Header from '@/components/app/Header.vue'
import Footer from '@/components/app/Footer.vue'

</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>
main {
  padding: 0 20vw;
  background-color: var(--ink-800);
}
</style>