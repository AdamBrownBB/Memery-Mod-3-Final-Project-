document.addEventListener('DOMContentLoaded', () => {
    
    let h1 = document.getElementsByTagName("h1")[0]
    let gamesURL = "http://localhost:3000/games"

    function testFetch(){
        fetch(gamesURL)
        .then(resp => resp.json())
        .then(data => {
            data.forEach(console.log)
        })
    }

    testFetch()

  })//end of DOM Loading