// Version 0.3

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

INITIALTIME = 120000;   // 2 min for level 1
MINTIME = 10000;        // 10 sec min per level

// Empty row
NEWROW = [null, null, null, null, null, null, null, null, null, null];


/*--- CLASSES ---*/

class Block {

}


/*--- STATE ---*/

let level;
let seconds;
let minutes;
let maxTime;
let lineScore;
let softScore;
let hardScore;
let remain;
let multiply;
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
const multiplyEl = document.getElementById("multiply");

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

qButton.addEventListener("mouseover", mouseOver);
wButton.addEventListener("mouseover", mouseOver);
eButton.addEventListener("mouseover", mouseOver);
aButton.addEventListener("mouseover", mouseOver);
sButton.addEventListener("mouseover", mouseOver);
dButton.addEventListener("mouseover", mouseOver);
spaceButton.addEventListener("mouseover", mouseOver);

qButton.addEventListener("mouseout", mouseOut);
wButton.addEventListener("mouseout", mouseOut);
eButton.addEventListener("mouseout", mouseOut);
aButton.addEventListener("mouseout", mouseOut);
sButton.addEventListener("mouseout", mouseOut);
dButton.addEventListener("mouseout", mouseOut);
spaceButton.addEventListener("mouseout", mouseOut);

qButton.addEventListener("mousedown", mouseDown);
wButton.addEventListener("mousedown", mouseDown);
eButton.addEventListener("mousedown", mouseDown);
aButton.addEventListener("mousedown", mouseDown);
sButton.addEventListener("mousedown", mouseDown);
dButton.addEventListener("mousedown", mouseDown);
spaceButton.addEventListener("mousedown", mouseDown);

qButton.addEventListener("mouseup", mouseUp);
wButton.addEventListener("mouseup", mouseUp);
eButton.addEventListener("mouseup", mouseUp);
aButton.addEventListener("mouseup", mouseUp);
sButton.addEventListener("mouseup", mouseUp);
dButton.addEventListener("mouseup", mouseUp);
spaceButton.addEventListener("mouseup", mouseUp);

qButton.addEventListener("click", pressQ);
wButton.addEventListener("click", pressW);
eButton.addEventListener("click", pressE);
aButton.addEventListener("click", pressA);
sButton.addEventListener("click", pressS);
dButton.addEventListener("click", pressD);
spaceButton.addEventListener("click", pressSpace);


/*--- FUNCTIONS ---*/

// Hover highlight
function mouseOver(evt) {
    evt.target.style.backgroundColor = "lightgrey";
}

function mouseOut(evt) {
    evt.target.style.backgroundColor = "white";
}

// Button animation
function mouseDown(evt) {
    evt.target.style.border = "inset lightgrey";
}

function mouseUp(evt) {
    evt.target.style.border = "outset white";
    evt.target.blur();
}

// Keypress alternative
function pressKey(evt) {
    switch (evt.keyCode) {
        case 81:
            pressQ();
            qButton.style.border = "inset lightgrey";
            qButton.style.backgroundColor = "lightgrey";
            break;
        case 87:
            pressW();
            wButton.style.border = "inset lightgrey";
            wButton.style.backgroundColor = "lightgrey";
            break;
        case 69:
            pressE();
            eButton.style.border = "inset lightgrey";
            eButton.style.backgroundColor = "lightgrey";
            break;
        case 65:
            pressA();
            aButton.style.border = "inset lightgrey";
            aButton.style.backgroundColor = "lightgrey";
            break;
        case 83:
            pressS();
            sButton.style.border = "inset lightgrey";
            sButton.style.backgroundColor = "lightgrey";
            break;
        case 68:
            pressD();
            dButton.style.border = "inset lightgrey";
            dButton.style.backgroundColor = "lightgrey";
            break;
        case 32:
            pressSpace();
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
            wButton.style.border = "outset white";
            wButton.style.backgroundColor = "white";
            break;
        case 69:
            eButton.style.border = "outset white";
            eButton.style.backgroundColor = "white";
            break;
        case 65:
            aButton.style.border = "outset white";
            aButton.style.backgroundColor = "white";
            break;
        case 83:
            sButton.style.border = "outset white";
            sButton.style.backgroundColor = "white";
            break;
        case 68:
            dButton.style.border = "outset white";
            dButton.style.backgroundColor = "white";
            break;
        case 32:
            spaceButton.style.border = "outset white";
            spaceButton.style.backgroundColor = "white";
            break;
    }
}

// Input translation
function pressQ() {
    console.log(`click Q`);
}

function pressW() {
    console.log(`click W`);
}

function pressE() {
    console.log(`click E`);
}

function pressA() {
    console.log(`click A`);
}

function pressS() {
    console.log(`click S`);
}

function pressD() {
    console.log(`click D`);
}

function pressSpace() {
    console.log(`click SPACE`);
}


// Initializer, pass in level
function init(newLevel) {
    level = newLevel;   // Current level
    
    // Set level timer
    maxTime = INITIALTIME - (5000 * (level - 1));   // Lose 5 seconds per level
    if (maxTime < MINTIME) maxTime = 10000;         // Enforce minimum time
    
    // Adjust minutes and seconds display
    minutes = 0;
    if (maxTime > 60000) {                          
        while (minutes * 60000 <= maxTime - 60000) minutes++;
        seconds = (maxTime % 60000) / 1000;
    } else seconds = maxTime / 1000;

    lineScore = 1000 * level;   // Score per line
    softScore = 10 * level;     // Score per soft drop
    hardScore = 2 * softScore;  // Score for locking block
    remain = level * 5;         // Target lines per level
    multiply = level / 10 + 1;  // Combo multiplier

    // Create next block

    // New game
    if (level === 1) {
        score = 0;
        linesMade = 0;
        
        // Empty saved block

        // Create new board
        board = [];
        for (let i = 0; i < 20; i++) board.push(NEWROW);
    }

    render(level);
}

// Check for line completions
function checkLines() {
    let total = 0;
    for (let i = 0; i < board.length; i++) {
        if (!board[i].includes(null)) {
            total++;
            board.splice(i, 1);
            board.unshift(NEWROW);
        }
    }
    score += total * lineScore * multiply ** (total - 1);
    linesMade += total;
    remain -= total;
    if (remain < 1) {
        console.log(`next level`);
    }
}

// Primary render function
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
    multiplyEl.textContent = multiply;

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

let testLine = ['s', 's', 's', 's', 's', 's', 's', 's', 's', 's'];