<template>
	<VeeForm
		v-slot="{ handleSubmit }"
		as="div"
		:initial-values="form"
		:validation-schema="createTask(!state.data?.categoryId)"
	>
		<form @submit="handleSubmit($event, createList)">
			<CustomInput
				v-model="form.title"
				name="title"
				label="Назва"
			/>
			<CustomTextarea
				v-model="form.description"
				name="description"
				label="Опис"
			/>
			<CustomSelect
				v-if="!state.data?.categoryId"
				v-model="form.status"
				label="Статус"
				placeholder="Статус задачі"
				name="status"
				class="!z-[103]"
				:items="boards"
			/>
			<CustomSelect
				v-model="form.responsiblePerson"
				label="Відповідальна особа"
				placeholder="Особа"
				name="responsiblePerson"
				keyTitle="name"
				class="!z-[102]"
				:items="users"
			/>

			<CustomSelect
				v-model="form.performers"
				label="Виконавці"
				name="performers"
				placeholder="Оберіть виконавців"
				keyTitle="name"
				:items="users"
				multiple
				:parse="parse"
				class="!z-[101]"
			/>
			<CustomSelect
				v-model="form.priority"
				label="Пріорітет"
				placeholder="Оберіть пріорітет"
				name="priority"
				keyTitle="label"
				class="!z-[100]"
				:items="priorities"
			/>
			<CustomButton type="submit"> Створити задачу </CustomButton>
		</form>
	</VeeForm>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { configure, Form as VeeForm } from 'vee-validate';
import { useIndexStore } from '@/stores/index';
import { useModalStore } from '@/stores/modal';
import createTask from '@/schemas/todoTask.schema';
const store = useIndexStore();
const storeModal = useModalStore();

const { state } = storeToRefs(storeModal);
const { priorities, users, boards } = storeToRefs(store);
const form = ref({
	title: '',
	description: '',
	priority: {},
	responsiblePerson: {},
	status: {},
	performers: [],
});

const createList = (values) => {
	store.createTask(
		state.value.data?.categoryId || values.status.id || null,
		values.title,
		values.description,
		values.priority,
		values.performers,
		values.responsiblePerson,
	);
	storeModal.hideModal();
};
const parse = (users) => users.map((user) => user.name).join(', ');
configure({
	validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
	validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
	validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
	validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
</script>
