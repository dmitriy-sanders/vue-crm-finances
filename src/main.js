import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from './filters/dateFilter';
import currencyFilter from './filters/currencyFilter';
import localizeFilter from './filters/localizeFilter';
import customMessage from './common/custom.message';
import titlePlugin from './common/title.plugin';
import 'materialize-css/dist/js/materialize.min';
import Loader from './components/app/Loader';
import tooltipDir from './directives/tooltip.dir';
import VuePaginate from 'vue-paginate'
import VueMeta from 'vue-meta'

import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;
Vue.filter('dateFilter', dateFilter);
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('localizeFilter', localizeFilter);
Vue.use(Vuelidate);
Vue.use(customMessage);
Vue.use(titlePlugin);
Vue.use(VuePaginate);
Vue.use(VueMeta);
Vue.directive('tooltip', tooltipDir);
Vue.component('Loader', Loader);

const firebaseConfig = {
  apiKey: 'AIzaSyCmx_jzgMnhPmuj3kefNDCje8sj_1h4z7g',
  authDomain: 'vue-crm-finances.firebaseapp.com',
  databaseURL: 'https://vue-crm-finances.firebaseio.com',
  projectId: 'vue-crm-finances',
  storageBucket: 'vue-crm-finances.appspot.com',
  messagingSenderId: '781857900198',
  appId: '1:781857900198:web:babed36e4c292eedaa9667',
  measurementId: 'G-JF67EYDYRX',
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});





