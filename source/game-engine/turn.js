/**
 * Represent a `pick` turn
 */
angular.module('engine').service('$turn', ['$timeout', function ($timeout) {
    this.cards = [];

    /**
     * Set a card to turn
     *
     * @param card
     * @returns {*}
     */
    this.setCard = function (card) {
        this.cards.push(card);
        if (2 == this.cards.length) {
            if (this.cards[0].identity == this.cards[1].identity) {
                this.cards[0].archive();
                this.cards[1].archive();
            }
            var card1 = this.cards[0];
            var card2 = this.cards[1];
            $timeout(500).then(function () {
                card1.unpick();
                card2.unpick();
            });
            this.cards = [];
        }
        return this;
    };

}]);