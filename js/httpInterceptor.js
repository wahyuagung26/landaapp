angular.module('app').controller('ModalInstanceLoginCtrl', ['Data', '$scope', '$uibModalInstance', '$rootScope', 'toaster', function(Data, $scope, $uibModalInstance, $rootScope, toaster) {
    $scope.form = {};
    $scope.tutup = function() {
        $uibModalInstance.close({});
    };
    $scope.login = function(form) {
        Data.post("site/login", form).then(function(result) {
            if (result.status_code != 200) {
                toaster.pop("error", "Terjadi Kesalahan", setErrorMessage(result.errors));
            } else {
                $scope.tutup();
                UserService.setUser(result.data.user);
                $rootScope.user = UserService.getUser();
            }
        });
    };
}]);
angular.module('app').factory('myHttpInterceptor', ['$q', '$injector', '$rootScope', '$window', '$location', 'UserService', function($q, $injector, $rootScope, $window, $location, UserService) {
    var modalOpen = false;
    var interceptor = {
        'request': function(config) {
            return config;
        },
        'requestError': function(error) {
            return error;
        },
        'response': function(response) {
            return response;
        },
        'responseError': function(error) {
            if (error.data.status_code == 403) {
                if (modalOpen == false) {
                    UserService.delUser();
                    modalOpen = true;
                    var modal = $injector.get('$uibModal').open({
                        templateUrl: 'tpl/common/modalLogin.html',
                        controller: 'ModalInstanceLoginCtrl',
                        size: 'sm',
                        backdrop: 'static'
                    });
                    modal.result.then(function(result) {
                        modalOpen = false;
                    }, function() {});
                }
                return error;
            } else {
                return $q.reject(error);
            }
        }
    };
    return interceptor;
}]);
angular.module('app').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('myHttpInterceptor');
}]);