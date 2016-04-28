"use strict";

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/outlays              ->  index
 * POST    /api/outlays              ->  create
 * GET     /api/outlays/:id          ->  show
 * PUT     /api/outlays/:id          ->  update
 * DELETE  /api/outlays/:id          ->  destroy
 */

'use strict';

import {Outlay} from '../../sqldb';


function respondWithResult(res, statusCode) { // reuse this
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

export function index(req, res) {
    return Outlay.findAll()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Outlay from the DB
export function show(req, res) {
    return Outlay.find({
            where: {
                _id: req.params.id
            }
        })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
