<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="timeline_segment-container">
    <div class="timeline_segment" :class="{ 'timeline_segment--open': isOpen }">
      <div class="timeline_segment-btn" :class="{ 'timeline_segment-btn--open': isOpen }" @click="toggle">
        <button><span></span></button>
      </div>
    </div>
    <slot :isOpen="isOpen"></slot>
  </div>
</template>

<style scoped>
.timeline_segment-container {
  display: flex;
  position: relative;
}

.timeline_segment::after {
  content: '';
  position: absolute;
  left: 1.5em;
  width: 2px;
  height: calc(100% - 17px);
  background-color: var(--slate-100);
  transition: background-color 0.2s ease-in-out;
}

.timeline_segment--open::after {
  background-color: var(--red-500);
}

.timeline_segment-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  margin: 1em 0.5em 0 1em;
  border-radius: 50%;
  border: 2px solid var(--slate-100);
  transition: border 0.3s ease-in-out;
  cursor: pointer;
}

.timeline_segment-btn:hover {
  border-color: var(--red-500);
}

.timeline_segment-btn:hover button span {
  width: 16px;
  height: 16px;
  background-color: var(--red-500);
}

.timeline_segment-btn button span {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--slate-100);
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out, background-color 0.2s ease-in-out;
}

.timeline_segment-btn--open {
  border-color: var(--red-500);
}

.timeline_segment-btn--open button span {
  width: 16px;
  height: 16px;
  background-color: var(--red-500);
}
</style>
