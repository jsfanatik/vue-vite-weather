<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div v-if="store.recentSearches.length === 0">
                <span>
                  Search Cleared
                </span>
              </div>
              <div v-else class="overflow-x-auto relative">
                <div class="px-2 py-5 sm:px-6 border-b-4 mb-4">
                  <span class="text-md font-medium leading-6 text-gray-900">Recent Search (up to 5)</span>
                </div>
                <div class="absolute inset-y-0 right-8 top-4 w-14">
                  <ul class="flex gap-x-2">
                    <li @click="clearStorage" class="flex cursor-pointer">
                      <!-- <RefreshIcon class="w-7 h-7"/> -->
                      <!-- <span class="border border-black p-1.5 rounded-md hover:bg-gray-400 hover:text-white hover:border-white">Clear</span> -->
                      <button type="button" class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:hover:bg-blue-700 focus:outline-none">
                        Clear
                      </button>

                    </li>
                  </ul>
                </div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="py-3 px-6">
                          City
                      </th>
                      <th scope="col" class="py-3 px-6">
                          Zip Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="recentCity in store.recentSearches" :key="recentCity.id" @click="openRecent(recentCity)" class="bg-white border-b hover:shadow-2xl hover:bg-gray-100 cursor-pointer">
                      <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                          {{ recentCity.name }}
                      </th>
                      <td class="py-4 px-6">
                          {{ recentCity.zip }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, toRefs, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "../store";
import axios from "axios";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { RefreshIcon } from "@heroicons/vue/outline";

const store = useStore();
const router = useRouter();
const props = defineProps({
  isOpen: Boolean,
})
const { isOpen } = toRefs(props)

const emit = defineEmits(['closeModal'])

const closeModal = () => {
  emit('closeModal')
}

const clearStorage = () => {
  store.cityZip = null
  store.cities = {}
  store.weatherData = {}
  store.conditions.description = null    
  store.dateTime = null
  store.recentSearches.length = 0
  store.error = null
  router.push({ name: "Welcome" });
}

const openRecent = (recentCity) => {
  // updates weather values wnen opening a recent search
  store.searchWeather(recentCity.zip)
  emit('closeModal')
};
</script>
