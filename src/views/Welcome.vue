<template>  
  <div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-lg space-y-8">
      <h2 class="-mt-24 text-center text-6xl font-bold tracking-tight text-white">Weather Search
      </h2>
      <div>
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <input @keypress="search" type="text" v-model="cityZip" maxlength="5" pattern="\d*" class="block w-full max-w-lg rounded-md drop-shadow-2xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm" placeholder="Enter 5-digit Zip Code Here..." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClockIcon, XIcon, CalendarIcon, FireIcon, LightningBoltIcon, MoonIcon, SunIcon } from "@heroicons/vue/outline";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";
import axios from "axios";
import RecentDialog from '../components/RecentDialog.vue'

const cityZip = ref("");
const router = useRouter();
const store = useStore();

const search = async (e) => {
  if (e.key == "Enter") {
    await store.searchWeather(cityZip.value)
    if (store.error) {
      router.push({ name: "Error" });
    } else {
      router.push({ name: 'Weather' })
    }
    cityZip.value = "";
  }
};
</script>