<script setup lang="ts">
</script>

<template>
<footer>
    <p>© 2025 Emaan Rana</p>
    <div>
      <a href="https://github.com/emaanr">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="none"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </a>
      <a href="">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 0 24 24" width="18" height="20" fill="none"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
      </a>
      <a href="mailto:em99nr@gmail.com">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="20" fill="none"
          stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: 2em;
  display: flex;
  padding: 0.2em 0.5em;
  justify-content: space-between;
  background-color: var(--red-400);
  font-weight: 600;

  div {
    display: flex;
    gap: 0.5em;
  }

  p {
    color: var(--white);
  }

  a {
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  a:hover {
    color: var(--black);
  }
}
</style>
