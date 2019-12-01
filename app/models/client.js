'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      name: DataTypes.STRING,
      CPF: DataTypes.STRING,
      adress: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {}
  );
  Client.associate = function(models) {
    Client.hasMany(models.Request, { as: 'requests' });
  };
  return Client;
};
