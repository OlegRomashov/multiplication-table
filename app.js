const board = document.getElementById('board')
let number = 0
let errors = 0
let randdArr = []
let str = ''


for (let i = 1; i <= 10; i ++) {
    for(let j = 1; j <= 10; j++) {
        const square = document.createElement('button')
        let val = i * j
        square.innerHTML = val       
        board.append(square)
        if (i == 1 && val < 11 || j == 1 && val < 11) {
            square.classList.add('table')
            square.setAttribute('disabled', true)
        }
        square.classList.add('square')
        square.setAttribute('data-vertical', i)
        square.setAttribute('data-horizontal', j)
        square.addEventListener('click', () => clickHandler(square))
    }
}

const squares = document.querySelectorAll('.square')

const variants = document.createElement('div')
variants.classList.add('variants')
board.append(variants)

const text = document.createElement('div')
text.classList.add('text')
board.append(text)

const err = document.createElement('div')
err.classList.add('errors')
board.append(err)


function clickHandler(element) {
    number = +element.innerHTML
    vertical = element.getAttribute('data-vertical')
    horizontal = element.getAttribute('data-horizontal')
    str = `${vertical} x ${horizontal} =`
    text.append(str)
    element.classList.add('new')
    squares.forEach( s => {
        if(s.getAttribute('data-vertical') === vertical) {
            s.classList.add('vertical')
        }

        if(s.getAttribute('data-horizontal') === horizontal) {
            s.classList.add('horizontal')
        }
    })

    for (let i = 1; i < 4; i ++) {
        randdArr.push(randomIndex(100))
    }

    randdArr[randomIndex(3)] = number

    randdArr.map(sq => {
        const square_2 = document.createElement('button')
        square_2.classList.add('square_2')
        square_2.addEventListener('click', () => clickHandler_2(square_2))
        square_2.innerHTML = sq
        variants.append(square_2)
    })

    squares.forEach(x => x.setAttribute('disabled', true))  
}

const square = document.createElement('button')

function clickHandler_2(element) {
    numVar = +element.innerHTML
    
    if(numVar === number) {
        const sq = document.querySelector('.new')
        sq.classList.add('right')
        sq.classList.remove('new')
        sq.classList.remove('square')
        squares.forEach(x => x.removeAttribute('disabled'))
        squares.forEach(el => {
            el.classList.remove('horizontal', 'vertical')
        })

        const newSq = document.querySelectorAll('.new')
        newSq.forEach(y => y.setAttribute('disabled', true))

        const right = document.querySelectorAll('.right')
        right.forEach(z => z.setAttribute('disabled', true))

        randdArr = []
        number = 0
        while (variants.firstChild) {
            variants.removeChild(variants.firstChild);
          }
          while (text.firstChild) {
            text.removeChild(text.firstChild);
          }
    } else {
        errors++
        
        square.classList.add('square')
        square.classList.add('right')
        square.innerHTML = errors
        err.append(square)
    }
}

function randomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  