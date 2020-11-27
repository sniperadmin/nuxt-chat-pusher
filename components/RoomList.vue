<template>
  <b-card border-variant="light" class="h-100 shadow-sm">
    <div class="room-list mb-3">
      <b-card class="flex-column" border-variant="light">
        <div class="px-4 d-none d-md-block">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <input type="text" class="form-control my-3" placeholder="Search...">
            </div>
          </div>
        </div>
      </b-card>

      <h4>Channels</h4>
      <hr>
      <b-list-group v-if="activeRoom" v-chat-scroll="{smooth: true}" style="max-height: 350px; overflow-y: scroll;">
        <b-list-group-item
          v-for="room in rooms"
          :key="room.name"
          :active="activeRoom.id === room.id"
          href="#"
          @click="onChange(room)"
        >
          # {{ room.name }}
        </b-list-group-item>
      </b-list-group>
    </div>

    <div class="user-list">
      <h4>Members</h4>
      <hr>
      <b-list-group v-chat-scroll="{smooth: true}" style="max-height: 350px; overflow-y: scroll;">
        <b-list-group-item v-for="user in users" :key="user.username" class="p-1">
          <div>
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
            <b>
              {{ user.name }}
            </b>
            <b-badge
              variant="success"
              pill
            >
              2
            </b-badge>
          </div>
          <b-badge
            v-if="user.presence"
            :variant="statusColor(user.presence)"
            pill
          >
            {{ user.presence }}
          </b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'RoomList',
  computed: {
    ...mapState([
      'rooms',
      'activeRoom',
      'loading',
      'users'
    ])
  },
  methods: {
    statusColor (status) {
      return status === 'online' ? 'success' : 'warning'
    },
    onChange (room) {

    }
  }
}
</script>
