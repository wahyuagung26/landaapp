'use strict';
/* Controllers */
angular.module('app').controller('AppCtrl', ['$scope', '$window', 'Data', '$state',
    function($scope, $window, Data, $state, $localStorage) {
        $scope.app = {}
        $scope.logout = function() {
            Data.get('site/logout').then(function(results) {
                $state.go('access.signin');
            });
        }
    }
]);
/** End */
/** Class angka [only integer in textfield] */
$(document).ready(function() {
    $("body").on("keypress", ".angka", function(s) {
        var i = s.which ? s.which : event.keyCode;
        return i > 31 && (48 > i || i > 57) && 45 != i && 46 != i ? !1 : !0
    }), $("body").on("focus", ".angka", function() {
        0 == $(this).val() && $(this).val("")
    }), $("body").on("blur", ".angka", function() {
        "" == $(this).val() && $(this).val(0)
    }), $("input").keypress(function(s) {
        13 == s.keyCode && s.preventDefault()
    })
});
/** End */
function setErrorMessage(message) {
    var error = '';
    angular.forEach(message, function($value, $key) {
        error = error + ' - ' + $value + "<br>";
    });
    return error;
}