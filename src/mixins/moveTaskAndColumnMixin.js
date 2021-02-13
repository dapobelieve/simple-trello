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
	methods: {
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