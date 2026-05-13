import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    // redirect: '/home',
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('@/views/Home'),
  // }
];
const router = new VueRouter({
  routes
});
export default router