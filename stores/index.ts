import { defineStore } from 'pinia';
import type { Board, Todo } from '@/interfaces/index';
import { Priorities } from '@/enums/index';
export const useIndexStore = defineStore('indexStore', () => {
	const users = ref([
		{
			id: 1,
			name: 'Leanne Graham',
		},
		{
			id: 2,
			name: 'Ervin Howell',
		},
		{
			id: 3,
			name: 'Clementine Bauch',
		},
		{
			id: 4,
			name: 'Patricia Lebsack',
		},
	]);

	const tasks = ref<Todo[]>([]);

	const boards = ref<Board[]>([
		{ id: 1, title: 'Todo' },
		{ id: 2, title: 'In progress' },
		{ id: 3, title: 'Done' },
	]);

	const createBoard = (title: string): void => {
		boards.value.push({
			id: Date.now(),
			title,
		});
	};

	const priorities = computed(() =>
		Object.values(Priorities).map((i) => {
			return { label: i, value: i };
		}),
	);

	const createTask = (
		id: number,
		title: string,
		description: string,
		priority: Priorities,
		performers: [object],
		responsiblePerson: object,
	): void => {
		tasks.value.push({
			id: Date.now(),
			categoryId: id,
			title,
			description,
			priority,
			performers,
			responsiblePerson,
		});
	};

	const editTask = (
		categoryId: number,
		title: string,
		description: string,
		priority: Priorities,
		performers: [object],
		responsiblePerson: object,
		id: number,
	): void => {
		const task = tasks.value.find((t) => t.id == id);
		if (task) {
			Object.assign(task, {
				categoryId: categoryId,
				title,
				description,
				priority,
				performers,
				responsiblePerson,
			});
		} else {
			console.error('task not found');
		}
	};

	const swipeItem = (itemId: number, categoryId: number) => {
		tasks.value = tasks.value.map((x) => {
			if (x.id == itemId) x.categoryId = categoryId;
			return x;
		});
	};

	const deleteTask = (id: number) => {
		tasks.value = tasks.value.filter((task) => task.id !== id);
	};

	const deleteList = (id: number) => {
		// remove list
		boards.value = boards.value.filter((b) => b.id !== id);
		// remove task
		tasks.value = tasks.value.filter((task) => task.categoryId !== id);
	};

	const editList = (title: string, id: number): void => {
		const board = boards.value.find((t) => t.id == id);
		if (board) {
			Object.assign(board, {
				title,
			});
		} else {
			console.error('board not found');
		}
	};

	return {
		boards,
		users,
		createBoard,
		editTask,
		Priorities,
		priorities,
		createTask,
		swipeItem,
		tasks,
		deleteTask,
		deleteList,
		editList,
	};
});
