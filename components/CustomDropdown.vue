<template>
	<HeadlessMenu
		as="div"
		class="relative inline-block text-left"
	>
		<div>
			<HeadlessMenuButton class="inline-flex w-full justify-center rounded-md text-sm font-medium px-1">
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
						d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
					/>
				</svg>
			</HeadlessMenuButton>
		</div>

		<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
		>
			<HeadlessMenuItems
				class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
			>
				<div
					class="px-1 py-1"
					v-for="opt in options"
					:key="opt.key"
				>
					<HeadlessMenuItem v-slot="{ active }">
						<button
							:class="[
								active ? 'bg-violet-500 text-white' : 'text-gray-900',
								'group flex w-full items-center rounded-md px-2 py-2 text-sm',
							]"
							@click.prevent="emitMore(opt.key)"
						>
							{{ opt.title }}
						</button>
					</HeadlessMenuItem>
				</div>
			</HeadlessMenuItems>
		</transition>
	</HeadlessMenu>
</template>
<script setup lang="ts">
const emit = defineEmits(['emitMore']);
defineProps({
	options: {
		type: Array,
		default: () => [],
	},
});
const emitMore = (key: string) => {
	emit('emitMore', key);
};
</script>
