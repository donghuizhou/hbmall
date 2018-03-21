import Vue from 'vue'
import Router from 'vue-router'
import Prod from '@/components/prod/prod.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'prod',
      component: Prod
    }
  ]
})
