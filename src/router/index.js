import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Empty from '../views/Empty.vue'

import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
      children: [
        {
          path: '',
          name: 'Empty',
          component: Empty
        },
        {
          path: 'app1',
          name: 'App1',
          component: () => import(/* webpackChunkName: "app1" */ '../views/App1.vue'),
        },
        {
          path: 'app2',
          name: 'App2',
          component: () => import(/* webpackChunkName: "app2" */ '../views/App2.vue'),
        }
  
      ]
  
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (to.name !== 'Login' && !store.state.isAuthenticated) {
    return { name: 'Login'};
  }
});

export default router
