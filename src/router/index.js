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
          path: 'usuario',
          name: 'Usuario',
          component: () => import(/* webpackChunkName: "Usuario" */ '../views/Usuario.vue'),
        },
        {
          path: 'region',
          name: 'Region',
          component: () => import(/* webpackChunkName: "Region" */ '../views/Region.vue'),
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
  },
  {
    path: '/image',
    name: 'ImageUpload',
    component: () => import(/* webpackChunkName: "Image" */ '../views/ImageUpload.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (to.name === 'ImageUpload') return true;
  if ((!store.state.isAuthenticated) && (to.name !== 'Login') && (to.name !== 'Login2')) {
    return { name: 'Login2', params: { previousRoute: to.name } };
  }
});

export default router
