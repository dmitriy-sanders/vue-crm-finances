<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'AddCategoryTitle' | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ 'invalid': ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">{{ 'NameInput' | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ 'invalid': ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">{{ 'Limit' | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальная значение {{ this.$v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'AddTitle' | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
    name: 'AddCategoryForm',
    data: () => ({
      title: '',
      limit: 100
    }),
    validations: {
      title: { required },
      limit: { minValue: minValue(100) }
    },
    methods: {
      async onSubmit() {
        if(this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        try{
          const category = await this.$store.dispatch('createCategory', {
            title: this.title,
            limit: this.limit
          });
          this.$message("Была создана категория '"+ this.title +"'");
          this.title = '';
          this.limit = 100;
          this.$v.$reset();
          this.$emit('created', category);
        }catch (e) {}
      }
    },
    mounted() {
      M.updateTextFields();
    }
};
</script>

<style scoped>

</style>
