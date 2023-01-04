import { createWebHistory, createRouter } from "vue-router";
import Weather from "../views/Weather.vue";
import Error from "../views/Error.vue";
import Welcome from "../views/Welcome.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/weather",
    name: "Weather",
    component: Weather,
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