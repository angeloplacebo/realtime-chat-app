const express = require('express')
const path = require('path')

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))

app.engine('html', require('ejs').renderFile)

app.use('/', (req, res) => {
  res.render('index.html')
})

server.listen(3000)

const users = {}

io.on('connection', socket => {
  console.log('New User')
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]})
  })

  socket.on('disconnect', ()=>{
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })

})



