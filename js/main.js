// Version 1.5

/*--- CONSTANTS ---*/

const COLOR = {
    I: "deepskyblue",
    L: "blue",
    J: "orange",
    O: "yellow",
    S: "lime",
    Z: "red",
    T: "darkviolet"
};

const INITIALTIME = 120000; // 2 min for level 1
const MINSPEED = 100;       // Minimum speed
const DIFFICULTY = 5;       // Determines speed change


/*--- CLASSES ---*/

class Block {
    constructor() {
        this.type = null;
        this.orient = 0;
        this.content = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
    }

    // Rotate orientation
    rotate(dir) {
        if (dir === `clock`) {
            if (this.orient === 3) this.orient = 0;
            else this.orient++;
        } else {
            if (this.orient === 0) this.orient = 3;
            else this.orient--;
        }
        this.update();
    }

    // Update orientation
    update() {
        switch (this.orient) {
            case 0:
            case 1:
            case 2:
            case 3:
                this.content = [
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null]
                ];
                break;
        }
    }
}

class IBlock extends Block {
    constructor() {
        super();
        this.type = `I`;
        this.content = [
            [null, null, null, null],
            [`I`, `I`, `I`, `I`],
            [null, null, null, null],
            [null, null, null, null]
        ];
    }

    update() {
        switch (this.orient) {
            case 0:
            case 2:
                this.content = [
                    [null, null, null, null],
                    [`I`, `I`, `I`, `I`],
                    [null, null, null, null],
                    [null, null, null, null]
                ];
                break;
            case 1:
            case 3:
                this.content = [
                    [null, `I`, null, null],
                    [null, `I`, null, null],
                    [null, `I`, null, null],
                    [null, `I`, null, null]
                ];
                break;
        }
    }
}

class LBlock extends Block {
    constructor() {
        super();
        this.type = `L`;
        this.content = [
            [null, null, null, null],
            [`L`, `L`, `L`, null],
            [`L`, null, null, null],
            [null, null, null, null]
        ];
    }

    update() {
        switch (this.orient) {
            case 0:
                this.content = [
                    [null, null, null, null],
                    [`L`, `L`, `L`, null],
                    [`L`, null, null, null],
                    [null, null, null, null]
                ];
                break;
            case 1:
                this.content = [
                    [null, `L`, `L`, null],
                    [null, null, `L`, null],
                    [null, null, `L`, null],
                    [null, null, null, null]
                ];
                break;
            case 2:
                this.content = [
                    [null, null, null, null],
                    [null, null, `L`, null],
                    [`L`, `L`, `L`, null],
                    [null, null, null, null]
                ];
                break;
            case 3:
                this.content = [
                    [null, null, null, null],
                    [null, `L`, null, null],
                    [null, `L`, null, null],
                    [null, `L`, `L`, null]
                ];
                break;
        }
    }
}

class JBlock extends Block {
    constructor() {
        super();
        this.type = `J`;
        this.content = [
            [null, null, null, null],
            [null, `J`, `J`, `J`],
            [null, null, null, `J`],
            [null, null, null, null]
        ];
    }

    update() {
        switch (this.orient) {
            case 0:
                this.content = [
                    [null, null, null, null],
                    [null, `J`, `J`, `J`],
                    [null, null, null, `J`],
                    [null, null, null, null]
                ];
                break;
            case 1:
                this.content = [
                    [null, null, null, null],
                    [null, null, `J`, null],
                    [null, null, `J`, null],
                    [null, `J`, `J`, null]
                ];
                break;
            case 2:
                this.content = [
                    [null, null, null, null],
                    [null, `J`, null, null],
                    [null, `J`, `J`, `J`],
                    [null, null, null, null]
                ];
                break;
            case 3:
                this.content = [
                    [null, `J`, `J`, null],
                    [null, `J`, null, null],
                    [null, `J`, null, null],
                    [null, null, null, null]
                ];
                break;
        }
    }
}

class TBlock extends Block {
    constructor() {
        super();
        this.type = `T`;
        this.content = [
            [null, `T`, null, null],
            [`T`, `T`, `T`, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
    }

    update() {
        switch (this.orient) {
            case 0:
                this.content = [
                    [null, `T`, null, null],
                    [`T`, `T`, `T`, null],
                    [null, null, null, null],
                    [null, null, null, null]
                ];
                break;
            case 1:
                this.content = [
                    [null, `T`, null, null],
                    [null, `T`, `T`, null],
                    [null, `T`, null, null],
                    [null, null, null, null]
                ];
                break;
            case 2:
                this.content = [
                    [null, null, null, null],
                    [`T`, `T`, `T`, null],
                    [null, `T`, null, null],
                    [null, null, null, null]
                ];
                break;
            case 3:
                this.content = [
                    [null, `T`, null, null],
                    [`T`, `T`, null, null],
                    [null, `T`, null, null],
                    [null, null, null, null]
                ];
                break;
        }
    }
}

class OBlock extends Block {
    constructor() {
        super();
        this.type = `O`;
        this.content = [
            [`O`, `O`, null, null],
            [`O`, `O`, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];
    }

    update() {
        return;
    }
}

class SBlock extends Block {
    constructor() {
        super();
        this.type = `S`;
        this.content = [
            [null, null, null, null],
            [null, `S`, `S`, null],
            [`S`, `S`, null, null],
            [null, null, null, null]
        ];
    }

    update() {
        switch (this.orient) {
            case 0:
            case 2:
                this.content = [
                    [null, null, null, null],
                    [null, `S`, `S`, null],
                    [`S`, `S`, null, null],
                    [null, null, null, null]
                ];
                break;
            case 1:
            case 3:
                this.content = [
                    [null, `S`, null, null],
                    [null, `S`, `S`, null],
                    [null, null, `S`, null],
                    [null, null, null, null]
                ];
                break;
        }
    }
}

class ZBlock extends Block {
    constructor() {
        super();
        this.type = `Z`;
        this.content = [
            [null, null, null, null],
            [`Z`, `Z`, null, null],
            [null, `Z`, `Z`, null],
            [null, null, null, null]
        ];
    }

    update() {
        switch (this.orient) {
            case 0:
            case 2:
                this.content = [
                    [null, null, null, null],
                    [`Z`, `Z`, null, null],
                    [null, `Z`, `Z`, null],
                    [null, null, null, null]
                ];
                break;
            case 1:
            case 3:
                this.content = [
                    [null, null, `Z`, null],
                    [null, `Z`, `Z`, null],
                    [null, `Z`, null, null],
                    [null, null, null, null]
                ];
                break;
        }
    }
}


/*--- STATE ---*/

// For game
let level;
let speed;
let lineScore;
let softScore;
let hardScore;
let remain;
let multiply;
let score;
let linesMade;
let nextBlock;
let savedBlock;
let curBlock;
let board;
let curX;
let curY;
let gameState;
let levelComplete;


/*--- CACHE ---*/

const scoreEl = document.getElementById("score-value");
const levelEl = document.getElementById("level-value");
const linesEl = document.getElementById("lines-value");
const remainEl = document.getElementById("remain-value");
const lineScoreEl = document.getElementById("line-score");
const softScoreEl = document.getElementById("soft-score");
const hardScoreEl = document.getElementById("hard-score");
const multiplyEl = document.getElementById("multiply");

const qButton = document.getElementById("clockwise");
const wButton = document.getElementById("save");
const eButton = document.getElementById("counter");
const aButton = document.getElementById("left");
const sButton = document.getElementById("soft");
const dButton = document.getElementById("right");
const spaceButton = document.getElementById("hard");
const beginButton = document.getElementById("begin");
const restartButton = document.getElementById("restart");

const introElStyle = document.getElementById("intro").style;
const endElStyle = document.getElementById("end").style;
const gameElStyle = document.querySelector("main").style;
const controlsElStyle = document.getElementById("controls").style;

const bgmCheck = document.getElementById("music");
const bgmPlayer = document.getElementById("bg-player");

const endScoreEl = document.getElementById("new-score");
const highScoreEl = document.getElementById("current-high");
const newHighEl = document.getElementById("new-high");


/*--- LISTENERS ---*/

// Audio toggle

bgmPlayer.volume = 0.01;

bgmCheck.addEventListener("change", () => {
    !bgmCheck.checked ? bgmPlayer.play() : bgmPlayer.pause();
    bgmCheck.blur();
});

// New game buttons
beginButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Add main game listeners
function addListen() {
    window.addEventListener("keydown", pressKey);
    window.addEventListener("keyup", releaseKey);

    qButton.addEventListener("click", rotateCounter);
    wButton.addEventListener("click", saveBlock);
    eButton.addEventListener("click", rotateClock);
    aButton.addEventListener("click", moveLeft);
    sButton.addEventListener("click", pressS);
    dButton.addEventListener("click", moveRight);
    spaceButton.addEventListener("click", hardDrop);

    if (isTouch()) {
        qButton.addEventListener("touchstart", touchStart);
        wButton.addEventListener("touchstart", touchStart);
        eButton.addEventListener("touchstart", touchStart);
        aButton.addEventListener("touchstart", touchStart);
        sButton.addEventListener("touchstart", touchStart);
        dButton.addEventListener("touchstart", touchStart);
        spaceButton.addEventListener("touchstart", touchStart);

        qButton.addEventListener("touchend", touchEnd);
        wButton.addEventListener("touchend", touchEnd);
        eButton.addEventListener("touchend", touchEnd);
        aButton.addEventListener("touchend", touchEnd);
        sButton.addEventListener("touchend", touchEnd);
        dButton.addEventListener("touchend", touchEnd);
        spaceButton.addEventListener("touchend", touchEnd);
    } else {
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
    }

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
}

// Remove main game listeners
function removeListen() {
    window.removeEventListener("keydown", pressKey);

    qButton.removeEventListener("click", rotateCounter);
    wButton.removeEventListener("click", saveBlock);
    eButton.removeEventListener("click", rotateClock);
    aButton.removeEventListener("click", moveLeft);
    sButton.removeEventListener("click", pressS);
    dButton.removeEventListener("click", moveRight);
    spaceButton.removeEventListener("click", hardDrop);

    qButton.removeEventListener("touchstart", touchStart);
    wButton.removeEventListener("touchstart", touchStart);
    eButton.removeEventListener("touchstart", touchStart);
    aButton.removeEventListener("touchstart", touchStart);
    sButton.removeEventListener("touchstart", touchStart);
    dButton.removeEventListener("touchstart", touchStart);
    spaceButton.removeEventListener("touchstart", touchStart);

    qButton.removeEventListener("mouseover", mouseOver);
    wButton.removeEventListener("mouseover", mouseOver);
    eButton.removeEventListener("mouseover", mouseOver);
    aButton.removeEventListener("mouseover", mouseOver);
    sButton.removeEventListener("mouseover", mouseOver);
    dButton.removeEventListener("mouseover", mouseOver);
    spaceButton.removeEventListener("mouseover", mouseOver);

    qButton.removeEventListener("mousedown", mouseDown);
    wButton.removeEventListener("mousedown", mouseDown);
    eButton.removeEventListener("mousedown", mouseDown);
    aButton.removeEventListener("mousedown", mouseDown);
    sButton.removeEventListener("mousedown", mouseDown);
    dButton.removeEventListener("mousedown", mouseDown);
    spaceButton.removeEventListener("mousedown", mouseDown);
}

// Translate soft drop input
function pressS() {
    softDrop(true);
}

// Hover highlight
function mouseOver(evt) {
    evt.target.style.backgroundColor = "lightgrey";
}

// Revert hover
function mouseOut(evt) {
    evt.target.style.backgroundColor = "white";
}

// Button press animation
function mouseDown(evt) {
    evt.target.style.border = "inset lightgrey";
}

function touchStart(evt) {
    evt.target.style.border = "inset lightgrey";
    evt.target.style.backgroundColor = "lightgrey";
}

// Revert button press
function mouseUp(evt) {
    evt.target.style.border = "outset white";
    evt.target.blur();
}

function touchEnd(evt) {
    evt.target.style.border = "outset white";
    evt.target.style.backgroundColor = "white";
    evt.target.blur();
}

// Key press
function pressKey(evt) {
    switch (evt.keyCode) {
        case 81:
            rotateCounter();
            qButton.style.border = "inset lightgrey";
            qButton.style.backgroundColor = "lightgrey";
            break;
        case 87:
            saveBlock();
            wButton.style.border = "inset lightgrey";
            wButton.style.backgroundColor = "lightgrey";
            break;
        case 69:
            rotateClock();
            eButton.style.border = "inset lightgrey";
            eButton.style.backgroundColor = "lightgrey";
            break;
        case 65:
            moveLeft();
            aButton.style.border = "inset lightgrey";
            aButton.style.backgroundColor = "lightgrey";
            break;
        case 83:
            pressS();
            sButton.style.border = "inset lightgrey";
            sButton.style.backgroundColor = "lightgrey";
            break;
        case 68:
            moveRight();
            dButton.style.border = "inset lightgrey";
            dButton.style.backgroundColor = "lightgrey";
            break;
        case 32:
            hardDrop();
            spaceButton.style.border = "inset lightgrey";
            spaceButton.style.backgroundColor = "lightgrey";
            break;
    }
}

// Key release
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


/*--- MAIN FUNCTIONS ---*/

// Initializer, pass in level
function init(newLevel) {
    level = newLevel;           // Current level
    levelComplete = false;

    // Set drop speed
    speed = 1000 - DIFFICULTY ** (level - 1);
    if (speed < MINSPEED) speed = MINSPEED;

    lineScore = 1000 * level;   // Score per line
    softScore = 10 * level;     // Score per soft drop
    hardScore = 2 * softScore;  // Score for locking block
    remain = 2 + level * 2;     // Target lines per level
    multiply = level / 10 + 1;  // Combo multiplier

    // New game
    if (level === 1) {
        gameState = true;
        score = 0;
        linesMade = 0;
        curX = 3;
        curY = 0;

        // Create new board
        board = [];
        for (let i = 0; i < 20; i++) board.push([null, null, null, null, null, null, null, null, null, null]);

        // Set initial blocks
        randNextBlock();
        curBlock = nextBlock;
        randNextBlock();
        savedBlock = new Block();
    }

    drawCurBlock();
}


/*--- BLOCK MOVEMENT ---*/

function moveLeft() {
    if (!gameState) return 0;   // Limit input
    eraseCurBlock();
    if (valid(curBlock.content, curY, curX - 1)) {
        curX--;
        drawCurBlock();
        return true;
    }
    return false;
}

function moveRight() {
    if (!gameState) return 0;   // Limit input
    eraseCurBlock();
    if (valid(curBlock.content, curY, curX + 1)) {
        curX++;
        drawCurBlock();
        return true;
    }
    return false;
}

function rotateCounter() {
    if (!gameState) return 0;   // Limit input
    eraseCurBlock();
    curBlock.rotate(`counter`);
    if (!valid(curBlock.content, curY, curX)) curBlock.rotate(`clock`);
    drawCurBlock();
}

function rotateClock() {
    if (!gameState) return 0;   // Limit input
    eraseCurBlock();
    curBlock.rotate(`clock`);
    if (!valid(curBlock.content, curY, curX)) curBlock.rotate(`counter`);
    drawCurBlock();
}

// Drop block 1 line
function softDrop(manual) {
    if (!gameState) return 0;   // Limit input
    eraseCurBlock();
    if (valid(curBlock.content, curY + 1, curX)) {
        curY++;
        if (manual) score += softScore;
        drawCurBlock();
        return 0;
    } else return lockBlock();
}

// Drop block max
function hardDrop() {
    if (!gameState) return 0;   // Limit input
    while (7) {
        if (softDrop(true)) return;
    }
}


/*--- GAME LOGIC ---*/

// Finish block
function lockBlock() {
    score += hardScore;
    drawCurBlock();
    checkLines();
    curX = 3;
    curY = 0;
    curBlock = nextBlock;
    randNextBlock();

    // Game over
    if (!valid(curBlock.content, curY, curX)) {
        gameState = false;
        return -1;
    }

    drawCurBlock();
    return 1;
}

// Check for line completions
function checkLines() {
    let total = 0;
    for (let i = 0; i < board.length; i++) {
        if (!board[i].includes(null)) {
            total++;
            board.splice(i, 1);
            board.unshift([null, null, null, null, null, null, null, null, null, null]);
            i--;
        }
    }
    score += Math.floor(total * lineScore * multiply ** (total - 1));
    linesMade += total;
    remain -= total;
    if (remain < 1) {
        levelComplete = true;
        remain = 0;
    }
    render();
}

// Choose a random next block
function randNextBlock() {
    const num = Math.floor(Math.random() * 7);
    switch (num) {
        case 0:
            nextBlock = new IBlock();
            return;
        case 1:
            nextBlock = new LBlock();
            return;
        case 2:
            nextBlock = new JBlock();
            return;
        case 3:
            nextBlock = new OBlock();
            return;
        case 4:
            nextBlock = new SBlock();
            return;
        case 5:
            nextBlock = new ZBlock();
            return;
        case 6:
            nextBlock = new TBlock();
            return;
    }
}

// Draw current block, renders
function drawCurBlock() {
    let boardY = curY;
    for (let blockY = 0; blockY < 4; blockY++) {
        let boardX = curX;
        if (boardY >= 0 && boardY < 20) {
            for (let blockX = 0; blockX < 4; blockX++) {
                if (boardX >= 0 && boardX < 10 && !board[boardY][boardX]) board[boardY][boardX] = curBlock.content[blockY][blockX];
                boardX++;
            }
        }
        boardY++;
    }
    render();
}

// Erase current block, doesn't render
function eraseCurBlock() {
    let boardY = curY;
    for (let blockY = 0; blockY < 4; blockY++) {
        let boardX = curX;
        if (boardY >= 0 && boardY < 20) {
            for (let blockX = 0; blockX < 4; blockX++) {
                if (boardX >= 0 && boardX < 10 && curBlock.content[blockY][blockX]) board[boardY][boardX] = null;
                boardX++;
            }
        }
        boardY++;
    }
}

// Check if block is in valid place
function valid(blockContent, y, x) {
    let boardY = y;
    for (let blockY = 0; blockY < 4; blockY++) {
        let boardX = x;
        for (let blockX = 0; blockX < 4; blockX++) {
            // Check out of bounds
            if (blockContent[blockY][blockX] && (boardY < 0 || boardY > 19 || boardX < 0 || boardX > 9)) return false;
            
            // Check if board already has content
            if (blockContent[blockY][blockX] && board[boardY][boardX]) return false;

            boardX++;
        }
        boardY++;
    }
    return true;
}

// Save next block to saved block or vice versa
function saveBlock() {
    if (!savedBlock.type) {
        savedBlock = nextBlock;
        randNextBlock();
    }
    else {
        tempBlock = nextBlock;
        nextBlock = savedBlock;
        savedBlock = tempBlock;
    }
    render();
}

// Main game function
function play(newLevel) {
    init(newLevel);
    const gameTick = setInterval(() => {
        // Game over
        if (softDrop(false) < 0 || !gameState) {
            gameOver();
            clearInterval(gameTick);
            return;
        }

        // Complete level
        if (levelComplete) {
            clearInterval(gameTick);
            play(level + 1);
        }

        render();
    }, speed);
}

// Primary render function
function render() {
    scoreEl.textContent = score < 999999 ? score : Number.parseFloat(score).toExponential(1);
    levelEl.textContent = level;
    linesEl.textContent = linesMade;
    remainEl.textContent = remain;
    lineScoreEl.textContent = ` ${lineScore}`;
    softScoreEl.textContent = ` ${softScore}`;
    hardScoreEl.textContent = ` ${hardScore}`;
    multiplyEl.textContent = `${multiply} `;

    // Add next block and saved block
    nextBlock.content.forEach((row, y) => {
        row.forEach((item, x) => {
            const currentEl = document.getElementById(`next-${y}-${x}`).style;
            if (item) {
                currentEl.borderColor = COLOR[item];
                currentEl.backgroundColor = COLOR[item];
            } else {
                currentEl.borderColor = "transparent";
                currentEl.backgroundColor = "transparent";
            }
        });
    });

    savedBlock.content.forEach((row, y) => {
        row.forEach((item, x) => {
            const currentEl = document.getElementById(`saved-${y}-${x}`).style;
            if (item) {
                currentEl.borderColor = COLOR[item];
                currentEl.backgroundColor = COLOR[item];
            } else {
                currentEl.borderColor = "transparent";
                currentEl.backgroundColor = "transparent";
            }
        });
    });

    board.forEach((row, y) => {
        row.forEach((item, x) => {
            const currentEl = document.getElementById(`${y}-${x}`).style;
            if (item) {
                currentEl.borderColor = COLOR[item];
                currentEl.backgroundColor = COLOR[item];
            } else {
                currentEl.borderColor = "transparent";
                currentEl.backgroundColor = "transparent";
            }
        });
    });
}

// Start a new game
function startGame() {
    introElStyle.display = "none";
    endElStyle.display = "none";
    gameElStyle.display = "grid";
    controlsElStyle.display = "grid";
    lsEnable = lsTest();
    fetchHighScore();
    play(1);
    beginButton.blur();
    restartButton.blur();
    addListen();
}

// Game over
function gameOver() {
    removeListen();
    gameState = false;
    endElStyle.display = "block";
    endScoreEl.textContent = ` ${score}`;

    // Save high score
    if (lsEnable) {
        highScoreEl.textContent = ` ${highScore}`;
        if (score > highScore) {
            newHighEl.textContent = "New high score!";
            saveHighScore();
        } else newHighEl.textContent = "Better luck next time!";
    } else {
        highScoreEl.textContent = "???";
        newHighEl.textContent = "Cookies disabled!";
    }
}

function isTouch() {  
    try {  
      document.createEvent("TouchEvent");  
      return true;  
    } catch (e) {  
      return false;  
    }  
}


/*--- STORAGE ---*/

// Check if localStorage enabled
let lsEnable;

function lsTest(){
    let test = `test`;
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(err) {
        return false;
    }
}

// Fetch high Score
let highScore;

function fetchHighScore() {
    if (lsEnable) {
        highScore = localStorage.getItem("highScore");
        if (!highScore) highScore = 0;
    }
}

// Save new high score
function saveHighScore() {
    localStorage.setItem("highScore", score);
}