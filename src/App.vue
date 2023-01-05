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
import { useStore } from "./store";

const store = useStore();
</script>
