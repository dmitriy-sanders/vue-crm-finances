<template>
  <ul class="sidenav app-sidenav" :class="{ 'open': value }">
    <router-link
      v-for="link in links" :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      exact
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.name + 'Title' | localizeFilter }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'SideBar',
  props: ['value'],
  data: () => ({
    links: [
      { url: '/', name: 'Bill' },
      { url: '/history', name: 'History' },
      { url: '/planning', name: 'Planning' },
      { url: '/record', name: 'Record' },
      { url: '/categories', name: 'Categories' },
    ],
  }),
};
</script>

<style scoped>

</style>
