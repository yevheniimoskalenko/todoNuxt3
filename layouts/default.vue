<template>
  <main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
  >
  <!-- <div class=" absolute inset-0 object-cover w-screen h-sreen ">
    <div class=" w-full h-full bg-no-repeat" :style="`background-image: url(${bg})`"></div>
  </div> -->
    <TheHeader />
    <slot />
</main>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useIndexStore } from '@/stores/index'
const store = useIndexStore()
defineComponent({
  name: 'LayoutDefault'
})

  const { bg } = storeToRefs(store)
</script>