// Variable Declarations //

const cBattleship = {
    name: 'Battleship',
    num: 4,
    health: 4,
    color: 'grey',
}

const cCruiserShip = {
    name: 'Cruiser Ship',
    num: 3,
    health: 3,
    color: 'grey',
}


const cTugShip = {
    name: 'Tug Ship',
    num: 2,
    health: 2,
    color: 'grey',
}

const pBattleship = {
    name: 'Battleship',
    num: 4,
    health: 4,
    color: 'grey',
}
//                                             READ LINE 424!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const pCruiserShip = {
    name: 'Cruiser Ship',
    num: 3,
    health: 3,
    color: 'grey',
}

const pTugShip = {
    name: 'Tug Ship',
    num: 2,
    health: 2,
    color: 'grey',
}

const colors = {
    8: 'grey', //pTugShip
    7: 'grey', //pCruiserShip
    6: 'grey', // pBattleship
    5: 'red', // hit
    4: 'white', // miss
    3: 'grey', // tug ship
    2: 'grey', // cruiser
    1: 'grey', // battleship
    0: 'green', // boxes
}

const turnOptions = {
    down: 1,
    up: 2,
    left: 3,
    right: 4,
}

let turnCount = 0

let pShipDown

let col = 0

let row = 0

let cHitChoice = null

let newCChoice // THis is the variable that controlls the moves after it finds a hit

let savedCChoice 

let pShipsLeft = 3

let cShipsLeft = 3

let chart

let cChart

let pChart

let turn

let winner

let cChoice1

let cChoice2

let comId

let cBoxId // May use this to store the variable for cTurn

let cPossibleHits = ['v0h0', 'v0h1', 'v0h2', 'v0h3', 'v0h4', 'v0h5', 'v0h6', 'v0h7', 'v1h0', 'v1h1', 'v1h2', 'v1h3', 'v1h4', 'v1h5', 'v1h6', 'v1h7', 'v2h0', 'v2h1', 'v2h2', 'v2h3', 'v2h4', 'v2h5', 'v2h6', 'v2h7', 'v3h0', 'v3h1', 'v3h2', 'v3h3', 'v3h4', 'v3h5', 'v3h6', 'v3h7', 'v4h0', 'v4h1', 'v4h2', 'v4h3', 'v4h4', 'v4h5', 'v4h6', 'v4h7', 'v5h0', 'v5h1', 'v5h2', 'v5h3', 'v5h4', 'v5h5', 'v5h6', 'v5h7', 'v6h0', 'v6h1', 'v6h2', 'v6h3', 'v6h4', 'v6h5', 'v6h6', 'v6h7', 'v7h0', 'v7h1', 'v7h2', 'v7h3', 'v7h4', 'v7h5', 'v7h6', 'v7h7']

// Dom Declirations //

const board = document.querySelectorAll('.box')

const cBoard = document.querySelectorAll('.cBox')

// function Statements //

function initiate() {
    board.forEach((box) => {
        box.addEventListener('click', (e)=>{
            play(e);
        });
    })
    pShipsLeft = 3
    cShipsLeft = 3
    turn = 1
    winner = null
    chart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    // THIS WILL BE THE CHART THAT THE PLAYER SEES HIS BOATS ON
    pChart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 8, 8, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 7, 7, 7, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 6, 6, 6, 6, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    //THIS WILL BE THE CHART THE PLAYER SEES HIS HITS AND MISSES ON
    cChart = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 1, 0, 0, 0, 0, 0], // col 1
        [0, 0, 1, 0, 0, 0, 0, 0], // col 2
        [0, 0, 1, 0, 0, 0, 0, 0], // col 3
        [0, 0, 1, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [3, 0, 0, 2, 2, 2, 0, 0], // col 6
        [3, 0, 0, 0, 0, 0, 0, 0], // col 7
    ]
    render()
}

function renderBoard() {
    chart.forEach((colArr, colIdx) => {
        colArr.forEach((cellVal, rowIdx) => {
            const cellId = `v${colIdx}h${rowIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = colors[cellVal]
        })
    })
}

function render() {
    renderBoard();
    setTimeout(changeChart, 1000);
    setTimeout(renderBoard, 2000)
}

function play(event) {
    if (turn === 2) {
        return
    }
    const boxId = event.target.id
    const col = boxId[1]
    const row = boxId[3]
    if (chart[col][row] === 4 || chart[col][row] === 5) {
        return
    } else if (chart[col][row] === 1) {
        if (cBattleship.health >= 2) {
            cBattleship.health--;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --cShipsLeft;
            console.log('You sunk their Battleship!');
            console.log(cShipsLeft);
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 2) {
        if (cCruiserShip.health >= 2) {
            --cCruiserShip.health;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --cShipsLeft;
            console.log('You sunk their Cruiser!');
            console.log(cShipsLeft);
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 3) {
        if (cTugShip.health >= 2) {
            --cTugShip.health;
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --cShipsLeft;
            console.log('You sunk their Tug!');
            console.log(cShipsLeft);
            chart[col][row] = 5
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else {
        chart[col][row] = 4
        if (!checkWinner()) {
            changeTurn()
        }
    }
    render()
}

// Need to return this value to 0 if we want to ever go back to random number generating for the AI

let turnFunction = 0

function exactSpot() { // tells the cTurn to either make a specific guess or use the random value
    if (turnFunction === 0) {
        cptrId();
        cBoxId = comId
        longSavedChoice = comId
        console.log(cBoxId)
    } else if (turnFunction !== 0) {
        cBoxId = newCChoice;
        comId = newCChoice;
        turnFunction = 0; // This is so that turn function is only not 0 if its called
        removeOption();
        console.log(cBoxId)
    }
}

function cTurn() {
    console.log('Start c turn')
    ++turnCount
    console.log('this # turns: ' + turnCount)
    //cptrId() // need to only do this sometimes, only for random turns not all
    exactSpot() // Giving cBoxId a value here depending on if it was a previous hit or not
    console.log(cBoxId)
    let col = cBoxId[1]
    let row = cBoxId[3]
    if (chart[col][row] === 6) {
        if (pBattleship.health >= 2) {
            --pBattleship.health;
            chart[col][row] = 5;
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            pShipDown = true
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 7) {
        if (pCruiserShip.health >= 2) {
            --pCruiserShip.health;
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            pShipDown = true
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else if (chart[col][row] === 8) {
        if (pTugShip.health >= 2) {
            --pTugShip.health;
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        } else {
            --pShipsLeft;
            pShipDown = true
            chart[col][row] = 5
            savedCChoice = comId;
            hit()
            checkWinner()
            if (!checkWinner()) {
                changeTurn()
            }
        }
    } else {
        if (cPossibleHits.includes(newCChoice)) {
            nTestRemove = cPossibleHits.findIndex(nRemoveId);
            cPossibleHits.splice(nTestRemove, 1);
        }
        chart[col][row] = 4 
        if (atkShip === true) {
            atkShip = false
        }
        // ATK SHIP T OR FALSE IF STATEMENT
        savedCChoice = comId; // ATK SHIP
        if (!checkWinner()) {
            changeTurn()
        }
    }
    console.log('End c turn')
    console.log(cPossibleHits)
    render()
}

// Function that runs if there is a hit to make it smarter

let nTestRemove

function nRemoveId(arr) { // gathers the IDX of the id in the array for the AI when its hit something for the HIT function
    return arr === newCChoice
}

function nRemoveIdMiss(arr) { // gathers the IDX of the id in the array for the AI when its hit something for the PLAY function
    return arr === cBoxId
}

atkShip = false

function hit() {
    console.log('Start c turn hit')
    atkShip = true
    console.log('atk ship: ' + atkShip)
    cHitChoice = hitChoice()
    console.log('hit choice: ' + cHitChoice)
    if (cHitChoice === 0) {// This is for going down
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        --row;
        turnFunction = turnOptions.down;
        newCChoice = `v${col}h${row}`
        console.log('going down')
        if (!cPossibleHits.includes(newCChoice)) {
            ++ row;
            newCChoice = `v${col}h${row}`
            console.log('this ID was already used')
            return newCChoice
        }
        // if (cPossibleHits.includes(newCChoice)) {                        Save this trying something different
        //     nTestRemove = cPossibleHits.findIndex(nRemoveId);
        //     console.log('index to be removed: ' + nTestRemove);
        //     console.log('possible hits RIGHT BEFORE: ' + cPossibleHits);
        //     cPossibleHits.splice(nTestRemove, 1);
        //     console.log('possible hits RIGHT AFTER: ' + cPossibleHits);
        //     console.log('removed ID from possibilities')
        // } else {
        //     ++ row;
        //     newCChoice = `v${col}h${row}`
        //     console.log('this ID was already used')
        //     return newCChoice
        // }
        if (atkShip === true && pShipDown === true) { // THis resets the rules and puts you back to random guessing
            atkShip = false;
            pShipDown = false;
            turnFunction = 0
            cHitChoice = null
            console.log('reset rules for random')
        }
        if (chart[col][row] === 6 || chart[col][row] === 7 || chart[col][row] === 8) {
            cHitChoice = null
            console.log('keep cHitChoice at 0 to keep going down')
        }
        if (row < 0) { // If it tries something that is NOT on the board
            ++row;
            ++row;
            turnFunction = turnOptions.up;
            newCChoice = `v${col}h${row}`
            console.log('not a possible turn, off board')
            return newCChoice
        }
        if (chart[col][row] === 0 && atkShip === true || chart[col][row] === 4 || chart[col][row] === 5) { // If it tries something and missess //
            cHitChoice = 1; // Might need to be a function
            let col = longSavedChoice[1];
            let row = longSavedChoice[3];
            ++ row
            turnFunction = 1 // 1 is for going up
            cHitChoice = 0
            console.log('no down go up')
            newCChoice = `v${col}h${row}`
            removeOption()
            return newCChoice
        }
        return newCChoice
    } else if (cHitChoice === 1) { /// THIS IS THE UP FUNCTION, NEEDS TO BE RE-WRITTEN
        let col = savedCChoice[1];
        let row = savedCChoice[3];
        ++row;
        turnFunction = turnOptions.up;
        newCChoice = `v${col}h${row}`
        console.log('1 going up')
        if (!cPossibleHits.includes(newCChoice)) {
            ++ col;
            newCChoice = `v${col}h${row}`
            console.log('this ID was already used')
            return newCChoice
        }
        // if (cPossibleHits.includes(newCChoice)) {                                          Save this trying something different
        //     nTestRemove = cPossibleHits.findIndex(nRemoveId);
        //     console.log('index to be removed: ' + nTestRemove);
        //     cPossibleHits.splice(nTestRemove, 1);
        //     console.log('possible hits RIGHT AFTER: ' + cPossibleHits);
        //     console.log('removed ID from possibilities')
        // } else {
        //     ++ col;
        //     newCChoice = `v${col}h${row}`
        //     console.log('this ID was already used')
        //     return newCChoice
        // }
        if (atkShip === true && pShipDown === true) { // THis resets the rules and puts you back to random guessing
            atkShip = false;
            pShipDown = false;
            turnFunction = 0
            cHitChoice = null
            console.log('1 reset rules for random')
        }
        if (chart[col][row] === 6 || chart[col][row] === 7 || chart[col][row] === 8) {
            cHitChoice = 0
            console.log('1 keep cHitChoice at 1 to keep going up')
        }
        if (row < 0) { // If it tries something that is NOT on the board
            --col;
            --col;
            turnFunction = turnOptions.left;
            newCChoice = `v${col}h${row}`
            console.log('1 not a possible turn, off board')
            return newCChoice
        }
        if (chart[col][row] === 0 && atkShip === true || chart[col][row] === 4 || chart[col][row] === 5) { // If it tries something and missess //
            cHitChoice = 2;
            let col = longSavedChoice[1];
            let row = longSavedChoice[3];
            -- row
            -- col
            turnFunction = 2 // 2 is for going left
            cHitChoice = 1
            console.log('1 no up go down')
            return newCChoice = `v${col}h${row}`
        }
    }
    console.log('End c turn hit')
}

function hitChoice() {
    if (atkShip === true) {
        if (cHitChoice === 0) {
            ++cHitChoice
        } else if (cHitChoice === 1) {
            ++cHitChoice;
        } else if (cHitChoice === 2) {
            ++cHitChoice;
        }
    }
    if (cHitChoice === null) {
        cHitChoice = 0;
    }
    console.log('Rn hit choice: ' + cHitChoice)
    return cHitChoice
}

function cChoice(min = 0, max = 8) {
    let choice = Math.random();
    choice = Math.floor(choice * max);
    choice = choice + min;
    return choice;
}

// THis gives me an ID to use in the future for the computer turn (cTurn)

let testRemove 

function cptrId() {
    comId = getComId()
    testRemove = cPossibleHits.findIndex(removeId);
    cPossibleHits.splice(testRemove, 1) // removes the id in the array for future turns
    return comId
}

function getComId() {
    return cPossibleHits[(Math.floor(Math.random() * cPossibleHits.length))]// Gets random ID from the list
}

function removeId(arr) { // gathers the IDX of the id in the array
    return arr === comId
}

function checkWinner() {
    if (pShipsLeft === 0) {
        winner = 'c'
        console.log('They sunk your battleship!')
    } else if (cShipsLeft === 0) {
        winner = 'p'
        console.log('You sunk their battleship!')
    } else {
        return false
    }
}

function changeTurn() {
    turn = turn === 1 ? 2 : 1;
    if (turn === 2) {// Use and AND statement to do whatis meantioned below!!
        setTimeout(cTurn, 3000)
        // Set a value to a variable that tells the game what function to run once its the computers turn 
    }
    
}

function removeOption() {
    if (cPossibleHits.includes(newCChoice)) {
        nTestRemove = cPossibleHits.findIndex(nRemoveId);
        cPossibleHits.splice(nTestRemove, 1);
    }
}
//THIS FUNCTION BELOW IS A NEW VERSION OF THE ABOVE FUNCTION///////////////////////////////////////////////////////////////////////

// function changeTurn() {
//     turn = turn === 1 ? 2 : 1;
//     if ((turn === 2 && turnFunction === 0) || (turn === 2 && someVariable === sum)) { // THIS MAY WORK TRY IT SECOND HALF IS FOR THE EXTRA VARIABLE FOR RE RUNNING CODE, ALSO MAYBE JUST CHANGE THE VARIABLE ENTERING INTO CTURN INSTEAD, THAT WAY WE DONT NEED A NEW FUNCTION FOR RUNNING THE CODE AND APPLYING THE CHANGE TO THE BOARD
//         setTimeout(down, 3000)
//         //variable to tell it to run this again next turn
//     } else if (turn === 2 && turnFunction === 1) {
//         setTimeout(up, 3000)
//         //variable to tell it to run this again next turn
//     } else if (turn === 2 && turnFunction === 2) {
//         setTimeout(left, 3000)
//         //variable to tell it to run this again next turn
//     } else if (turn === 2 && turnFunction === 3) {
//         setTimeout(right, 3000)
//         //variable to tell it to run this again next turn
//     }
// }

function changeChart() {
    if (turn === 1) {
        chart = cChart
    } else {
        chart = pChart
    }
}

function down() {

}

function up() {
    
}

function left() {
    
}

function right() {
    
}

// Called Functions //

initiate()

// Dom Statements //




// SOUND EFFECTS FOR LATER// 



// EXPLOSION https://www.youtube.com/watch?v=YRex1Udiybs

//MISS https://www.youtube.com/watch?v=xHN3zSp6Ggg

// background noise potentally https://www.youtube.com/watch?v=FWdnm3CHato



//save variable for last hit