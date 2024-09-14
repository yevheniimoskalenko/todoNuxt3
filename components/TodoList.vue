<template>
	<section>
		<Todo
			v-for="board in boards"
			:key="board.id"
			@drop="onDrop($event, board.id)"
			@dragover.prevent
			@dragenter.prevent
			v-bind="board"
		/>
	</section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useIndexStore } from '@/stores/index';
const { onDrop } = useDrag();
const store = useIndexStore();
const { boards } = storeToRefs(store);
</script>
