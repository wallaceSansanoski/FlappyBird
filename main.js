const containerGame = document.querySelector('[data-js="containerGame"]')
const containerBarriers = document.querySelector('[data-js="containerBarriers"]')
const scoreDisplay = document.querySelector('[data-js="score"]')

let distance1 = 700
let distance2 = 970
let distance3 = 1250
let distance4 = 1500


let score = 0
let stopGame = false

const createElement = (element, nameClass) => {
    const el = document.createElement(element)
    el.setAttribute("class", nameClass)
    return el
}

function CreateBarrier(reverse = false) {

    const normalBarrier = createElement('div', 'normalBarrier')
    const reverseBarrier = createElement('div', 'reverseBarrier')


    return { normalBarrier, reverseBarrier }
}

function CreateParesBarrier() {
    const heightOfBarrier = Math.trunc(Math.random() * 400)

    const paresBarries = createElement('div', 'paresBarries')

    const barrier = CreateBarrier()
    const reverseBarrier = CreateBarrier()

    if ((500 - heightOfBarrier) - 150 < 0) {

        barrier.normalBarrier.style.height = `${heightOfBarrier - Math.abs((500 - heightOfBarrier) - 150)}px`
        reverseBarrier.reverseBarrier.style.height = `${Math.abs((500 - heightOfBarrier) - 150)}px`

        paresBarries.appendChild(barrier.normalBarrier)
        paresBarries.appendChild(reverseBarrier.reverseBarrier)

        return paresBarries
    }

    barrier.normalBarrier.style.height = `${heightOfBarrier}px`
    reverseBarrier.reverseBarrier.style.height = `${(500 - heightOfBarrier) - 150}px`

    paresBarries.appendChild(barrier.normalBarrier)
    paresBarries.appendChild(reverseBarrier.reverseBarrier)

    return paresBarries
}

const paresBarries1 = CreateParesBarrier()
const paresBarries2 = CreateParesBarrier()
const paresBarries3 = CreateParesBarrier()
const paresBarries4 = CreateParesBarrier()

const allBarries = [paresBarries1, paresBarries2, paresBarries3, paresBarries4]
const distanceBetweenBarriers = [distance1, distance2, distance3, distance4]

const isnertBarriers = () => {

    allBarries.forEach(barrier => {
        containerBarriers.appendChild(barrier)
    })
}

const insertBird = () => {
    const img = createElement('img', 'imageBird')
    img.setAttribute('data-js', 'bird')
    img.style.bottom = `${0}px`
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

const animation = () => {


    Array.from(containerBarriers.children).forEach((barrier, index) => {

        const heightBirdFromZero = Number(bird.style.bottom.split("px")[0])
        const heightBarrierTop = Number(Array.from(barrier.children)[0].style.height.split("px")[0])
        const heightBarrierBottom = Number(Array.from(barrier.children)[1].style.height.split("px")[0])
        const barrierLeft = Number(barrier.style.left.split("px")[0])

        if(barrierLeft <= 400 && barrierLeft >= 280 &&  heightBirdFromZero >= (heightBarrierBottom + 110) ) {
            clearInterval(stopIntervalID)
            stopGame = true
            return 
        }

        if(barrierLeft <= 400 && barrierLeft >= 280 && heightBirdFromZero <= heightBarrierBottom ) {
            clearInterval(stopIntervalID)
            stopGame = true
            return 
        }

        if (heightBirdFromZero <= heightBarrierBottom && barrierLeft === 400 || heightBirdFromZero >= (heightBarrierBottom + 150) && barrierLeft === 400) {
            clearInterval(stopIntervalID)
            stopGame = true
            return 
        }

        barrier.style.left = `${distanceBetweenBarriers[index]}px`

        distanceBetweenBarriers[index]--

        if (distanceBetweenBarriers[index] < -70) {
            distanceBetweenBarriers[index] = 1010

            const heightOfBarrier = Math.trunc(Math.random() * 400)

            barrier.children[0].style.height = `${heightOfBarrier}px`

            if ((500 - heightOfBarrier) - 150 < 0) {

                barrier.children[0].style.height = `${heightOfBarrier - Math.abs((500 - heightOfBarrier) - 150)}px`
                barrier.children[1].style.height = `${Math.abs((500 - heightOfBarrier) - 150)}px`
            }

            barrier.children[0].style.height = `${heightOfBarrier}px`
            barrier.children[1].style.height = `${Math.abs((500 - heightOfBarrier) - 150)}px`
        }
    })
}


const countScore = () => {
    allBarries.forEach((barrier, index) => {
        if (Number(barrier.style.left.split("px")[0]) === 330) {
            score += 100
        }
    })

    displayScore.textContent = score
}

containerGame.addEventListener("keydown", e => {

    if(!stopGame){
        bird.style.bottom = Number(bird.style.bottom.split('p')[0]) + 30 + 'px'
    }


})


const stopIntervalID = setInterval(() => {

    bird.style.bottom = Number(bird.style.bottom.split('p')[0]) - 2 + 'px'

    if (Number(bird.style.bottom.split('px')[0]) <= 0) {
        bird.style.bottom = `${0}px`
    }

    if (Number(bird.style.bottom.split('px')[0]) >= 450) {
        bird.style.bottom = `${450}px`
    }
    countScore()
    animation()
}, 20)
