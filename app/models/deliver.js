'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deliver = sequelize.define(
    'Deliver',
    {
      phone: DataTypes.STRING,
      CNH: DataTypes.STRING,
      CPF: DataTypes.STRING,
      name: DataTypes.STRING,
      RG: DataTypes.STRING,
    },
    {}
  );
  Deliver.associate = function(models) {
    Deliver.belongsToMany(models.Request, { through: 'DeliversRequests', foreignKey: 'deliverId', as: 'requests' });
    Deliver.hasOne(models.Vehicle, { foreignKey: 'deliverId', as: 'vehicle' });
  };
  return Deliver;
};
