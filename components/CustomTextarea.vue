<template>
	<Field
		v-slot="{ field }"
		:name="name"
	>
		<div>
			<label :for="name">{{ label }}</label>
			<textarea
				v-bind="field"
				:id="name"
				v-model="inputValue"
				type="text"
				:placeholder="placeholder"
				class="px-5 w-full py-3 border-0 rounded-lg text-ls block ring-1 ring-inset !border-gray-70 placeholder:text-neutrals-150 active:ring-blue-ribbon-500"
			/>
			<div class="h-5">
				<ErrorMessage
					:name="name"
					class="text-red-500 text-xs"
				/>
			</div>
		</div>
	</Field>
</template>
<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: '',
	},
});
const inputValue = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
});
</script>
