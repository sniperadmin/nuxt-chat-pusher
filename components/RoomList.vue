<template>
  <b-card border-variant="light" class="h-100 shadow-sm">
    <div class="room-list">
      <b-card class="flex-column" border-variant="light">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <b-avatar
                badge
                badge-variant="warning"
                button
                variant="primary"
                text="FF"
              />
            </template>
            <b-dropdown-item disabled>
              set Invisible
            </b-dropdown-item>
          </b-dropdown>
          Some name

          <b-dropdown variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <b-icon icon="three-dots-vertical" />
            </template>
            <b-dropdown-item disabled>
              exit
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-card>
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
