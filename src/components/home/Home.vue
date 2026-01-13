<script setup lang="ts">
import logo from '@/assets/logo.png'
import Timeline from '@/components/home/timeline/Timeline.vue'
import Pastimes from './Pastimes.vue'
</script>

<template>
  <div id="home">
    <h1><span>E</span>maan <span>R</span>ana</h1>
    <div>
      <p id="home-intro">I decided to study Computer Science on a whim while listening to the <a target="_blank" href="https://www.youtube.com/watch?v=Bd61A8egZX4"><i>Kingdom Hearts 2</i> Title Screen</a> right before graduating from high school, and now I work as a Software Engineer.</p>
      <Timeline />
      <Pastimes />
      <p id="home-outro">This site is still a WIP so there is not a lot here right now. More to come in the future (hopefully).</p>
    </div>
  </div>
</template>

<style scoped>
h1 span {
  color: var(--red-500);
}

#home div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

a {
  color: var(--slate-300);
}

a:hover {
  color: var(--slate-400);
}

#home-outro {
  border-top: 1px dotted var(--red-500);
  padding-top: 1em;
}

</style>