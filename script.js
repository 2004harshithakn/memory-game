// Greek alphabet symbols (pairs)
const symbols = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'];

// Create pairs of cards
let cards = [...symbols, ...symbols];

// Initial score
let score = 100;

// Variables to track card state
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Get HTML elements
const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create card elements dynamically
cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerText = "?";
    card.dataset.symbol = symbol;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

// Function to handle card flip
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
    checkMatch();
}

// Function to check if cards match
function checkMatch() {
   if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetTurn();
    checkGameEnd();
}
 else {
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

// Reset selected cards
function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Check if game is over
function checkGameEnd() {
    const flippedCards = document.querySelectorAll(".card.flipped");

    if (flippedCards.length === cards.length) {
        alert("🎉 You won! Final Score: " + score);
    }

    if (score <= 0) {
        alert("❌ Game Over! Score reached 0");
        location.reload();
    }
}
