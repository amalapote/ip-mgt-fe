import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import Login from '../views/LoginView.vue'
import IndexView from '../views/IndexView.vue'
import EditView from '../views/Home/EditView.vue'
import LogView from '../views/Audit/IndexView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresAuth: false },
    },
  {
      path: '/admin',
      name:'admin',
      component: IndexView,
      children:[
          {
              path: 'home',
              name: 'admin.home',
              component: HomeView,
              meta: { requiresAuth: true },
          },
          {
              path: 'log',
              name: 'admin.log',
              component: LogView,
              meta: { requiresAuth: true },
          },
          {
              path: 'edit',
              name: 'admin.edit',
              component: EditView,
              meta: { requiresAuth: true },
          },
      ]
  },
  ]
})

// // GOOD
// router.beforeEach((to, from, next) => {
//     let test = localStorage.getItem('access') === null ? false : true
//     if (to.name !== 'login' && !test) next({ name: 'login' })
//     else next()
// })

router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    let isLoggedIn = localStorage.getItem('access') === null ? false : true
    if (to.meta.requiresAuth && !isLoggedIn) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    }
})

export default router
