app.controller("crudGeneratorCtrl", function($scope, Data, $rootScope, UserService) {
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
            $rootScope.alert("Terjadi kesalahan", "Pastikan semua inputan tidak kosong", "error");
        } else {
            $scope.loading = true;
            Data.post("generator/generate", $scope.form).then(function(result) {
                if (result.status_code == 200) {
                    $rootScope.alert("Berhasil", "Proses generate telah selesai", "success");
                    $scope.form = {
                        table: "",
                        path: "tpl/",
                        filePhp: ""
                    };
                } else {
                    $rootScope.alert("Terjadi kesalahan", setErrorMessage(result.errors), "error");
                }
                $scope.loading = false;
            });
        }
    };
});