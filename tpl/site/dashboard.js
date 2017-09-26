app.controller('dashboardCtrl', function ($scope, Data, $state) {
    $scope.authError = null;

    $scope.login = function (form) {
        $scope.authError = null;

        Data.post('site/login/', form).then(function (result) {
            if (result.status == 0) {
                $scope.authError = result.errors;
            } else {
                $state.go('site.dashboard');
            }
        });
    };
})
