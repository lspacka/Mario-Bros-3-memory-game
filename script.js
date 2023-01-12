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
let count = 0


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
        cardCheck(clicked)
    }
}

function cardCheck(clicked) {
    // if (clicked.length-2 == clicked.length-1) => Why replacing the loop with this doesn't work?
    for (let i=clicked.length-2; i<clicked.length-1; i+=2) {
        if (clicked[i] == clicked[i+1]){
            showItem(clicked[i])
            match++
            miss--
        } else {
            setTimeout(softReset, 700, all_ids)
            miss++
        }
        //setTimeout(messager, 500, match, miss)
    }
}

function showItem(card) {
    let items = document.getElementById('items-container')
    //let row = document.createElement('div')
    let item = document.createElement('img')
    /*if (items.childNodes.length >= 2) {
        item.setAttribute('src', `images/item-${card}.png`)
        item.setAttribute('class', 'item')
        let row = document.createElement('div')
        row.appendChild(item)
        items.appendChild(row)
    }*/
    
    //if (items.childNodes.length == 0 || items.childNodes.length == 2) {        // Node.hasChildNodes not working for some reason...
        //count++
        //row.setAttribute('id', count) 
        //row.setAttribute('class', 'row')
        item.setAttribute('src', `images/item-${card}.png`)
        item.setAttribute('class', 'item')
        //row.appendChild(item)
        items.appendChild(item)
    /*} else if (items.childNodes.length == 1) {
        item.setAttribute('src', `images/item-${card}.png`)
        item.setAttribute('class', 'item')
        //row.appendChild(item)
        items.appendChild(item)
    }*/
    /*if (row.childNodes.length == 0 || row.childNodes.length == 2) {
        var item = document.createElement('img')
        count++ 
        row.setAttribute('class', 'row')
        row.setAttribute('id', count)
        item.setAttribute('src', `images/item-${card}.png`)
        item.setAttribute('class', 'item')
        row.appendChild(item)
        items.appendChild(row)
    } else if (row.childNodes.length == 1) {
        let item = document.createElement('img')
        let row = document.getElementById(count)
        item.setAttribute('src', `images/item-${card}.png`)
        item.setAttribute('class', 'item')
        row.appendChild(item)
    } */    
} 

function softReset(ids) {
    for (let i=ids.length-2; i<=ids.length-1; i++) {
        let card = document.getElementById(ids[i])
        card.setAttribute('src', 'images/ace-of-spade.png')
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
    let items = document.getElementById('items-container')
    let cards = document.getElementById('cards-container')
    cards = cards.children
    
    for (i=0; i<cards.length; i++) {
        cards[i].setAttribute('src', 'images/ace-of-spade.png')
    }
    ids = []
    all_ids = []
    flipped = []
    clicked = []
    match = 0
    miss = 0
    count = 0
    items.innerHTML = ''
    message.innerText = ''
    console.clear()
}