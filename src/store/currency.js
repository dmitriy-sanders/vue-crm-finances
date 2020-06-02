export default {
  actions: {
    async fetchCurrency() {
      const currency = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11');
      return await currency.json();
    }
  }
}
