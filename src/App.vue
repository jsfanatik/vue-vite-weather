<template>
  <div class="min-h-full">
    <div id="app"
      class="min-h-screen bg-amber-300"
      :class="weatherValues.temp > 55 ? 'warm' : 'cold'"
    >
      <nav class="sticky top-0 py-8 px-2 z-40 sm:px-2">
        <div class="flex flex-wrap items-center justify-center mx-auto">
          
          <input @keypress="search" type="text" v-model="cityZip" maxlength="5" pattern="\d*" class="block w-full max-w-xs rounded-md drop-shadow-2xl px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm" placeholder="Enter Zip Code Here..." />
          
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="flex flex-col mt-4 pl-3 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li class="flex cursor-pointer" @click="openModal">
                <ClockIcon class="w-8 h-8 text-white"/>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <RecentDialog :isOpen="isOpen" @closeModal="closeModal"/>

      <div class="-mt-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Disclosure, 
  DisclosureButton, 
  DisclosurePanel, 
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,  
} from "@headlessui/vue";
import { ClockIcon, XIcon } from "@heroicons/vue/outline";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./store";
import axios from "axios";
import RecentDialog from './components/RecentDialog.vue'

const cityZip = ref("");
const router = useRouter();
const store = useStore();
const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

const openModal = () => {
  console.log('isOpen')
  isOpen.value = true
}

// return rounded weather values from store
const weatherValues = computed(() => {
  return store.roundedValues;
});

const search = async (e) => {
  if (e.key == "Enter") {
    try {
      // after forking, add your OpenWeatherMap key to the URL
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${cityZip.value},US&appid=d2c9aaafb6c5d4d2632592ce88154c5f&units=imperial`
      );
      store.cityZip = cityZip.value
      store.cities = res.data.name;
      store.weatherData = res.data.main;
      const date = Date(res.data.dt).toLocaleString("en-US");
      store.dateTime = date
      store.storeRecentSearch();
      router.push({ name: "Weather" });
      cityZip.value = "";
    } catch (error) {
      router.push({ name: "Error" });
      console.log(error);
    }
  }
};

const goToRecent = () => {
  router.push({ name: "Recent" });
};
</script>

<style>
#app.warm {
  background: 
     linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),/* the gradient on top, adjust color and opacity to your taste */
      url("./assets/warm-bg.jpeg");
  background-size: cover;
  background-position: top;
  backdrop-filter: brightness(40%);
  transition: 0.4s;
}

#app.cold {
  background: 
     linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),/* the gradient on top, adjust color and opacity to your taste */
      url("./assets/cold-bg.jpeg");
  background-size: cover;
  background-position: top;
  backdrop-filter: brightness(60%);
  transition: 0.4;
}
</style>
