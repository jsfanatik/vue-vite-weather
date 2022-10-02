<template>
  <div class="min-h-full">
    <Disclosure
      as="nav"
      class="bg-gray-800 sticky top-0 z-50"
      v-slot="{ open }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <input
                  @keypress="search"
                  type="text"
                  pattern="\d*"
                  maxlength="5"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  v-model="cityZip"
                  placeholder="Enter US Zip Code"
                />
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <button
                  primary
                  @click="goToRecent"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Recently Searched
                </button>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <DisclosureButton
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <input
            @keypress="search"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="cityZip"
            type="text"
            placeholder="Enter US Zip Code"
          />
        </div>
      </DisclosurePanel>
    </Disclosure>

    <main class="min-h-screen bg-amber-300 relative py-16" :class="[weatherValues.temp < 60 ? 'bg-cyan-300' : 'bg-amber-300']">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <router-view />
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './store';
import axios from 'axios'

const cityZip = ref("");
const router = useRouter();
const store = useStore();

// return rounded weather values from store
const weatherValues = computed(() => {
  return store.roundedValues
})

const search = async (e) => {
  if (e.key == "Enter") {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${cityZip.value},US&appid={youropenweathermapidhere}&units=imperial`
      );
      store.cities = res.data.name;
      store.weatherData = res.data.main;
      const date = Date(res.data.dt).toLocaleString("en-US");
      store.dateTime = date.toString();

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
