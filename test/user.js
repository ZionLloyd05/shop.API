/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');

const app = require('../server');


describe('GET /api/v1.0/users', () => {
  let authToken = '';
  before((done) => {
    request(app)
      .post('/api/v1.0/auth/login')
      .send({
        email: 'zionlloyd@gmail.com',
        password: 'herman123',
      })
      .then((res) => {
        const { body } = res;
        authToken = body.data;
        done();
      })
      .catch((err) => done(err));
  });

  it('Testing for unauthorized access', (done) => {
    request(app).get('/api/v1.0/users')
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(401);
        expect(body).to.be.empty;
        done();
      })
      .catch((err) => done(err));
  });

  it('Get all Users', (done) => {
    request(app).get('/api/v1.0/users')
      .set('Authorization', authToken)
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(body).to.include.keys('status', 'data');
        expect(body.status).to.be.equal('success');
        expect(body.data).to.be.a('array');
        done();
      })
      .catch((err) => done(err));
  });

  it('Get a User', (done) => {
    request(app).get('/api/v1.0/users/1')
      .set('Authorization', authToken)
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(body).to.include.keys('status', 'data');
        expect(body.status).to.be.equal('success');
        expect(body).to.be.a('object');
        expect(body.data).to.include.key(
          'id', 'firstname', 'lastname',
          'email', 'password', 'isAdmin',
          'createdAt', 'updatedAt',
        );
        done();
      })
      .catch((err) => done(err));
  });

  it('Should not find a non existing User', (done) => {
    request(app).get('/api/v1.0/users/99999')
      .set('Authorization', authToken)
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(body).to.include.keys('status', 'data');
        expect(body.status).to.be.equal('error');
        expect(body).to.be.a('object');
        done();
      })
      .catch((err) => done(err));
  });
});
