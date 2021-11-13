import Vue from 'vue'
import VueRouter from 'vue-router'
import Registry from '../views/Registry.vue'
import Login from '../views/Login.vue'
import Rule from '../views/Rule.vue'
import NotFound from "@/views/NotFound"
import WhiteList from "@/views/WhiteList"
import Main from "@/views/Main"

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
    component: Login
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule
  },
  {
    path: "/whitelist",
    name: 'WhiteList',
    component: WhiteList
  },
  {
    path: '*',
    name: 'error',
    component: NotFound
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
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
