'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var creditCtrlStub = {
  index: 'creditCtrl.index',
  show: 'creditCtrl.show',
  create: 'creditCtrl.create',
  update: 'creditCtrl.update',
  destroy: 'creditCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var creditIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './credit.controller': creditCtrlStub
});

describe('Credit API Router:', function() {

  it('should return an express router instance', function() {
    creditIndex.should.equal(routerStub);
  });

  describe('GET /yes', function() {

    it('should route to credit.controller.index', function() {
      routerStub.get
        .withArgs('/', 'creditCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /yes/:id', function() {

    it('should route to credit.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'creditCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /yes', function() {

    it('should route to credit.controller.create', function() {
      routerStub.post
        .withArgs('/', 'creditCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /yes/:id', function() {

    it('should route to credit.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'creditCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /yes/:id', function() {

    it('should route to credit.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'creditCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /yes/:id', function() {

    it('should route to credit.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'creditCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
