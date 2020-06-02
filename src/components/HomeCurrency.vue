<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'CurrencyCourseTitle' | localizeFilter }}</span>
        </div>
        <table>
          <thead>
          <tr class="headings">
            <th>{{ 'CurrencyTitle' | localizeFilter }}</th>
            <th>{{ 'BuyCurrency' | localizeFilter }}</th>
            <th>{{ 'SellCurrency' | localizeFilter }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="currency in currencies" :key="currency.index">
            <td>{{ currency.symbol }}</td>
            <td>{{ currency.valueBuy | currencyFilter }}</td>
            <td>{{ currency.valueSale | currencyFilter }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HomeCurrency',
    props: ['currencies'],
};
</script>

<style scoped>
tr > td, tr.headings > th {
  text-align: center !important;
}
</style>
