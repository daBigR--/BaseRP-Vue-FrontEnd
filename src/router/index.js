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
  },
  {
    path: '/login/:previousRoute',
    name: 'Login2',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if ((to.name !== 'Login') && (to.name !== 'Login2') && (!store.state.isAuthenticated)) {
    console.log(to);
    console.log(from);
    return { name: 'Login2', params: { previousRoute: to.name } };
  }
});

export default router
