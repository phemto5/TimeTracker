import Vue from 'vue'
import Router from 'vue-router'
import Help from '@/components/Help'
import Chunk from '@/components/Chunk'
import Customer from '@/components/Customer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/chunks',
      name: 'Time Managment',
      component: Chunk,
      meta: {

      }
    },
    {
      path: '/',
      name: 'Time Managment',
      component: Chunk,
      meta: {

      }
    },
    {
      path: '/customers',
      name: 'Customer Managment',
      component: Customer,
      meta: {

      }
    }
  ]
})
