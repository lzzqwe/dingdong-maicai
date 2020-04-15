import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/index'
  },
  {
      path:'/index',
      component: ()=> import('../views/index/Index.vue'),
      children:[
          {
              path:'',
              redirect:'/home'
          },
        {
            name: 'Home',
            path: '/home',
            component: ()=> import("../views/home/Home.vue")
          },
          {
              name:'Category',
              path:'/category',
              component: ()=> import('../views/category/Category.vue')
          },
          {
              name:'Cate',
              path:'/cart',
              component: ()=> import('../views/cart/Cart.vue')
          },
          {
              name:'Profile',
              path:'/profile',
              component: ()=> import('../views/profile/Profile.vue')
          },
      ]
  },
  {
      name:'Detail',
      path:'/detail',
      component: ()=> import('../views/detail/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
