<template>
	<div class="board ">
		<h4 class="mb-3">Believe</h4>
		<div class="flex flex-row items-start">
			<!--moveTask (event and the list of tasks of the column we want to move to)  -->
			<BoardColumn
				v-for="(column, $columnIndex) in board.columns" 
				:key="$columnIndex"
				:column="column"
				:columnIndex="$columnIndex"
				:board="board"
				/>
			
			<div class="column flex">
				<input 
					class="p-2 mr-2 flex-grow" 
					type="text" 
					placeholder="New Column Name" 
					@keyup.enter="createColumn"
					v-model="newColumnName">
			</div>
		</div>
		<div v-if="isTaskOpen" @click.self="close" class="task-bg">
			<router-view />
		</div>
	</div>
</template>
<script>
import {mapState} from "vuex"	
import BoardColumn from "../components/BoardColumn"
export default {
	data () {
		return {
			newColumnName: ""
		}
	},
	components: {
		BoardColumn
	},
	computed: {
		...mapState(['board']),
		isTaskOpen() {
			return this.$route.name === 'task'
		}
	},
	methods: {
		createColumn() {
			if(this.newColumnName && this.newColumnName.trim() !== "") {
				this.$store.commit('CREATE_COLUMN', {
					name: this.newColumnName
				})
			}

			this.newColumnName = ""
		},
		close() {
			this.$router.push({name: 'board'})
		}
	}
}	
</script>
<style lang="css">
.board {
	@apply p-4 bg-pink-300 h-full overflow-auto;
}	


.task-bg {
  @apply absolute top-0 left-0 w-full h-full;
  background: rgba(0,0,0,0.5);
}
</style>