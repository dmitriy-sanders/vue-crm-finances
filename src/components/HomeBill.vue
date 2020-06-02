<template>
  <div class="col s12 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'BillInCurrencyTitle' | localizeFilter }}</span>

        <p class="currency-line" v-for="currency of currencies" :key="currency.symbol">
          <span>{{ getCurrency(currency) | currencyFilter(currency.symbol) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  props: ['currencies'],
  methods: {
    getCurrency(currency) {
      return  this.$store.getters.info.bill / currency.valueBuy;
    }
  }
};
</script>

<style scoped>

</style>
