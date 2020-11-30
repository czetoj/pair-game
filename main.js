const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
const game = document.querySelector('.game');
const clock = document.querySelector('.clock');
const img = document.querySelectorAll('img');
const imgArray = Array.from(img);
let isStarted = false;
let hangingCards = [];
let result = 0;
let timer;

function start() {

    function shuffleImages(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleImages(cardsArray);
    game.textContent = ''
    cardsArray.forEach(card => {
        game.appendChild(card);
    })

    cards.forEach(card => card.addEventListener('click', handleClicked));

    function handleClicked(event) {
        isFirstClick()
        showImage(event);
        checkPairs();
        if (result === 5) { restart() }
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
                minute = "0" + minute;
            if (seconds < 10)
                seconds = "0" + seconds;
            clock.textContent = minute + ":" + seconds;
        }
    }

    function showImage(event) {
        event.target.firstChild.style.visibility = 'visible';
        event.target.firstChild.classList.add('open');
        hangingCards.push(event.target);
    }

    function checkPairs() {
        if (hangingCards.length === 2 && hangingCards[0].getAttribute('value') !== hangingCards[1].getAttribute('value')) {
            setTimeout(() => {
                hangingCards[0].firstChild.classList.remove('open');
                hangingCards[1].firstChild.classList.remove('open');
                hangingCards[0].firstChild.style.visibility = 'hidden';
                hangingCards[1].firstChild.style.visibility = 'hidden';
                hangingCards = [];
            }, 2000)
        } else if (hangingCards.length === 2) {
            hangingCards[0].classList.add('disabled');
            hangingCards[1].classList.add('disabled');
            hangingCards = [];
            result++;
        }
    }
}

start();

function restart() {
    clearInterval(timer);
    isStarted = false;
    result = 0;
    setTimeout(() => {
        start();
    }, 5000)
}