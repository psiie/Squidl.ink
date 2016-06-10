var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');
var agent = request.agent(app);

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('GET /profile', function() {
  it('should redirect to /auth/login if not logged in', function(done) {
    request(app).get('/profile')
    .expect('Location', '/auth/login')
    .expect(302, done);
  });

  it('should return a 200 response if logged in', function(done) {
    agent.post('/auth/signup')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      email: 'my@user.co',
      name: 'Brian',
      password: 'password'
    })
    .expect(302)
    .expect('Location', '/')
    .end(function(error, res) {
      if (error) {
        done(error);
      } else {
        agent.saveCookies(res);

        agent.get('/profile')
        .expect(200, done);
      }
    });
  });
});
