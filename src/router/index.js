import Vue from 'vue'
import Router from 'vue-router'
import Help from '@/components/Help'
import Chunk from '@/components/Chunk'
import Customer from '@/components/Customer'
import Contact from '@/components/Contact'
import Timer from '@/components/Timer'
import Login from '@/components/Login'
import Account from '@/components/Account'
import Address from '@/components/Address'
import Matter from '@/components/Matter'

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
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {}
    },
    {
      path: '/contacts',
      name: 'Contact',
      component: Contact,
      meta: {}
    },
    {
      path: '/matter',
      name: 'Matter',
      component: Matter,
      meta: {}
    }
  ]
})
