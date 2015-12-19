var engine = angular.module('engine', []);

engine.factory('Card', function () {

    var Card = function (identity) {
        this.identity = identity;
    };

    Card.prototype.flipped  = false;
    Card.prototype.pick     = function () {
        if (!this.archived) {
            this.flipped = true;
        }
    };
    Card.prototype.unpick   = function () {
        if (!this.archived) {
            this.flipped = false;
        }
    };
    Card.prototype.toggle   = function () {
        if (!this.archived) {
            this.flipped = !this.flipped;
        }
    };
    Card.prototype.archive = function () {
        this.flipped  = true;
        this.archived = true;
    };
    return ( Card );
});

engine.service('$turn', function () {
    this.cards = [];

    this.setCard = function (card) {

        if (2 == this.cards.length) {
            if (this.cards[0].identity == this.cards[1].identity) {
                this.cards[0].archive();
                this.cards[1].archive();
            } else {
                this.cards[0].unpick();
                this.cards[1].unpick();
                // Reset and push a new card
                this.cards = [card];
            }

        }
        return this;
    };

    this.reset = function () {
        this.cards = [];
        return this;
    }
});

engine.service('$cardGenerator', ['Card', function (Card) {


    return function (numberOfCard) {
        // A pair of card should has same identity
        var identity = 0;
        var generatedCards = [];
        var halfNumberOfCard = Math.floor(numberOfCard / 2);
        for (; identity < halfNumberOfCard; identity++) {
            generatedCards.push(new Card(identity));
            generatedCards.push(new Card(identity));
        }
        // If the number of card is an odd number
        // then push anther card in to the card stack
        if (generatedCards.length < numberOfCard) {
            generatedCards.push(new Card(identity));
        }

        // Shuffle the generated cards
        var j = 0, temp = null;
        for (var i = generatedCards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = generatedCards[i];
            generatedCards[i] = generatedCards[j];
            generatedCards[j] = temp
        }
        return generatedCards;
    };
}]);

engine.service('$game', ['$rootScope', '$cardGenerator', '$turn', function ($rootScope, $cardGenerator, $turn) {
    this.cards = [];
    this.flippedCount = 0;

    this.initialize = function () {
        // Generate cards
        this.cards = $cardGenerator(5*5);
        return this;
    };

    this.touch = function (card) {

        // Toggle the card
        card.toggle();

        // If the card is flipped, set it to the turn
        if (card.flipped) {
            this.flippedCount++;
            $turn.setCard(card);
        }
        this.checkForWin();
    };

    this.checkForWin = function () {
        var shouldWin = true;
        angular.forEach(this.cards, function (card) {
            if (!card.archived) {
                shouldWin = false;
            }
        });
        if (shouldWin) {
            $scope.$broadcast('game.win');
        }
    };
}]);