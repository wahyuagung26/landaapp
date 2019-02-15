app.controller("profilCtrl", function($scope, Data, toaster, UserService) {
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
                toaster.pop("success", "Berhasil", "Data berhasil tersimpan");
            } else {
                toaster.pop(
                    "error",
                    "Terjadi Kesalahan",
                    setErrorMessage(result.errors)
                );
            }
            $scope.loading = false;
        });
    };
});
