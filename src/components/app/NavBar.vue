<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')" class="waves-effect">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ time | dateFilter('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>{{ 'ProfileTitle' | localizeFilter }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click="logout">
                <i class="material-icons">assignment_return</i>{{ 'LogOutTitle' | localizeFilter}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    time: new Date(),
    interval: null,
    dropDown: null,
  }),
  mounted() {
    this.interval = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.dropDown = M.Dropdown.init(this.$refs.dropdown, {
      alignment: 'right',
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropDown && this.dropDown.destroy) {
      this.dropDown.destroy();
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    },
  }
};
</script>

<style scoped>
.waves-effect {
  padding: 0 20px;
  border-radius: 50%;
}
</style>
