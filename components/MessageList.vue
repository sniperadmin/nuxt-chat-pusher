<template>
  <b-card border-variant="light" class="message-list shadow-sm">
    <h4>Messages</h4>
    <hr>
    <div id="chat-messages" v-chat-scroll="{smooth: true}" class="message-group">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="clearfix">
          <h4 class="message-title">
            {{ message.name }}
          </h4>
          <small class="text-muted float-right">@{{ message.username }}</small>
        </div>
        <p class="message-text">
          {{ message.text }}
        </p>
        <div class="clearfix">
          <small class="text-muted float-right">{{ message.date }}</small>
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
  height: 45vh !important;
  overflow-y: scroll;
}
.message {
  border: 1px solid lightblue;
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
