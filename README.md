# Mock Shop API

## Production link <http://mockshopapi.herokuapp.com/> </h2>

## Overview

A simple mock shop API built with Nodejs/Express as server, Sequelize as ORM and Postgres for data store

## Local Installation

1. Clone repository.

2. CD into the application folder.

```bash
3. $ npm install.
```

```bash
4. $ cd ./src/database
```

```bash
5. $ sequelize db:migrate
```

```bash
6. $ npm run server
```

## API

### Check Full Docs here <http://mockshopapi.herokuapp.com/api-docs/>

Brief API documentation.  

1. Resource Name : Auth
   - Path: POST /api/v1.0/auth/login
   - Description: Use to create auth token for users
   - Access: Public

   - Path: POST /api/v1.0/auth/register
   - Description: Use to register a user
   - Access: Public

2. Resource Name : User
   - Path: GET /api/v1.0/users
   - Description: Return all users
   - Access: Private

   - Path: GET /api/v1.0/users/{id}
   - Description: Return a single user
   - Access: Private

3. Resource Name : Product
   - Path: GET /api/v1.0/products
   - Description: Return all products
   - Access: Private

   - Path: GET /api/v1.0/products/{id}
   - Description: Return a single product
   - Access: Private

   - Path: POST /api/v1.0/products
   - Description: Create a product
   - Access: Private

   - Path: PUT /api/v1.0/products/{id}
   - Description: Update a product
   - Access: Private

   - Path: DELETE /api/v1.0/products/{id}
   - Access: Private

4. Resource Name : CartItem
   - Path: GET /api/v1.0/cartItems
   - Description: Return user cart
   - Access: Private

   - Path: POST /api/v1.0/cartItems
   - Description: Adding product to cart
   - Access: Private

   - Path: DELETE /api/v1.0/cartItems/{productId}
   - Description: Removing product from user's cart
   - Access: Private

## Tests

```bash
$ npm run test
```
