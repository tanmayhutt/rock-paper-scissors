const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
    moveNumber: 0
};

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

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    const buttonElement = document.querySelector('.js-auto-play-button');

    if (buttonElement.innerText === 'Auto Play') {
        buttonElement.innerText = 'Stop Playing'
        buttonElement.classList.add('stop-play-button')
    }
    else {
        buttonElement.innerText = 'Auto Play'
        buttonElement.classList.remove('stop-play-button')
    }
    if (!isAutoPlaying) {
        intervalId = setInterval(function () {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    score.moveNumber += 1;

    let result = '';
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

    if (result === 'You Win') {
        score.wins += 1;
    }
    else if (result === 'You Lose') {
        score.losses += 1
    }
    else if (result === 'Tie') {
        score.ties += 1
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    updateMoveNumberElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You
                <img src="images/${playerMove}-emoji.png" class="move-icon">
                <img src="images/${computerMove}-emoji.png" class="move-icon">
                Computer`;

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} ----- Losses: ${score.losses} ----- Ties: ${score.ties}`

}

function updateMoveNumberElement() {
    document.querySelector('.js-move-number')
        .innerHTML = `Move: ${score.moveNumber}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';


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
