// const gamePads = game.getElementsByClassName("game__pad")
const game = document.querySelector("div.game")
const gamePads = Array.from(game.querySelectorAll("div"))
const divScore = document.querySelector("div.score")
const counterStart = document.querySelector("div#counter-start")

let sequence = []
let animatingColors = false
let currentColorPosition = 0

game.addEventListener("click", ev => {
    if (animatingColors) {
        counterStart.innerHTML = "Espere a animação terminar!"
        setTimeout(() => {
            counterStart.innerHTML = " "
        }, 3000)
        return
    }
    const idxClickedElement = gamePads.indexOf(ev.target)
    if (idxClickedElement !== sequence[currentColorPosition]) {
        counterStart.style.color = "red"
        counterStart.innerHTML = "Você perdeu!"
        setTimeout(() => {
            inicio()
            counterStart.style.color = "black"
        }, 2500);
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
            setTimeout(() => {
                counterStart.innerHTML = "JOGUE!"
                turno()
            }, 1000);
            setTimeout(() => {
                counterStart.innerHTML = " "
            }, 5000);
        }
    }, 1000)

    gamePads.forEach(div => {
        div.classList.add("touchable")
    })
}

function turno() {
    divScore.innerHTML = sequence.length
    const randomNumber = Math.round(Math.random() * 3)
    sequence.push(randomNumber)
    playAnimationColors()
}
