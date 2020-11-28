<template>
  <div class="message-form ld-over">
    <small class="text-muted">@{{ user.username }}</small>
    <b-form class="ld-over" :class="{ running: sending }" @submit.prevent="onSubmit">
      <div class="ld ld-ring ld-spin" />
      <!-- <b-alert variant="danger" :show="hasError">
        {{ error }}
      </b-alert> -->
      <b-row>
        <b-col cols="12">
          <b-input-group>
            <b-form-textarea
              id="message-input"
              v-model="message"
              type="text"
              placeholder="Enter Message"
              autocomplete="off"
              required
            />
            <b-input-group-append>
              <b-button variant="outline-primary" @click="sendMsg">
                <b-icon icon="reply" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <!-- <b-col cols="2"> -->
        <!-- <b-button type="submit" variant="primary" class="float-right">
            Send
          </b-button> -->
        <!-- </b-col> -->
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MessageForm',
  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState([
      'user',
      'sending',
      'error',
      'activeRoom'
    ]),
    ...mapGetters([
      'hasError'
    ])
  },
  methods: {
    async sendMsg () {
      await this.$axios.post('http://localhost:5000/messages', { message: this.message })
        .then(d => console.log(d.data))
        .catch()
    }
  }
}
</script>
