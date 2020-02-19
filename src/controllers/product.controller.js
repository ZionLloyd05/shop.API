const cloudinary = require('cloudinary').v2;
const models = require('../database/models');
const { envVariables } = require('../helpers');
const IsEmpty = require('../helpers/isEmpty');

const { cloudname, apikey, apisecret } = envVariables;

cloudinary.config({
  cloud_name: cloudname,
  api_key: apikey,
  api_secret: apisecret,
});

/**
 * @TODO Refactoring Notes
 * Image upload logic should be converted to a function.
 */

exports.createProduct = async (productToCreate, file) => {
  const newProductInput = productToCreate;

  try {
    const result = await cloudinary.uploader.upload(file.path);
    if (!result || result.name === 'Error') {
      const error = result.message;
      console.log(error);
      return 'Image upload provider server error';
    }

    newProductInput.imageUrl = result.url;
    const product = await models.Product.create(newProductInput);
    return product;
  } catch (error) {
    console.log(error);
    return 'Image upload provider server error';
  }
};

exports.getProducts = async () => {
  const products = await models.Product.findAll({});
  return products;
};

exports.getProductById = async (productId) => {
  const product = await models.Product.findOne({
    where: { id: productId },
  });

  return product;
};

exports.updateProduct = async (productFromUser, file, productId) => {
  const productUpdateInput = productFromUser;

  try {
    if (!IsEmpty(file)) {
      // this means image also has to be updated
      const result = await cloudinary.uploader.upload(file.path);
      if (!result || result.name === 'Error') {
        const error = result.message;
        console.log(error);
        return 'Image upload provider server error';
      }

      productUpdateInput.imageUrl = result.url;
    }
    productUpdateInput.id = productId;
    const [updated] = await models.Product.update(productUpdateInput, {
      where: { id: productId },
    });


    if (updated) {
      const updatedProduct = await this.getProductById(productId);

      return updatedProduct;
    }

    return 'Product not found';
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * By my design, I feel product shouldn't be deleted,
 * at best we could only make it out of stock, for
 * record sake and more importantly because of cartitems that
 * has such product as a foriegn key.
 */
exports.removeProduct = async (productId) => {
  console.log(productId);
  const deleted = await this.updateProduct({ inStock: false }, null, productId);

  if (deleted) {
    return true;
  }

  return 'Product not found';
};
