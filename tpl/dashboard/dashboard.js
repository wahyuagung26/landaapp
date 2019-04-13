angular.module('app').controller('dashboardCtrl', function($scope, Data, $state, UserService, $location) {
    var user = UserService.getUser();
    if (user === null) {
        $location.path('/login');
    }
});