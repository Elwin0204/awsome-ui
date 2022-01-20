// const text = 'hello world';
// let say = (value) => {
//   alert(value)
// };
// say(text);

// import './test.less';
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount('#app');