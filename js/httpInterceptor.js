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
              return config;
          },
          'requestError': function(error) {
              return error;
          },
          'response': function(response) {
              return response;
          },
          'responseError': function(error) {
              if (error.status == 403) {
                  if (error.config.method == "POST") {
                      $injector.get('$uibModal').open({
                          templateUrl: 'tpl/modalLogin.html',
                          controller: 'ModalInstanceCtrl',
                          size: 'sm',
                          backdrop: 'static'
                      });
                  }
              }
              return $q.reject(error);
          }
      };
      return interceptor;
  }]);
  angular.module('app').config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('myHttpInterceptor');
  }]);