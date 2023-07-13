localStorage.setItem('player', 'p1')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const firstScore = document.getElementById('player1_score')
const secondScore = document.getElementById('player2_score')

let wining_cases =
    [
        ['cell1', 'cell2', 'cell3'], ['cell4', 'cell5', 'cell6'],
        ['cell7', 'cell8', 'cell9'], ['cell1', 'cell4', 'cell7'],
        ['cell2', 'cell5', 'cell8'], ['cell3', 'cell6', 'cell9'],
        ['cell1', 'cell5', 'cell9'], ['cell3', 'cell5', 'cell7']
    ]

let attemptsX = []
let attemptsO = []
let counter = 0;
let game_won = false;
let score1 = 0;
let score2 = 0;


for (let i = 1; i <= 9; i++) {
    let cell = document.getElementById('cell' + i);
    cell.addEventListener('click', function () {
        let current_player = localStorage.getItem('player');
        if (current_player == 'p1') {
            cell.innerText = "x"
            localStorage.setItem('player', 'p2');
            attemptsX.push(cell.id)
            if (attemptsX.length >= 3) {
                for (let j = 0; j < wining_cases.length; j++) {
                    if (matchArrays(wining_cases[j], attemptsX)) {
                        game_won = true;
                        individualScore('p1')
                        resetGame()
                        break;
                    }
                }
            }

        } else {
            cell.innerText = "o"
            localStorage.setItem('player', 'p1');
            attemptsO.push(cell.id)
            if (attemptsO.length >= 3) {
                for (let j = 0; j < wining_cases.length; j++) {
                    if (matchArrays(wining_cases[j], attemptsO)) {
                        game_won = true;
                        individualScore('p2')
                        resetGame()
                        break;
                    }
                }
            }
        }
        if (attemptsO.length + attemptsX.length == 9 && game_won == false) {
            console.log("Draw",)
            resetGame()
        }
    });
}

function matchArrays(arr1, arr2) {
    if (arr2.length < arr1.length) {
        return false
    }
    counter = 0
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
                counter++
            }
        }
    }
    if (counter == arr1.length) {
        return true
    }
    return false
}

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById('cell' + i);
        cell.innerText = "";
    }

    attemptsX = [];
    attemptsO = [];
    game_won = false;
    counter = 0;
    localStorage.setItem('player', 'p1');
    addScore();
}

function addScore() {
    firstScore.innerText = score1
    secondScore.innerText = score2
}

function individualScore(p) {
    if (p === 'p1') {
        score1++;
    }
    else {
        score2++;
    }
    addScore()
}

function setName() {
    const name1 = player1.value;
    const name2 = player2.value;
    firstScore.innerText = name1;
    secondScore.innerText = name2;
}

player2.addEventListener('change', setName)