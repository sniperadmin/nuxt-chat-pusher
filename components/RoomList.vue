<template>
  <b-card border-variant="light" class="h-100 shadow-sm">
    <div class="room-list">
      <h4>Channels</h4>
      <hr>
      <b-list-group v-if="activeRoom">
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
      <b-list-group>
        <b-list-group-item v-for="user in users" :key="user.username">
          {{ user.name }}
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
    }
  }
}
</script>
