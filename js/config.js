// config
var app = angular.module('app').config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$logProvider',
        function($controllerProvider, $compileProvider, $filterProvider, $provide, $logProvider) {
            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;
            $logProvider.debugEnabled(false);
        }
    ]);