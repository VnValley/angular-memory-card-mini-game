angular.module('app', ['engine']).controller('GameCtrl', ['$scope', '$game', function ($scope, $game) {

    $game.initialize();

    $scope.cards     = $game.cards;
    $scope.clickCard = function (card) {
        $game.touch(card);
    };

    $scope.$on('game.win', function () {
        alert('Congratulation! You\'ve found awesome developers :)');
    })
}]);
