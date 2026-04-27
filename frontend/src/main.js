import "toastify-js/src/toastify.css";
import { loadFonts } from "./plugins/webfontloader";
import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import App from "./App.vue";

loadFonts();

createApp(App).use(router).use(vuetify).mount("#app");
