import { createRouter, createWebHashHistory } from 'vue-router'
import SignIn from '../components/SignIn.vue'
import FeedFood from '../components/FeedFood.vue'
import CreateNFT from '../components/CreateNFT'


const routes = [

	{
		path: '/createNFT',
		name: 'CreateNFT',
		component: CreateNFT,
		meta: { requiresAuth: true }, // 添加 meta 属性，表示需要登录才能访问
	},
	{
		path: '/feedfood',
		name: 'FeedFood',
        component: FeedFood,
		meta: { requiresAuth: true},
	},
	{
		path: '/signin',
		name: 'SignIn',
		component: SignIn,
	}
]

const router = createRouter({
	// （1）采用hash 模式
	history: createWebHashHistory(),
	// （2）采用 history 模式
	// history: createWebHistory(),
	routes, //使用上方定义的路由配置
})

router.beforeEach((to, from, next) => {
	console.log('====================================')
	console.log(localStorage.getItem('useraddress'))
	console.log('====================================')
	const isAuthenticated = localStorage.getItem('useraddress') !== null // 假设有一个名为 isAuthenticated 的变量，用于检查用户是否已经登录 // 检查本地存储中是否有 useraddress
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

	if (requiresAuth && !isAuthenticated) {
		// 如果需要登录且用户未登录，则重定向到登录页面
		next('/signin')
	} else {
		next()
	}
})

export default router
