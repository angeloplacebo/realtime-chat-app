const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const name = prompt('What is your name?')
appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message',data =>{
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected',name =>{
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected',name =>{
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e =>{
  e.preventDefault()
  const message = messageInput.value
  if (message) {
    socket.emit('send-chat-message', message)
    appendSendedMessage(message)
    messageInput.value =''
  }
})


function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.classList.add('received')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  messageContainer.scrollTop = messageContainer.scrollHeight
}

function appendSendedMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.classList.add('sended')
  messageElement.innerText = message
  messageContainer.append(messageElement)
  messageContainer.scrollTop = messageContainer.scrollHeight
}