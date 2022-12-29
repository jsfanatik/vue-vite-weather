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
        <div class="fixed inset-0 bg-black bg-opacity-25" />
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
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="px-2 py-5 sm:px-6 border-b-4 mb-4">
                <span class="text-2xl font-medium leading-6 text-gray-900">Recent Search</span>
              </div>

              <dl v-for="recentCity in recentCities" :key="recentCity.id">
                <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-md font-medium text-gray-500">{{ recentCity }}</dt>
                  <dd
                    class="mt-1 text-sm text-gray-900 sm:justify-self-end sm:col-span-2 sm:mt-0"
                  >
                    <button
                      @click="openRecent(recentCity)"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Open
                    </button>
                  </dd>
                </div>
              </dl>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, toRefs, computed, onMounted } from 'vue'
import { useStore } from "../store";
import axios from "axios";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const store = useStore();
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

const openRecent = async (recent) => {
  try {
    // after forking, add your OpenWeatherMap key to the URL
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${recent}&appid=d2c9aaafb6c5d4d2632592ce88154c5f&units=imperial`
    );
    store.cities = res.data.name;
    store.weatherData = res.data.main;
    // router.push({ name: "Weather" });
  } catch (error) {
    // router.push({ name: "Error" });
    console.log(error);
  }
  emit('closeModal')
};
</script>
