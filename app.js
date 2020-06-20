(function() {
    let card = document.getElementsByClassName('card'),
        cards = [... card],
        matchedCard = document.getElementsByClassName('match'),
        openedCards = [];
    const deck = document.getElementById('card-deck');

    function shuffle(array)  {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function startGame() {
        cards = shuffle(cards);
        for (let i = 0; i < cards.length; i++) {
            cards.forEach((item) => deck.appendChild(item));
            cards[i].classList.remove('show', 'open', 'match', 'disabled');
        }

    }

    function displayCard(card) {
        card.classList.toggle('open');
        card.classList.toggle('show');
        card.classList.toggle('disabled');
    }

    function cardOpen() {
        displayCard(this);
        openedCards.push(this);
        if (openedCards.length === 2) {
            if (openedCards[0].type === openedCards[1].type) {
                matched();
            } else {
                unmatched();
            }
        }
        congratulations();
    }

    function matched() {
        openedCards[0].classList.add('match', 'disabled');
        openedCards[1].classList.add('match', 'disabled');
        openedCards[0].classList.remove('show', 'open', 'no-event');
        openedCards[1].classList.remove('show', 'open', 'no-event');
        openedCards = [];
    }

    function unmatched() {
        openedCards[0].classList.add('unmatched');
        openedCards[1].classList.add('unmatched');
        disable();
        setTimeout(() => {
            openedCards[0].classList.remove('show', 'open', 'no-event','unmatched');
            openedCards[1].classList.remove('show', 'open', 'no-event','unmatched');
            enable();
            openedCards = [];
        },1000);
    }

    function disable() {
        cards.filter((card) => card.classList.add('disabled'));
    }

    function enable() {
        cards.filter((card) => {
            card.classList.remove('disabled');
            for (let i = 0; i < matchedCard.length; i++){
                matchedCard[i].classList.add('disabled');
            }
        })
    }

    function congratulations() {
        if (matchedCard.length == 16){
           alert('Congratulations');
        };
    }

    cards.forEach((card) => card.addEventListener('click', cardOpen));

    startGame();
})();