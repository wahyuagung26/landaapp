app.controller("crudGeneratorCtrl", function($scope, Data, toaster, UserService) {
    /**
     * Inialisasi
     */
    $scope.form = {
        table: "",
        path: "",
        filePhp: ""
    };
    $scope.form.path = 'tpl/';
    /**
     * End Inialisasi
     */
    Data.get("generator/getTabel").then(function(result) {
        $scope.listTabel = result.data;
    });
    $scope.generate = function(form) {
        if (form.table == "" || form.path == "" || form.filePhp == "") {
            toaster.pop("error", "Terjadi Kesalahan", "Pastikan semua inputan tidak kosong!");
        } else {
            $scope.loading = true;
            Data.post("generator/generate", $scope.form).then(function(result) {
                if (result.status_code == 200) {
                    toaster.pop("success", "Berhasil", "Data berhasil tersimpan");
                    $scope.form = {
                        table: "",
                        path: "tpl/",
                        filePhp: ""
                    };
                } else {
                    toaster.pop("error", "Terjadi Kesalahan", setErrorMessage(result.errors));
                }
                $scope.loading = false;
            });
        }
    };
});