app.controller("aksesCtrl", function($scope, Data, $rootScope) {
    /**
     * Inialisasi
     */
    var tableStateRef = {};
    $scope.displayed = [];
    $scope.form = {};
    $scope.is_edit = false;
    $scope.is_view = false;
    $scope.loading = false;
    /**
     * End inialisasi
     */
    $scope.callServer = function callServer(tableState) {
        tableStateRef = tableState;
        $scope.isLoading = true;
        var offset = tableState.pagination.start || 0;
        var limit = tableState.pagination.number || 10;
        var param = {
            offset: offset,
            limit: limit
        };
        if (tableState.sort.predicate) {
            param["sort"] = tableState.sort.predicate;
            param["order"] = tableState.sort.reverse;
        }
        if (tableState.search.predicateObject) {
            param["filter"] = tableState.search.predicateObject;
        }
        Data.get("appakses/index", param).then(function(response) {
            $scope.displayed = response.data.list;
            tableState.pagination.numberOfPages = Math.ceil(response.data.totalItems / limit);
        });
        $scope.isLoading = false;
    };
    $scope.create = function(form) {
        $scope.is_edit = true;
        $scope.is_view = false;
        $scope.formtittle = "Form Tambah Data";
        $scope.form = {};
        $scope.form.akses = {};
    };
    $scope.update = function(form) {
        $scope.is_edit = true;
        $scope.is_view = false;
        $scope.formtittle = "Edit Data : " + form.username;
        $scope.form = form;
    };
    $scope.view = function(form) {
        $scope.is_edit = true;
        $scope.is_view = true;
        $scope.formtittle = "Lihat Data : " + form.username;
        $scope.form = form;
    };
    $scope.save = function(form) {
        $scope.loading = true;
        Data.post("appakses/save", form).then(function(result) {
            if (result.status_code == 200) {
                $rootScope.alert("Berhasil", "Data berhasil disimpan", "success");
                $scope.cancel();
            } else {
                $rootScope.alert("Terjadi Kesalahan", setErrorMessage(result.errors), "error");
            }
            $scope.loading = false;
        });
    };
    $scope.cancel = function() {
        $scope.is_edit = false;
        $scope.is_view = false;
        $scope.is_create = false;
        $scope.callServer(tableStateRef);
    };
    $scope.trash = function(row) {
        var data = angular.copy(row);
        if (confirm("Apa anda yakin akan MENGHAPUS item ini ?")) {
            data.is_deleted = 1;
            Data.post("appakses/saveStatus", data).then(function(result) {
                if (result.status_code == 200) {
                    toaster.pop("success", "Berhasil", "Data berhasil dihapus");
                    $scope.cancel();
                } else {
                    toaster.pop("error", "Terjadi Kesalahan", setErrorMessage(result.errors));
                }
            });
        }
    };
    $scope.restore = function(row) {
        if (confirm("Apa anda yakin akan MERESTORE item ini ?")) {
            row.is_deleted = 0;
            Data.post("appakses/saveStatus", row).then(function(result) {
                $scope.cancel();
            });
        }
    };
});