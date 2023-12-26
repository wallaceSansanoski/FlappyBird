const containerGame = document.querySelector('[data-js="containerGame"]')
const containerBarriers = document.querySelector('[data-js="containerBarriers"]')
const scoreDisplay = document.querySelector('[data-js="score"]')

let score = 0
let stopGame = false

const createElement = (element, nameClass) => {
    const el = document.createElement(element)
    el.setAttribute("class", nameClass)
    return el
}

function CreateBarrier() {

    const normalBarrier = createElement('div', 'normalBarrier')
    const reverseBarrier = createElement('div', 'reverseBarrier')

    return { normalBarrier, reverseBarrier }
}


function createParesBarrier() {

    const heightOfBarrier = Math.trunc(Math.random() * 350)
    const setHeightReverseBarrier = (500 - heightOfBarrier) - 100

    const paresBarries = createElement('div', 'paresBarries')
    const border = createElement('div', 'border')
    const border1 = createElement('div', 'border1')

    const { normalBarrier } = CreateBarrier()
    const { reverseBarrier } = CreateBarrier()

    reverseBarrier.appendChild(border)
    normalBarrier.appendChild(border1)

    normalBarrier.style.height = `${setHeightReverseBarrier > 370 ? heightOfBarrier + 100 : heightOfBarrier}px`
    reverseBarrier.style.height = `${setHeightReverseBarrier > 370 ? setHeightReverseBarrier - 100 : setHeightReverseBarrier}px`

    paresBarries.appendChild(normalBarrier)
    paresBarries.appendChild(reverseBarrier)

    return paresBarries
}

const allBarries = [createParesBarrier(), createParesBarrier(), createParesBarrier(), createParesBarrier()]
const distanceBetweenBarriers = [700, 970, 1250, 1500]

const isnertBarriers = () => {
    allBarries.forEach(barrier => {
        containerBarriers.appendChild(barrier)
    })
}

const insertBird = () => {
    const img = createElement('img', 'imageBird')
    img.setAttribute('data-js', 'bird')
    img.style.bottom = `${300}px`
    img.src = './flaap.png'
    containerGame.append(img)
}

const createScore = () => {
    const displayScore = createElement('p', 'score')

    displayScore.setAttribute('data-js', 'score')
    displayScore.textContent = 0
    containerGame.insertAdjacentElement('afterBegin', displayScore)

    return displayScore
}

isnertBarriers()
insertBird()

const displayScore = createScore()

const bird = document.querySelector('[data-js="bird"]')

const isColision = (barrierLeft, heightBirdFromZero, heightBarrierBottom) => {

    const birdHitTheTopBarrier = barrierLeft <= 400 && barrierLeft >= 280 && heightBirdFromZero >= (heightBarrierBottom + 48)
    const birdHitTheBottomBarrier = barrierLeft <= 400 && barrierLeft >= 280 && heightBirdFromZero <= heightBarrierBottom

    if (birdHitTheTopBarrier) {
        clearInterval(stopIntervalID)
        stopGame = true
        return
    }

    if (birdHitTheBottomBarrier) {
        clearInterval(stopIntervalID)
        stopGame = true
        return
    }
}

const animation = () => {

    Array.from(containerBarriers.children).forEach((barrier, index) => {

        const heightBirdFromZero = Number(bird.style.bottom.split("px")[0])
        const heightBarrierBottom = Number(Array.from(barrier.children)[1].style.height.split("px")[0])
        const barrierLeft = Number(barrier.style.left.split("px")[0])
        const isBarrierInTheEndOfScreen = distanceBetweenBarriers[index] < -70

        isColision(barrierLeft, heightBirdFromZero, heightBarrierBottom)

        barrier.style.left = `${distanceBetweenBarriers[index]}px`

        distanceBetweenBarriers[index]--

        if (isBarrierInTheEndOfScreen) {
            distanceBetweenBarriers[index] = 1010

            const heightOfBarrier = Math.trunc(Math.random() * 350)
            const setHeightReverseBarrier = (500 - heightOfBarrier) - 100

            barrier.children[0].style.height = `${setHeightReverseBarrier > 370 ? heightOfBarrier + 100 : heightOfBarrier}px`
            barrier.children[1].style.height = `${setHeightReverseBarrier > 370 ? setHeightReverseBarrier - 100 : setHeightReverseBarrier}px`
        }
    })
}


const countScore = () => {
    allBarries.forEach(barrier => {
        const birdPassBetweenBarrier = Number(barrier.style.left.split("px")[0]) === 300
        if (birdPassBetweenBarrier) {
            score += 100
        }
    })

    displayScore.textContent = score
}

containerGame.addEventListener("keydown", e => {

    const heightOfBird = Number(bird.style.bottom.split('p')[0])

    if (!stopGame) {
        bird.style.bottom = heightOfBird + 30 + 'px'
    }
})


const stopIntervalID = setInterval(() => {

    const heightOfBird = Number(bird.style.bottom.split("px")[0])
    const heightBirdLessThanZero = heightOfBird <= 0
    const heightBirdMoreThan450 = heightOfBird >= 450

    bird.style.bottom = heightOfBird - 2 + 'px'

    if (heightBirdLessThanZero) {
        bird.style.bottom = `${0}px`
    }

    if (heightBirdMoreThan450) {
        bird.style.bottom = `${450}px`
    }
    countScore()
    animation()
}, 20)