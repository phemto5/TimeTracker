import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PostManager from '@/components/PostManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/other',
      name: 'Home',
      component: Hello
    },
    {
      path: '/',
      name: 'Time Managment',
      component: PostManager,
      meta: {

      }
    }
  ]
})
