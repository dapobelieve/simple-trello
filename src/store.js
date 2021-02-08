import Vue from "vue";
import Vuex from "vuex";
import defaultData from './data'
import { uuid, saveState } from './utils'

Vue.use(Vuex)



const board = JSON.parse(localStorage.getItem('board')) || defaultData
export default new Vuex.Store({
	plugins: [saveState],
	state: {
		board
	},
	mutations: {
		CREATE_TASK (state, { tasks, name }) {
			tasks.push({
				name,
				id: uuid(),
				description: ''
			})
		},
		CREATE_COLUMN(state,  { name }) {
			 state.board.columns.push({
			 	name,
			 	tasks: []
			 })
		},
		UPDATE_TASK (state, { task, key, value}) {
			Vue.set(task, key, value)
		},
		MOVE_TASK (state, {sourceColumnTasks, targetColumnTasks, fromTaskIndex, targetTaskIndex}) {
			const taskToMove = sourceColumnTasks.splice(fromTaskIndex, 1)[0] // returns an array [0] picks the element in it

			targetColumnTasks.splice(targetTaskIndex, 0, taskToMove)
		},
		MOVE_COLUMN(state, {sourceColumnIndex, targetColumnIndex}) {
			const columnList = state.board.columns
			const columnToMove = columnList.splice(sourceColumnIndex, 1)[0]
			columnList.splice(targetColumnIndex, 0, columnToMove)
		}
	},
	getters: {
		getTask (state) {
			return (id) => {				
				for( const column of state.board.columns) {
					for(const task of column.tasks) {
						// console.log(task)
						if(task.id == id) {
							return task
						}
					}
				}
			}
		}
	}
})