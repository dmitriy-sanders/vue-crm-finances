<template>
  <div class="app-page">

    <Loader v-if="loading"/>

    <div class="row" v-else>
      <div class="page-title">
        <h3>{{ 'ProfileTitle' | localizeFilter   }}</h3>
      </div>

      <form class="form" @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model="name"
            class="validate"
            :class="{ 'invalid' : ($v.name.$dirty && !$v.name.required)}"
          >
          <label for="description">{{ 'NameInput' | localizeFilter }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required">
            Это поле обязательное
          </small>
        </div>

        <div class="switch">
          <label>
            English
            <input type="checkbox" v-model="isRuLocale">
            <span class="lever"></span>
            Русский
          </label>
        </div>

        <div class="row">
          <button class="btn waves-effect waves-light s2" type="submit">
            {{ 'UpdateTitle' | localizeFilter }}
            <i class="material-icons right">send</i>
          </button>


        </div>
      </form>
      <button
        class="btn waves-effect waves-light red s2"
        data-target="modal1"
        @click="onDelete"
      >
        {{ 'DeleteTitle' | localizeFilter }}
        <i class="material-icons right">delete</i>
      </button>
      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import localizeFilter from '../filters/localizeFilter';

export default {
  name: 'Profile',
  data: () => ({
    name: '',
    loading: true,
    isRuLocale: true,
  }),
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try{
        const updateData = {name: this.name, locale: this.isRuLocale ? 'ru-RU' : 'en-US'}
        await this.$store.dispatch('updateInfo', updateData);
        this.$message('Профиль был обновлен!');
        this.$v.reset();
      }catch (e) {}
    },
    async onDelete() {
      alert(process.env.VUE_APP_NAME);
    }
  },
  async mounted() {
    this.isRuLocale = (this.info.locale === 'ru-RU');
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
    this.name = this.info.name;
    this.loading = false;
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters(['info'])
  },
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
