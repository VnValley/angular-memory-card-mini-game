angular.module('engine').service('$game', ['$rootScope', '$cardGenerator', '$turn', '$timeout', function ($rootScope, $cardGenerator, $turn, $timeout) {
    /**
     * List of cards during the game
     * @type {Card[]}
     */
    this.cards = [];

    this.initialize = function () {
        // Generate cards
        this.cards = $cardGenerator(4);
        return this;
    };

    /**
     * Handle when user's touch a card
     *
     * @param card
     */
    this.touch = function (card) {

        // Toggle the card
        card.toggle();

        // If the card is flipped, set it to the turn
        if (card.flipped) {
            $turn.setCard(card);
        }

        this.checkForWin();
    };

    /**
     * Check if the current game goes to win state.
     */
    this.checkForWin = function () {
        var shouldWin = true;
        angular.forEach(this.cards, function (card) {
            if (!card.archived) {
                shouldWin = false;
            }
        });
        if (shouldWin) {
            $timeout().then(function () {
                // Broadcasting the win event of other module
                // to hadling it.
                $rootScope.$broadcast('game.win');
            });
        }
    };
}]);