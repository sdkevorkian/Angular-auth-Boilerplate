angular.module('Ctrls', ['AuthServices'])
    .controller('HomeCtrl', ['$scope', 'Auth', function($scope, Auth) {
        console.log(Auth.currentUser());
    }])
    .controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.Auth = Auth;
        $scope.logout = function() {
            Auth.removeToken();
        };
    }])
    .controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts) {

    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                $http.post('/api/auth', $scope.user).then(function success(res) {
                    Auth.saveToken(res.data.token);

                    $location.path('/');
                }, function error(res) {
                    console.log(res);
                });
            }, function error(res) {
                console.log(res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data.token);
                console.log('Token:', res.data.token);
                $location.path('/');
            }, function error(res) {
                console.log(res);
            });
        };
    }]);
