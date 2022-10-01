import { createWebHistory, createRouter } from "vue-router";
import Weather from "../views/Weather.vue";
import Recent from "../views/Recent.vue"
import Error from "../views/Error.vue";
import Welcome from "../views/Welcome.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    props: true
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
    props: true
  },
  {
    path: "/recent-searches",
    name: "Recent",
    component: Recent,
    props: true
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;