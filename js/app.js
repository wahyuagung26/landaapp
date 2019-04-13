// Default colors
var brandPrimary = "#20a8d8";
var brandSuccess = "#4dbd74";
var brandInfo = "#63c2de";
var brandWarning = "#f8cb00";
var brandDanger = "#f86c6b";
var grayDark = "#2a2c36";
var gray = "#55595c";
var grayLight = "#818a91";
var grayLighter = "#d1d4d7";
var grayLightest = "#f8f9fa";
angular.module("app", ["ui.router", "angular-button-spinner", "oc.lazyLoad", "ncy-angular-breadcrumb", "angular-loading-bar", "smart-table", "LocalStorageModule", "ngPasswordStrength", "ui.bootstrap", "ui.select", "ui.utils.masks"]).config(["cfpLoadingBarProvider",
    function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }
]).run(["$rootScope", "$state", "$stateParams", "$transitions", "UserService",
    function($rootScope, $state, $stateParams, $transitions, UserService) {
        $transitions.onSuccess({}, function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.user = UserService.getUser();
        $rootScope.$state = $state;
        /** Datepicker Options */
        $rootScope.opened = {};
        $rootScope.toggle = function($event, elemId) {
            $event.preventDefault();
            $event.stopPropagation();
            $rootScope.opened[elemId] = !$rootScope.opened[elemId];
        };
        /** Daterange Options */
        $rootScope.dateRangeOptions = {
            locale: {
                format: "DD-MM-YYYY"
            }
        };
        /** Sweet Alert */
        $rootScope.alert = function(judul, text, tipe = "warning") {
            Swal.fire({
                title: '<strong>' + judul + '</strong>',
                html: text,
                type: tipe,
            }).then((close) => {
                if (close) {} else {}
            });
        };
        return ($rootScope.$stateParams = $stateParams);
    }
]).factory("Data", ["$http", "$q", "$location",
    function($http, $q, $location) {
        var serviceBase = "api/";
        var obj = {};
        obj.base = serviceBase;
        obj.loading = false;
        obj.get = function(q, object) {
            obj.loading = true;
            return $http.get(serviceBase + q, {
                params: object
            }).then(function(results) {
                obj.loading = false;
                return results.data;
            });
        };
        obj.post = function(q, object) {
            obj.loading = true;
            $http.defaults.headers.post["Content-Type"] = "application/json";
            return $http.post(serviceBase + q, object).then(function(results) {
                return results.data;
            });
        };
        obj.put = function(q, object) {
            return $http.put(serviceBase + q, object).then(function(results) {
                return results.data;
            });
        };
        obj.delete = function(q) {
            return $http.delete(serviceBase + q).then(function(results) {
                return results.data;
            });
        };
        return obj;
    }
]).factory("UserService", ["localStorageService",
    function(localStorageService) {
        var user = {};
        user.isAuth = function() {
            if (localStorageService.get("user") !== null) {
                return true;
            }
            return false;
        };
        user.setUser = function(data) {
            localStorageService.set("user", data);
        };
        user.getUser = function(data) {
            return localStorageService.get("user", data);
        };
        user.delUser = function() {
            localStorageService.remove("user");
        };
        return user;
    }
]);