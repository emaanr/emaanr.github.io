<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  delay?: number
  duration?: number
  speed?: number
}>(), {
  delay: 1,
  duration: 2000,
  speed: 40
})

const slots = useSlots()
const displayText = ref('')
const originalText = ref('')
let isWarbling = false

const chars = '01|/\\-_~`*#@$%^&+=<>[]{}();:.,?!'

function getSlotText(): string {
  const slot = slots.default?.()
  if (!slot || !slot[0]) return ''
  return slot[0].children as string || ''
}

function warble() {
  if (isWarbling) return
  isWarbling = true

  const text = originalText.value
  const startTime = Date.now()

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    let result = ''
    for (let i = 0; i < text.length; i++) {
      if (progress >= i / text.length) {
        result += text[i]
      } else {
        result += chars[Math.floor(Math.random() * chars.length)]
      }
    }

    displayText.value = result

    if (progress === 1) {
      clearInterval(interval)
      displayText.value = text
      isWarbling = false
    }
  }, props.speed)
}

onMounted(() => {
  originalText.value = getSlotText()
  displayText.value = originalText.value

  setTimeout(() => {
    warble()
  }, props.delay * 1000)
})
</script>

<template>
  <span @mouseenter="warble">{{ displayText }}</span>
</template>

<style scoped>
</style>
