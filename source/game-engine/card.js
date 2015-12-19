angular.module('engine').factory('Card', function () {

    /**
     *
     * @param identity
     * @constructor
     */
    var Card = function (identity) {
        this.identity = identity;
    };

    /**
     * Identify if the card is flipped.
     *
     * @type {boolean}
     */
    Card.prototype.flipped  = false;

    /**
     * Set this card become flipped
     */
    Card.prototype.pick     = function () {
        if (!this.archived) {
            this.flipped = true;
        }
    };

    /**
     * Set this card become un-flipped
     */
    Card.prototype.unpick   = function () {
        if (!this.archived) {
            this.flipped = false;
        }
    };

    /**
     * Toggle the card flipped/un-flipped state
     */
    Card.prototype.toggle   = function () {
        if (!this.archived) {
            this.flipped = !this.flipped;
        }
    };

    /**
     * Mark this card is archived (no toggle, pick, un-pick available)
     */
    Card.prototype.archive = function () {
        this.flipped  = true;
        this.archived = true;
    };

    return ( Card );
});
