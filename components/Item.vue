<template>
	<article>
		<header class="flex items-center justify-between">
			<span>{{ title }}</span>
			<CustomDropdown
				:options="options"
				@emit-more="emitMore"
			/>
		</header>
		<main>
			<p class="line-clamp-1 text-xs text-gray-400">{{ description }}</p>
		</main>
		<footer>
			<div class="flex items-center gap-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-4 h-4"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
					/>
				</svg>
				<span v-if="responsiblePerson?.name">{{ responsiblePerson.name }}</span>
			</div>
		</footer>
	</article>
</template>
<script setup lang="ts">
import { useIndexStore } from '@/stores/index';
const store = useIndexStore();
import { useModalStore } from '@/stores/modal';
const storeModal = useModalStore();
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	id: {
		type: Number,
		required: true,
	},
	responsiblePerson: {
		type: Object,
		default: () => {},
	},
	priority: {
		type: Object,
		default: null,
	},
	performers: {
		type: Array,
		default: () => [],
	},
	categoryId: {
		type: Number,
		required: true,
	},
});
const options = ref([
	{
		title: 'Редагувати',
		key: 'edit',
	},
	{
		title: 'Видалити',
		key: 'delete',
	},
]);

const emitMore = (key: string) => {
	switch (key) {
		case 'edit':
			// store(val);
			storeModal.showModal({
				component: 'EditTask',
				data: { categoryId: props.categoryId, id: props.id, title: 'Редагувати задачу', data: { ...props } },
			});
			break;
		case 'delete':
			store.deleteTask(props.id);
			break;
		default:
			console.log('key not found');
	}
};
</script>
