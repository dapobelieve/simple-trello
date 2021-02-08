import Vue from "vue"
import Router from "vue-router"
import Board from "./views/Board.vue"
import Task from "./views/Task.vue"

Vue.use(Router)

const routes = [
	{
		path: '/',
		component: Board,
		name: 'board',
		children: [
			{
				path: 'task/:id',
				name: 'task',
				component: Task
			}
		]
	}
]




const router = new Router({
	routes
})

export default router;