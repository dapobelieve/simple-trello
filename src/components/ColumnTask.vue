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
export default {
	props: {
		task: {
			type: Object,
			required: true
		},
		board: {
			type: Object,
			required: true
		},
		column: {
			type: Object,
			required: true
		},
		taskIndex: {
			type: Number,
			required: true
		},
		columnIndex: {
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
		},
		moveTaskOrColumn(e, targetColumnTasks, targetColumnIndex, toTaskIndex) {
			const type = e.dataTransfer.getData('type')

			if(type === 'task') {
				this.moveTask(e, targetColumnTasks, toTaskIndex !== "undefined" ? toTaskIndex : targetColumnTasks.length)
			}else {
				this.moveColumn(e, targetColumnIndex)
			}
		},
		moveTask(e, targetColumnTasks, targetTaskIndex) {
			const sourceColumnIndex = e.dataTransfer.getData('source-task-index');
			const sourceColumnTasks = this.board.columns[sourceColumnIndex].tasks;
			const fromTaskIndex = e.dataTransfer.getData('task-index')

			this.$store.commit('MOVE_TASK', {
				sourceColumnTasks,
				targetColumnTasks,
				fromTaskIndex,
				targetTaskIndex
			})
		},
		moveColumn(e, targetColumnIndex){
			const sourceColumnIndex = e.dataTransfer.getData('source-column-index')

			this.$store.commit('MOVE_COLUMN', {
				sourceColumnIndex,
				targetColumnIndex
			})
		}
	}
}	
</script>
<style>
.task {
	@apply bg-white p-2 shadow rounded;
}	
</style>