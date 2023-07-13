localStorage.setItem('player', 'p1')
const player_1 = document.getElementById('player1')
const player_2 = document.getElementById('player2')



let wining_cases = [['cell1', 'cell2', 'cell3'], ['cell4', 'cell5', 'cell6'], ['cell7', 'cell8', 'cell9'],
['cell1, cell3', 'cell7'], ['cell2', 'cell5', 'cell8'], ['cell3', 'cell6', 'cell9'], ['cell1', 'cell5', 'cell9'],
['cell3', 'cell5', 'cell7']]

let attempts_x = []
let attempts_o = []
let counter = 0;
let game_won = false;


for (let i = 1; i <= 9; i++) {
    let cell = document.getElementById('cell' + i);
    cell.addEventListener('click', function () {
        if (game_won == true) {
            console.log('game ended')
            return
        }
        let current_player = localStorage.getItem('player');
        if (current_player == 'p1') {
            cell.innerText = "x"
            localStorage.setItem('player', 'p2');
            attempts_x.push(cell.id)
            console.log(attempts_x)
            if (attempts_x.length >= 3) {
                for (let j = 0; j < wining_cases.length; j++) {
                    if (matchArrays(wining_cases[j], attempts_x)) {
                        console.log(player_1.value + ' wins')
                        game_won = true;
                        resetGame()

                    }
                }
            }

        } else {
            cell.innerText = "o"
            localStorage.setItem('player', 'p1');
            attempts_o.push(cell.id)
            console.log(attempts_o)
            if (attempts_o.length >= 3) {
                for (let j = 0; j < wining_cases.length; j++) {
                    if (matchArrays(wining_cases[j], attempts_o)) {
                        console.log(player_2.value + 'wins')
                        game_won = true;
                        resetGame()
                    }
                }
            }
        }
        if (attempts_o.length + attempts_x.length == 9 && game_won == false) {
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

    attempts_x = [];
    attempts_o = [];
    game_won = false;
    counter = 0;
    localStorage.setItem('player', 'p1');
}