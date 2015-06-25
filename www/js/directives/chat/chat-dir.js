angular.module('LocalChat')

    .directive('chat', function() {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/chat/chat-tmpl.html',
            controller: function ($ionicScrollDelegate, $scope, Auth, Location, Chats, Socket) {

                $scope.C = Chats;
                $scope.chat = { body: null };

                var chatsList = $ionicScrollDelegate.$getByHandle('chats-list');
                function scrollIfAtBottom() {
                    var scrollPosition = chatsList.getScrollPosition();
                    if (!scrollPosition) return;

                    var position   = scrollPosition.top;
                    var viewHeight = chatsList.getScrollView().__clientHeight;
                    var height     = chatsList.getScrollView().el.children[0].children[0].clientHeight;
                    if (position + 10 >= height - viewHeight) {
                        chatsList.scrollBottom();
                    }
                }

                Chats.onNewChat(scrollIfAtBottom);

                $scope.getColor = function(chat) {
                    return Chats.users[chat.userId].color || '#555';
                };

                $scope.sendChat = function sendChat(chat, callback) {
                    if (!Location.locationSet) {
                        // Message user
                        alert('Your location is not available. Please wait a moment and try again.');

                    } else if (chat) {
                        Auth.withSession('sendChat', { body: chat }, function clearChat(err, result) {
                            if (err) {
                                alert(JSON.stringify(err));
                            } else {
                                $scope.chat.body = null;
                            }
                        });
                    }
                };
            }
        };

        function makeDate() {
            var ms = Number(new Date());
            var minutes = Math.random() * 60;
            var hours   = Math.random() * 60;
            var days    = Math.random() * 60;
            var offset = Math.floor(1000 * minutes * hours * days);
            return ms - offset;
        }

    });