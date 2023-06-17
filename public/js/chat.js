const socket = io();

// elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

// template
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (msg) => {
    console.log(msg)

    const html = Mustache.render(messageTemplate, {
        message: msg.text,
        sentAt: moment(msg.sentAt).format('HH:MM A')
    })
    $messages.insertAdjacentHTML('beforeend', html);
})

$messageForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled') // disabling until the message is sent
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled') // re-enabling the button after the message is sent 
        $messageFormInput.value = "" // Assigns an empty string as the value of the message box element
        $messageFormInput.focus() // To position the cursor in the message box
        if(error){
            return console.log(error)
        }

        console.log('Message Delivered')
    })
})