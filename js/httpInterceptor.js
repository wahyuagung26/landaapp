  angular.module('app').controller('ModalInstanceCtrl', ['Data', '$scope', '$uibModalInstance', '$rootScope', function(Data, $scope, $uibModalInstance, $rootScope) {
      $scope.form = {};
      $scope.login = function(form) {
          $scope.authError = null;
          Data.post('site/login', form).then(function(result) {
              if (result.status_code != 200) {
                  $scope.authError = setErrorMessage(result.errors);
              } else {
                  $rootScope.user = result.data.user;
                  $uibModalInstance.dismiss('close');
              }
          });
      };
  }]);
  angular.module('app').factory('myHttpInterceptor', ['$q', '$injector', '$rootScope', function($q, $injector, $rootScope) {
      var numberOfHttpRequests = 0;
      var interceptor = {
          'request': function(config) {
              // numberOfHttpRequests += 1;
              // $rootScope.waitingForHttp = true;
              return config;
          },
          'requestError': function(error) {
              // numberOfHttpRequests -= 1;
              // $rootScope.waitingForHttp = (numberOfHttpRequests !== 0);
              return error;
          },
          'response': function(response) {
              // numberOfHttpRequests -= 1;
              // $rootScope.waitingForHttp = (numberOfHttpRequests !== 0);
              return response;
          },
          'responseError': function(error) {
              // numberOfHttpRequests -= 1;
              // $rootScope.waitingForHttp = (numberOfHttpRequests !== 0);
              if (error.status == 403) {
                  $injector.get('$uibModal').open({
                      templateUrl: 'tpl/modalLogin.html',
                      controller: 'ModalInstanceCtrl',
                      size: 'sm',
                      backdrop: 'static'
                  });
              }
              return $q.reject(error);
          }
      };
      return interceptor;
  }]);
  angular.module('app').config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('myHttpInterceptor');
  }]);