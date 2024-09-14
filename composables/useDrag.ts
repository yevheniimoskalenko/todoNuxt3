import { useIndexStore } from '@/stores/index';
export default function useDrag() {
	const store = useIndexStore();

	const onDragStart = (e: DragEvent, id: number) => {
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('selectCategoryId', id.toString());
	};

	const onDrop = (e: DragEvent, item: number) => {
		const categoryId = parseInt(e.dataTransfer.getData('selectCategoryId'));
		store.swipeItem(categoryId, item);
	};
	return { onDragStart, onDrop };
}
