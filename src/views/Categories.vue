<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>{{ 'CategoryTitle' | localizeFilter }}</h3>
      </div>
      <section>
        <Loader v-if="loading"/>
        <div class="row" v-else>

          <AddCategoryForm @created="addNewCategory"/>

          <EditCategoryForm
            :categories="categories"
            :key="categories.length + updateCount"
            @updated="onUpdated"
            v-if="this.categories.length > 0"
          />
          <p v-else class="no-category">Категорий нет</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AddCategoryForm from '../components/AddCategoryForm';
import EditCategoryForm from '../components/EditCategoryForm';

export default {
  name: 'Categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    AddCategoryForm,
    EditCategoryForm
  },
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory);
    },
    onUpdated(category) {
      const idx = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount += 1;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  metaInfo() {
    return {
      title: this.$title('CategoriesTitle')
    }
  }
};
</script>

<style scoped>
.no-category {
  text-align: center;
}
</style>
