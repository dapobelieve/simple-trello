<template>
	<div class="task-view">
		<div class="flex flex-col flex-grow items-start justify-between px-4">
			<input class="p-2 mr-2 flex flex-grow text-sm outline-none font-semibold w-full" type="text" 
			:value="task.name"
			@change="updateTaskProperty($event, 'name')"
			>

			<textarea
			class="relative bg-transparent px-2 border mt-2 h-64 w-full leading-normal"
			:value="task.description"
			@change="updateTaskProperty($event, 'description')"
			@keyup.enter="updateTaskProperty($event, 'description')"
			 />
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	computed: {
		...mapGetters(['getTask']),
		task () {
			return this.getTask(this.$route.params.id)
		}
	},
	methods: {
		updateTaskProperty(e, key) {
			this.$store.commit('UPDATE_TASK', {
				task: this.task,
				key,
				value: e.target.value
			})
		}
	}
}	
</script>
<style>
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}	
</style>