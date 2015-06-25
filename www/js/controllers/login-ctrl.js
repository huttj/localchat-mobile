angular.module('LocalChat')

    .controller('LoginCtrl', function($scope, Socket, Auth) {
        var adjectives = ["Adaptable", "Adventurous", "Affable", "Affectionate", "Agreeable", "Ambitious", "Amiable", "Amicable", "Amusing", "Brave", "Bright", "Broad-Minded", "Calm", "Careful", "Charming", "Communicative", "Compassionate ", "Conscientious", "Considerate", "Convivial", "Courageous", "Courteous", "Creative", "Decisive", "Determined", "Diligent", "Diplomatic", "Discreet", "Dynamic", "Easygoing", "Emotional", "Energetic", "Enthusiastic", "Exuberant", "Fair-Minded", "Faithful", "Fearless", "Forceful", "Frank", "Friendly", "Funny", "Generous", "Gentle", "Good", "Gregarious", "Hard-Working", "Helpful", "Honest", "Humorous", "Imaginative", "Impartial", "Independent", "Intellectual", "Intelligent", "Intuitive", "Inventive", "Kind", "Loving", "Loyal", "Modest", "Neat", "Nice", "Optimistic", "Passionate", "Patient", "Persistent ", "Pioneering", "Philosophical", "Placid", "Plucky", "Polite", "Powerful", "Practical", "Pro-Active", "Quick-Witted", "Quiet", "Rational", "Reliable", "Reserved", "Resourceful", "Romantic", "Self-Confident", "Self-Disciplined", "Sensible", "Sensitive", "Shy", "Sincere", "Sociable", "Straightforward", "Sympathetic", "Thoughtful", "Tidy", "Tough", "Unassuming", "Understanding", "Versatile", "Warmhearted", "Willing", "Witty"];
        var animals = ['Fox', 'Coyote', 'Liger', 'Lynx', 'Octopus', 'Penguin', 'Skunk', 'Monkey', 'Starfish', 'Tarsier', 'Tortoise', 'Toucan', 'Zonkey', 'Dangerous', 'Wolf', 'Crocodile', 'Bear', 'Hippopotamus', 'Jaguar', 'Whale', 'Dragon', 'Lion', 'Fish', 'Turtle', 'Stingray', 'Tiger', 'Shark', 'Pets', 'Collie', 'Cat', 'Chinchilla', 'Cow', 'Duck', 'Gecko', 'Pig', 'Hamster', 'WolfHound', 'Forest', 'Rare', 'Aye', 'Leopard', 'Panda', 'Ocelot', 'Okapi', 'Panther', 'Rhinoceros', 'Dolphin', 'Sloth'];
        function generateUsername() {
            var adjective = Math.floor(Math.random()*adjectives.length);
            var animal    = Math.floor(Math.random()*animals.length);
            return adjectives[adjective] + ' ' + animals[animal];
        }

        $scope.login = {
            username: generateUsername()
        };
        $scope.register = function register(username) {
            console.log('trying to register with username', username);
            Auth.register(username);
        };
        //function generateUsername(len) {
        //    var num = '1234567890';
        //    return 'Anon' + Array.apply(null, Array(len || 6)).map(function() {
        //            return num[Math.floor(Math.random()*num.length-1)];
        //        }).join('');
        //}

    });