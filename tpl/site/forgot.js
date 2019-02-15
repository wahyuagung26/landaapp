app.controller("forgotCtrl", function($scope, Data, toaster, $state, $rootScope, UserService) {
    $scope.form = {};
    $scope.loading = false;
    $scope.reset = function(form) {
        $scope.loading = true;
        Data.post("site/resetPassword", form).then(function(result) {
            if (result.status_code != 200) {
                toaster.pop(
                    "error",
                    "Terjadi Kesalahan",
                    setErrorMessage(result.errors)
                );
            } else {
                toaster.pop(
                    "success",
                    "Password baru telah dikirim ke email anda",
                    setErrorMessage(result.errors)
                );
            }
            $scope.loading = false;
        });
    };
});