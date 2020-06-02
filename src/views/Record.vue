<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>{{ 'RecordTitle' | localizeFilter }}</h3>
      </div>

      <Loader v-if="loading"/>

      <p class="center" v-else-if="!this.categories.length">Категорий нет - <router-link to="/categories">создайте.</router-link></p>

      <form class="form" v-else @submit.prevent="onSubmit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{ category.title }}</option>
          </select>
          <label>{{ 'ChooseCategory' | localizeFilter }}</label>
        </div>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span>{{ 'Income' | localizeFilter }}</span>
          </label>
        </p>

        <p>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span>{{ 'Outcome' | localizeFilter }}</span>
          </label>
        </p>

        <div class="input-field">
          <input
            id="amount"
            type="number"
            v-model="amount"
            :class="{ 'invalid': ($v.amount.$dirty && !$v.amount.required)}"
          >
          <label for="amount">{{ 'SumTitle' | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.minValue"
          >Минимальное значение: {{ this.$v.amount.$params.minValue.min }}</span>
          <span
            class="helper-text invalid"
            v-else-if="$v.amount.$dirty && !$v.amount.required"
          >Это поле обязательное</span>
        </div>

        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model="description"
            :class="{ 'invalid': $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">{{ 'Description' | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.description.$dirty && !$v.description.required"
          >Это поле обязательное</span>
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
import Loader from '../components/app/Loader';
import { required, minValue } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'Record',
  components: {
    Loader
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    current: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;

     setTimeout(() => {
       M.updateTextFields();
       this.select = M.FormSelect.init(this.$refs.select);
    }, 0);

    if (this.categories.length) {
      this.current = this.categories[0].id;
    }
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try{
          const record = {
            categoryId: this.current,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: Date.now()
          };
          await this.$store.dispatch('createRecord', record);
          const newBill = this.type === 'income'
            ? this.info.bill + +this.amount
            : this.info.bill - +this.amount;

          await this.$store.dispatch('updateInfo', {bill: newBill});

          this.$message('Запись была создана!');
          this.amount = 1;
          this.description = '';
          this.$v.reset();

        }catch (e) {}
      } else {
        this.$error(`Недостаточно средств! ${(this.amount - this.info.bill)}`);
      }
    }
  },
  destroyed() {
    if(this.select.destroy() && this.select) {
      this.select.destroy();
    }
  },
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if(this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  metaInfo() {
    return {
      title: this.$title('RecordTitle')
    }
  }
};
</script>

<style scoped>

</style>
