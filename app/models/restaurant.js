'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'Restaurant',
    {
      score: DataTypes.FLOAT,
      category: DataTypes.STRING,
      CNPJ: DataTypes.STRING,
      name: DataTypes.STRING,
      adress: DataTypes.STRING,
    },
    {}
  );
  Restaurant.associate = function(models) {
    Restaurant.belongsToMany(models.Product, { through: 'OffersProducts', foreignKey: 'restaurantId', as: 'products' });
  };
  return Restaurant;
};
