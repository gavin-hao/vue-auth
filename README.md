# vue-authenticate

> Vue 鉴权插件
#### dependences
- vue
- vuex
- vue-router
#### How to use

``` js
import Vue from 'vue';
import App from './App';
import store from './store';
import Auth from './src'
import Router from 'vue-router'
Vue.use(Router)
const router=new Router({
  routes: [
    
    {
      path: '/',
      name: 'default',
      component: Home,
      redirect:'/index',
      meta: { auth: true },
    },
    {
      path: '/',
      name: 'default',
      component: require('@/views/Dashboard.vue').default,
      meta: { auth: { roles: ['administrator'] } },
    }
  ]

Vue.use(Auth, { router: router, store: store, logoutRedirect: '/login' })
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');


```

#### Apis

- this.$auth.user

- this.$auth.userInfo()
- this.$auth.login(token, rememberMe)
- this.$auth.logout()
- this.$auth.isAuthenticated(role)