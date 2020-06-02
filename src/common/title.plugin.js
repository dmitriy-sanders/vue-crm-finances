import localizeFilter from '../filters/localizeFilter';

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_NAME;
      return `${localizeFilter(titleKey)} | ${appName}`;
    }
  }
}
