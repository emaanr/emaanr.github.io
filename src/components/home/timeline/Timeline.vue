<script setup lang="ts">
import WarbleText from '@/components/WarbleText.vue'
import TimelineSegment from '@/components/home/timeline/TimelineSegment.vue'
import TimelineItem from '@/components/home/timeline/TimelineItem.vue'
import Bullets from '@/components/bullets/Bullets.vue'
import Bullet from '@/components/bullets/Bullet.vue'
import MoreMagnet from '@/components/MoreMagnet.vue'
</script>

<template>
  <section id="timeline">
    <h4><WarbleText>TIMELINE</WarbleText></h4>
    <p>So far:</p>
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
              <Bullet><i>Computer Organization II</i><MoreMagnet>, in MIPS32 Architecture.</MoreMagnet></Bullet>
              <Bullet><i>Computer Music &amp; Multimedia</i><MoreMagnet>, using CSound and Max MSP.</MoreMagnet></Bullet>
              <Bullet><i>DSA Analysis</i><MoreMagnet>, best office hours and collaborative sessions.</MoreMagnet></Bullet>
              <Bullet><i>Computer Systems</i><MoreMagnet>, was a cool course in general, especially the projects.</MoreMagnet></Bullet>
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
          <Bullet>A lot of Python and JavaScript.</Bullet>
          <Bullet>Full Stack Dev with React, Django, Vue, and AWS.</Bullet>
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