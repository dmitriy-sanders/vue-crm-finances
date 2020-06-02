<template>
  <div>
    <form class="card auth-card" @submit.prevent="onSubmit">
      <div class="card-content">
        <span class="card-title">Мои финансы</span>
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
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import messagesKeys from '../common/message.keys';
import login from '../store/index';

export default {
  name: 'Login',
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        const formData = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch('login', formData);
          this.$router.push('/');
        }catch (e) {}
      }
    },
  },
  mounted() {
    if (messagesKeys[this.$route.query.message]) {
      this.$message(messagesKeys[this.$route.query.message]);
    }
  },
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
  },
};
</script>

<style>
.toast-error {
  color: red;
}
</style>
