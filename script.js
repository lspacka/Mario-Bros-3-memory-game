let cards = 
[
    '1up', '10-coins', '20-coins', 
    'flower', 'mushroom', 'star'
]

let ids = []  // Only keeps img ids that are clicked for the first time
let flipped = []  // Only keeps image names that are generated for the first time
let all_ids = []  // Keeps all the clicked img ids
let clicked = []  // Keeps all the generated image names
let match = 0
let miss = 0


function randomPicker(array) {
    return Math.floor(Math.random() * array.length)
}

function switcheroo(id) {
    let image = document.getElementById(id)
    let card = randomPicker(cards)
    
    if (!ids.includes(id)) {
        image.setAttribute('src', `images/${cards[card]}.jpg`)
        flipped.push(cards[card])
        ids.push(id)
        clicked.push(cards[card])
        all_ids.push(id)
    } else {
        all_ids.push(id)
        let index = ids.indexOf(id)
        image.setAttribute('src', `images/${flipped[index]}.jpg`)
        clicked.push(flipped[index])
    }
    
    if (clicked.length%2 == 0) {
        cardCheck(clicked)
    }
}

function cardCheck(clicked) {
    // if (clicked.length-2 == clicked.length-1) => Why replacing the loop with this doesn't work?
    for (let i=clicked.length-2; i<clicked.length-1; i+=2) {
        if (clicked[i] == clicked[i+1]){
            match++
            miss--
        } else {
            setTimeout(softReset, 700, all_ids)
            miss++
        }
        setTimeout(messager, 500, match, miss)
    }
}

function softReset(ids) {
    for (let i=ids.length-2; i<=ids.length-1; i++) {
        let card = document.getElementById(ids[i])
        card.setAttribute('src', 'images/ace-of-spade.jpg')
    }
}

function messager(match, miss) {
    let message = document.getElementById('message')
    
    if (match == 3) {
        message.appendChild(document.createTextNode('YOU WIN!'))
    }
    if (miss == 3) {
        message.appendChild(document.createTextNode('YOU LOSE!'))
    }
}

function hardReset() {
    let message = document.getElementById('message')
    let cards = document.querySelectorAll('img')

    for (i=0; i<cards.length; i++) {
        cards[i].setAttribute('src', 'images/ace-of-spade.jpg')
    }
    ids = []
    all_ids = []
    flipped = []
    clicked = []
    match = 0
    miss = 0
    message.innerText = ''
    console.clear()
}
