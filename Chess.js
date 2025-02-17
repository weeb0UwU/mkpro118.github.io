var turn = 'white'

var has_white_king_moved = false
var has_black_king_moved = false
var has_white_rook1_moved = false
var has_white_rook2_moved = false
var has_black_rook1_moved = false
var has_black_rook2_moved = false

var move_counter = 0

var files = {
    'a': 0,
    'b': 1,
    'c': 2,
    'd': 3,
    'e': 4,
    'f': 5,
    'g': 6,
    'h': 7,
}

var ranks = {
    '1': 7,
    '2': 6,
    '3': 5,
    '4': 4,
    '5': 3,
    '6': 2,
    '7': 1,
    '8': 0,
}

var files_rev = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
}

var ranks_rev = {
    7: '1',
    6: '2',
    5: '3',
    4: '4',
    3: '5',
    2: '6',
    1: '7',
    0: '8',
}

var symbols = {
    'king' : 'K',
    'queen' : 'Q',
    'rook' : 'R',
    'bishop' : 'B',
    'knight' : 'N',
}

var coords = new Array(8)
for (var i = 0; i < coords.length; i++) {
    coords[i] = new Array(8)
    for (var j = 0; j < coords[i].length; j++) {
        coords[i][j] = j
    }
}

window.onload = disable

function revert() {
    all_squares = document.getElementsByTagName('div')
    for (sq of all_squares) {
        if (sq.className.includes('highlight')) {
            sq.className = sq.className.slice(0,12)
        }
    }
}

function highlight(event) {
    revert()
    var moves = null
    if (typeof(event) === 'string') {
        moves = possibleMoves(event)
    }
    else {
        moves = possibleMoves(event.target.id)
    }
    for (move of moves) {
        var square = document.getElementById(move)
        square.className = square.className + " highlight-" + square.className.slice(7)
        if (square.firstElementChild) {
            // square.className = square.className + "-unfriendly"
        }
    }
}

function allowDrop(event) {
    event.preventDefault()
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id)
    highlight(event.target.id)
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text")
    var target = event.target
    var to = target.id
    if (to == data) {
        return
    }


    if (!((possibleMoves(data).includes(to)) || (possibleMoves(data).includes(target.parentNode.id)))) {
        return
    }

    // White King Castle
    if (data === 'white-king' && !has_white_king_moved) {
        if ((to === 'g1') || (to === 'white-rook-2') ) {

            if (!(has_white_king_moved) && !(has_white_rook2_moved)) {

                var conditions =  [!(document.getElementById('f1').firstElementChild),
                                   (document.getElementById('h1').firstElementChild.id === 'white-rook-2')]

                if (conditions.every( c => c == true)) {
                    var parent1 = document.getElementById('e1')
                    var parent2 = document.getElementById('f1')
                    var parent3 = document.getElementById('g1')
                    var parent4 = document.getElementById('h1')
                    var king = document.getElementById('white-king')
                    var rook = document.getElementById('white-rook-2')
                    parent4.removeChild(rook)
                    parent1.removeChild(king)
                    parent2.appendChild(rook)
                    parent3.appendChild(king)
                    writeMoves('O-O', turn)
                    has_white_king_moved = true
                    has_white_rook2_moved = true
                    turn = (turn == 'white') ? 'black' : 'white'
                    disable()
                    revert()
                    return
                }
            }

            else {
                return
            }
        }
        else if ((to === 'c1') || (to === 'white-rook-1') || to === 'b1') {
            if (!(has_white_king_moved) && !(has_white_rook1_moved)) {
                var conditions =  [!(document.getElementById('c1').firstElementChild),
                                   !(document.getElementById('b1').firstElementChild),
                                   !(document.getElementById('d1').firstElementChild),
                                   (document.getElementById('a1').firstElementChild.id === 'white-rook-1')]
                if (conditions.every( c => c == true)) {
                    var parent1 = document.getElementById('e1')
                    var parent2 = document.getElementById('d1')
                    var parent3 = document.getElementById('c1')
                    var parent4 = document.getElementById('a1')
                    var king = document.getElementById('white-king')
                    var rook = document.getElementById('white-rook-1')
                    parent1.removeChild(king)
                    parent4.removeChild(rook)
                    parent3.appendChild(king)
                    parent2.appendChild(rook)
                    writeMoves('O-O-O', turn)
                    has_white_king_moved = true
                    has_white_rook1_moved = true
                    turn = (turn == 'white') ? 'black' : 'white'
                    disable()
                    revert()
                    return
                }
            }
            else {
                return
            }
        }
    }

    // Black King Castle
    if (data === 'black-king' && !has_black_king_moved) {

        if ((to === 'g8') || (to === 'black-rook-2') ) {

            if (!(has_black_king_moved) && !(has_black_rook2_moved)) {

                var conditions =  [!(document.getElementById('f8').firstElementChild),
                                   (document.getElementById('h8').firstElementChild.id === 'black-rook-2')]

                if (conditions.every( c => c == true)) {
                    var parent1 = document.getElementById('e8')
                    var parent2 = document.getElementById('f8')
                    var parent3 = document.getElementById('g8')
                    var parent4 = document.getElementById('h8')
                    var king = document.getElementById('black-king')
                    var rook = document.getElementById('black-rook-2')
                    parent4.removeChild(rook)
                    parent1.removeChild(king)
                    parent2.appendChild(rook)
                    parent3.appendChild(king)
                    writeMoves('O-O', turn)
                    has_black_king_moved = true
                    has_black_rook2_moved = true
                    turn = (turn == 'white') ? 'black' : 'white'
                    disable()
                    revert()
                    return
                }
            }

            else {
                return
            }
        }
        else if ((to === 'c8') || (to === 'black-rook-1') || to === 'b8') {
            if (!(has_black_king_moved) && !(has_black_rook1_moved)) {
                var conditions =  [!(document.getElementById('c8').firstElementChild),
                                   !(document.getElementById('b8').firstElementChild),
                                   !(document.getElementById('d8').firstElementChild),
                                   (document.getElementById('a8').firstElementChild.id === 'black-rook-1')]
                if (conditions.every( c => c == true)) {
                    var parent1 = document.getElementById('e8')
                    var parent2 = document.getElementById('d8')
                    var parent3 = document.getElementById('c8')
                    var parent4 = document.getElementById('a8')
                    var king = document.getElementById('black-king')
                    var rook = document.getElementById('black-rook-1')
                    parent1.removeChild(king)
                    parent4.removeChild(rook)
                    parent3.appendChild(king)
                    parent2.appendChild(rook)
                    writeMoves('O-O-O', turn)
                    has_black_king_moved = true
                    has_black_rook1_moved = true
                    turn = (turn == 'white') ? 'black' : 'white'
                    disable()
                    revert()
                    return
                }
            }
            else {
                return
            }
        }
    }

    if (to.startsWith(data.slice(0, 5))){
        return
    }
    if (target.className.startsWith('square')) {
        var move = ''
        target.appendChild(document.getElementById(data))
        if (data.includes('king')) {
            move = 'K' + to
        }
        else if(data.includes('queen')) {
            move = 'Q' + to
        }
        else if(data.includes('rook')) {
            move = 'R' + to
        }
        else if(data.includes('bishop')) {
            move = 'B' + to
        }
        else if(data.includes('knight')) {
            move = 'N' + to
        }
        else if(data.includes('pawn')) {
            move = to
        }
        writeMoves(move, turn)
        if (data === 'white-rook-1') {
            has_white_rook1_moved = true
        }
        else if (data === 'white-rook-2') {
            has_white_rook2_moved = true
        }
        else if (data === 'black-rook-1') {
            has_black_rook1_moved = true
        }
        else if (data === 'black-rook-2') {
            has_black_rook2_moved = true
        }
        else if (data === 'white-king') {
            has_white_king_moved = true
        }
        else if (data === 'black-king') {
            has_black_king_moved = true
        }
        turn = (turn == 'white') ? 'black' : 'white'
        disable(turn)
        revert()
    }
    else if ((data.slice(0, 5) != to.slice(0, 5))) {
        var move = ''
        if (data.includes()) {}
        var parent1 = target.parentNode
        parent1.removeChild(parent1.firstElementChild)
        child = document.getElementById(data)
        var parent2 = child.parentNode
        parent2.removeChild(child)
        parent1.appendChild(child)
        if (data.includes('king')) {
            move = 'Kx' + parent1.id
        }
        else if(data.includes('queen')) {
            move = 'Qx' + parent1.id
        }
        else if(data.includes('rook')) {
            move = 'Rx' + parent1.id
        }
        else if(data.includes('bishop')) {
            move = 'Bx' + parent1.id
        }
        else if(data.includes('knight')) {
            move = 'Nx' + parent1.id
        }
        else if(data.includes('pawn')) {
            move = parent2.id[0] + 'x' + parent1.id
        }
        writeMoves(move, turn)
        if (data === 'white-rook-1') {
            has_white_rook1_moved = true
        }
        else if (data === 'white-rook-2') {
            has_white_rook2_moved = true
        }
        else if (data === 'black-rook-1') {
            has_black_rook1_moved = true
        }
        else if (data === 'black-rook-2') {
            has_black_rook2_moved = true
        }
        else if (data === 'white-king') {
            has_white_king_moved = true
        }
        else if (data === 'black-king') {
            has_black_king_moved = true
        }
        turn = (turn == 'white') ? 'black' : 'white'
        disable(turn)
        revert()
    }
}

function writeMoves(move, turn) {
    if (turn === 'white') {
        move_counter++
        var ol = document.getElementById('moves-list')
        var li = document.createElement('li')
        li.id = move_counter.toString()
        var move_white = document.createElement('div')
        var move_black = document.createElement('div')
        move_white.className = 'move-white'
        move_white.innerHTML = move
        move_white.id = 'move-white-' + move_counter.toString()
        move_black.className = 'move-black'
        move_black.innerHTML = '    '
        move_black.id = 'move-black-' + move_counter.toString()
        li.appendChild(move_white)
        li.appendChild(move_black)
        ol.appendChild(li)
    }
    else if(turn === 'black') {
        var move_black = document.getElementById('move-black-' + move_counter.toString())
        move_black.innerHTML = move
    }
}

function disable() {
    var pieces = document.getElementsByTagName('img')
    for (piece of pieces) {
        if (!piece.id.startsWith(turn)) {
            piece.ondragstart = function(event) { return false}
            piece.onclick = function(event) { return false}
        }
        else {
            piece.ondragstart = drag
            piece.onclick = highlight
        }
    }
}

function possibleMoves(id) {
    var offsets = null
    if (id.includes('king')) {
        offsets = king(id)
    }
    else if (id.includes('queen')) {
        offsets = queen(id)
    }
    else if (id.includes('rook')) {
        offsets = rook(id)
    }
    else if (id.includes('bishop')) {
        offsets = bishop(id)
    }
    else if (id.includes('knight')) {
        offsets = knight(id)
    }
    else if (id.includes('pawn')) {
        offsets = pawn(id)
    }
    moves = []
    for (offset of offsets) {
        var position = document.getElementById(id).parentNode.id
        var rank = ranks[position[1]]
        var file = files[position[0]]
        while(true) {
            var rank_offset = offset[0]
            var file_offset = offset[1]
            var rank_possible = rank + rank_offset
            var file_possible = file + file_offset
            try {
                if (!(rank_possible >= 0 && rank_possible <= 7)) throw 'error'
                if (!(file_possible >= 0 && file_possible <= 7)) throw 'error'
            }
            catch (err) {
                break
            }
            move = files_rev[file_possible] + ranks_rev[rank_possible]
            moves.push(move)
            var kid = document.getElementById(move).firstElementChild
            if (kid) {
                if (kid.id.slice(0, 5) != id.slice(0, 5)) {
                    break
                }
                else if (kid.id.slice(0, 5) == id.slice(0, 5)) {
                    _ = moves.pop()
                    break
                }
            }
            rank = rank_possible
            file = file_possible
            if (id.includes('king') || id.includes('knight') || id.includes('pawn')) {
                break
            }
        }
    }
    return moves
}


function king(id) {
    var offsets = [[-1, 0],
                   [1, 0],
                   [0, -1],
                   [0, 1],
                   [1, 1],
                   [1, -1],
                   [-1, 1],
                   [-1, -1]]
    if (id === 'white-king') {
        if ((!(has_white_king_moved)) && (!(has_white_rook2_moved))) {
            var conditions = [!(document.getElementById('f1').firstElementChild),
                              !(document.getElementById('g1').firstElementChild)]
            if (conditions.every(e => e == true)) {
                offsets.push([0, 2])
            }
        }
        if ((!(has_white_king_moved)) && (!(has_white_rook1_moved))) {
            var conditions = [!(document.getElementById('d1').firstElementChild),
                              !(document.getElementById('c1').firstElementChild),
                              !(document.getElementById('b1').firstElementChild)]
            if (conditions.every(e => e == true)) {
                offsets.push([0, -2])
            }
        }
    }
    else if (id === 'black-king') {
        if ((!(has_black_king_moved)) && (!(has_black_rook2_moved))) {
            var conditions = [!(document.getElementById('f8').firstElementChild),
                              !(document.getElementById('g8').firstElementChild)]
            if (conditions.every(e => e == true)) {
                offsets.push([0, 2])
            }
        }
        if ((!(has_black_king_moved)) && (!(has_black_rook1_moved))) {
            var conditions = [!(document.getElementById('d8').firstElementChild),
                              !(document.getElementById('c8').firstElementChild),
                              !(document.getElementById('b8').firstElementChild)]
            if (conditions.every(e => e == true)) {
                offsets.push([0, -2])
            }
        }
    }
    return offsets
}

function queen(id) {
    var offsets = [[-1, 0],
                   [1, 0],
                   [0, -1],
                   [0, 1],
                   [1, 1],
                   [1, -1],
                   [-1, 1],
                   [-1, -1]]
    return offsets
}

function rook(id) {
    var offsets = [[-1, 0],
                   [1, 0],
                   [0, -1],
                   [0, 1]]
    return offsets
}

function bishop(id) {
    var offsets = [[1, 1],
                   [-1, 1],
                   [1, -1],
                   [-1, -1]]
    return offsets
}

function knight(id) {
    var offsets = [[1, 2],
                   [2, 1],
                   [-1, 2],
                   [-2, -1],
                   [-1, -2],
                   [-2, 1],
                   [1, -2],
                   [2, -1]]
    return offsets
}

function pawn(id) {
    var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    var child = document.getElementById(id)
    var parent = child.parentNode
    var offsets = []
    var position = [ranks[parent.id[1]], files[parent.id[0]]]
    var possible = []
    if (child.id.startsWith('white')) {
        var up = parent.id[0] + ranks_rev[ranks[parent.id[1]] - 1]
        if (!(document.getElementById(up).firstElementChild)) {
            offsets.push([-1, 0])
            if (parent.id.endsWith('2')) {
                offsets.push([-2, 0])
            }
        }
        if (ranks[parent.id[1]] > 0) {
            var side1 = letters.indexOf(parent.id[0]) + 1
            var side2 = letters.indexOf(parent.id[0]) - 1
            if (side1 <= 7) {
                var upper_right = files_rev[side1] + ranks_rev[ranks[parent.id[1]] - 1]
                var kid = document.getElementById(upper_right).firstElementChild
                if (kid) {
                    offsets.push([-1, 1])
                }
            }
            if (side2 >= 0) {
                var upper_left = files_rev[side2] + ranks_rev[ranks[parent.id[1]] - 1]
                var kid = document.getElementById(upper_left).firstElementChild
                if (kid) {
                    offsets.push([-1, -1])
                }
            }
        }
    }
    else if (child.id.startsWith('black')) {
        var down = parent.id[0] + ranks_rev[ranks[parent.id[1]] + 1]
        if (!(document.getElementById(down).firstElementChild)) {
            offsets.push([1, 0])
            if (parent.id.endsWith('7')) {
                offsets.push([2, 0])
            }
        }
        if (ranks[parent.id[1]] < 7) {
            var side1 = letters.indexOf(parent.id[0]) + 1
            var side2 = letters.indexOf(parent.id[0]) - 1
            if (side1 <= 7) {
                var lower_right = files_rev[side1] + ranks_rev[ranks[parent.id[1]] + 1]
                var kid = document.getElementById(lower_right).firstElementChild
                if (kid) {
                    offsets.push([1, 1])
                }
            }
            if (side2 >= 0) {
                var lower_left = files_rev[side2] + ranks_rev[ranks[parent.id[1]] + 1]
                var kid = document.getElementById(lower_left).firstElementChild
                if (kid) {
                    offsets.push([1, -1])
                }
            }
        }
    }
    return offsets
}
