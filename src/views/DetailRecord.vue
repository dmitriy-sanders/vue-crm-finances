<template>
  <div class="app-page">
    <Loader v-if="loading"/>

    <div v-else>
      <div>
        <div class="breadcrumb-wrap">
          <router-link to="/history" class="breadcrumb">История</router-link>
          <a class="breadcrumb">
            {{ (record.type === 'income' ? 'Income' : 'Outcome') | localizeFilter }}
          </a>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card" :class="{ red: record.type === 'outcome', green: record.type === 'income' }">
              <div class="card-content white-text">
                <p>Описание: {{ record.description }}</p>
                <p>Сумма: {{ record.amount | currencyFilter('UAH') }}</p>
                <p>Категория: {{ record.categoryName }}</p>

                <small>{{ record.date | dateFilter('date') }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailRecord',
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    try{
      const recId = this.$route.params.id;
      this.record = await this.$store.dispatch('fetchRecordById', recId);
      const categories = await this.$store.dispatch('fetchCategories');
      this.loading = false;

      this.record.categoryName = categories.find(category => category.id === this.record.categoryId).title;
    }catch (e) {}
  },
  metaInfo() {
    return {
      title: this.$title('DetailRecordTitle')
    }
  }
};
</script>

<style scoped>

</style>
