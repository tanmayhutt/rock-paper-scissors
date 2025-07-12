// Load score from localStorage or create default score object
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    moveNumber: 0
};

// Initialize the display with current score
updateScoreElement();
updateMoveNumberElement();

/*
if (!score) {    score === null
     score = {
         wins: 0,
         losses: 0,
         ties: 0
     };interval
 }*/

// Variables to control auto-play functionality
let isAutoPlaying = false;
let intervalId;

// Function to toggle auto-play mode
function autoPlay() {
    const buttonElement = document.querySelector('.js-auto-play-button');

    // Toggle button text and styling
    if (buttonElement.innerText === 'Auto Play') {
        buttonElement.innerText = 'Stop Playing'
        buttonElement.classList.add('stop-play-button')
    }
    else {
        buttonElement.innerText = 'Auto Play'
        buttonElement.classList.remove('stop-play-button')
    }

    // Start or stop the auto-play interval
    if (!isAutoPlaying) {
        intervalId = setInterval(() => { //setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000); // Play every 1 second
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

// Event listeners for game buttons
document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

// Reset score button event listener
document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        score.moveNumber = 0;
        localStorage.removeItem('score'); // Clear saved score
        updateScoreElement();
        updateMoveNumberElement();
    });

// Auto-play button event listener
document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

// Keyboard shortcuts for the game
document.body.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key); // Debug line

    if (event.key === 'r') {
        playGame('rock');
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'Enter') {
        autoPlay();
    }
    else if (event.key === 'Delete') {
        // Reset score using keyboard shortcut
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        score.moveNumber = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        updateMoveNumberElement();
    }
});

// Main game logic function
function playGame(playerMove) {
    const computerMove = pickComputerMove();

    score.moveNumber += 1; // Increment move counter

    let result = '';

    // Determine game result based on player and computer moves
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose';
        }
        else if (computerMove === 'paper') {
            result = 'You Win';
        }
        else if (computerMove === 'scissors') {
            result = 'Tie';
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win';
        }
        else if (computerMove === 'paper') {
            result = 'Tie';
        }
        else if (computerMove === 'scissors') {
            result = 'You Lose';
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'You Lose';
        }
        else if (computerMove === 'scissors') {
            result = 'You Win';
        }
    }

    // Update score based on result
    if (result === 'You Win') {
        score.wins += 1;
    }
    else if (result === 'You Lose') {
        score.losses += 1
    }
    else if (result === 'Tie') {
        score.ties += 1
    }

    // Save score to localStorage for persistence
    localStorage.setItem('score', JSON.stringify(score));

    // Update the display
    updateScoreElement();
    updateMoveNumberElement();

    // Show game result
    document.querySelector('.js-result')
        .innerHTML = result;

    // Show move comparison with emojis
    document.querySelector('.js-moves')
        .innerHTML = `You
                <img src="images/${playerMove}-emoji.png" class="move-icon">
                <img src="images/${computerMove}-emoji.png" class="move-icon">
                Computer`;

}

// Function to update the score display
function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} ----- Losses: ${score.losses} ----- Ties: ${score.ties}`

}

// Function to update the move counter display
function updateMoveNumberElement() {
    document.querySelector('.js-move-number')
        .innerHTML = `Move: ${score.moveNumber}`;
}

// Function to randomly pick computer's move
function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    // Divide random number into thirds for equal probability
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}
