angular.module('app').config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: [{
            name: 'ngBootstrap',
            files: ['js/library/bootstrap-daterangepicker/daterangepicker.js', 'js/library/ng-bs-daterangepicker/dist/ng-bs-daterangepicker.min.js', 'js/library/bootstrap-daterangepicker/daterangepicker-bs3.css']
        }, {
            name: 'angularFileUpload',
            files: ['js/library/angular-file-upload/dist/angular-file-upload.min.js']
        }, 
        // {
        //     name: 'ngMaterial',
        //     files: ['js/library/angular-material/angular-material.min.js', 'js/library/angular-material/angular-material.min.css']
        // }, 
        {
            serie: true,
            name: 'chart.js',
            files: ['js/library/chart.js/dist/Chart.js', 'js/library/angular-chart.js/dist/angular-chart.min.js']
        }, {
            serie: true,
            name: 'naif.base64',
            files: ['js/library/angular-base64-upload/dist/angular-base64-upload.min.js']
        }, {
            serie: true,
            name: 'cgBusy',
            files: ['js/library/angular-busy/dist/angular-busy.min.js', 'js/library/angular-busy/dist/angular-busy.min.css']
        }, ]
    });
}]);