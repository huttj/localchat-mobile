angular.module('LocalChat')

    .factory('Chats', function($filter, Auth, Location, Socket) {

        var C = {};

        C.chats = {};
        C.users = {};

        var onNewChat = [];

        Socket.on('chat', function(chat) {
            C.chats[chat.id] = chat;
            updateUsernames(chat);
            callOnNewChats();
        });

        Socket.on('chats', function(chats) {
            C.chats = chats.reduce(function (l, n) {
                updateUsernames(n);
                l[n.id] = n;
                return l;
            }, {});
            callOnNewChats();
        });

        Socket.on('user', function(user) {
            updateUsernames(user);
        });

        Socket.on('users', function(users) {
            users.forEach(updateUsernames);
        });

        C.onNewChat = function(fn) {
            onNewChat.push(fn);
        };

        function log() {
            console.log.apply(console, arguments);
        }

        function updateUsernames(chatOrUser) {
            var userId   = chatOrUser.userId || chatOrUser.id;
            var username = chatOrUser.username;
            var color    = colorCode(username);

            console.log(color);

            log('updating username', userId, username, C.users[userId]);

            if (!C.users[userId]) {
                log('user not in list, adding');
                C.users[userId] = {
                    userId   : userId,
                    username : username,
                    color    : color
                };

            } else if (C.users[userId].username !== username) {

                log('user in list, updating');

                C.users[userId].username = username;
                C.users[userId].color    = color;

                Object.keys(C.chats).forEach(function(c) {
                    if (C.chats[c].userId === userId) {
                        log('updating chat username', C.chats[c].username, 'to', username);
                        C.chats[c].username = username;
                    }
                });
            }

            console.log(C);
        }

        function callOnNewChats() {
            onNewChat.forEach(function(fn) {
                fn();
            });
        }

        function colorCode(str) {
            var max = 130;
            var min = 50;

            var hash = $filter('md5')(str);

            var int = parseInt(
                parseInt(hash, 36)
                    .toExponential()
                    .slice(2,-5)
                , 10);

            var hex = (int & 0xFFFFFF).toString(16).toUpperCase();

            hex = hex.match(/.{2}/g)
                .map(function(n) {
                    return Math.max(Math.min(parseInt(n, 16), max), min).toString(16);
                }).join('');

            return '#' + hex;
        }

        return C;

    });