import Vue from "vue"
import Router from "vue-router"
import Board from "./views/Board.vue"

Vue.use(Router)

const routes = [
	{
		path: '/',
		component: Board
	}
]




const router = new Router({
	routes
})

export default router;