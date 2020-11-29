// import Pusher from 'pusher-js'

// const pusher = new Pusher('4500eeb8bc222910669f', {
//   cluster: 'eu',
//   authEndpoint: 'http://localhost:5000/pusher/auth'
// })

export const state = () => ({
  loading: false,
  sending: false,
  error: 'Test Error',
  user: {},
  reconnect: false,
  disconnect: false,
  activeRoom: null,
  rooms: [
    // {
    //   id: '123',
    //   name: 'Ships',
    //   max_users: 2
    // }
  ],
  users: [
    // {
    //   username: 'Jack',
    //   name: 'Jack Sparrow',
    //   presence: 'online'
    // },
    // {
    //   username: 'Barbossa',
    //   name: 'Hector Barbossa',
    //   presence: 'offline'
    // },
    // {
    //   username: 'Jack',
    //   name: 'Jack Sparrow',
    //   presence: 'online'
    // },
    // {
    //   username: 'Barbossa',
    //   name: 'Hector Barbossa',
    //   presence: 'offline'
    // },
    // {
    //   username: 'Jack',
    //   name: 'Jack Sparrow',
    //   presence: 'online'
    // },
    // {
    //   username: 'Barbossa',
    //   name: 'Hector Barbossa',
    //   presence: 'offline'
    // },
    // {
    //   username: 'Jack',
    //   name: 'Jack Sparrow',
    //   presence: 'online'
    // },
    // {
    //   username: 'Barbossa',
    //   name: 'Hector Barbossa',
    //   presence: 'offline'
    // },
    // {
    //   username: 'Jack',
    //   name: 'Jack Sparrow',
    //   presence: 'online'
    // },
    // {
    //   username: 'Barbossa',
    //   name: 'Hector Barbossa',
    //   presence: 'offline'
    // }
  ],
  messages: [
    // {
    //   username: 'Jack',
    //   avatar: 'ss',
    //   date: '11/12/1644',
    //   text: 'Not all treasure is silver and gold mate'
    // }
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
  SET_DISCONNECT (state) {
    state.disconnect = true
    state.error = null
    state.messages = []
    state.rooms = []
    state.user.presence = 'offline'
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
  ADD_USER (state, user) {
    state.users.push(user)
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
  async login ({ commit, state }, userId) {
    try {
      commit('SET_ERROR', '')
      commit('SET_LOADING', true)

      // console.log('store sais: ', this.$pusher)
      const channel = await this.$pusher.subscribe('test')
      channel.bind('my-event', (data) => {
        console.log('messages: ', data)
      })
      const obj = {
        socket_id: channel.pusher.connection.connection.id,
        channel_name: channel.name,
        presenseData: {
          user_id: userId,
          presence: 'online',
          user_info: {
            name: 'Mr Meow',
            twitter_id: '@pusher'
          }
        }
      }

      const getAuth = await this.$axios.post('http://localhost:5000/pusher/auth', obj)
      console.log(getAuth)

      const allChannels = await this.$pusher.allChannels()

      commit('SET_USER', { auth: getAuth.data.auth, ...obj.presenseData })
      commit('ADD_USER', { auth: getAuth.data.auth, ...obj.presenseData })
      commit('SET_ACTIVE_ROOM', { id: obj.channel_name })
      commit('SET_ROOMS', allChannels)
      commit('SET_RECONNECT', false)
      commit('')
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  // getAllChannels ({ commit }) {

  // },
  subscribeRoom ({ commit }, roomId) {
    commit('CLEAR_CHAT_ROOM')
    // const roomConnect = await pusher.subscribe(roomId)
  },
  async sendMessage ({ commit }, messagePayload) {
    try {
      const message = await this.$axios.post('http://localhost:5000/messages', { text: messagePayload })
      console.log('message', message)
      commit('ADD_MESSAGE', message.data)
    } catch (error) {
      console.log(error)
    }
  },
  disconnect ({ commit }) {
    commit('SET_DISCONNECT')
  }
}
