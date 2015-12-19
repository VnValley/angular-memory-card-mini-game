angular.module('engine').service('$cardGenerator', ['Card', function (Card) {

    /**
     * Generate pairs of card that has the same identities, then shuffle them.
     */
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
