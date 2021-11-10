import Vue from 'vue'
import VueRouter from 'vue-router'
import Registry from '../views/Registry.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import NotFound from "@/views/NotFound"

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign_up',
    name: 'Registry',
    component: Registry
  },
  {
    path: '/sign_in',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '*',
    name: 'error',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=> {
  if (to.path === '/sign_in') {
    next()
  } else{
    let token = localStorage.getItem('token')
    token ? next() : next('/sign_in')
  }
})

export default router
