<template>
  <div class="app-page">

    <div>
      <div class="page-title">
        <h3>{{ 'BillTitle' | localizeFilter }}: {{ money | currencyFilter}}</h3>

        <button
          class="btn waves-effect waves-light btn-small"
          @click="refresh"
        >
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Loader v-if="loading"/>

      <div v-else class="row">
        <HomeBill :currencies="currencies"/>
        <HomeCurrency :currencies="currencies"/>
      </div>
    </div>

  </div>
</template>

<script>
import HomeBill from '../components/HomeBill';
import HomeCurrency from '../components/HomeCurrency';
import Loader from '../components/app/Loader';

export default {
  name: 'Home',
  components: {
    HomeBill,
    HomeCurrency,
    Loader
  },
  data: () => ({
    loading: true,
    currencies: null
  }),
  async mounted() {
    this.currencies = await this.$store.dispatch('fetchCurrency');
    this.currencies = this.currencies.map( curr => {
      if (curr.ccy !== 'BTC') {
        return {
          symbol: curr.ccy === 'RUR' ? 'RUB' : curr.ccy, baseCurr: curr.base_ccy , valueBuy: +curr.buy, valueSale: +curr.sale
        }
      }
    }).filter( item => item !== undefined);
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currencies = await this.$store.dispatch('fetchCurrency');
      this.currencies = this.currencies.map( curr => {
        if (curr.ccy !== 'BTC') {
          return {
            symbol: curr.ccy === 'RUR' ? 'RUB' : curr.ccy, baseCurr: curr.base_ccy , valueBuy: +curr.buy, valueSale: +curr.sale
          }
        }
      }).filter( item => item !== undefined);
      this.loading = false;
    }
  },
  computed: {
    money() {
      return this.$store.getters.info.bill;
    }
  },
  metaInfo() {
    return {
      title: this.$title('BillTitle')
    }
  }
};
</script>

<style scoped>

</style>
