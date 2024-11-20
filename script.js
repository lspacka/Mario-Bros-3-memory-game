let ids = []      // Only keeps img ids that are clicked for the first time
let flipped = []  // Only keeps image names that are generated for the first time
let all_ids = []  // Keeps all the clicked img ids
let clicked = []  // Keeps all the generated image names
let miss = 0

let cards = [
    '1up', '10-coins', '20-coins', 
    'flower', 'mushroom', 'star'
]

let end = [
    'sorry1', 'sorry2', 'sorry3', 'sorry4', 
    'sorry5', 'sorry6', 'sorry7', 'sorry8'
]


function randomPicker(array) {
    return Math.floor(Math.random() * array.length)
}

function switcheroo(id) {
    let image = document.getElementById(id)
    let card = randomPicker(cards)
    
    if (!ids.includes(id)) {
        image.setAttribute('src', `images/${cards[card]}.png`)
        flipped.push(cards[card])
        ids.push(id)
        clicked.push(cards[card])
        all_ids.push(id)
    } else {
        all_ids.push(id)
        let index = ids.indexOf(id)
        image.setAttribute('src', `images/${flipped[index]}.png`)
        clicked.push(flipped[index])
    }

    if (clicked.length%2 == 0) {
        cardCheck(clicked, all_ids)
    }
}

function cardCheck(clicked, ids) {    
    let image
    let id
    let j = 0

    for (let i = clicked.length-2; i < clicked.length-1; i += 2) {
        if (clicked[i] == clicked[i + 1]){
            showItem(clicked[i])

            // prevent matching cards from triggering onclick
            while (j < 2) {
                id = ids[i + j]
                image = document.getElementById(id)
                image.removeAttribute('onclick')
                j++
            }
        } else {
            setTimeout(softReset, 500, all_ids)
            miss++
        }
    }
    flipped_count = 0
    if (miss == 3) {
        setTimeout(youLose, 400)
    }
}

function showItem(card) {
    let items = document.getElementById('items-container')
    let item = document.createElement('img')

    item.setAttribute('src', `images/item-${card}.png`)
    item.setAttribute('class', 'item')
    items.appendChild(item)
} 

function softReset(ids) {
    for (let i = ids.length-2; i <= ids.length-1; i++) {
        let card = document.getElementById(ids[i])
        card.setAttribute('src', 'images/ace-of-spade.png')
    }
}

function youLose() {
    let msg_box = document.getElementById('cards-container')
    let message = document.createElement('div')
    let sorry = randomPicker(end)
    
    message.innerHTML = `<p class="too-bad">TOO BAD!</p><p><img class="sorry" src="images/${end[sorry]}.png"></p>`
    message.setAttribute('id', 'message')
    msg_box.innerHTML = ''
    msg_box.style.display = 'flex'
    msg_box.style.height = '80vh'
    message.style.placeSelf = 'center'
    msg_box.appendChild(message)
}

function hardReset() {
    let message = document.getElementById('message')
    let items = document.getElementById('items-container')
    let cards = document.getElementById('cards-container')

    if (cards.childNodes.length == 1) {
        for (let i = 1; i <= 18; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', 'images/ace-of-spade.png')
            card.setAttribute('class', 'card')
            card.setAttribute('id', i)
            card.setAttribute('onclick', 'switcheroo(this.id)')
            cards.appendChild(card)
        }
    } else {
        cards = cards.children
        for (i = 0; i < cards.length; i++) {
            cards[i].setAttribute('src', 'images/ace-of-spade.png')
        }
    }
    
    ids = []
    all_ids = []
    flipped = []
    clicked = []
    match = 0
    miss = 0
    items.innerHTML = ''
    if (message) {
        cards.removeChild(message)
        cards.style.display = 'grid'
    }
    console.clear()
}