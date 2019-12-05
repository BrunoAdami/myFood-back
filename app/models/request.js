'use strict';
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Request',
    {
      date: DataTypes.STRING,
      totalValue: DataTypes.FLOAT,
      paid: DataTypes.BOOLEAN,
      clientId: DataTypes.INTEGER,
    },
    {}
  );
  Request.associate = function(models) {
    Request.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    Request.belongsToMany(models.Product, { through: 'HasProducts', foreignKey: 'requestId', as: 'products' });
  };
  return Request;
};
