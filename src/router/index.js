import { createRouter, createWebHistory } from 'vue-router'
//import DetalleComprasView from '../views/DetalleComprasView.vue'
import LoginHome from '../views/LoginHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginHome
    },    
    {
      path: '/detalleCompras',
      name: 'detalleCompras',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetalleComprasView.vue')
    },
    {
      path: '/facturacion',
      name: 'facturacion',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FacturacionView.vue')
    },
    {
      path: '/gestionarUsuarios',
      name: 'gestionarUsuarios',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GestionarUsuariosView.vue')
    }
  ]
})

export default router
