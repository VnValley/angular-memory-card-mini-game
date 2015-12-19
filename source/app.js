angular.module('app', ['engine']).controller('GameCtrl', function ($scope, $game) {
    $game.initialize();
    $scope.cards = $game.cards;
    $scope.clickCard = function (card) {
        $game.touch(card);
    };
});
