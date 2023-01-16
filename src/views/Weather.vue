<template>
  <div>
    <nav class="sticky top-4 py-8 px-2 z-40 sm:px-2">
        <div class="flex flex-wrap items-center justify-center mx-auto">  
          <input 
            @keypress="search" 
            type="text" 
            v-model="cityZip" 
            maxlength="5" 
            pattern="\d*" 
            class="block 
            w-72 
            rounded-md 
            drop-shadow-2xl 
            px-3 
            py-2 
            text-gray-900 
            placeholder-gray-500 
            focus:z-10 
            focus:outline-none 
            sm:text-sm" 
            placeholder="Enter 5-digit Zip Code Here..." 
          />
        </div>
      </nav>

    <div class="mx-auto max-w-4xl px-6 mt-4">
      <div class="text-left">        
        <div class="p-6">
          <div 
            style="background-color: rgba(255, 255, 255, 0.2);" 
            class="relative 
            text-white 
            h-full 
            p-12 
            shadow-2xl 
            overflow-hidden 
            sm:rounded-lg"
          >
            <div class="absolute inset-y-0 right-0 top-4 w-14">
              <ul class="flex gap-x-2">
                <li class="flex cursor-pointer" @click="openModal">
                  <ClockIcon class="w-8 h-8 text-white"/>
                </li>
              </ul>
            </div>

            <h2 class="text-4xl font-extrabold tracking-tight">{{ store.cities }} ({{ store.cityZip }})</h2>
            <p class="mt-2">{{ store.dateTime }}</p>
            <dl class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-10 lg:gap-x-8">
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-large text-md">Temp</dt>
                <dd class="mt-2 font-medium text-8xl"> {{ store.roundedValues.temp }}&#176;F</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md">Max/Min</dt>
                <dd class="mt-2 text-5xl">{{ store.roundedValues.temp_max }}&#176;F/{{ store.roundedValues.temp_min }}&#176;F</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md">Condition</dt>
                <dd class="mt-2 text-5xl">{{ store.conditions.description }}</dd>
              </div>
              <div class="border-t border-gray-200 pt-4">
                <dt class="font-medium text-md">Humidity</dt>
                <dd class="mt-2 text-5xl">{{ store.roundedValues.humidity }}&#37;</dd>
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
import { ref } from 'vue'
import { useStore } from '../store';
import { useRouter } from "vue-router";
import { ClockIcon } from "@heroicons/vue/outline";
import RecentDialog from '../components/RecentDialog.vue'

const router = useRouter();
const store = useStore()
const isShowing = ref(true)
const isOpen = ref(false)
const cityZip = ref("");

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
} 

const search = async (e) => {
  if (e.key == "Enter") {
    await store.searchWeather(cityZip.value)
    if (store.error) {
      router.push({ name: "Error" });
    }
    cityZip.value = "";
  }
};
</script>