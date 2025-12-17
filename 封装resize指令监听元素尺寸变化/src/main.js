import { createApp } from "vue";
import App from "./App.vue";
import sizeDirect from "../directions/sizeDirect";
createApp(App).directive("size-ob", sizeDirect).mount("#app");
