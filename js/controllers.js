angular.module("app").controller("AppCtrl", ["$rootScope", "$scope", "UserService", "Data", "$location", function($rootScope, $scope, UserService, Data, $location) {
    $scope.logout = function() {
        UserService.delUser();
        Data.get("site/logout").then(function(response) {
            $location.path('/login');
        });
    };
}]);