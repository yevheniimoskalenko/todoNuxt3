<template>
	<Teleport to="body">
		<HeadlessTransitionRoot
			appear
			:show="state.active"
			as="template"
		>
			<HeadlessDialog
				as="div"
				:open="state.active"
				@close="hideModal"
				class="relative z-[30000]"
			>
				<HeadlessTransitionChild
					as="template"
					enter="duration-300 ease-out"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="duration-200 ease-in"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-black/25" />
				</HeadlessTransitionChild>

				<div class="fixed inset-0 overflow-y-auto">
					<div class="flex min-h-full items-center justify-center p-4 text-center">
						<HeadlessTransitionChild
							as="template"
							enter="duration-300 ease-out"
							enter-from="opacity-0 scale-95"
							enter-to="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leave-from="opacity-100 scale-100"
							leave-to="opacity-0 scale-95"
						>
							<HeadlessDialogPanel
								class="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							>
								<header class="flex items-center justify-between relative">
									<HeadlessDialogTitle class="text-2xl">{{ state.data?.title }}</HeadlessDialogTitle>
									<button
										@click="hideModal"
										class="absolute right-0"
									>
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
												d="M6 18 18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</header>
								<component :is="components[state.component]"></component>
							</HeadlessDialogPanel>
						</HeadlessTransitionChild>
					</div>
				</div>
			</HeadlessDialog>
		</HeadlessTransitionRoot>
	</Teleport>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import CreateList from '@/components/modals/CreateList';
import CreateTask from '@/components/modals/CreateTask';
import EditList from '@/components/modals/EditList';
import EditTask from '@/components/modals/EditTask';
const store = useModalStore();
const { hideModal } = store;
const { state } = storeToRefs(store);
const components = {
	CreateList,
	CreateTask,
	EditList,
	EditTask,
};
</script>
