app.controller("userCtrl", function($scope, Data, $rootScope) {
    /**
     * Inialisasi
     */
    var tableStateRef;
    $scope.formtittle = "";
    $scope.displayed = [];
    $scope.form = {
        password: ""
    };
    $scope.is_edit = false;
    $scope.is_view = false;
    $scope.is_create = false;
    $scope.listHakakses = [];
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
        Data.get("appuser/index", param).then(function(response) {
            $scope.displayed = response.data.list;
            tableState.pagination.numberOfPages = Math.ceil(
                response.data.totalItems / limit
            );
        });
        $scope.isLoading = false;
    };
    Data.get("appakses/index").then(function(data) {
        $scope.listHakakses = data.data.list;
    });
    $scope.create = function(form) {
        $scope.is_edit = true;
        $scope.is_view = false;
        $scope.is_create = true;
        $scope.formtittle = "Form Tambah Data";
        $scope.form = {};
    };
    $scope.update = function(form) {
        $scope.is_edit = true;
        $scope.is_view = false;
        $scope.formtittle = "Edit Data : " + form.nama;
        $scope.form = form;
        $scope.form.password = "";
    };
    $scope.view = function(form) {
        $scope.is_edit = true;
        $scope.is_view = true;
        $scope.formtittle = "Lihat Data : " + form.nama;
        $scope.form = form;
        $scope.form.password = "";
    };
    $scope.save = function(form) {
        $scope.loading = true;
        Data.post("appuser/save", form).then(function(result) {
            if (result.status_code == 200) {
                $rootScope.alert("Berhasil", "Data berhasil disimpan", "success");
                $scope.cancel();
            } else {
                $rootScope.alert("Terjadi Kesalahan", setErrorMessage(result.errors) ,"error");
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
        if (confirm("Apa anda yakin akan MENGHAPUS item ini ?")) {
            row.is_deleted = 1;
            Data.post("appuser/saveStatus", row).then(function(result) {
                $scope.displayed.splice($scope.displayed.indexOf(row), 1);
            });
        }
    };
    $scope.restore = function(row) {
        if (confirm("Apa anda yakin akan MERESTORE item ini ?")) {
            row.is_deleted = 0;
            Data.post("appuser/saveStatus", row).then(function(result) {
                $scope.displayed.splice($scope.displayed.indexOf(row), 1);
            });
        }
    };
});
