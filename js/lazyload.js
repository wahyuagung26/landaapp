angular.module('app').config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'daterangepicker',
            files: ['library/bootstrap-daterangepicker/daterangepicker.js', 'library/angular-daterangepicker/js/angular-daterangepicker.min.js', 'library/bootstrap-daterangepicker/daterangepicker.css']
        }, {
            name: 'angularFileUpload',
            files: ['library/angular-file-upload/dist/angular-file-upload.min.js']
        }, {
            name: 'ngFileUpload',
            files: ['library/ngfileupload/ng-file-upload-shim.js', 'library/ngfileupload/ng-file-upload.js']
        }, {
            serie: true,
            name: 'naif.base64',
            files: ['library/angular-base64-upload/dist/angular-base64-upload.min.js']
        }, {
            name: 'frAngular',
            files: ['library/keyboard-manager/keyboardManager.js']
        }, {
            name: 'mgo-angular-wizard',
            files: ["library/angular-wizard/dist/angular-wizard.min.js", "library/angular-wizard/dist/angular-wizard.min.css"]
        }, {
            name: 'fontawesome',
            files: ["library/font-awesome/css/font-awesome.min.css"]
        }, {
            name: 'simplelineicon',
            files: ["library/simple-line-icons/css/simple-line-icons.css"]
        }, {
            name: 'iconflag',
            files: ["library/flag-icon-css/css/flag-icon.min.css"]
        }, {
            serie: true,
            name: 'chart.js',
            files: ['library/chart.js/dist/Chart.min.js', 'library/angular-chart.js/dist/angular-chart.min.js']
        }]
    });
}]);