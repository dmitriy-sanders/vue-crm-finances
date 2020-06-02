import firebase from 'firebase/app';

export default {
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try{
        const uid = await dispatch('getUserId');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();

        commit('setInfo', info);

      }catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateInfo({commit, dispatch, getters}, toUpdate) {
      try{
        const uid = await dispatch('getUserId');
        const updateData = {...getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);

        commit('setInfo', updateData);
      }catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  }
}
