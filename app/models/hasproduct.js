'use strict';
module.exports = (sequelize, DataTypes) => {
  const HasProduct = sequelize.define(
    'HasProduct',
    {
      quantity: DataTypes.INTEGER,
      requestId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {}
  );
  HasProduct.associate = function(models) {
    HasProduct.belongsTo(models.Request, { foreignKey: 'requestId' });
    HasProduct.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return HasProduct;
};
