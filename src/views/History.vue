<template>
  <div>
    <Loader v-if="loading"/>

    <div class="app-page" v-else>
      <div>
        <div class="page-title">
          <h3>{{ 'HistoryTitle' | localizeFilter }}</h3>
        </div>

        <p class="center" v-if="!records.length">Записей нет. <router-link to="/record">Создать запись.</router-link></p>
        <section v-else>
          <table>
            <thead>
            <tr>
              <th>#</th>
              <th>{{ 'SumTitle' | localizeFilter }}</th>
              <th>{{ 'DateTitle' | localizeFilter }}</th>
              <th>{{ 'CategoryTitle' | localizeFilter }}</th>
              <th>{{ 'TypeTitle' | localizeFilter }}</th>
              <th>{{ 'OpenTitle' | localizeFilter }}</th>
            </tr>
            </thead>
            <paginate
              name="records"
              :list="records"
              :per="2"
              :tag="'tbody'"

            >
              <tr v-for="record in paginated('records')" :key="record.id">
                <td>{{ records.indexOf(record) + 1 }}</td>
                <td>{{ record.amount | currencyFilter('UAH') }}</td>
                <td>{{ record.date | dateFilter('datetime') }}</td>
                <td>{{ record.categoryName }}</td>
                <td>
                <span class="white-text badge"
                      :class="record.typeClass"
                >
                  {{ record.typeText }}
                </span>
                </td>
                <td>
                  <button class="btn-small btn" @click="$router.push('/detail-record/' + record.id)">
                    <i class="material-icons">open_in_new</i>
                  </button>
                </td>
              </tr>
            </paginate>
          </table>
        </section>
        <paginate-links :async="true"
                        for="records"
                        class="pagination"
                        :show-step-links="true"
                      :classes="{
                          'ul > li' :'waves-effect'
                      }">
        </paginate-links>

        <div class="history-chart">
          <PieChart :categories="categories" :records="records"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader';
import PieChart from '../components/PieChart';

export default{
  name: 'History',
  props: [''],
  components: {
    PieChart,
    Loader,
  },
  data: () => ({
    loading: true,
    records: [],
    number: 0,
    categories: [],
    paginate: ['records'],
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(category => category.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }
    });

    this.loading = false;
  },
  metaInfo() {
    return {
      title: this.$title('HistoryTitle')
    }
  }
};
</script>

<style scoped>
ul.paginate-links {
  text-align: center;
  cursor: pointer;
}
.history-chart {
  margin-top: 75px;
}
</style>
