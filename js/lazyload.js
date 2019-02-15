angular.module('app').config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'daterangepicker',
            files: ['vendor/bootstrap-daterangepicker/daterangepicker.js', 'vendor/angular-daterangepicker/js/angular-daterangepicker.min.js', 'vendor/bootstrap-daterangepicker/daterangepicker.css']
        }, {
            name: 'angularFileUpload',
            files: ['vendor/angular-file-upload/dist/angular-file-upload.min.js']
        }, {
            name: 'ngFileUpload',
            files: ['vendor/ngfileupload/ng-file-upload-shim.js', 'vendor/ngfileupload/ng-file-upload.js']
        }, {
            serie: true,
            name: 'naif.base64',
            files: ['vendor/angular-base64-upload/dist/angular-base64-upload.min.js']
        }, {
            name: 'frAngular',
            files: ['vendor/keyboard-manager/keyboardManager.js']
        }, {
            name: 'mgo-angular-wizard',
            files: ["vendor/angular-wizard/dist/angular-wizard.min.js", "vendor/angular-wizard/dist/angular-wizard.min.css"]
        }, {
            name: 'fontawesome',
            files: ["vendor/font-awesome/css/font-awesome.min.css"]
        }, {
            name: 'simplelineicon',
            files: ["vendor/simple-line-icons/css/simple-line-icons.css"]
        }, {
            name: 'iconflag',
            files: ["vendor/flag-icon-css/css/flag-icon.min.css"]
        }, {
            serie: true,
            name: 'chart.js',
            files: ['vendor/chart.js/dist/Chart.min.js', 'vendor/angular-chart.js/dist/angular-chart.min.js']
        }]
    });
}]);