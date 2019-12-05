'use strict';
module.exports = (sequelize, DataTypes) => {
  const OffersProduct = sequelize.define(
    'OffersProduct',
    {
      productId: DataTypes.INTEGER,
      restaurantId: DataTypes.INTEGER,
    },
    {}
  );
  OffersProduct.associate = function(models) {
    OffersProduct.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
    OffersProduct.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return OffersProduct;
};
