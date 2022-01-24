<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <header-section v-if="lang !== 'play'"></header-section>
    <div class="main-wrapper">
      <router-view></router-view>
    </div>
    <footer-section v-if="lang !== 'play' && !isComponent"></footer-section>
  </div>
</template>
<script>
  import { use } from 'main/locale';
  import zhLocale from 'main/locale/lang/zh-CN';
  import enLocale from 'main/locale/lang/en';

  const localize = lang => {
    switch (lang) {
    case 'en-US':
      use(enLocale);
      break;
    default:
      use(zhLocale);
    }
  };

  const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN';
  localize(lang);
  export default {
    name: 'App',
    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },
      isComponent() {
        return /^component-/.test(this.$route.name || '');
      }
    },
    data () {
      return {
        msg: '你好，世界2'
      }
    }
  }
</script>