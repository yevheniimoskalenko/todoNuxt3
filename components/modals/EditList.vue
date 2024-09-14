<template>
	<VeeForm
		v-slot="{ handleSubmit }"
		as="div"
		:initial-values="form"
		:validation-schema="createBoard()"
	>
		<form @submit="handleSubmit($event, editList)">
			<CustomInput
				v-model="form.title"
				name="title"
				label="Назва"
			/>
			<CustomButton type="submit"> Оновити дошку </CustomButton>
		</form>
	</VeeForm>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { configure, Form as VeeForm } from 'vee-validate';
import { useIndexStore } from '@/stores/index';
import { useModalStore } from '@/stores/modal.js';
import createBoard from '@/schemas/todoList.schema';
const store = useIndexStore();
const storeModal = useModalStore();
const { state } = storeToRefs(storeModal);
const form = ref({
	title: '',
});
Object.assign(form.value, {
	title: state.value.data.data.title,
});

const editList = (values) => {
	store.editList(values.title, state.value.data.data.id);
	storeModal.hideModal();
};
configure({
	validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
	validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
	validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
	validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
</script>
