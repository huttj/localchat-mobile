angular.module('LocalChat')

    .controller('SettingsCtrl', function($scope, Auth) {
        console.log('SettingsCtrl loaded');
        $scope.settings = {
            username: Auth.session.username
        };
        $scope.changeUsername = function changeUsername(name) {
            console.log(name);
            if (!name) return;
            Auth.onSession('changeUsername', name);
        };
    });