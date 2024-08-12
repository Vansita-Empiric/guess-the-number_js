let randomNumber = Math.round(Math.random()*100 + 1)

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numOfGuess = 1
let playGame = true

if(playGame) {
  submit.addEventListener('click', (event) => {
    event.preventDefault()
    const guess = parseInt(userInput.value)
    //console.log(guess)
    validateGuess(guess)
  })
}

function validateGuess(guess) {
  if(isNaN(guess)) {
    alert("Please enter a valid number")
  } else if(guess < 1) {
    alert("Please enter a valid number")
  } else if(guess > 100) {
    alert("Please enter a valid number")
  } else {
    prevGuess.push(guess)
    if(numOfGuess === 10) {
      displayGuess(guess)
      displayMsg(`Game Over`)
      endGame()
    } else {
      displayGuess(guess)
      checkGuess(guess)
    }
  }
}

function checkGuess(guess) {
  if(guess === randomNumber) {
    displayMsg('correct')
    endGame()
  } else if(guess < randomNumber) {
    displayMsg(`Number is low`)
  } else if(guess > randomNumber) {
    displayMsg(`Number is high`)
  }
}

function displayMsg(msg) {
  lowOrHi.innerHTML = `<h2>${msg}</h2>`
}

function displayGuess(guess) {
  userInput.value = ''
  guessSlot.innerHTML += `${guess},` 
  numOfGuess++
  remaining.innerHTML = `${11 - numOfGuess}`
}

function newgame() {
  const newGameButton =document.querySelector('#newGame')
  newGameButton.addEventListener('click', (event) => {
    randomNumber = Math.round(Math.random()*100 + 1)
    prevGuess = []
    numOfGuess = 1
    guessSlot.innerHTML = ''
    remaining.innerHTML = `${11 - numOfGuess}`
    userInput.removeAttribute('disabled')
    startOver.removeChild(p)
    playGame = true
  })
}

function endGame() {
  userInput.value = ''
  userInput.setAttribute("disabled","")
  p.classList.add('button')
  p.innerHTML = `<h2 id="newGame">Start new game</h2>`
  startOver.appendChild(p)
  playGame = false
  newgame()
}