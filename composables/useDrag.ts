import { useIndexStore } from '@/stores/index';
export default function useDrag() {
	const store = useIndexStore();

	const onDropToList = (e: DragEvent, newCategoryIdPlace: number) => {
		const selectCategoryId = parseInt(e.dataTransfer.getData('selectCategoryId'));
		store.swipeItemList(selectCategoryId, newCategoryIdPlace);
	};

	const onDragStart = (e: DragEvent, id: number) => {
		e.dataTransfer.dropEffect = 'move';
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('selectCategoryId', id.toString());
	};

	const onDrop = (e: DragEvent, newCategoryId: number) => {
		const categoryId = parseInt(e.dataTransfer.getData('selectCategoryId'));
		store.swipeItem(categoryId, newCategoryId);
	};
	return { onDropToList, onDragStart, onDrop };
}
