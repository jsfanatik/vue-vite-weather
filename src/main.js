import { createPinia } from 'pinia'
import { createApp, watch, markRaw } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

const pinia = createPinia()
//retrieves items in localStorage and re-assigns to Pinia state
if (localStorage.getItem("state")) {
  pinia.state.value = JSON.parse(localStorage.getItem("state"))
}

//handles setting Pinia state in localStorage
watch (pinia.state, (state) => {
  localStorage.setItem("state", JSON.stringify(state))
}, {deep: true})

createApp(App).use(router).use(pinia).mount('#app')