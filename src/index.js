import Row from '../packages/row/index.js';

const components = [
  Row
];

const install = function (Vue, opts = {}) {
  
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default {
  version: '2.11.1',
  install,
  Row
};