<template>
  <div class="mx-auto bg-white max-w-2xl px-6 rounded-md">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Recently Searched</h3>
    </div>
    <div class="border-t border-gray-200">
      <dl v-for="recentCity in recentCities" :key="recentCity.id">
        <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-2xl font-medium text-gray-500">{{ recentCity }}</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:justify-self-end sm:col-span-2 sm:mt-0">
            <button @click="openRecent(recentCity)" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Open</button>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useRouter } from 'vue-router'
import { useStore } from "../store";
import axios from 'axios'

const router = useRouter()
const store = useStore()
const recentCities = computed(() => recentSearch())

const recentSearch = () => {
  return store.recentSearches
}

const openRecent = async (recent) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${recent}&appid=d2c9aaafb6c5d4d2632592ce88154c5f&units=imperial`
    )
    store.cities = res.data.name
    store.weatherData = res.data.main
    router.push({ name: 'Weather' })
  } catch (error) {
    router.push({ name: 'Error' })
    console.log(error)
  }
}
</script>