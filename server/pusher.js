const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Pusher = require('pusher')

const pusher = new Pusher({
  appId: '1113752',
  key: '4500eeb8bc222910669f',
  secret: '456e9f98479274602b36',
  cluster: 'eu',
  useTLS: true
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.post('/pusher/auth', function (req, res) {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const auth = pusher.authenticate(socketId, channel)
  res.send(auth)
})

pusher.trigger('test', 'my-event', {
  message: 'hello world'
})

const port = process.env.PORT || 5000
app.listen(port)
