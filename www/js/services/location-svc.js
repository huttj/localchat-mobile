angular.module('LocalChat')

    .factory('Location', function(Auth, Socket) {

        var L = {};

        L.locationSet     = false;
        L.currentLocation = 'Unknown Location';

        var settingLocation = false;
        L.setLocation = function () {
            if (settingLocation) return;
            settingLocation = true;

            var options = {};
            var watch = navigator.geolocation.watchPosition(success, failure, options);

            function success(position) {
                navigator.geolocation.clearWatch(watch);
                Auth.onSession('setLocation', {
                    coords: {
                        latitude  : position.coords.latitude,
                        longitude : position.coords.longitude
                    }
                }, function(locationName) {
                    L.currentLocation = locationName;
                    L.locationSet     =  true;
                });
                settingLocation = false;
            }

            function failure(error) {
                navigator.geolocation.clearWatch(watch);
                console.log(error);
                settingLocation = false;
            }
        };

        Socket.on('connect', function() {
            L.locationSet = false;
            L.setLocation();
        });

        return L;

    });