import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ExecView from "@/views/ExecView.vue";
import ReadView from "@/views/ReadView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/exec",
      name: "exec",
      component: ExecView,
    },
    {
      path: "/read",
      name: "read",
      component: ReadView,
    },
  ],
});