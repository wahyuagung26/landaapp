angular.module('app').config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'daterangepicker',
            files: ['js/lib/daterangepicker/angular-daterangepicker.min.js', 'js/lib/daterangepicker/daterangepicker.min.js', 'js/lib/daterangepicker/daterangepicker.min.css', ]
        }, {
            name: 'angularFileUpload',
            files: ['js/lib/angular-file-upload.min.js']
        }, ]
    });
}]);