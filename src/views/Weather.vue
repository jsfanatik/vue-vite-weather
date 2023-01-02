<template>
  <div>
    <nav class="sticky top-0 py-8 px-2 z-40 sm:px-2">
        <div class="flex flex-wrap items-center justify-center mx-auto">  
          <input @keypress="search" type="text" v-model="cityZip" maxlength="5" pattern="\d*" class="block w-full max-w-md rounded-md drop-shadow-2xl px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm" placeholder="Enter Zip Code Here..." />
        </div>
      </nav>

    <div class="mx-auto max-w-4xl px-6 mt-4">
      <div class="text-left">        
        <div class="p-6">
<!-- 
          <div v-if="store.recentSearches.length === 0" class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
              <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
              </div>
              <form class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input @keypress="search" type="text" v-model="cityZip" maxlength="5" pattern="\d*" class="block w-full max-w-md rounded-md drop-shadow-2xl px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm" placeholder="Enter Zip Code Here..." />
                  </div>
                </div>
              </form>
            </div>
          </div> -->

          <div style="background-color: rgba(255, 255, 255, 0.2);" class="relative text-white h-full p-12 shadow-2xl overflow-hidden sm:rounded-lg">
            
            <div class="absolute inset-y-0 right-0 top-4 w-14">
              <ul class="flex gap-x-2">
                <li class="flex cursor-pointer" @click="openModal(zip)">
                  <ClockIcon class="w-8 h-8 text-white"/>
                </li>
              </ul>
            </div>

            <h2 class="text-4xl font-extrabold tracking-tight">{{ cities }} ({{ zip }})</h2>
            <p class="mt-2">{{ dateTime }}</p>
            <dl class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-large text-md">Temp</dt>
                <dd class="mt-2 font-medium text-8xl"> {{ weatherValues.temp }}&#176;</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md">Max/Min</dt>
                <dd class="mt-2 text-5xl">{{ weatherValues.temp_max }}&#176;/ {{ weatherValues.temp_min }}&#176;</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md">Feels Like</dt>
                <dd class="mt-2 text-5xl">{{ weatherValues.feels_like }}&#176;</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md">Humidity</dt>
                <dd class="mt-2 text-5xl">{{ weatherValues.humidity }}&#37;</dd>
              </div>
            </dl>
          </div>

          <!-- TODO: configure open function to update temp value displayed in recentDialog-->
          <RecentDialog :isOpen="isOpen" @closeModal="closeModal"/>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from '../store';
import { TransitionRoot } from '@headlessui/vue'
import { ClockIcon, XIcon, CalendarIcon, FireIcon, LightningBoltIcon, MoonIcon, SunIcon } from "@heroicons/vue/outline";
import RecentDialog from '../components/RecentDialog.vue'
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore()
const isShowing = ref(true)
const isOpen = ref(false)
const cityZip = ref("");

// return rounded weather values from store
const weatherValues = computed(() => {
  return store.roundedValues
})

// return cities from store
const cities = computed(() => {
  return store.cities
})

const zip = computed(() => {
  return store.cityZip
})

// return API timestamp
const dateTime = computed(() => {
  return store.dateTime
})

const closeModal = () => {
  isOpen.value = false
}

const openModal = (zip) => {
  console.log('isOpen')
  // updates weatherValues when opening RecentDialog
  store.searchWeather(zip)
  isOpen.value = true
}

const goToRecent = () => {
  router.push({ path: 'recent' })
}

const search = async (e) => {
  if (e.key == "Enter") {
    await store.searchWeather(cityZip.value)
    // router.push({ name: "Weather" });
    cityZip.value = "";
  }
};

onMounted(() => {
  isShowing.value = false

  setTimeout(() => {
    isShowing.value = true
  }, 500)
})
</script>