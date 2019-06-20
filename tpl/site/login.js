app.controller("loginCtrl", function($scope, Data, $state, $rootScope, UserService, $timeout, $location) {
    $scope.authError = null;
    $scope.form = {};
    var user = UserService.getUser();
    if (user === null) {
    }else{
        $location.path('/dashboard');        
    }
    $scope.login = function(form) {
        $scope.authError = null;
        Data.post("site/login", form).then(function(result) {
            if (result.status_code != 200) {
                $rootScope.alert("Terjadi Kesalahan", setErrorMessage(result.errors), "error");
            } else {
                UserService.setUser(result.data.user);
                $rootScope.user = UserService.getUser();
                $state.go("app.main");
            }
        });
    };
});