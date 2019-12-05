'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeliversRequest = sequelize.define(
    'DeliversRequest',
    {
      deliverPrice: DataTypes.FLOAT,
      destiny: DataTypes.STRING,
      date: DataTypes.STRING,
      deliveryLimit: DataTypes.STRING,
      done: DataTypes.BOOLEAN,
      requestId: DataTypes.INTEGER,
      deliverId: DataTypes.INTEGER,
    },
    {}
  );
  DeliversRequest.associate = function(models) {
    DeliversRequest.belongsTo(models.Request, { foreignKey: 'requestId' });
    DeliversRequest.belongsTo(models.Deliver, { foreignKey: 'deliverId' });
  };
  return DeliversRequest;
};
