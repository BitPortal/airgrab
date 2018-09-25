import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/airgrab',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/AirGrab'
    },
    {
      path: '/AirGrab',
      name: 'AirGrab',
      component: () => import('../views/AirGrab')
    },
    {
      path: '/KARMA',
      nameL: 'KARMA',
      component: () => import('../views/KARMA')
    }
  ]
});

export default router;
