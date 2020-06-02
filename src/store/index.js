import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import info from './info';
import currency from './currency';
import category from './category';
import record from './record';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {

  },
  modules: {
    auth,
    info,
    currency,
    category,
    record,
  },
});
