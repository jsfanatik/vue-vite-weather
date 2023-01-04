<template>
  <div class="min-h-full">
    <div id="app"
      class="min-h-screen"
      :class="store.roundedValues.temp > 60 ? 'warm' : 'cold'"
    >
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Disclosure, 
  DisclosureButton, 
  DisclosurePanel, 
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,  
} from "@headlessui/vue";
import { ClockIcon, XIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./store";
import axios from "axios";
import RecentDialog from './components/RecentDialog.vue'

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

const goToRecent = () => {
  router.push({ name: "Recent" });
};
</script>
