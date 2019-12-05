'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      value: DataTypes.FLOAT,
      fabDate: DataTypes.STRING,
      valDate: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function(models) {
    Product.belongsToMany(models.Request, { through: 'HasProducts', foreignKey: 'productId', as: 'requests' });
  };
  return Product;
};
