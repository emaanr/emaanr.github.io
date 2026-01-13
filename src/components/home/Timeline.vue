<script setup lang="ts">
import TimelineSegment from '@/components/home/TimelineSegment.vue'
import TimelineItem from '@/components/home/TimelineItem.vue'
import Bullets from '@/components/bullets/Bullets.vue'
import Bullet from '@/components/bullets/Bullet.vue'
</script>

<template>
  <section id="timeline">
    <!-- Segment 1 - Start -->
    <TimelineSegment v-slot="{ isOpen }">
      <TimelineItem
        :isOpen="isOpen"
        heading="Northern Virginia Community College"
        subheading="A.S. Engineering"
        start="2018/08"
        end="2019/12"
      >
        <Bullets>
          <Bullet>First time coding.</Bullet>
          <Bullet>Realized I liked CS, but also Math and Physics.</Bullet>
        </Bullets>
      </TimelineItem>
    </TimelineSegment>
    <!-- Segment 1 - End -->
    <!-- Segment 2 - Start -->
    <TimelineSegment v-slot="{ isOpen }">
      <TimelineItem
        :isOpen="isOpen"
        heading="Virginia Tech"
        subheading="B.S. Computer Science"
        start="2020/08"
        end="2022/12"
      >
        <Bullets>
          <Bullet>A lot more CS than during community college.</Bullet>
          <Bullet>Favorite classes were:
            <Bullets>
              <Bullet>Computer Organization II</Bullet>
              <Bullet>Computer Music & Multimedia</Bullet>
              <Bullet>DSA Analysis</Bullet>
              <Bullet>Computer Systems</Bullet>
            </Bullets>
          </Bullet>
        </Bullets>
      </TimelineItem>
    </TimelineSegment>
    <!-- Segment 2 - End -->
    <!-- Segment 3 - Start -->
    <TimelineSegment v-slot="{ isOpen }">
      <TimelineItem
        :isOpen="isOpen"
        heading="Peraton"
        subheading="Software Engineer"
        start="2023/03"
        end="Present"
      >
        <Bullets>
          <Bullet>First time coding.</Bullet>
          <Bullet>Realized I liked CS, but also Math and Physics.</Bullet>
        </Bullets>
      </TimelineItem>
    </TimelineSegment>
    <!-- Segment 3 - End -->
  </section>
</template>

<style scoped>
  #timeline :deep(.timeline_segment-container:last-child .timeline_segment::after) {
    display: none;
  }
</style>