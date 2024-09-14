<template>
	<VeeForm
		v-slot="{ handleSubmit }"
		as="div"
		:initial-values="form"
		:validation-schema="createBoard()"
	>
		<form @submit="handleSubmit($event, createList)">
			<CustomInput
				v-model="form.title"
				name="title"
				label="Назва"
			/>
			<CustomButton type="submit"> Створити дошку </CustomButton>
		</form>
	</VeeForm>
</template>
<script setup lang="ts">
import { configure, Form as VeeForm } from 'vee-validate';
import { useIndexStore } from '@/stores/index';
import { useModalStore } from '@/stores/modal.js';
import createBoard from '@/schemas/todoList.schema';
const storeModal = useModalStore();
const store = useIndexStore();
const form = ref({
	title: '',
});

const createList = (values) => {
	store.createBoard(values.title);
	storeModal.hideModal();
};
configure({
	validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
	validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
	validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
	validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
</script>
