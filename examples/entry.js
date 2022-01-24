import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './route.config';
import title from './i18n/title';
import HeaderSection from './components/Header.vue';
import FooterSection from './components/Footer.vue';

// style, icon and so on
import './assets/styles/global.less'

Vue.component('header-section', HeaderSection);
Vue.component('footer-section', FooterSection);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');