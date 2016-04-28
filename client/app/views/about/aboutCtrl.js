

(function () {
    function AboutController(socket, Thing) {
        var ctrl = this;

        // ctrl.awesomeThings = Thing.all();
        ctrl.newThing = Thing.new();

        ctrl.all = Thing.all(function (data) {
            ctrl.awesomeThings = data;
            console.log('inside then of all in controller', data);
        });
        ctrl.addThing = function () {
            if (!ctrl.newThing.name) {return}
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
        };



    }

    angular.module('angularPlaygroundFullApp')
        .controller('AboutCtrl', AboutController)

})();
