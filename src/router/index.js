import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const Home = () => import('../views/Home.vue');
const Profile = () => import('../views/Profile.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const Categories = () => import('../views/Categories.vue');
const Record = () => import('../views/Record.vue');
const DetailRecord = () => import('../views/DetailRecord.vue');
const Planning = () => import('../views/Planning.vue');
const History = () => import('../views/History.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main', auth: true},
    component: Home,
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main', auth: true},
    component: Profile,
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty', auth: false},
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty', auth: false},
    component: Register,
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main', auth: true},
    component: Categories,
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main', auth: true},
    component: Record,
  },
  {
    path: '/detail-record/:id',
    name: 'DetailRecord',
    meta: { layout: 'main', auth: true},
    component: DetailRecord,
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main', auth: true},
    component: Planning,
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main', auth: true},
    component: History,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login?message=login');
  }else if((to.path === '/login' || to.path === '/register') && currentUser){
    next('/');
  }else{
    next();
  }
});

export default router;
