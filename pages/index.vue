<template>
  <div class="chat-dashboard">
    <ChatNavBar />
    <b-container fluid class="ld-over" :class="{ running: loading }">
      <div class="ld ld-ring ld-spin" />
      <b-row>
        <b-col cols="3">
          <RoomList />
        </b-col>

        <b-col tag="b-card" bg-variant="light" cols="9">
          <b-row>
            <b-col id="chat-content">
              <MessageList />
            </b-col>
          </b-row>

          <b-container>
            <b-row>
              <b-col tag="b-card">
                <MessageForm />
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  async asyncData ({ $pusher }) {
    const channel = await $pusher.subscribe('test')
    channel.bind('my-event', (data) => {
      console.log('aodifhoa', data)
    })
  },
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'loading'
    ])
  },
  methods: {}
}
</script>
<style>
.sending-box {
  background-color: #d4dbe9;
}
</style>
