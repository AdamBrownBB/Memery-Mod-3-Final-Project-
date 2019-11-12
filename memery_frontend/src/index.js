document.addEventListener('DOMContentLoaded', () => {
    
    let gamesURL = "http://localhost:3000/games"
    let usersURL = "http://localhost:3000/users"
    let tilesURL = "http://localhost:3000/tiles"
    const signinForm = document.getElementsByClassName("signin-form")[0]
    const signupForm = document.getElementsByClassName("signup-form")[0]
    let userContainer = document.getElementsByClassName("user-container")[0]

    signinForm.addEventListener("submit", signinHandler)
    signupForm.addEventListener("submit", signupHandler)
    // console.log(form)

    function signinHandler(event){
      event.preventDefault()
      const userName = event.target[0].value
      //fetch users
      fetch(usersURL)
      .then(resp => resp.json())
      .then(data => {
        let user 
        data.find(function(element){
          if (element.name === userName){
            user = element
          }
        })
        if (user){
          console.log(user)
          // signinForm.style.display = "none"
          appendUser(user)
        } else {
          alert("please sign up")
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
      .then(resp => resp.json())
      .then(data => {
        appendUser(data)
      })
    }

    function appendUser(element){
      userContainer.style.display = "block"
      let userH3 = document.getElementById("user-name")
      userH3.innerText = `Welcome, ${element.name}`
      let levelH4 = document.getElementById("level")
      let userID = element.id
      let currentLevel = element.games[0].level
      let currentScore = element.games[0].score
      console.log(currentLevel)

      // fetch(gamesURL)
      // .then(resp => resp.json())
      // .then(data => {
      //   data.forEach(function(element){
      //     if (element.user.id === userID){
      //       currentLevel = element.level
      //       currentScore = element.score
      //     }
      //   })
      // })

      levelH4.innerText = `You are on level: ${currentLevel}`
      let scoreH4 = document.getElementById("score")
      scoreH4.innerText = `Your score is: ${currentScore}`
      
    }

  })//end of DOM Loading