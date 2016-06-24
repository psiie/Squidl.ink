var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Auth Controller', function() {
  describe('GET /auth/signup', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/auth/signup').expect(200, done);
    });
  });

  describe('POST /auth/signup', function() {
    it('should redirect to / on success', function(done) {
      request(app).post('/auth/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new@new.co',
        name: 'Brian',
        password: 'password'
      })
      .expect('Location', '/')
      .expect(302, done);
    });

    it('should redirect to /auth/signup on failure', function(done) {
      request(app).post('/auth/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new',
        name: 'Brian',
        password: 'p'
      })
      .expect('Location', '/auth/signup')
      .expect(302, done);
    });
  });

  describe('GET /auth/login', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/auth/login')
      .expect(200, done);
    });
  });

  describe('POST /auth/login', function() {
    it('should redirect to / on success', function(done) {
      request(app).post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new@new.co',
        password: 'password'
      })
      .expect('Location', '/')
      .expect(302, done);
    });

    it('should redirect to /auth/login on failure', function(done) {
      request(app).post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new@new.co',
        password: 'p'
      })
      .expect('Location', '/auth/login')
      .expect(302, done);
    });
  });

  describe('GET /auth/logout', function() {
    it('should redirect to /', function(done) {
      request(app).get('/auth/logout')
      .expect('Location', '/')
      .expect(302, done);
    });
  });
});
