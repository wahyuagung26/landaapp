app.controller('rolesCtrl', function($scope, Data, toaster) {
    var tableStateRef;
    var control_link = "approles";
    $scope.displayed = [];
    $scope.form = {};
    $scope.is_edit = false;
    $scope.is_view = false;
    $scope.callServer = function callServer(tableState) {
        tableStateRef = tableState;
        $scope.isLoading = true;
        /** set offset and limit */
        var offset = tableState.pagination.start || 0;
        var limit = tableState.pagination.number || 10;
        var param = {
            offset: offset,
            limit: limit
        };
        /** set sort and order */
        if (tableState.sort.predicate) {
            param['sort'] = tableState.sort.predicate;
            param['order'] = tableState.sort.reverse;
        }
        /** set filter */
        if (tableState.search.predicateObject) {
            param['filter'] = tableState.search.predicateObject;
        }
        Data.get(control_link + '/index', param).then(function(response) {
            $scope.displayed = response.data.list;
            tableState.pagination.numberOfPages = Math.ceil(response.data.totalItems / limit);
        });
    };
    /** create action */
    $scope.create = function(form) {
        $scope.is_edit = true;
        $scope.is_view = false;
        $scope.formtitle = "Form Tambah Data";
        $scope.form = {};
        $scope.form.akses = {};
    };
    /** update action */
    $scope.update = function(form) {
        $scope.is_edit = true;
        $scope.is_view = false;
        $scope.formtitle = "Edit Data : " + form.nama;
        $scope.form = form;
    };
    /** view data */
    $scope.view = function(form) {
        $scope.is_edit = true;
        $scope.is_view = true;
        $scope.formtitle = "Lihat Data : " + form.nama;
        $scope.form = form;
    };
    /** save request */
    $scope.save = function(form) {
        var url = '/save';
        Data.post(control_link + url, form).then(function(result) {
            if (result.status_code == 200) {
                $scope.is_edit = false;
                $scope.callServer(tableStateRef);
                toaster.pop('success', "Berhasil", "Data berhasil tersimpan");
            } else {
                toaster.pop('error', "Terjadi Kesalahan", setErrorMessage(result.errors));
            }
        });
    };
    /** cancel */
    $scope.cancel = function() {
        $scope.callServer(tableStateRef);
        $scope.is_edit = false;
        $scope.is_view = false;
    };
   $scope.trash = function (row) {
    swal({
          title: "Peingatan ! ",
          text: "Apakah Anda Yakin Ingin Menhapus Data Ini",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Iya, di Hapus",
          cancelButtonText: "No",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
             row.is_deleted = 1;
            Data.post(control_link + '/update', row).then(function(result) {
                $scope.displayed.splice($scope.displayed.indexOf(row), 1);
            });
            swal("Terhapus", "Data Berhasil Di Hapus.", "success");
          } else {
            swal("Membatalkan", "Membatalkan Menghapus Data:)", "error");
          }
        });
    };



    /** restore data from trash */
    // $scope.restore = function(row) {
    //     if (confirm("Apa anda yakin akan MERESTORE item ini ?")) {
    //         row.is_deleted = 0;
    //         Data.post(control_link + '/update', row).then(function(result) {
    //             $scope.displayed.splice($scope.displayed.indexOf(row), 1);
    //         });
    //     }
    // };


    $scope.restore = function (row) {
    swal({
          title: "Peingatan ! ",
          text: "Apakah Anda Yakin Ingin Restore Data Ini",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Iya, di Restore",
          cancelButtonText: "Batal",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
            row.is_deleted = 0;
            Data.post(control_link + '/update', row).then(function(result) {
                $scope.displayed.splice($scope.displayed.indexOf(row), 1);
            });
            swal("Restore", "Data Berhasil Di Restore.", "success");
          } else {
            swal("Membatalkan", "Membatalkan Restore Data:)", "error");
          }
        });
    };


    /** delete data */
    // $scope.delete = function(row) {
    //     if (confirm("Apa anda yakin akan MENGHAPUS PERMANENT item ini ?")) {
    //         Data.delete(control_link + '/delete/' + row.id).then(function(result) {
    //             $scope.displayed.splice($scope.displayed.indexOf(row), 1);
    //         });
    //     }
    // };

     $scope.delete = function (row) {

            swal({
          title: "Peringatan",
          text: "Anda Akan Menhapus Ini",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Ya,di hapus",
          cancelButtonText: "Tidak",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
          Data.delete(control_link + '/delete/' + row.id).then(function(result) {
                $scope.displayed.splice($scope.displayed.indexOf(row), 1);
            });
            swal("Terhapus", "Data terhapus.", "success");
          } else {
            swal("Error", "Data belum terhapus", "error");
          }
        });
    };

    /** checkAll */
    $scope.checkAll = function(module, valueCheck) {
        var akses = {
            "master_akses": false,
            "master_user": false,
        };
        angular.forEach(akses, function($value, $key) {
            if ($key.indexOf(module) >= 0) $scope.form.akses[$key] = valueCheck;
        });
    };
})