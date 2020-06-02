<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'EditCategoryTitle' | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option v-for="category in categories" :key="category.id" :value="category.id"
                    >{{ category.title }}</option>
          </select>
          <label>{{ 'ChooseCategory' | localizeFilter }}</label>
        </div>

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
          {{ 'UpdateTitle' | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
    name: 'EditCategoryForm',
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    data: () => ({
      select: null,
      title: '',
      limit: '',
      current: null
    }),
    created() {
      const {id, title, limit} = this.categories[0];
      this.title = title;
      this.limit = limit;
      this.current = id;
    },
    mounted() {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    },
    destroyed() {
      if(this.select.destroy() && this.select) {
        this.select.destroy()
      }
    },
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
          const categoryData = {id: this.current, title: this.title, limit: this.limit};
          await this.$store.dispatch('updateCategory', categoryData);
          this.$message("Категория '"+ this.title +"' была обновлена");
          this.$emit('updated', categoryData);
        }catch (e) {}
      }
    },
    watch: {
      current(newState) {
        const {id, title, limit} = this.categories.find(category => category.id === newState);
        this.title = title;
        this.limit = limit;
      }
    },

};
</script>

<style scoped>

</style>
