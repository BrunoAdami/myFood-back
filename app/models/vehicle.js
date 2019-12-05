'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    'Vehicle',
    {
      kind: DataTypes.STRING,
      year: DataTypes.INTEGER,
      plate: DataTypes.STRING,
      model: DataTypes.STRING,
      deliverId: DataTypes.INTEGER,
    },
    {}
  );
  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.Deliver, { as: 'deliver' });
  };
  return Vehicle;
};
