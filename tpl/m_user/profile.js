app.controller("profilCtrl", function($scope, Data, $rootScope, UserService) {
    /**
     * Inialisasi
     */
    $scope.form = {
        password: ""
    };
    $scope.loading = false;
    /** 
     * End inialisasi
     */
    var id = UserService.getUser.id;
    Data.get("appuser/view").then(function(result) {
        $scope.form = result.data;
    });
    $scope.save = function(form) {
        $scope.loading = true;
        Data.post("appuser/save", form).then(function(result) {
            if (result.status_code == 200) {
                $rootScope.alert("Berhasil", "Data berhasil tersimpan", "success");
            } else {
                $rootScope.alert("Terjadi Kesalahan", setErrorMessage(result.errors), "error");
            }
            $scope.loading = false;
        });
    };
});