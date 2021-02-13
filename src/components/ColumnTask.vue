<template>
	<div @click="goToTask(task)" 
		:key="taskIndex" 
		draggable
		@dragover.prevent
		@dragenter.prevent
		@dragstart="pickUpTask($event, taskIndex, columnIndex)"
		class="task"
		v-if="task"
		@drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
		:class="{'mb-2': taskIndex != column.tasks.length -1}" 
		>
		<span class="w-full flex flex-no-shrink font-medium">{{task.name}}</span>
		<p class="w-full flex-no-shrink mt-1 text-sm text-gray-600">{{task.description}}</p>
	</div>
</template>

<script>
import moveTaskAndColumnMixin from "@/mixins/moveTaskAndColumnMixin"	
export default {
	mixins: [moveTaskAndColumnMixin],
	props: {
		task: {
			type: Object,
			required: true
		},
		taskIndex: {
			type: Number,
			required: true
		}
	},
	methods: {
		goToTask(task) {
			this.$router.push({name: 'task', params: { id: task.id } })
		},
		pickUpTask(e, taskIndex, sourceColumnIndex) {
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.dropEffect = 'move'

			e.dataTransfer.setData('task-index', taskIndex)
			e.dataTransfer.setData('source-task-index', sourceColumnIndex)
			e.dataTransfer.setData('type', "task")
		}
	}
}	
</script>
<style>
.task {
	@apply bg-white p-2 shadow rounded;
}	
</style>