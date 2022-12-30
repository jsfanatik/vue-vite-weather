<template>
  <div>
    <div class="mx-auto max-w-4xl px-6 mt-8">
      <div class="text-left">        
        <div class="p-6">

          <!-- <div class="weather-box">
            <div class="temp">{{ weatherValues.temp }}°C</div>
          </div> -->

          <!-- <div class="text-center text-white text-5xl">
            <h2 class="font-bold tracking-tight">{{ cities }}</h2>
          </div> -->


          <div style="background-color: rgba(255, 255, 255, 0.2);" class="relative text-white h-full p-12 shadow-2xl overflow-hidden sm:rounded-lg">
            
            <div class="absolute inset-y-0 right-5 top-4 w-16">
                <ul class="flex gap-x-2">
                  <li class="flex cursor-pointer" @click="openModal">
                    <ClockIcon class="w-8 h-8 text-white"/>
                  </li>
                  <li class="flex cursor-pointer">
                    <CalendarIcon class="w-8 h-8 text-white"/>
                  </li>
                </ul>
            </div>

            <h2 class="text-4xl font-extrabold tracking-tight">{{ cities }}</h2>
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
import { ClockIcon, XIcon, CalendarIcon } from "@heroicons/vue/outline";
import RecentDialog from '../components/RecentDialog.vue'

const store = useStore()
const isShowing = ref(true)
const isOpen = ref(false)

// return rounded weather values from store
const weatherValues = computed(() => {
  return store.roundedValues
})

// return cities from store
const cities = computed(() => {
  return store.cities
})

// return API timestamp
const dateTime = computed(() => {
  return store.dateTime
})

const closeModal = () => {
  isOpen.value = false
}

const openModal = () => {
  console.log('isOpen')
  isOpen.value = true
}

onMounted(() => {
  isShowing.value = false

  setTimeout(() => {
    isShowing.value = true
  }, 500)
})


// function resetIsShowing() {
//   isShowing.value = false

//   setTimeout(() => {
//     isShowing.value = true
//   }, 500)
// }

</script>