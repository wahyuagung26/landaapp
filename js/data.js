angular.module('app').factory("Data", ['$http', '$location',
    function($http, $q, $location) {
        var serviceBase = 'api/';
        var obj = {};
        obj.base = serviceBase;
        /** Request method GET */
        obj.get = function(q, object) {
            return $http.get(serviceBase + q, {
                params: object
            }).then(function successCallback(results) {
                return results.data;
            }, function errorCallback(results) {
                return results.data;
            });
        };
        /** End */
        /** Request method POST */
        obj.post = function(q, object) {
            $http.defaults.headers.post["Content-Type"] = "application/json";
            return $http.post(serviceBase + q, object).then(function successCallback(results) {
                return results.data;
            }, function errorCallback(results) {
                return results.data;
            });
        };
        /** End */
        /** Request method PUT */
        obj.put = function(q, object) {
            return $http.put(serviceBase + q, object).then(function successCallback(results) {
                return results.data;
            }, function errorCallback(results) {
                return results.data;
            });
        };
        /** End */
        /** Request method DELETE */
        obj.delete = function(q) {
            return $http.delete(serviceBase + q).then(function successCallback(results) {
                return results.data;
            }, function errorCallback(results) {
                return results.data;
            });
        };
        /** End */
        return obj;
    }
]);
  
