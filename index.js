
// const gamePads = mainContent.getElementsByClassName("game__pad")
const divScore = document.querySelector("div.score")
const mainContent = document.querySelector("div.game")
const gamePads = Array.from(document.querySelectorAll("div"))
const counterStart = document.querySelector("div#counter-start")

let sequence = []
let animatingColors = false
let currentColorPosition = 0

mainContent.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }
    const idxClickedElement = gamePads.indexOf(ev.target)
    if (idxClickedElement !== sequence[currentColorPosition]) {
        alert("perdeu playboy!")''
        inicio()
        return
    }
    currentColorPosition++
    ev.target.classList.add("active")

    if (currentColorPosition >= sequence.length) {
        currentColorPosition = 0

        setTimeout(() => turno(), 1000 * 2)
    }
})

gamePads.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("active")
    })
})

function playAnimationColors() {
    sequence.forEach((current, index) => {
        setTimeout(() => {
            gamePads[current].classList.add("active")
            animatingColors = index < sequence.length - 1
        }, 1000 * index)
    })
}

function inicio() {
    let counter = 4
    sequence = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        counterStart.innerHTML = "O jogo inicia em <br>" + (--counter) + "..."
        if (counter <= 0) {
            clearInterval(idx)
            counterStart.innerHTML = "O jogo inicia em <br>" + (counter) + ""
            turno()
        }
    }, 1000)

}



function turno() {
    divScore.innerHTML = sequence.length
    const randomNumber = Math.round(Math.random() * 3)
    sequence.push(randomNumber)
    playAnimationColors()
}