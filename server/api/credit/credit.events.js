/**
 * Credit model events
 */

'use strict';

import {EventEmitter} from 'events';
var Credit = require('../../sqldb').Credit;
var CreditEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CreditEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Credit.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CreditEvents.emit(event + ':' + doc._id, doc);
    CreditEvents.emit(event, doc);
    done(null);
  }
}

export default CreditEvents;
