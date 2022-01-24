import navConfig from './nav.config';
import langs from './i18n/route';

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN');
  },
  'en-US': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/en-US/${name}.vue`)),
    'en-US');
  }
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  },
  'en-US': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/en-US${path}.md`)),
    'en-US');
  }
};

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

// let route = registerRoute(navConfig);
let route = [];

const generateMiscRoutes = function(lang) {
  // let guideRoute = {
  //   path: `/${ lang }/guide`, // 指南
  //   redirect: `/${ lang }/guide/design`,
  //   component: load(lang, 'guide'),
  //   children: [{
  //     path: 'design', // 设计原则
  //     name: 'guide-design' + lang,
  //     meta: { lang },
  //     component: load(lang, 'design')
  //   }, {
  //     path: 'nav', // 导航
  //     name: 'guide-nav' + lang,
  //     meta: { lang },
  //     component: load(lang, 'nav')
  //   }]
  // };

  // let themeRoute = {
  //   path: `/${ lang }/theme`,
  //   component: load(lang, 'theme-nav'),
  //   children: [
  //     {
  //       path: '/', // 主题管理
  //       name: 'theme' + lang,
  //       meta: { lang },
  //       component: load(lang, 'theme')
  //     },
  //     {
  //       path: 'preview', // 主题预览编辑
  //       name: 'theme-preview-' + lang,
  //       meta: { lang },
  //       component: load(lang, 'theme-preview')
  //     }]
  // };

  // let resourceRoute = {
  //   path: `/${ lang }/resource`, // 资源
  //   meta: { lang },
  //   name: 'resource' + lang,
  //   component: load(lang, 'resource')
  // };

  let indexRoute = {
    path: `/${ lang }`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  };

  // return [guideRoute, resourceRoute, themeRoute, indexRoute];
  return [indexRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});

let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'zh-CN';
let defaultPath = '/zh-CN';
if (userLanguage.indexOf('en-') !== -1) {
  defaultPath = '/en-US';
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;
