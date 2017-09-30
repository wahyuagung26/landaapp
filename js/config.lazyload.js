angular.module('app').config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'daterangepicker',
            files: ['js/library/bootstrap-daterangepicker/daterangepicker.js', 'js/library/angular-daterangepicker/js/angular-daterangepicker.min.js', 'js/library/bootstrap-daterangepicker/daterangepicker.css']
        }, {
            name: 'angularFileUpload',
            files: ['js/library/angular-file-upload/dist/angular-file-upload.min.js']
        }, {
            name: 'ngMaterial',
            files: ['js/library/angular-material/angular-material.min.js', 'js/library/angular-material/angular-material.min.css']
        }, ]
    });
}]);