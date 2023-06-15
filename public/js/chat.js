const socket = io();

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

socket.on('message', (msg) => {
    console.log(msg)
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