<script setup lang="ts">
import WarbleText from '@/components/WarbleText.vue'
import Bullets from '@/components/bullets/Bullets.vue'
import Bullet from '@/components/bullets/Bullet.vue'
import MoreMagnet from '@/components/MoreMagnet.vue'
</script>

<template>
  <!-- Current Pastimes -->
  <section id="current_pastimes">
    <h4><WarbleText>CURRENT PASTIMES</WarbleText></h4>
    <p>I like a lot of things, but this is typically how I'm spending my time:</p>
    <Bullets>
      <Bullet>Programming<MoreMagnet>, mainly Web Dev personal projects at the moment.</MoreMagnet></Bullet>
      <Bullet>Exercise<MoreMagnet>, usually Resistance Training.</MoreMagnet></Bullet>
      <Bullet>Gaming<MoreMagnet>, right now I'm playing <i>Persona 5 Royal</i> and <i>The Finals</i>.</MoreMagnet></Bullet>
    </Bullets>
  </section>

  <!-- Other Pastimes -->
  <section id="other_pastimes">
    <h4><WarbleText>OTHER PASTIMES</WarbleText></h4>
    <p>Some other notable interests of mine:</p>
    <Bullets>
      <Bullet>Go<MoreMagnet>, also known as Baduk in Korea or Weiqi in China.</MoreMagnet></Bullet>
      <Bullet>Music<MoreMagnet>, listening, learning, dabbling.</MoreMagnet></Bullet>
      <Bullet>Art<MoreMagnet>, all kinds, but especially: programmatic, photography, hand-drawn, and pottery.</MoreMagnet></Bullet>
    </Bullets>
  </section>
</template>

<style scoped>
</style>
