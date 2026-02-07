const symbols = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'];
let cards = [...symbols, ...symbols];

let score = 100;
let moves = 0;
let matches = 0;

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const movesDisplay = document.getElementById("moves");
const matchesDisplay = document.getElementById("matches");
const restartBtn = document.getElementById("restartBtn");

function initGame() {
    gameBoard.innerHTML = "";
    score = 100;
    moves = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    scoreDisplay.innerText = score;
    movesDisplay.innerText = moves;
    matchesDisplay.innerText = matches;

    cards.sort(() => 0.5 - Math.random());

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerText = "?";
        card.dataset.symbol = symbol;

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.innerText = this.dataset.symbol;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.innerText = moves;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matches++;
        matchesDisplay.innerText = matches;
        resetTurn();
        checkGameEnd();
    } else {
        score -= 4;
        scoreDisplay.innerText = score;
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "?";
            secondCard.innerText = "?";
            resetTurn();
            checkGameEnd();
        }, 800);
    }
}

function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function checkGameEnd() {
    if (matches === symbols.length) {
        alert("🎉 You won!");
    }
    if (score <= 0) {
        alert("❌ Game Over!");
        initGame();
    }
}

restartBtn.addEventListener("click", initGame);

initGame();
