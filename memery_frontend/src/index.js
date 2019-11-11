document.addEventListener('DOMContentLoaded', () => {
    
    let gamesURL = "http://localhost:3000/games"
    let usersURL = "http://localhost:3000/users"
    let tilesURL = "http://localhost:3000/tiles"
    const signinForm = document.getElementsByClassName("signin-form")[0]
    const signupForm = document.getElementsByClassName("signup-form")[0]

    signinForm.addEventListener("submit", signinHandler)
    signupForm.addEventListener("submit", signupHandler)
    // console.log(form)

    function signinHandler(event){
      event.preventDefault()
      const userName = event.target[0].value
      //fetch user
      fetch(usersURL)
      .then(resp => resp.json())
      .then(data => {
        data.forEach(function(element){
          if (element.name === userName){
            console.log(element.name)
            // signinForm.style.display = "none"
            // appendUser()
          } else {
            alert("please create an account")
          }
        })
      })
    }

    function signupHandler(event){
      event.preventDefault()
      let newUser = event.target[0].value
      console.log(newUser)
      // fetch(usersURL, {
      //   method: "POST",
      //   headers:{
      //     "Content-Type": "application/json",
      //     Accept: "application/json"
      //   },
      //   body: JSON.stringify({name: newUser})
      // })

      const mainBody = {name: newUser
        //information to send to the server
      };
      const content = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(mainBody)
      };
      fetch(usersURL, content)
    }

  })//end of DOM Loading