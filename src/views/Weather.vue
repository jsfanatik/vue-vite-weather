<template>
  <div>
    <div class="mx-auto max-w-4xl px-6">
      <div class="text-left">        
        <div class="p-6">
          <div class="h-full p-12 bg-white shadow overflow-hidden sm:rounded-lg">
            <h2 class="text-4xl font-extrabold tracking-tight text-gray-900">{{ cities }}</h2>
            <p class="mt-2">{{ dateTime }}</p>
            <dl class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-large text-md text-gray-500">Temp</dt>
                <dd class="mt-2 font-medium text-7xl text-gray-900"> {{ weatherValues.temp }}&#176;</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md text-gray-500">Max/Min</dt>
                <dd class="mt-2 text-4xl text-gray-900">{{ weatherValues.temp_max }}&#176;/ {{ weatherValues.temp_min }}&#176;</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md text-gray-500">Feels Like</dt>
                <dd class="mt-2 text-4xl text-gray-900">{{ weatherValues.feels_like }}&#176;</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md text-gray-500">Humidity</dt>
                <dd class="mt-2 text-4xl text-gray-900">{{ weatherValues.humidity }}&#37;</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from '../store';

const store = useStore()

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

</script>