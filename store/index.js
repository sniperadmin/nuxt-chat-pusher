import Pusher from 'pusher-js'

const pusher = new Pusher('4500eeb8bc222910669f', {
  cluster: 'eu',
  authEndpoint: 'http://localhost:5000/pusher/auth'
})

export const state = () => ({
  loading: false,
  sending: false,
  error: 'Test Error',
  user: {},
  reconnect: false,
  activeRoom: { id: '123' },
  rooms: [
    {
      id: '123',
      name: 'Ships',
      max_users: 2
    },
    {
      id: '124',
      name: 'Treasure',
      max_users: 2
    }
  ],
  users: [
    {
      username: 'Jack',
      name: 'Jack Sparrow',
      presence: 'online'
    },
    {
      username: 'Barbossa',
      name: 'Hector Barbossa',
      presence: 'offline'
    },
    {
      username: 'Jack',
      name: 'Jack Sparrow',
      presence: 'online'
    },
    {
      username: 'Barbossa',
      name: 'Hector Barbossa',
      presence: 'offline'
    },
    {
      username: 'Jack',
      name: 'Jack Sparrow',
      presence: 'online'
    },
    {
      username: 'Barbossa',
      name: 'Hector Barbossa',
      presence: 'offline'
    },
    {
      username: 'Jack',
      name: 'Jack Sparrow',
      presence: 'online'
    },
    {
      username: 'Barbossa',
      name: 'Hector Barbossa',
      presence: 'offline'
    },
    {
      username: 'Jack',
      name: 'Jack Sparrow',
      presence: 'online'
    },
    {
      username: 'Barbossa',
      name: 'Hector Barbossa',
      presence: 'offline'
    }
  ],
  messages: [
    {
      username: 'Jack',
      avatar: 'ss',
      date: '11/12/1644',
      text: 'Not all treasure is silver and gold mate'
    },
    {
      username: 'Jack',
      avatar: 'ss',
      date: '12/12/1644',
      text: 'If you were waiting for the opportune moment, that was it'
    },
    {
      username: 'Jack',
      avatar: 'ss',
      date: '12/12/1644',
      text: 'If you were waiting for the opportune moment, that was it'
    },
    {
      username: 'Jack',
      avatar: 'ss',
      date: '12/12/1644',
      text: 'If you were waiting for the opportune moment, that was it'
    },
    {
      username: 'Jack',
      avatar: 'ss',
      date: '12/12/1644',
      text: 'If you were waiting for the opportune moment, that was it'
    },
    {
      username: 'Jack',
      avatar: 'ss',
      date: '12/12/1644',
      text: 'If you were waiting for the opportune moment, that was it'
    },
    {
      username: 'Hector',
      avatar: 'ss',
      date: '12/12/1644',
      text: 'You know Jack, I thought I had you figured out'
    }
  ],
  userTyping: null
})

export const getters = {
  hasError: state => !!state.error
}

export const mutations = {
  SET_ERROR (state, error) {
    state.error = error
  },
  SET_LOADING (state, loading) {
    state.loading = loading
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_RECONNECT (state, reconnect) {
    state.reconnect = reconnect
  },
  SET_ACTIVE_ROOM (state, activeRoom) {
    state.activeRoom = activeRoom
  },
  SET_ROOMS (state, rooms) {
    state.rooms = rooms
  },
  SET_ALL_USERS (state, users) {
    state.users = users
  },
  CLEAR_CHAT_ROOM (state) {
    state.users = []
    state.messages = []
  },
  SET_MESSAGES (state, messages) {
    state.messages = messages
  },
  ADD_MESSAGE (state, message) {
    state.messages.push(message)
  },
  SET_SENDING (state, status) {
    state.sending = status
  },
  SET_USER_TYPING (state, userId) {
    state.userTyping = userId
  },
  RESET (state) {
    state.error = null
    state.users = []
    state.messages = []
    state.rooms = []
    state.user = null
  }
}

// helpers
function handleError (commit, error) {
  const message = error.message || error.info.error_description
  commit('SET_ERROR', message)
}

export const actions = {
  async login ({ commit, state }) {
    try {
      commit('SET_ERROR', '')
      commit('SET_LOADING', true)

      const getTicket = await pusher.subscribe('private-test')
      const obj = {
        socket_id: getTicket.pusher.connection.connection.id,
        channel_name: getTicket.name
      }

      const getAuth = await this.$axios.post('http://localhost:5000/pusher/auth', obj)

      commit('SET_USER', { auth: getAuth.data.auth })
      commit('SET_RECONNECT', false)
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  subscribeRoom ({ commit }, roomId) {
    commit('CLEAR_CHAT_ROOM')
    // const roomConnect = await pusher.subscribe(roomId)
  }
}
