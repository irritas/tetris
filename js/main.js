// Version 0.2

/*--- CONSTANTS ---*/

const color = {
    i: "deepskyblue",
    l: "blue",
    j: "orange",
    o: "yellow",
    s: "lime",
    z: "red",
    t: "darkviolet"
};


/*--- CLASSES ---*/

class Block {

}


/*--- STATE ---*/

let level;
let seconds;
let minutes;
let remainTime;
let lineScore;
let softScore;
let hardScore;
let remain;
let score;
let linesMade;
let nextBlock;
let savedBlock;
let currentBlock;
let board;


/*--- CACHE ---*/

const scoreEl = document.getElementById("score-value");
const levelEl = document.getElementById("level-value");
const linesEl = document.getElementById("lines-value");
const remainEl = document.getElementById("remain-value");
const lineScoreEl = document.getElementById("line-score");
const softScoreEl = document.getElementById("soft-score");
const hardScoreEl = document.getElementById("hard-score");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let qButton = document.getElementById("clockwise");
let wButton = document.getElementById("save");
let eButton = document.getElementById("counter");
let aButton = document.getElementById("left");
let sButton = document.getElementById("soft");
let dButton = document.getElementById("right");
let spaceButton = document.getElementById("hard");


/*--- LISTENERS ---*/

window.addEventListener("keydown", pressKey);
window.addEventListener("keyup", releaseKey);


/*--- FUNCTIONS ---*/

function pressKey(evt) {
    switch (evt.keyCode) {
        case 81:
            qButton.click();
            qButton.style.border = "inset lightgrey";
            qButton.style.backgroundColor = "lightgrey";
            break;
        case 87:
            wButton.click();
            wButton.style.border = "inset lightgrey";
            wButton.style.backgroundColor = "lightgrey";
            break;
        case 69:
            eButton.click();
            eButton.style.border = "inset lightgrey";
            eButton.style.backgroundColor = "lightgrey";
            break;
        case 65:
            aButton.click();
            aButton.style.border = "inset lightgrey";
            aButton.style.backgroundColor = "lightgrey";
            break;
        case 83:
            sButton.click();
            sButton.style.border = "inset lightgrey";
            sButton.style.backgroundColor = "lightgrey";
            break;
        case 68:
            dButton.click();
            dButton.style.border = "inset lightgrey";
            dButton.style.backgroundColor = "lightgrey";
            break;
        case 32:
            spaceButton.click();
            spaceButton.style.border = "inset lightgrey";
            spaceButton.style.backgroundColor = "lightgrey";
            break;
    }
}

function releaseKey(evt) {
    switch (evt.keyCode) {
        case 81:
            qButton.style.border = "outset white";
            qButton.style.backgroundColor = "white";
            break;
        case 87:
            wButton.click();
            wButton.style.border = "outset white";
            wButton.style.backgroundColor = "white";
            break;
        case 69:
            eButton.click();
            eButton.style.border = "outset white";
            eButton.style.backgroundColor = "white";
            break;
        case 65:
            aButton.click();
            aButton.style.border = "outset white";
            aButton.style.backgroundColor = "white";
            break;
        case 83:
            sButton.click();
            sButton.style.border = "outset white";
            sButton.style.backgroundColor = "white";
            break;
        case 68:
            dButton.click();
            dButton.style.border = "outset white";
            dButton.style.backgroundColor = "white";
            break;
        case 32:
            spaceButton.click();
            spaceButton.style.border = "outset white";
            spaceButton.style.backgroundColor = "white";
            break;
    }
}

function init(newLevel) {               // Every level change
    level = newLevel;                   // Current level
    lineScore = 1000 * level;           // Score per line
    softScore = 10 * level;             // Score per soft drop
    hardScore = 2 * softScore;          // Score for locking block
    remain = level * 5;                 // Target lines per level

    // Add next block

    if (level === 1) {                  // New game
        score = 0;
        linesMade = 0;
        seconds = 0;
        minutes = 0;
        
        // Add saved block

        board = [   // Matches drawn board
            [null, null, null, null, null, null, null, null, null, null], // Top row 0
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]  // Bottom row 19
        ];
    }

    render(level);
}

function render() {
    scoreEl.textContent = score;
    levelEl.textContent = level;
    linesEl.textContent = linesMade;
    remainEl.textContent = remain;
    lineScoreEl.textContent = lineScore;
    softScoreEl.textContent = softScore;
    hardScoreEl.textContent = hardScore;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds > 9 ? seconds : `0${seconds}`;

    // Add next block and saved block

    board.forEach((row, y) => {
        row.forEach((item, x) => {
            const currentEl = document.getElementById(`${y}-${x}`).style;
            if (item) {
                currentEl.borderColor = color[item];
                currentEl.backgroundColor = color[item];
            } else {
                currentEl.borderColor = "transparent";
                currentEl.backgroundColor = "transparent";
            }
        });
    });
}

init(1);