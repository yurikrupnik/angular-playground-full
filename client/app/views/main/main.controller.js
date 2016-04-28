'use strict';

(function () {

    function mainController(socket, Thing, Credit) {
        var ctrl = this;
        ctrl.credits = Credit.all();
        ctrl.awesomeThings = Thing.all();
        ctrl.newThing = Thing.new();

        ctrl.addThing = function () {
            if (!ctrl.newThing.name) {return}
            console.log('ctrl.newThing', ctrl.newThing);
            ctrl.newThing.$save();
            ctrl.newThing = Thing.new();

            socket.syncUpdates('thing', ctrl.awesomeThings); // socekt updates the model,
        };

        ctrl.deleteThing = function(thing) {
            thing.$delete({id: thing._id});
            socket.syncUpdates('thing', ctrl.awesomeThings); // socekt updates the model,
        };

        ctrl.getOne = function (thing) { // and update
            ctrl.one = Thing.one(thing);
        }
    }

    angular.module('angularPlaygroundFullApp')
        .controller('MainController', mainController)

})();
