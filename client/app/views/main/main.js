'use strict';

angular.module('angularPlaygroundFullApp')

    .service('Credit', function ($resource) {
        var url = '/api/credits/:id';
        var defaultParams = {id: '@id'};
        var actions = {
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        };

        var Outlay = $resource(url, defaultParams, actions);

        this.all = function () {
            return Outlay.query(function (data) {
                console.log('data of query all', data);

            });
        };

        this.one = function (model) {
            return Outlay.get({id: model._id}, function (data) {
                console.log('data of get 1', data);
            });
        };
        this.new = function () {
            return new Outlay();
        };
    })
    .service('Thing', function ($resource, lodash) {
        var url = '/api/things/:id';
        var defaultParams = {id: '@id'};
        var actions = {
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        };

        var Thing = $resource(url, defaultParams, actions);


        function queryCallback(data) {
            // return data;
            // return lodash.head(data); // what ever we want/ meaning, other services, that depend on 1, can chain it
        }


        this.all = function () {
            return Thing.query(queryCallback);
        };

        this.one = function (model) {
            return Thing.get({id: model._id}, function (data) {
                console.log('data of get 1', data);
            });
        };
        this.new = function () {
            return new Thing();
        };

    })
    .config(function ($stateProvider) {

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/views/main/main.html',
                controller: 'MainController',
                controllerAs: '$ctrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/views/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: '$ctrl'
            })
    });
