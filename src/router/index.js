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
import Email from '@/components/Email'
import Matter from '@/components/Matter'
import EndType from '@/components/EndType'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/chunk',
      name: 'Chunk',
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
      path: '/customer',
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
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {}
    },
    {
      path: '/matter',
      name: 'Matter',
      component: Matter,
      meta: {}
    },
    {
      path: '/endtype',
      name: 'EndType',
      component: EndType,
      meta: {}
    },
    {
      path: '/email',
      name: 'Email',
      component: Email,
      meta: {}
    }
  ]
})
