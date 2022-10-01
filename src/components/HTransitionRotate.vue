<template>
    <div>
        <TransitionRoot
            appear
            as="template"
            enter="transform transition ease-in-out duration-[1200ms]"
            enterFrom="opacity-0 translate-y-full rotate-[-120deg] scale-50"
            enterTo="opacity-100 translate-y-0 rotate-0 scale-100"
            leave="transform transition ease-in-out duration-0 sm:duration-0"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        />
    </div>
</template>

<script setup>
    import { TransitionRoot } from '@headlessui/vue'
</script>

<style>

</style>