'use strict';

angular.module('angularPlaygroundFullApp', [
        'angularPlaygroundFullApp.auth',
        'angularPlaygroundFullApp.admin',
        'angularPlaygroundFullApp.constants',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'btford.socket-io',
        'ui.router',
        'ui.bootstrap',
        'validation.match',
        'ngLodash'
    ])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
    });
