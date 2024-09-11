<template>
    <section>
        <Todo v-for="board in boards" :key="board.id" v-bind="board"/>
    </section>
</template>
<script setup lang="ts">
    import { storeToRefs } from 'pinia'
    import { useIndexStore } from '@/stores/index'
    const store = useIndexStore()
    const { boards } = storeToRefs(store)
</script>