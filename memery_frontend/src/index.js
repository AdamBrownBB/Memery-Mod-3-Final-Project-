document.addEventListener('DOMContentLoaded', () => {
    
    let gamesURL = "http://localhost:3000/games" 
    let usersURL = "http://localhost:3000/users"
    let signinForm = document.getElementsByClassName("signin-form")[0]
    const signupForm = document.getElementsByClassName("signup-form")[0]
    const signinContainer = document.getElementsByClassName("signin-container")[0]
    signinContainer.hidden = false
    let userContainer = document.getElementsByClassName("user-container")[0]
    let startButton = document.getElementById("start")
    let logoutButton = document.getElementById("logout")
    let gameContainer = document.querySelector("div[data-name=memory-game]")
    let userH3 = document.getElementById("user-name")
    let levelH4 = document.getElementById("level")
    let scoreH4 = document.getElementById("score")
    let winMessageDiv = document.getElementsByClassName("win-message")[0]
    let firstCard
    let secondCard
    let matchCounter=0
    let currentLevel
    let cards = []
    let currentScore = 0
    let highestScore



    signinForm.addEventListener("submit", signinHandler)
    signupForm.addEventListener("submit", signupHandler)
    logoutButton.addEventListener("click", logoutHandler)

    function signinHandler(event){ // can you use async await in the browser?
      event.preventDefault()
      const userName = event.target[0].value
      //fetch users
      fetch(usersURL) // add error handling here, what if the user can't be fetched
      .then(resp => resp.json())
      .then(data => {
        console.log("data is: ", data) // I can create two brian users, also the api shouldn't return all the users here
        // the api should be able to GET a specific user
        let user 
        data.find(function(element){
          if (element.name === userName){ // what if we had 1 million users? the api call would probably only return 500 at a time, we'd have to 
          // iterate through paginated responses
            user = element
          }
        })
        if (user){
          renderUserInfo(user)
        } else {
          alert("please sign up")
          signinForm.style.display = "none"
          signupForm.style.display = "block"
          event.target.reset()
        }
      })
    }
    
    function signupHandler(event){
      event.preventDefault()
      let newUser = event.target[0].value
      fetch(usersURL, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({name: newUser})
      })
      .then(resp => resp.json())  // again error handling
      .then(data => {
        renderUserInfo(data)
      })
      
      event.target.reset()
    }

    function logoutHandler(){
      console.log("signout")
      signinContainer.hidden = false
      gameContainer.style.display = "none"
      userContainer.style.display = "none"
      startButton.style.display = "block"
    } 

    function renderUserInfo(element){
      signinContainer.hidden = true
      // signinForm.style.display = "none"
      // signupForm.style.display = "none"
      userContainer.style.display = "block"

      userH3.innerText = `Welcome, ${element.name}`
      userH3.dataset.id = element.id

      let highestLevel
      

      if (element.games.length == 0){
        highestLevel = 1
        highestScore = 0
      } 
      else {
        let sortLevel = element.games.sort(function(a, b){return a.level - b.level})
        highestLevel = sortLevel[sortLevel.length-1].level
        
        let scoreArray = []
        element.games.forEach(function(game){scoreArray.push(game.score)})
        highestScore = scoreArray.reduce((a,b) => a + b, 0)
      }

      
      levelH4.innerText = `You are on level: ${highestLevel}`
      levelH4.dataset.level = highestLevel
      currentLevel = parseInt(levelH4.dataset.level)

      scoreH4.innerText = `Your score is: ${highestScore}`
    }

    startButton.addEventListener("click", renderCards)

    function renderCards(){
      //render the tiles
      scoreH4.innerText = `Your score is: ${highestScore+currentScore}`
      startButton.style.display = "none"
      gameContainer.style.display = "grid"
      gameContainer.innerHTML = ""
      logoutButton.style.display = "block"
      switch (currentLevel) {
        case 1:
          gameContainer.className = "memory-level-one"
          break;
        case 2:
          gameContainer.className = "memory-level-two"
          break;
        case 3:
          gameContainer.className = "memory-level-three"
          break;
        case 4:
          gameContainer.className = "memory-level-four"
          break;
      }
      let numTiles = (currentLevel+2)**2 // ! hunh? what is '**'
      currentScore = numTiles*10

      // let winMessageDiv = document.createElement("div")  // ! remove commented out code
      // winMessageDiv.className = "win-message"

      let winMessage = document.createElement("h1")
      winMessageDiv.appendChild(winMessage)
      // userContainer.appendChild(winMessageDiv)
      winMessageDiv.hidden = true

      let i, j, k
      // let j
      // let k
      for (j=1; j<=2; j++){
        /**
         * ! consider dividing each of this loop blocks into aptly named helper methods
         * maybe it could just be one method? (not super hot on this its ok to repeat yourself 2-3 times)
         * after that you should get dry
         * maybe somethings like "  generateCard(tileImage)  "
         */
        for (i=0; i<((numTiles-currentLevel)/2); i++){
          let cardDiv = document.createElement("div")
          cardDiv.className = "memory-card"

          let front = document.createElement("img")
          front.src = tilesArray[i]
          front.className = "front-face"
          front.dataset.name = "front"

          let back = document.createElement("img")
          back.src = tileBack
          back.className = "back-face"

          cardDiv.addEventListener('click', flipCard)
          cardDiv.appendChild(front)
          cardDiv.appendChild(back)
          gameContainer.appendChild(cardDiv)
          cards.push(cardDiv)
        }}
      
      for (k=0; k<currentLevel; k++){
        let cardDiv = document.createElement("div")
          cardDiv.className = "memory-card"

          let front = document.createElement("img")
          front.src = tileBomb
          front.className = "front-face"
          front.dataset.name = "front"

          let back = document.createElement("img")
          back.src = tileBack
          back.className = "back-face"

          cardDiv.addEventListener('click', flipCard)
          cardDiv.appendChild(front)
          cardDiv.appendChild(back)
          gameContainer.appendChild(cardDiv)
          cards.push(cardDiv)
      }

      //shuffle cards
      (function shuffleCards() {
        
        cards.forEach(card => {
          let ramdomPos = Math.floor(Math.random() * cards.length);
          card.style.order = ramdomPos;
        });
        cards = []
      })()//end of shuffleCards

    }//end of render cards function


    
    function flipCard(event) {
      this.classList.toggle('flip');
      currentScore = currentScore - 5 //deducts 5 points per click

      if (!firstCard && !secondCard) {
        firstCard = event.target.parentNode.querySelector("img[data-name=front]")
        
        firstCard.parentNode.removeEventListener("click", flipCard)

        if (firstCard.src === tileBomb){
          firstCard=undefined
          lose()
        }
      } 
      else if (firstCard && !secondCard){
        secondCard = event.target.parentNode.querySelector("img[data-name=front]")
        secondCard.parentNode.removeEventListener("click", flipCard)
        
        if (firstCard.src===secondCard.src){
          //disable click handler
          firstCard.parentNode.removeEventListener("click", flipCard)
          firstCard.parentNode.dataset.match = true
          firstCard.dataset.name = "anything"
          secondCard.parentNode.removeEventListener("click", flipCard)
          secondCard.parentNode.dataset.match = true
          secondCard.dataset.name = "anything"

          //reset both cards
          firstCard = undefined
          secondCard = undefined
          matchCounter++

          if (matchCounter===(((parseInt(currentLevel)+2)**2-currentLevel)/2)){
            win()
          }
        } 
        else if (secondCard.src === tileBomb){
          firstCard=undefined
          secondCard=undefined
          lose()
        }
        else { // ! what does this else block do ? 
          let cardsArray = Array.from(gameContainer.children)

          cardsArray.forEach(function(element){
            if (!element.dataset.match){
              element.removeEventListener("click", flipCard)
            }
          })
          //sleep for 2 seconds
          setTimeout(() => {
            //unflip both cards
            firstCard.parentNode.classList.toggle('flip');
            secondCard.parentNode.classList.toggle('flip');
            //reset both cards
            firstCard = undefined
            secondCard = undefined
            cardsArray.forEach(function(element){
            if (!element.dataset.match){
              element.addEventListener("click", flipCard)
              }
            })
          }, 2000)
        }
      } 
    }//end of flip card fn

    function win(){
      //level counter++
      currentLevel = currentLevel + 1
      let userID = userH3.dataset.id
      let newGameObj = {
        level: currentLevel,
        score: currentScore,     //need to come up with scoring logic
        user_id: userID}

      //fetch POST to /games
      fetch(gamesURL, {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newGameObj)
      })

      //show a message after delay
      // setTimeout(() => { //! remove commented out code if not needed 
        startButton.style.display = "block"


        // let winMessageDiv = document.getElementsByClassName("win-message")[0]
        winMessageDiv.children[0].innerHTML = `YOU WON! <br> You scored ${currentScore} points!!! <br> Click Start Game button to go to the next level <br>`
        winMessageDiv.hidden = false
        // gameContainer.innerHTML = ""
        
      // }, 2000);

      //resets match counter to 0
      levelH4.innerText = `You are on level: ${currentLevel}`
      matchCounter = 0
    } //end of win function

    function lose() {
      //make the Start button show again
      //show a banner: you hit the bomb, to play again, press Start
      startButton.style.display = "block"


      gameContainer.innerHTML = ""

      let loseMessageDiv = document.createElement("div")
      loseMessageDiv.className = "lose-message"
      let loseMessage = document.createElement("h1")
      loseMessage.innerText = "YOU HIT THE BOMB! Game over, click Start Game button to try again"
      loseMessageDiv.appendChild(loseMessage)

      let bombGifDiv = document.createElement("div")
      bombGifDiv.className = "bomb-div"
      let bombImg = document.createElement("img")
      bombImg.src = tileBomb
      bombGifDiv.appendChild(bombImg)
      loseMessageDiv.appendChild(bombGifDiv)

      gameContainer.appendChild(loseMessageDiv)
      // gameContainer.appendChild(bombGifDiv)

      //resets match counter to 0
      matchCounter = 0
      currentScore = 0
    }//end of lose function

  })//end of DOM Loading