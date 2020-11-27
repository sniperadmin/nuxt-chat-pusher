<template>
  <b-card border-variant="light" class="message-list shadow-sm">
    <!-- <b-list-group-item> -->
    <div>
      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
      <b>
        Jack Sparrow
      </b>
    </div>

    <b-badge
      variant="success"
      pill
    >
      online!
    </b-badge>
    <!-- </b-list-group-item> -->
    <hr>
    <div id="chat-messages" v-chat-scroll="{smooth: true}" class="message-group">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="chat-message-right pb-4 d-flex">
          <div class="mr-2">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
            <div class="text-muted small text-nowrap mt-2">
              2:33 am
            </div>
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
            <div class="font-weight-bold mb-1">
              You
            </div>
            Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MessageList',
  computed: {
    ...mapState([
      'messages'
    ])
  }
}
</script>

<style>
.message-list {
  margin-bottom: 15px;
  padding-right: 15px;
}

.message-group {
  max-height: 430px !important;
  overflow-y: scroll;
}
.message {
  /* border: 1px solid lightblue; */
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}
.message-title {
  font-size: 1rem;
  display:inline;
}
.message-text {
  color: gray;
  margin-bottom: 0;
}
.user-typing {
  height: 1rem;
}
</style>
