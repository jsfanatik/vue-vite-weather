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
              <div class="overflow-x-auto relative">
                <div class="px-2 py-5 sm:px-6 border-b-4 mb-4">
                  <span class="text-md font-medium leading-6 text-gray-900">Recent Search (up to 5)</span>
                </div>
                <div class="absolute inset-y-0 right-0 top-4 w-14">
              <ul class="flex gap-x-2">
                <li @click="clearStorage" class="flex cursor-pointer">
                  <RefreshIcon class="w-7 h-7"/>
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
                        <th scope="col" class="py-3 px-6">
                            Temp
                        </th>
                      </tr>
                    </thead>
                  <tbody>
                    <tr v-for="recentCity in recentCities" :key="recentCity.id" @click="openRecent(recentCity)" class="bg-white border-b hover:shadow-2xl hover:bg-gray-100 cursor-pointer">
                      <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                          {{ recentCity.name }}
                      </th>
                      <td class="py-4 px-6">
                          {{ recentCity.zip }}
                      </td>
                      <td class="py-4 px-6">
                          {{ recentCity.data.temp }}&#176;
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
import { ref, toRefs, computed, onMounted } from 'vue'
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

const recentCities = computed(() => {
  return store.recentSearches;
});

const closeModal = () => {
  emit('closeModal')
}

const clearStorage = () => {
  localStorage.clear()
  router.push({ name: "Welcome" });
}

const openRecent = (recentCity) => {
  // updates weather values wnen opening a recent search
  store.searchWeather(recentCity.zip)
  emit('closeModal')
};
</script>
