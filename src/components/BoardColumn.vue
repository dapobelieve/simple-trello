<template>
	<div 
		draggable
		@dragstart.self="pickUpColumn($event, columnIndex)"
		@drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
		@dragover.prevent
		@dragenter.prevent
		class="column">
		<div class="flex items-center mb-2 font-bold">{{column.name}}</div>
		<div class="list-reset">
			<ColumnTask
				v-for="(task, $taskIndex) of column.tasks"
				:key="$taskIndex"
				:task="task"
				:taskIndex="$taskIndex"
				:column="column"
				:columnIndex="columnIndex"
				:board="board"
			 />
		</div>
		<input 
			class="bg-transparent block p-2 mt-1 w-full outline-none" 
			placeholder="➕ Enter new task" 
			@keyup.enter="createTask($event, column.tasks)"
			type="text">
	</div>
</template>
<script>
import ColumnTask from "./ColumnTask"	
export default {
	props: {
		column: {
			type: Object,
			required: true
		},
		columnIndex: {
			type: Number,
			required: true
		},
		board: {
			type: Object,
			required: true
		}
	},
	components: {
		ColumnTask
	},
	methods: {
		createTask(e, tasks) {
			if(e.target.value && e.target.value.trim() !== "") {
				this.$store.commit('CREATE_TASK',{
					tasks, 
					name: e.target.value
				})

				e.target.value = ""
			}else return;
		},
		moveTaskOrColumn(e, targetColumnTasks, targetColumnIndex, toTaskIndex) {
			const type = e.dataTransfer.getData('type')

			if(type === 'task') {
				this.moveTask(e, targetColumnTasks, toTaskIndex !== "undefined" ? toTaskIndex : targetColumnTasks.length)
			}else {
				this.moveColumn(e, targetColumnIndex)
			}
		},		
		pickUpColumn(e, sourceColumnIndex) {
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.dropEffect = 'move'

			e.dataTransfer.setData('source-column-index', sourceColumnIndex)
			e.dataTransfer.setData('type', "column")
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
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}	
</style>