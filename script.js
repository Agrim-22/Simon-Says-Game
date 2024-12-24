let gameSeq = [];
let userSeq = [];
let btns = ['yellow', 'red', 'green', 'blue'];
let started = false;
let level = 0;

let h2 = document.querySelector('h2');

// Start the game on touchstart
document.addEventListener("touchstart", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

// Function to flash a button for the game sequence
function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}

// Function to flash a button for the user's input
function userFlash(btn) {
    btn.classList.add('userflash');
    setTimeout(function () {
        btn.classList.remove('userflash');
    }, 250);
}

// Progress to the next level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Fix: Use 4 to include all colors
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    // Flash the button for the game sequence
    setTimeout(() => gameFlash(randBtn), 500); // Add delay for better UX
}

// Check the user's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Level up if all inputs match
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press anywhere to restart`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150);
        reset();
    }
}

// Handle button press by the user
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id'); // Get the button's ID
    userSeq.push(userColor);

    checkAns(userSeq.length - 1); // Check the user's input
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress); // Desktop click support
    btn.addEventListener('touchstart', btnPress); // Mobile touch support
}

// Reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
