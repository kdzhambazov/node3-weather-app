const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.querySelector('input')
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${input.value}`).then((response) => {
        response.json().then((data) => {           
            if(data.error) {
                messageOne.textContent = data.error 
            } else {
                const { location, forecast } = data
                messageOne.textContent = `Location: ${location}.`
                messageTwo.textContent = `Forecast: ${forecast}.`
            }
        })
    })
})