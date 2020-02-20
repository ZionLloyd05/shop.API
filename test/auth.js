/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');

const app = require('../server');

describe('POST /api/v1.0/auth/register', () => {
//   it('should register a new user', (done) => {
//     request(app)
//       .post('/api/v1.0/auth/register')
//       .send({
//         firstname: 'alagbala',
//         lastname: 'damilola',
//         email: 'alagbaladamilola@gmail.com',
//         password: 'herman123',
//         cpassword: 'herman123',
//       })
//       .then((res) => {
//         const { body } = res;
//         expect(res.status).to.equal(201);
//         expect(res.type).to.equal('application/json');
//         expect(body).to.include.keys('status', 'data');
//         done();
//       })
//       .catch((err) => done(err));
//   });

  it('should return a bad request', (done) => {
    request(app)
      .post('/api/v1.0/auth/register')
      .send({
        firstname: '2',
        lastname: '',
        email: '',
        password: 'herman123',
        cpassword: 'herman123',
      })
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body.status).to.be.equal('error');
        expect(res.type).to.equal('application/json');
        done();
      })
      .catch((err) => done(err));
  });
});

// describe('POST /api/v1.0/auth/login', () => {
//   it('should login a user', (done) => {
//     request(app)
//       .post('/api/v1.0/auth/login')
//       .send({
//         email: 'alagbaladamilola@gmail.com',
//         password: 'herman123',
//       })
//       .then((res) => {
//         const { body } = res;
//         expect(res.status).to.equal(200);
//         expect(res.type).to.equal('application/json');
//         expect(body).to.include.keys('status', 'data');
//         done();
//       })
//       .catch((err) => done(err));
//   });
// });

describe('POST /api/v1.0/auth/login', () => {
  it('should not login an unregistered user', (done) => {
    request(app)
      .post('/api/v1.0/auth/login')
      .send({
        email: 'strangeuser@gmail.com',
        password: 'herman123',
      })
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(404);
        expect(res.type).to.equal('application/json');
        expect(body).to.include.keys('status', 'data');
        done();
      })
      .catch((err) => done(err));
  });
});
