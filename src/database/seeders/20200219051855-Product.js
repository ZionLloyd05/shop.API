module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Products',
    [
      {
        name: 'Italian Shoe',
        description: 'Shoes from italy, very nice.',
        category: 'Shoes',
        price: 250000,
        imageUrl: '',
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Smooth Pen',
        description: 'Ball mouth pen for smooth journaling.',
        category: 'Tools',
        price: 1500,
        imageUrl: '',
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  ),

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
