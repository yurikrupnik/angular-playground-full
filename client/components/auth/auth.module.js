'use strict';

angular.module('angularPlaygroundFullApp.auth', [
  'angularPlaygroundFullApp.constants',
  'angularPlaygroundFullApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
