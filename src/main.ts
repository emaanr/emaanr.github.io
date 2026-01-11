import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import "@/styles/variables.css"; // Tokens first
// import "@/styles/theme.css";  // Semantics second
import "@/styles/reset.css";     // Reset styles third
import "@/styles/style.css";      // Element styles last


createApp(App)
  .use(router)
  .mount("#app");
