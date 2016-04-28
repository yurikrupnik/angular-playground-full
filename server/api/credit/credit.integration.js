'use strict';

var app = require('../..');
import request from 'supertest';

var newCredit;

describe('Credit API:', function() {

  describe('GET /yes', function() {
    var credits;

    beforeEach(function(done) {
      request(app)
        .get('/yes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          credits = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      credits.should.be.instanceOf(Array);
    });

  });

  describe('POST /yes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/yes')
        .send({
          name: 'New Credit',
          info: 'This is the brand new credit!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCredit = res.body;
          done();
        });
    });

    it('should respond with the newly created credit', function() {
      newCredit.name.should.equal('New Credit');
      newCredit.info.should.equal('This is the brand new credit!!!');
    });

  });

  describe('GET /yes/:id', function() {
    var credit;

    beforeEach(function(done) {
      request(app)
        .get('/yes/' + newCredit._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          credit = res.body;
          done();
        });
    });

    afterEach(function() {
      credit = {};
    });

    it('should respond with the requested credit', function() {
      credit.name.should.equal('New Credit');
      credit.info.should.equal('This is the brand new credit!!!');
    });

  });

  describe('PUT /yes/:id', function() {
    var updatedCredit;

    beforeEach(function(done) {
      request(app)
        .put('/yes/' + newCredit._id)
        .send({
          name: 'Updated Credit',
          info: 'This is the updated credit!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCredit = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCredit = {};
    });

    it('should respond with the updated credit', function() {
      updatedCredit.name.should.equal('Updated Credit');
      updatedCredit.info.should.equal('This is the updated credit!!!');
    });

  });

  describe('DELETE /yes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/yes/' + newCredit._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when credit does not exist', function(done) {
      request(app)
        .delete('/yes/' + newCredit._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
