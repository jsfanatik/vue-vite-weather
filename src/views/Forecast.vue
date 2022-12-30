<template>
  <div class="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="data in forecastData" :key="data.id" class="group relative bg-gray-200 shadow-xl p-6 rounded-md">
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              {{ data.main.temp }}
            </h3>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ data.dt_txt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import axios from "axios";

const router = useRouter();
const store = useStore();
const forecastData = ref()

const cityZip = computed(() => {
  return store.cityZip;
});

onMounted(async () => {
  const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${store.cityZip},US&appid={yourapikeyhere}`
    );

    // const newData = []
    // newData = res;
    console.log(res.data)

    forecastData.value = res.data.list
})
</script>
