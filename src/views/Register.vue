<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          v-model.trim="email"
          :class="{ 'invalid' : ($v.email.$dirty && !$v.email.required) ||
                                  ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required">
          Поле E-mail не должно быть пустым
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email">
          Введеный E-mail не корректный
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{ 'invalid' : ($v.password.$dirty && !$v.password.required) ||
                                  ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required">
          Поле Password не должно быть пустым
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength">
          Введеный Password не должен быть менее
          {{ this.$v.password.$params.minLength.min }} символов
        </small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{ 'invalid' : ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required">
          Поле Name не должно быть пустым
        </small>
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            v-model="rules"
            :checked="rules"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
      <small
        class="helper-text invalid"
        v-if="this.rules === false && $v.rules.$dirty">
        Прочтите и согласитесь с правилами
      </small>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else if (this.rules === true){
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };
        try {
          await this.$store.dispatch('register', formData);
          this.$router.push('/');
        }catch (e) {}
      }
    },
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    rules: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required },
    rules: { required },
  },
  metaInfo() {
    return {
      title: this.$title('RegisterTitle')
    }
  }
};
</script>

<style>
.toast-error {
  color: red;
}
</style>
