/**
 * Outlay model events
 */

'use strict';

import {EventEmitter} from 'events';
var Outlay = require('../../sqldb/index').Outlay;
var OutlayEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OutlayEvents.setMaxListeners(0);

// Model events
var events = {
    'afterCreate': 'save',
    'afterUpdate': 'save',
    'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
    var event = events[e];
    Outlay.hook(e, emitEvent(event));
}

function emitEvent(event) {
    return function(doc, options, done) {
        OutlayEvents.emit(event + ':' + doc._id, doc);
        OutlayEvents.emit(event, doc);
        done(null);
    }
}

export default OutlayEvents;

