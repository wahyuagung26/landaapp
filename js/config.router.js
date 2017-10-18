angular.module('app').run(
    ['$rootScope', '$state', '$stateParams', 'Data', '$transitions',
        function($rootScope, $state, $stateParams, Data, $transitions) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            /** Pengecekan login */
            $transitions.onStart({}, function($transition$) {
                var toState = $transition$.$to();
                Data.get('site/session').then(function(results) {
                    if (results.status_code == 200) {
                        $rootScope.user = results.data.user;
                        /** Check hak akses */
                        var globalmenu = ['site.dashboard', 'master.userprofile', 'access.signin'];
                        if (globalmenu.indexOf(toState.name) >= 0) {} else {
                            if (results.data.user.akses[(toState.name).replace(".", "_")]) {} else {
                                $state.go("access.forbidden");
                            }
                        }
                        /** End */
                    } else {
                        $state.go("access.signin");
                    }
                });
            });
        }
    ]);
angular.module('app').config(
    ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/site/dashboard');
            $stateProvider.state('site', {
                    abstract: true,
                    url: '/site',
                    templateUrl: 'tpl/app.html'
                }).state('site.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'tpl/dashboard.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['chart.js']).then(function() {
                                    return $ocLazyLoad.load('tpl/site/dashboard.js');
                                });
                            }
                        ]
                    }
                })
                /** Set default page */
                .state('access', {
                    url: '/access',
                    template: '<div ui-view class="fade-in-right-big smooth"></div>'
                }).state('access.signin', {
                    url: '/signin',
                    templateUrl: 'tpl/page_signin.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('tpl/site/site.js').then();
                            }
                        ]
                    }
                }).state('access.404', {
                    url: '/404',
                    templateUrl: 'tpl/page_404.html'
                }).state('access.forbidden', {
                    url: '/forbidden',
                    templateUrl: 'tpl/page_forbidden.html'
                })
                /** End */
                /** Router request master */
                .state('master', {
                    url: '/master',
                    templateUrl: 'tpl/app.html'
                }).state('master.userprofile', {
                    url: '/profile',
                    templateUrl: 'tpl/m_user/profil.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('tpl/m_user/profil.js');
                            }
                        ]
                    }
                }).state('master.user', {
                    url: '/user',
                    templateUrl: 'tpl/m_user/user.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('tpl/m_user/user.js');
                            }
                        ]
                    }
                }).state('master.roles', {
                    url: '/roles',
                    templateUrl: 'tpl/m_roles/index.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load('tpl/m_roles/roles.js');
                            }
                        ]
                    }
                })
            /** End master request */
        }
    ]);