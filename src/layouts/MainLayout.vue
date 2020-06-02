<template>
  <div>
    <Loader v-if="loading"/>

    <div class="app-main-layout">
      <NavBar @click="isOpen = !isOpen"/>
      <SideBar v-model="isOpen"/>
      <main class="app-content" :class="{ 'full' : !isOpen }">
        <router-view/>
      </main>

      <div class="fixed-action-btn">
        <router-link to="/record" class="btn-floating btn-large blue pulse" v-tooltip="'Создать запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import NavBar from '../components/app/NavBar.vue';
import SideBar from '../components/app/SideBar.vue';
import Loader from '../components/app/Loader';
import messages from '../common/message.keys';

export default {
  name: 'MainLayout',
  components: {
    NavBar,
    SideBar,
    Loader
  },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
      this.loading = false;
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(firebaseError){
      this.$error(messages[firebaseError.code] || 'Что-то пошло не так!');
    }
  }
};
</script>

<style scoped>

</style>
