<template>
  <div class="mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="city in cityData" :key="city.id" style="background-color: rgba(255, 255, 255, 0.2);" class="group relative text-white rounded-md p-4 cursor-pointer hover:shadow-2xl">
        <!-- <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div> -->
        <!-- <div class="absolute inset-y-0 right-0 top-2 w-12">
          <ul class="flex">
            <li class="flex cursor-pointer">
              <ArrowCircleRightIcon class="w-8 h-8 text-white"/>
            </li>
          </ul>
        </div> -->
        <div>
          <h2 class="text-xl font-extrabold tracking-tight">{{ city.name }} ({{ city.zip }})</h2>
          <!-- <p class="mt-2">{{ dateTime }}</p> -->
          <dl class="grid grid-cols-1 gap-x-6 gap-y-10">
            <div class="border-t border-gray-200 pt-4">
              <dt class="font-large text-md">Temp</dt>
              <dd class="mt-2 font-medium text-6xl"> {{ city.temp }}&#176;</dd>
            </div>
          </dl>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { ArrowCircleRightIcon } from "@heroicons/vue/outline";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import axios from "axios";

const router = useRouter();
const store = useStore();
const cityData = ref([])

// const cityZip = computed(() => {
//   return store.cityZip;
// });

const recentCities = computed(() => {
  return store.recentSearches;
});

const weatherValues = computed(() => {
  return store.roundedValues;
});

// const goToCity = (city) => {
//   router.push({ path: 'weather', params: { zip: city.zip }})
// }

onMounted(async () => {

  // const sleep = (milliseconds) => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }

  //loop through each stored zip and retrieve data

  for (let i = 0; i < recentCities.value.length; i++) {
    const zipCode = recentCities.value[i]
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=d2c9aaafb6c5d4d2632592ce88154c5f&units=imperial`
    );
    const name = res.data.name
    store.weatherData = res.data.main
    const temp = weatherValues.value.temp
    cityData.value.push({
      name: name, 
      zip: zipCode, 
      temp: temp
    })
    console.log(cityData.value)
  }

})
</script>
