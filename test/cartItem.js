/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');

const app = require('../server');

describe('POST /api/v1.0/cartItems', () => {
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

  it('should add product to users cart', (done) => {
    request(app)
      .post('/api/v1.0/cartItems')
      .set('Authorization', authToken)
      .send({
        productId: 1,
        quantity: 2,
      })
      .then((res) => {
        const { body } = res;
        console.log(body);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(body).to.include.keys('status', 'data');
        done();
      })
      .catch((err) => done(err));
  });
});
