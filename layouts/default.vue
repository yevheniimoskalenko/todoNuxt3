<template>
	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<TheHeader />
		<slot />
	</main>
</template>
<script setup>
defineComponent({
	name: 'LayoutDefault',
});
</script>
