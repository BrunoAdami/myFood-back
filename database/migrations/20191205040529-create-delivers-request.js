'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DeliversRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deliverPrice: {
        type: Sequelize.FLOAT,
      },
      destiny: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      deliveryLimit: {
        type: Sequelize.STRING,
      },
      done: {
        type: Sequelize.BOOLEAN,
      },
      requestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Requests',
          key: 'id',
        },
      },
      deliverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Delivers',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DeliversRequests');
  },
};
