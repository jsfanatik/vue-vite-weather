<template>
    <div class="grid grid-cols-3 gap-4">
        <div class="flex flex-col col-span-1 items-center py-6">
            <TransitionRoot
                appear
                :show="isShowing"
                as="template"
                enter="transform transition ease-in-out duration-[1200ms]"
                enterFrom="opacity-0 translate-y-full rotate-[-120deg] scale-50"
                enterTo="opacity-100 translate-y-0 rotate-0 scale-100"
                leave="transform transition ease-in-out duration-0 sm:duration-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div v-if="weatherValues.temp >= 80"  class="w-72 h-72 bg-amber-200 rounded-md shadow-lg">
                    <TransitionRoot
                        appear
                        :show="isShowing"
                        as="template"
                        enter="transform transition ease-in-out duration-[1200ms]"
                        enterFrom="opacity-0 translate-y-full scale-100"
                        enterTo="opacity-100 translate-y-0 rotate-0 scale-100"
                        leave="transform transition ease-in-out duration-0 sm:duration-0"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <SunIcon class="w-full h-full text-amber-500" aria-hidden="true" />
                    </TransitionRoot>
                </div>
                <div v-else class="w-72 h-72 bg-neutral-200 rounded-md shadow-lg">
                    <TransitionRoot
                        appear
                        :show="isShowing"
                        as="template"
                        enter="transform transition ease-in-out duration-[1200ms]"
                        enterFrom="opacity-0 translate-y-full scale-100"
                        enterTo="opacity-100 translate-y-0 rotate-0 scale-100"
                        leave="transform transition ease-in-out duration-0 sm:duration-0"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <CloudIcon class="w-full h-full text-cyan-400" aria-hidden="true" />
                    </TransitionRoot>
                </div>
            </TransitionRoot>
        </div>        
        <div class="px-4 py-6 col-span-2 sm:px-0">
            <TransitionRoot
                appear
                :show="isShowing"
                as="template"
                enter="transform transition ease-in-out duration-[1200ms]"
                enterFrom="opacity-0 translate-y-full scale-100"
                enterTo="opacity-100 translate-y-0 scale-100"
                leave="transform transition ease-in-out duration-0 sm:duration-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div class="h-72 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="border-t border-gray-200">
                        <dl>
                        <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Temperature</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ weatherValues.temp }}</dd>
                        </div>
                        <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Feels Like</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ weatherValues.feels_like }}</dd>
                        </div>
                        <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Temp High</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ weatherValues.temp_max }}</dd>
                        </div>
                        <div class="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Temp Low</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ weatherValues.temp_min }}</dd>
                        </div>
                        </dl>
                    </div>
                </div>
            </TransitionRoot>
        </div>
    </div>
</template>

<script setup>
import { toRefs, computed, ref, watch } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { CloudIcon, SunIcon } from "@heroicons/vue/outline"

const props = defineProps({
    main: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    }
})

const { main, show } = toRefs(props)
const weatherValues = computed(() => roundedValues())
const isShowing = ref(true)

const roundedValues = () => {
    const roundData = {}
    Object.keys(main.value).map(key => {
        return roundData[key] = Math.round(main.value[key]);                
    })
    return roundData
}

watch(show, () => {
    isShowing.value = false

    setTimeout(() => {
        isShowing.value = true
    }, 500)
})
</script>