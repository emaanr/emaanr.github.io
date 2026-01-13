import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import "@/styles/variables.css"; // Tokens first
import "@/styles/reset.css";     // Reset styles second
import "@/styles/layout.css";    // Structural styles third
import "@/styles/style.css";     // Element styles last


createApp(App)
  .use(router)
  .mount("#app");
