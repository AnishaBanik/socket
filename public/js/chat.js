const socket = io();


socket.on('message', (msg) => {
    console.log(msg)
})

document.querySelector('#send').addEventListener('click', (e) =>{
    const message = e.target.message.value

    socket.emit('message', message)
})