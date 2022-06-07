var playerSelect = document.querySelector('#playerList')

playerSelect.addEventListener('click', _ =>{
    var selectedPlayerName = document.querySelector("#playerList")[document.querySelector("#playerList").selectedIndex].innerHTML
    fetch(`https://git.heroku.com/tigers-api-100devs.git/api/${selectedPlayerName.toLowerCase()}`)
    .then(res => res.json())
    .then(data =>{
        data = JSON.parse(data)
        document.querySelector('#playerName').innerText = `Name: ${data["name"]}`
        document.querySelector('#playerAge').innerText = `Age: ${data["age"]}`
        document.querySelector('#playerPosition').innerText = `Position: ${data["position"]}`
        console.log(data)})
})
