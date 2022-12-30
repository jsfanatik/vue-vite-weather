<template>
  <!-- <div class="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
      <div v-for="data in forecastData" :key="data.id" style="background-color: rgba(255, 255, 255, 0.2);" class="group relative bg-gray-200 shadow-xl p-6 rounded-md">
        <div  class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              {{ data.main.temp }}
            </h3>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ data.dt_txt }}</p>
        </div>
      </div>
    </div>
  </div> -->

  <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="data in forecastData" :key="data.id" style="background-color: rgba(255, 255, 255, 0.2);" class="group relative">
          <!-- <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div> -->
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <!-- <a :href="product.href"> -->
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ data.main.temp }}
                <!-- </a> -->
              </h3>
              <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
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
      `https://api.openweathermap.org/data/2.5/forecast?zip=${store.cityZip},US&appid=d2c9aaafb6c5d4d2632592ce88154c5f&units=imperial`
    );

    // const newData = []
    // newData = res;
    console.log(res.data)

    forecastData.value = res.data.list
})
</script>
