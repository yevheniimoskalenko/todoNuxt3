<template>
	<section class="w-full max-w-56 flex flex-col">
		<header
			class="bg-gray-50 rounded-t-xl px-3 py-2 flex items-center justify-between border-b border-l border-t border-r"
		>
			<h2>{{ title }}</h2>
			<CustomDropdown
				:options="options"
				@emit-more="emitMore"
				class="!z-[300]"
			/>
		</header>
		<main class="bg-white px-2">
			<Item
				v-for="item in list"
				:key="item.id"
				v-bind="item"
				:categoryId="id"
				@dragover.stop.prevent
				@dragenter.stop.prevent
				draggable="true"
				@dragstart="onDragStart($event, id)"
				class="border-b last:border-none py-1"
			></Item>
		</main>
		<footer class="border-t bg-gray-50 px-3 py-2 rounded-b-xl">
			<CustomButton
				@click="showModal({ component: 'CreateTask', data: { title: 'Створити задачу', categoryId: id } })"
				class="flex items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
				<span>Створити Задачу</span>
			</CustomButton>
		</footer>
	</section>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useIndexStore } from '@/stores/index';
const store = useModalStore();
const storeIndex = useIndexStore();
const { tasks } = storeToRefs(storeIndex);
const { onDragStart } = useDrag();
const { showModal } = store;
const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
});
const list = computed(() => tasks.value.filter((t) => t.categoryId === props.id));

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
			store.showModal({
				component: 'EditList',
				data: { categoryId: props.categoryId, id: props.id, title: 'Редагувати список', data: { ...props } },
			});
			break;
		case 'delete':
			storeIndex.deleteList(props.id);
			break;
		default:
			console.log('key not found');
	}
};
</script>
