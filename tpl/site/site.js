app.controller('siteCtrl', function($scope, Data, toaster, $state, $rootScope) {
    $scope.authError = null;
    $scope.login = function(form) {
        $scope.authError = null;
        Data.post('site/login', form).then(function(result) {
            if (result.status_code != 200) {
                $scope.authError = setErrorMessage(result.errors);
            } else {
                $rootScope.user = result.data.user;
                $state.go('site.dashboard');
            }
        });
    };
})