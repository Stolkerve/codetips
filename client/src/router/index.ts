import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import { getModule } from 'vuex-module-decorators'

import SessionModule from '@/store/SessionModule'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ProfileView from '@/views/ProfileView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpView
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to: Route, from: Route, next: Function) => {
  const sessionModule: SessionModule = getModule(SessionModule);
  if (sessionModule.session && sessionModule.session.token) {
    sessionModule.saveSession();
  }
  sessionModule.loadSession();
  if ((to.name == 'Login' || to.name == 'Signup') && sessionModule.session.token ) { next({ name: "Home" }) };
  next();
});

export default router
