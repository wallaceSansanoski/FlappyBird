const containerGame = document.querySelector('[data-js="containerGame"]')
const containerBarriers = document.querySelector('[data-js="containerBarriers"]')
const scoreDisplay = document.querySelector('[data-js="score"]')


let score = 0
let stopGame = false
let increaseBulletMoviment = -70
let increaseBulletMoviment1 = -70
let increaseBulletMoviment2 = -70
let increaseBulletMoviment3 = -70
let increaseBulletMoviment4 = 70
let decreaseTopHeightBullet3 = 1
let increaseBottomHeightBullet = -70

const createElement = (element, nameClass) => {
    const el = document.createElement(element)
    el.setAttribute("class", nameClass)
    return el
}

const bullet = createElement('img', 'bullet')
bullet.src = './newBullet.png'
bullet.style.bottom = `${120}px`
containerGame.appendChild(bullet)

const bullet1 = createElement('img', 'bullet')
bullet1.src = './newBullet.png'
bullet1.style.bottom = `${320}px`
containerGame.append(bullet1)

const bullet2 = createElement('img', 'bullet')
bullet2.src = './newBullet.png'
bullet2.style.bottom = `${50}px`
containerGame.append(bullet2)

const bullet3 = createElement('img', 'bullet')
bullet3.src = './newBullet.png'
bullet3.style.top = `${-82}px`
containerGame.append(bullet3)

const bullet4 = createElement('img', 'bullet')
bullet4.src = './newBullet.png'
bullet4.style.bottom = `${-50}px`
containerGame.append(bullet4)


function CreateBarrier() {

    const normalBarrier = createElement('div', 'normalBarrier')
    const reverseBarrier = createElement('div', 'reverseBarrier')

    return { normalBarrier, reverseBarrier }
}


function createParesBarrier() {

    const heightOfBarrier = Math.trunc(Math.random() * 250)
    const setHeightReverseBarrier = (500 - heightOfBarrier) - 200

    const paresBarries = createElement('div', 'paresBarries')
    const border = createElement('div', 'border')
    const border1 = createElement('div', 'border1')

    const { normalBarrier } = CreateBarrier()
    const { reverseBarrier } = CreateBarrier()

    reverseBarrier.appendChild(border)
    normalBarrier.appendChild(border1)

    normalBarrier.style.height = `${setHeightReverseBarrier > 250 ? heightOfBarrier + 200 : heightOfBarrier}px`
    reverseBarrier.style.height = `${setHeightReverseBarrier > 250 ? setHeightReverseBarrier - 200 : setHeightReverseBarrier}px`

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
    img.style.left = `${350}px`
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

    const birdHitTheTopBarrier = barrierLeft <= 400 && barrierLeft >= 280 && heightBirdFromZero >= (heightBarrierBottom + 148)
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

            const heightOfBarrier = Math.trunc(Math.random() * 250)
            const setHeightReverseBarrier = (500 - heightOfBarrier) - 200

            barrier.children[0].style.height = `${setHeightReverseBarrier > 250 ? heightOfBarrier + 200 : heightOfBarrier}px`
            barrier.children[1].style.height = `${setHeightReverseBarrier > 250 ? setHeightReverseBarrier - 200 : setHeightReverseBarrier}px`
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

const checkBirdEdgeLimit = () => {
    const heightOfBird = Number(bird.style.bottom.split("px")[0])
    const leftOfBird = Number(bird.style.left.split("px")[0])

    const heightBirdLessThanZero = heightOfBird <= 0
    const heightBirdMoreThan450 = heightOfBird >= 450
    const leftIsLessThanZero = leftOfBird <= 0
    const lestBiggerThan1000 = leftOfBird >= 943

    bird.style.bottom = heightOfBird - 2 + 'px'

    if (heightBirdLessThanZero) {
        bird.style.bottom = `${0}px`
    }

    if (heightBirdMoreThan450) {
        bird.style.bottom = `${449}px`
    }

    if (leftIsLessThanZero) {
        bird.style.left = `${5}px`
    }

    if (lestBiggerThan1000) {
        bird.style.left = `${940}px`
    }

}

const increaseHeightBird = e => {

    console.log(e.key === 'ArrowUp' || e.key === 'w')

    const heightOfBird = Number(bird.style.bottom.split('p')[0])
    const leftOfBird = Number(bird.style.left.split('p')[0])

    if (e.key === 'ArrowUp' || e.key === 'w' && !stopGame) {
        bird.style.bottom = heightOfBird + 30 + 'px'
    }

    if (e.key === 'ArrowDown' || e.key === 's' && !stopGame) {
        bird.style.bottom = heightOfBird - 30 + 'px'
    }

    if (e.key === 'ArrowRight' || e.key === 'd' && !stopGame) {
        bird.style.left = (leftOfBird + 20) + 'px'
    }

    if (e.key === 'ArrowLeft' || e.key === 'a' && !stopGame) {
        bird.style.left = (leftOfBird - 20) + 'px'
    }


}

containerGame.addEventListener("keydown", increaseHeightBird)


const stopIntervalID = setInterval(() => {

    checkBirdEdgeLimit()
    countScore()
    animation()
}, 20)


setInterval(() => {

    if (score >= 100) {
        increaseBulletMoviment3++
        decreaseTopHeightBullet3++
        bullet3.style.right = `${increaseBulletMoviment3}px`
        bullet3.style.top = `${decreaseTopHeightBullet3}px`
    }


    if (Number(bullet3.style.top.split("px")[0]) >= 500) {
        decreaseTopHeightBullet3 = -70
        bullet3.style.top = `${decreaseTopHeightBullet3}px`
    }

    if (Number(bullet3.style.right.split("px")[0]) >= 1010) {
        increaseBulletMoviment3 = -70
        bullet3.style.right = `${increaseBulletMoviment3}px`
    }

    if (score >= 100) {
        increaseBulletMoviment4++
        increaseBottomHeightBullet++
        bullet4.style.right = `${increaseBulletMoviment4}px`
        bullet4.style.bottom = `${increaseBottomHeightBullet}px`
    }


    if (Number(bullet4.style.bottom.split("px")[0]) >= 500) {
        increaseBottomHeightBullet = -70
        bullet4.style.bottom = `${increaseBottomHeightBullet}px`
    }

    if (Number(bullet4.style.right.split("px")[0]) >= 1010) {
        increaseBulletMoviment4 = -70
        bullet4.style.right = `${increaseBulletMoviment4}px`
    }

    if (score >= 100) {
        increaseBulletMoviment++
        bullet.style.right = `${increaseBulletMoviment}px`
    }

    if (score >= 200) {
        increaseBulletMoviment1++
        bullet1.style.right = `${increaseBulletMoviment1 - 100}px`
    }

    if (score >= 300) {
        increaseBulletMoviment2++
        bullet2.style.right = `${increaseBulletMoviment2 - 200}px`
    }

    if (Number(bullet1.style.right.split("px")[0]) >= 1010) {
        const heightBullet = Math.trunc(Math.random() * 450)
        increaseBulletMoviment1 = -70
        bullet1.style.right = `${increaseBulletMoviment1}px`
        bullet1.style.bottom = `${heightBullet}px`
    }

    if (Number(bullet2.style.right.split("px")[0]) >= 1010) {
        const heightBullet = Math.trunc(Math.random() * 450)
        increaseBulletMoviment2 = -70
        bullet2.style.right = `${increaseBulletMoviment2}px`
        bullet2.style.bottom = `${heightBullet}px`
    }

    if (Number(bullet.style.right.split("px")[0]) >= 1010) {
        const heightBullet = Math.trunc(Math.random() * 450)
        increaseBulletMoviment = -70
        bullet.style.right = `${increaseBulletMoviment}px`
        bullet.style.bottom = `${heightBullet}px`
    }

}, 7)