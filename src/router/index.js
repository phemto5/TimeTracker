import Vue from 'vue'
import Router from 'vue-router'
import Help from '@/components/Help'
import Chunk from '@/components/Chunk'
import Customer from '@/components/Customer'
import Contact from '@/components/Contact'
import Timer from '@/components/Timer'
import Login from '@/components/Login'
import Account from '@/components/Account'

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
      name: 'Time',
      component: Chunk,
      meta: {}
    },
    {
      path: '/timer',
      name: 'Timer',
      component: Timer,
      meta: {}
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {}
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {}
    },
    {
      path: '/customers',
      name: 'Customer',
      component: Customer,
      meta: {}
    },
    {
      path: '/contacts',
      name: 'Contact',
      component: Contact,
      meta: {}
    }
  ]
})
