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
import moveTaskAndColumnMixin from "@/mixins/moveTaskAndColumnMixin"	
import ColumnTask from "./ColumnTask"	
export default {
	mixins: [moveTaskAndColumnMixin],
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
				
		pickUpColumn(e, sourceColumnIndex) {
			e.dataTransfer.effectAllowed = 'move'
			e.dataTransfer.dropEffect = 'move'

			e.dataTransfer.setData('source-column-index', sourceColumnIndex)
			e.dataTransfer.setData('type', "column")
		},
	}
}	
</script>
<style>
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}	
</style>