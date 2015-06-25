angular.module('LocalChat')

    .controller('MainCtrl', function($scope, Auth, Location) {
        $scope.Location = Location;
    });