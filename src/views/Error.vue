<template>
  <div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-lg space-y-8">
      <h2 class="-mt-24 text-center text-6xl font-bold tracking-tight text-white">Weather Search
      </h2>
      
      
        <div class="-space-y-px">
          <!-- <dl> -->
            <div class="bg-white rounded-md px-4 py-5 gap-y-6 text-center grid grid-cols-1">
              <span class="text-2xl font-medium text-gray-500">Your search could not be completed! Please enter a valid 5-digit zip code!</span>
              <button type="button" @click="goToSearch" class="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm py-2 mr-2 mb-2 dark:hover:bg-blue-700 focus:outline-none">
                Return to Search
              </button>
            </div>
          <!-- </dl> -->
        </div>
      
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from '../store';

const router = useRouter();
const store = useStore()

const goToSearch = () => {
  store.error = null
  //store.error !null prevents next search...why?
  router.push({ name: 'Welcome' })
}
</script>