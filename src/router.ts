import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import WorksView from "@/views/WorksView.vue";
import WordsView from "@/views/WordsView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/works",
      name: "works",
      component: WorksView,
    },
    {
      path: "/words",
      name: "words",
      component: WordsView,
    },
  ],
});