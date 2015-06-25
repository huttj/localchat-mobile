angular.module('LocalChat')

    .factory('Socket', function($rootScope) {

        var S = {};

        var socket = io.connect('http://localhost:5000');

        S.on = function on(event, callback) {
            socket.on(event, function(payload) {
                console.log('on', event);
                $rootScope.$apply(function() {
                    callback(payload);
                });
            });
        };
        
        S.emit = function emit(event, payload, callback) {
            console.log('emit', event);
            if (callback) {
                payload.callback = true;
                socket.emit(event, payload, function emitCallback() {
                    var args = Array.prototype.slice.call(arguments);
                    $rootScope.$apply(function() {
                        callback.apply(null, args);
                    });
                });
            } else {
                socket.emit(event, payload);
            }
        };

        return S;

    });