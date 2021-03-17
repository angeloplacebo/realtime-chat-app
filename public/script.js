const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const name = prompt('What is your name?')
// appendNotes('You Joined')
socket.emit('new-user', name)

socket.on('previous-messages', messages =>{
  for(message of messages){
    appendMessage(message)
  }
  appendNotes('You Joined')
})

socket.on('chat-message',data =>{
  appendMessage(data)
})

socket.on('user-connected',name =>{
  appendNotes(`${name} connected`)
})

socket.on('user-disconnected',name =>{
  appendNotes(`${name} disconnected`)
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


function appendNotes(note) {
  const messageElement = document.createElement('div')
  messageElement.classList.add('received','note')
  messageElement.innerText = note
  messageContainer.append(messageElement)
  messageContainer.scrollTop = messageContainer.scrollHeight
}

function appendMessage(data) {
  let { author, message } = data
  const messageElement = document.createElement('div')
  messageElement.classList.add('received')
  messageElement.innerHTML = `<strong>${author}:</strong> ${message}`
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