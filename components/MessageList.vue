<template>
  <b-card border-variant="light" class="message-list shadow-sm">
    <h4>Messages</h4>
    <hr>
    <div id="chat-messages" v-chat-scroll="{smooth: true}" class="message-group">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="clearfix">
          <div class="d-flex justify-content-start w-50">
            <!--
              Todo: after getting current user info and all messages
              set conditional rendering for each element like this
              example:
              v-if="message.user === user.id"
              for the b-avatar and the message date
            -->
            <b-avatar :text="message.avatar" class="mr-3" />
            <b-card bg-variant="primary" text-variant="white" class="rounded-lg mr-1">
              {{ message.text }}
            </b-card>
            <!-- <b-avatar v-if="message.user !== user.id" :text="message.avatar" class="mr-3" /> -->
            <div class="clearfix">
              <small class="text-muted float-right">{{ message.date }}</small>
            </div>
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
  height: 42vh !important;
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
