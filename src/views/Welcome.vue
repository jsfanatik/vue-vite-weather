<template>  
  <div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-2xl space-y-8">
      <!-- <div class="p-5 flex flex-wrap justify-center items-center gap-2"> -->
        <h2 class="-mt-24 text-center text-6xl font-bold tracking-tight text-white">Weather Search
        </h2>
        <!-- <LightningBoltIcon class="w-24 h-24 text-white"/> -->
      <!-- </div> -->
      <div>
      <!-- <form class="space-y-6" action="#" method="POST"> -->
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <!-- <label for="email-address" class="sr-only">Email address</label> -->
            <input @keypress="search" type="text" v-model="cityZip" maxlength="5" pattern="\d*" class="block w-full max-w-2xl rounded-md drop-shadow-2xl px-4 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm" placeholder="Enter Zip Code Here..." />
          </div>
        </div>
        <!-- </form> -->
      </div>
      
      <!-- <LightningBoltIcon class="w-24 h-24 text-white"/> -->

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
    router.push({ name: "Weather" });
    cityZip.value = "";
  }
};
</script>