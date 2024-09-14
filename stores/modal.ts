import { defineStore } from 'pinia';
export interface stateI {
	component: string;
	data: null | object;
	active: boolean;
}

export const useModalStore = defineStore('modalStore', () => {
	const state = ref<stateI>({
		component: '',
		data: null,
		active: false,
	});
	const showModal = ({ component = '', data = null }) => {
		state.value.active = true;
		state.value.component = component;
		state.value.data = data;
	};
	const hideModal = () => {
		state.value.active = false;
		state.value.data = null;
	};
	return { state, showModal, hideModal };
});
