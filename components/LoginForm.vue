<template>
  <div class="login-form">
    <h5 class="text-center">
      Chat Login
    </h5>
    <hr>
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="hasError">
        {{ error }}
      </b-alert>

      <b-form-group
        id="userInputGroup"
        label-for="userInput"
      >
        <!-- <b-form-input
          id="userInput"
          v-model="userId"
          type="text"
          placeholder="Enter user name"
          autocomplete="off"
          required
          disabled
        /> -->
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="ld-ext-right"
        :class="{ running: loading }"
      >
        Login <div class="ld ld-ring ld-spin" />
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'LoginForm',
  data () {
    return {
      userId: ''
    }
  },
  computed: {
    isValid () {
      const result = this.userId.length < 3
      return result || this.loading
    },
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters([
      'hasError'
    ])
  },
  methods: {
    async onSubmit () {
      const res = await this.$store.dispatch('login')
      if (res) {
        this.$router.push('/')
      }
    }
  }
}
</script>
