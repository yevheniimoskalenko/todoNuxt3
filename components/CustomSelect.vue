<template>
	<Field
		v-slot="{ field }"
		:name="name"
	>
		<HeadlessListbox
			v-model="inputValue"
			class="relative"
			:multiple="multiple"
			v-bind="{ ...$attrs, ...field }"
		>
			<div class="relative">
				<label :for="name">{{ label }}</label>
				<HeadlessListboxButton
					class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
				>
					<span v-if="inputValue[keyTitle] && !multiple">{{ inputValue[keyTitle] }}</span>
					<span v-else-if="inputValue.length && multiple">{{ parse(inputValue) }}</span>
					<span v-else>{{ placeholder }}</span>
				</HeadlessListboxButton>
				<HeadlessListboxOptions
					class="absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
				>
					<HeadlessListboxOption
						v-for="(item, index) in items"
						v-slot="{ active, selected }"
						:key="index"
						:value="item"
						as="template"
					>
						<li
							class="block truncate"
							:class="[
								active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
								'relative cursor-default select-none py-2 pl-10 pr-4',
								selected ? 'font-bold' : 'font-normal',
							]"
						>
							{{ item[keyTitle] }}
						</li>
					</HeadlessListboxOption>
				</HeadlessListboxOptions>
			</div>
		</HeadlessListbox>
		<div class="h-5">
			<ErrorMessage
				:name="name"
				class="text-red-500 text-xs"
			/>
		</div>
	</Field>
</template>
<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
	modelValue: {
		type: [String, Number, Object, Array],
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
	items: {
		type: Array,
		default: () => [],
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	parse: {
		type: Function,
		default: () => {},
	},
	keyTitle: {
		type: String,
		default: 'title',
	},
});
const inputValue = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
});
</script>
