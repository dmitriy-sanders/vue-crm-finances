<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>{{ 'PlanningTitle' | localizeFilter }}</h3>
        <h4>{{ this.info.bill | currencyFilter('UAH') }}</h4>
      </div>

      <Loader v-if="loading"/>

      <p v-else-if="!categories.length">Категорий нет - <router-link to="/categories">создайте</router-link></p>

      <section v-else>
        <div v-for="cat of categories" :key="cat.id">
          <p>
            <strong>{{ cat.title }}:</strong>
            {{ cat.spent | currencyFilter('UAH') }} из {{ cat.limit | currencyFilter('UAH') }}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
              class="determinate"
              :class="cat.progressColor"
              :style="{ 'width': cat.progressPercent + '%' }"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader';
import { mapGetters } from 'vuex';
import currencyFilter from '../filters/currencyFilter';

export default {
  name: 'Planning',
  components: {
    Loader
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

    this.categories = categories.map(cat => {
      const spent = records
        .filter(rec => rec.categoryId === cat.id)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)
      const percent = 100 * spent / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60 ? 'green' : (percent < 100 ? 'yellow' : 'red')

      const tooltipValue = cat.limit - spent
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Доступно'}
              ${currencyFilter(Math.abs(tooltipValue), 'UAH')}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip
      }
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  metaInfo() {
    return {
      title: this.$title('PlanningTitle')
    }
  }
};
</script>

<style scoped>

</style>
