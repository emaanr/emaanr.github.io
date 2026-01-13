<script setup lang="ts">
defineProps<{
  heading: string
  subheading: string
  start: string
  end: string
  isOpen: boolean
}>()
</script>

<template>
  <div class="timeline_item">
    <h5 class="timeline_item-heading">{{ heading }}</h5>
    <div v-show="isOpen" class="timeline_item-content">
      <p class="muted">{{ subheading }}<strong> | </strong>{{ start }} → {{ end }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.timeline_item {
  display: absolute;
  padding-top: 1em;
}

.timeline_item-content {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
</style>