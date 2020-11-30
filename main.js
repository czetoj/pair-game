let cards = document.querySelectorAll('.card');
let cardsArray = [...cards];
let game = document.querySelector('.game');
let clock = document.querySelector('.clock');
let isStarted = false;
let hangingCards;
let result = 0;
let timer;

function shuffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function start() {
    hangingCards = [];
    shuffleImages(cardsArray);
    game.textContent = ''
    cardsArray.forEach(card => {
        game.appendChild(card);
        card.firstChild.classList.remove('visible', 'open');
        card.classList.remove('disabled');
    })
}

start();

cards.forEach(card => card.addEventListener('click', handleClicked));

function handleClicked(event) {
    isFirstClick()
    showImage(event);
    checkPairs();
    if (result === 5) {
        restart()
    }
}

function isFirstClick() {
    if (!isStarted) {
        isStarted = true;
        startClock();
    }
}

function startClock() {
    timer = setInterval(countTimer, 1000);
    let totalSeconds = 0;
    function countTimer() {
        ++totalSeconds;
        let minute = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - (minute * 60);
        if (minute < 10)
            minute = `0${minute}`;
        if (seconds < 10)
            seconds = `0${seconds}`;
        clock.textContent = `${minute}:${seconds}`;
    }
}

function showImage(event) {
    event.target.firstChild.classList.add('visible', 'open');
    hangingCards.push(event.target);
}

function checkPairs() {
    if (hangingCards.length === 2 && hangingCards[0].getAttribute('value') !== hangingCards[1].getAttribute('value')) {
        cards.forEach(card => card.classList.add('disabled'));
        setTimeout(() => {
            hangingCards[0].firstChild.classList.remove('open');
            hangingCards[1].firstChild.classList.remove('open');
            hangingCards[0].firstChild.classList.remove('visible');
            hangingCards[1].firstChild.classList.remove('visible');
            cards.forEach(card => card.classList.remove('disabled'));
            hangingCards = [];
        }, 2000)
    } else if (hangingCards.length === 2) {
        hangingCards[0].classList.add('disabled');
        hangingCards[1].classList.add('disabled');
        hangingCards = [];
        result++;
    }
}

function restart() {
    clearInterval(timer);
    isStarted = false;
    result = 0;
    hangingCards = [];
    setTimeout(() => {
        start();
    }, 5000)
}