app.controller('profilCtrl', function($scope, Data, toaster, $rootScope) {
    $scope.form = {}
    $scope.form.password = '';
    Data.get('appuser/view').then(function(result) {
        $scope.form = result.data;
    });
    $scope.save = function(form) {
        Data.post('appuser/updateprofil', form).then(function(result) {
            if (result.status_code == 200) {
                $scope.is_edit = false;
                toaster.pop('success', "Berhasil", "Data berhasil tersimpan");
            } else {
                toaster.pop('error', "Terjadi Kesalahan", setErrorMessage(result.errors));
            }
        });
    };
})