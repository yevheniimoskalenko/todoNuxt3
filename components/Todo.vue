<template>
    <section class=" w-full max-w-56">
        <header>
            <h2>{{ title }}</h2>
        </header>
        <main>
            <Item v-for="item in tasks" :key="item.id" v-bind="item"></Item>
        </main>
        <footer>
            <button>Створити Задачу</button>
        </footer>
    </section>
</template>
<script setup lang="ts">
    defineProps({
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        tasks: {
            type: Array,
            default: () => []
    }
})
</script>