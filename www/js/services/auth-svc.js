angular.module('LocalChat')

    .factory('Auth', function(Socket, $state) {

        var A = {};
        A.session = JSON.parse(window.localStorage.getItem('localchat.session')) || {};
        var onSessionEvents   = {};
        var withSessionEvents = [];

        function processPendingEvents() {
            while (withSessionEvents.length) {
                var event = withSessionEvents.unshift();
                Socket.emit(event.event, event.packet, event.callback);
            }

            for (var key in onSessionEvents) {
                if (onSessionEvents[key]) {
                    var event = onSessionEvents[key];
                    Socket.emit(event.event, event.packet, event.callback);
                    onSessionEvents[key] = null;
                }
            }
        }

        Socket.on('connect', function() {
            console.log('authenticating');
            Socket.emit('authenticate', A.session, function(err, authenticated) {
                console.log(authenticated);
                if (authenticated) {
                    $state.go('tabs.chat');
                    processPendingEvents();
                } else {
                    A.session = {};
                }
            });
        });

        Socket.on('changeUsername', function(data) {
            console.log('changeUsername', data);
            A.session.username = data.payload;
        });

        Socket.on('register', function(packet) {

            console.log(packet);

            if (packet.success) {

                A.session.userId     = packet.payload.id;
                A.session.username   = packet.payload.username;
                A.session.sessionKey = packet.payload.sessionKey;

                window.localStorage.setItem('localchat.session', JSON.stringify(A.session));

                console.log(packet);
                $state.go('tabs.chat');
                processPendingEvents();
            } else {
                // Toast
                console.log('Failed to register');
            }
        });

        A.register = function register(username) {

            var packet = {
                event: 'register',
                payload: {
                    username: username
                }
            };

            Socket.emit('register', packet, registerSuccess);

            function registerSuccess(err, payload) {
                if (err) throw err;

                A.session.userId     = payload.id;
                A.session.username   = payload.username;
                A.session.sessionKey = payload.sessionKey;

                window.localStorage.setItem('localchat.session', JSON.stringify(A.session));

                console.log(payload);
                $state.go('tabs.chat');
            }
        };

        A.withSession = function(event, payload, callback) {
            var packet = {
                userId: A.session.userId,
                username: A.session.username,
                sessionKey: A.session.sessionKey,
                payload: payload
            };
            if (A.session.userId) {
                Socket.emit(event, packet, callback);
            } else {
                withSessionEvents.push({
                    event: event,
                    packet: packet,
                    callback: callback
                });
            }
        };

        A.onSession = function(event, payload, callback) {
            var packet = {
                userId: A.session.userId,
                username: A.session.username,
                sessionKey: A.session.sessionKey,
                payload: payload
            };
            if (A.session.userId) {
                Socket.emit(event, packet, callback);
            } else {
                onSessionEvents[event] = {
                    event: event,
                    packet: packet,
                    callback: callback
                }
            }
        };

        A.ifSession = function(event, payload, callback) {
            if (A.session.userId) {
                var packet = {
                    userId: A.session.userId,
                    username: A.session.username,
                    sessionKey: A.session.sessionKey,
                    payload: payload
                };
                console.log(packet);
                Socket.emit(event, packet, callback);
            }
        };

        return A;

    });