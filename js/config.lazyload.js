angular.module("app").config([
    "$ocLazyLoadProvider",
    function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [
                {
                    name: "daterangepicker",
                    files: [
                        "js/library/bootstrap-daterangepicker/daterangepicker.js",
                        "js/library/angular-daterangepicker/js/angular-daterangepicker.min.js",
                        "js/library/bootstrap-daterangepicker/daterangepicker.css"
                    ]
                },
                {
                    name: "angularFileUpload",
                    files: [
                        "js/library/angular-file-upload/dist/angular-file-upload.min.js"
                    ]
                },
                {
                    serie: true,
                    name: "chart.js",
                    files: [
                        "js/library/chart.js/dist/Chart.min.js",
                        "js/library/angular-chart.js/dist/angular-chart.min.js"
                    ]
                },
                {
                    serie: true,
                    name: "naif.base64",
                    files: [
                        "js/library/angular-base64-upload/dist/angular-base64-upload.min.js"
                    ]
                },
                {
                    serie: true,
                    name: "cgBusy",
                    files: [
                        "js/library/angular-busy/dist/angular-busy.min.js",
                        "js/library/angular-busy/dist/angular-busy.min.css"
                    ]
                }
            ]
        });
    }
]);
