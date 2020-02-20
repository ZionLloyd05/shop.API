/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');

const app = require('../server');


describe('GET /api/v1.0/products', () => {
  let authToken = '';
  before((done) => {
    request(app)
      .post('/api/v1.0/auth/login')
      .send({
        email: 'alagbaladamilola@gmail.com',
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
    request(app).get('/api/v1.0/products')
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(401);
        expect(body).to.be.empty;
        done();
      })
      .catch((err) => done(err));
  });

  it('Get all Products', (done) => {
    request(app).get('/api/v1.0/products')
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

  it('Get a Product', (done) => {
    request(app).get('/api/v1.0/products/1')
      .set('Authorization', authToken)
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(body).to.include.keys('status', 'data');
        expect(body.status).to.be.equal('success');
        expect(body).to.be.a('object');
        expect(body.data).to.include.key(
          'id', 'name', 'description',
          'category', 'price', 'imageUrl',
          'createdAt', 'updatedAt',
        );
        expect(body.data.name).to.be.equal('Italian Shoe');
        done();
      })
      .catch((err) => done(err));
  });

  it('Should not find a non existing Product', (done) => {
    request(app).get('/api/v1.0/products/99999')
      .set('Authorization', authToken)
      .then((res) => {
        const { body } = res;
        console.log(body);
        expect(res.status).to.equal(404);
        expect(body).to.include.keys('status', 'data');
        expect(body.status).to.be.equal('error');
        expect(body).to.be.a('object');
        done();
      })
      .catch((err) => done(err));
  });
});

describe('POST /api/v1.0/products', () => {
  let authToken = '';
  before((done) => {
    request(app)
      .post('/api/v1.0/auth/login')
      .send({
        email: 'alagbaladamilola@gmail.com',
        password: 'herman123',
      })
      .then((res) => {
        const { body } = res;
        authToken = body.data;
        done();
      })
      .catch((err) => done(err));
  });

  it('should return a bad request', (done) => {
    request(app)
      .post('/api/v1.0/products')
      .set('Authorization', authToken)
      .send({
        name: '',
        description: '',
        category: '',
        price: 35000,
        imageUrl: '',
        inStock: true,
      })
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(400);
        expect(body.status).to.be.equal('error');
        expect(res.type).to.equal('application/json');
        expect(body).to.include.keys('status', 'data');
        done();
      })
      .catch((err) => done(err));
  });

  // it('should create a new product', (done) => {
  //   request(app)
  //     .post('/api/v1.0/products')
  //     .set('Authorization', authToken)
  //     .send({
  //       name: 'test product',
  //       description: 'Exclusive new test product by Hello World Inc',
  //       category: 'service',
  //       price: 35000,
  //       imageUrl: '',
  //       inStock: true,
  //     })
  //     .then((res) => {
  //       const { body } = res;
  //       expect(res.status).to.equal(201);
  //       expect(res.type).to.equal('application/json');
  //       expect(body).to.include.keys('status', 'data');
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });
});

describe('PUT /api/v1.0/products/{id}', () => {
  let authToken = '';
  before((done) => {
    request(app)
      .post('/api/v1.0/auth/login')
      .send({
        email: 'alagbaladamilola@gmail.com',
        password: 'herman123',
      })
      .then((res) => {
        const { body } = res;
        authToken = body.data;
        done();
      })
      .catch((err) => done(err));
  });

  it('should update existing product', (done) => {
    request(app)
      .put('/api/v1.0/products/2')
      .set('Authorization', authToken)
      .send({
        name: 'Ball Biro',
        description: 'updated biro',
        category: 'new',
        price: 150,
        imageUrl: '',
        inStock: true,
      })
      .then((res) => {
        const { body } = res;
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(body).to.include.keys('status', 'data');
        expect(body.data.name).to.be.equal('Ball Biro');
        done();
      })
      .catch((err) => done(err));
  });

  it('Should not find a non existing Product for update', (done) => {
    request(app)
      .put('/api/v1.0/products/99999')
      .set('Authorization', authToken)
      .send({
        name: 'Ball Biro',
        description: 'updated biro',
        category: 'new',
        price: 150,
        imageUrl: '',
        inStock: true,
      })
      .then((res) => {
        const { body } = res;
        console.log(body);
        expect(res.status).to.equal(404);
        expect(body).to.include.keys('status', 'data');
        expect(body.status).to.be.equal('error');
        expect(body).to.be.a('object');
        done();
      })
      .catch((err) => done(err));
  });
});

describe('DELETE /api/v1.0/products/{id}', () => {
  let authToken = '';
  before((done) => {
    request(app)
      .post('/api/v1.0/auth/login')
      .send({
        email: 'alagbaladamilola@gmail.com',
        password: 'herman123',
      })
      .then((res) => {
        const { body } = res;
        authToken = body.data;
        done();
      })
      .catch((err) => done(err));
  });

  it('Delete a product', (done) => {
    request(app)
      .delete('/api/v1.0/products/2')
      .set('Authorization', authToken)
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });
});
